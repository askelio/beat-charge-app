import React, { useState } from "react";
import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import { blue, blueGrey } from "@mui/material/colors";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
  showDelete?: boolean;
  handleSongsDelete?: (id: any) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({
  data,
  onClick,
  showDelete = false,
  handleSongsDelete = (id) => {},
}) => {
  const player = usePlayer();
  const imageUrl = useLoadImage(data);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }
    return player.setId(data.id);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    handleSongsDelete(data.id);
    closeModal();
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === "modal-background") {
      closeModal();
    }
  };

  return (
    <div className="flex">
      <div
        onClick={handleClick}
        className="
        flex 
        items-center 
        gap-x-3 
        cursor-pointer 
        hover:bg-neutral-800/50 
        w-full 
        p-2 
        rounded-md
      "
      >
        <div
          className="
          relative 
          rounded-md 
          min-h-[48px] 
          min-w-[48px] 
          overflow-hidden
        "
        >
          <Image
            fill
            src={imageUrl || "/images/music-placeholder.png"}
            alt="MediaItem"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-y-1 overflow-hidden">
          <p className="text-white truncate">{data.title}</p>
          <p className="text-neutral-400 text-sm truncate">By {data.author}</p>
        </div>
      </div>
      {showDelete && (
        <div
          className="w-fit h-fit"
          style={{
            marginLeft: "auto",
            backgroundColor: "brown",
            borderRadius: "4px",
            padding: "4px",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "rgb(144, 12, 63)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "brown")
          }
        >
          <button
            className=""
            style={{ margin: "0px", height: "57px", width: "25px" }}
            onClick={openModal}
          >
            <img
              src="https://img.icons8.com/?size=100&id=85194&format=png&color=000000"
              alt="trash"
              style={{
                width: "25px",
                height: "25px",
              }}
            />
          </button>
        </div>
      )}
      {isModalOpen && (
        <div
          id="modal-background"
          onClick={handleOutsideClick}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000, // Ensure the modal is on top of all other content
          }}
        >
          <div
            style={{
              background: "rgba(65,105,225,0.9)",
              padding: "20px",
              borderRadius: "5px",
              textAlign: "center",
              zIndex: 1001,
            }}
          >
            <h2 style={{ color: "white", marginBottom: "30px" }}>
              Вы действительно хотите удалить композицию?
            </h2>
            <button
              onClick={handleDelete}
              style={{
                marginRight: "10px",
                padding: "10px 20px",
                backgroundColor: "brown",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "rgb(144, 12, 63)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "brown")
              }
            >
              Удалить
            </button>
            <button
              onClick={closeModal}
              style={{
                padding: "10px 20px",
                backgroundColor: "darkgray",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "gray")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "darkgray")
              }
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaItem;
