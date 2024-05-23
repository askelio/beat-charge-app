"use client";

import uniqid from "uniqid";
import React, { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";

import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import { CategoryOptions } from "@/components/CategoryOptions";
import { Select, Option } from "@material-tailwind/react";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadModal = useUploadModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      category: "",
      price: "",
      bpm: "",
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error("Missing fields");
        return;
      }

      const uniqueID = uniqid();

      // Upload song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Failed song upload");
      }

      // Upload image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error("Failed image upload");
      }

      // Create record
      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          category: category,
          price: +values.price,
          bpm: +values.BPM,
          image_path: imageData.path,
          song_path: songData.path,
        });

      if (supabaseError) {
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Song created!");
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const [category, setCategory] = useState("");
  const handleCategoryChange = (event: any) => {
    setCategory(event);
  };

  return (
    <Modal
      title="Add a song"
      description="Upload an mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Track title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Track author"
        />

        <div>
          <h2>Category</h2>
          <Select
            id="category"
            disabled={isLoading}
            selected={(element) =>
              element &&
              React.cloneElement(element, {
                className:
                  "flex items-center ml-7 px-0 gap-2 pointer-events-none",
              })
            }
            onChange={handleCategoryChange}
            className="
                flex
                w-full
                rounded-md
                bg-neutral-700
                border
                border-transparent
                px-3
                py-3
                text-sm
                file:border-0
                file:bg-transparent
                file:text-sm
                file:font-medium
                placeholder:text-neutral-400
                disabled:cursor-not-allowed
                disabled:opacity-50
                focus:outline-none"
          >
            {CategoryOptions.map((option) => (
              <Option
                className="text-black flex items-center gap-2"
                key={option.label}
                value={option.value}
              >
                {option.label}
              </Option>
            ))}
          </Select>
        </div>

        <Input
          id="Price"
          min="0"
          max="10000"
          disabled={isLoading}
          {...register("price", { required: true })}
          placeholder="Track Price"
        />

        <Input
          id="BPM"
          min="0"
          max="1000"
          disabled={isLoading}
          {...register("BPM", { required: true })}
          placeholder="Beats Per Minute"
        />
        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            placeholder="test"
            disabled={isLoading}
            type="file"
            accept=".mp3"
            id="song"
            {...register("song", { required: true })}
          />
        </div>
        <div>
          <div className="pb-1">Select an image</div>
          <Input
            placeholder="test"
            disabled={isLoading}
            type="file"
            accept="image/*"
            id="image"
            {...register("image", { required: true })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
