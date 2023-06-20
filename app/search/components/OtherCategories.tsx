"use client";

import { Song } from "@/types";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import useDebounce from "@/hooks/useDebounce";
import qs from "query-string";


interface SearchContentProps {
    songs: Song[];
}

const OtherCategories: React.FC<SearchContentProps> = ({
                                                         songs
                                                     }) => {
    const onPlay = useOnPlay(songs);
    const router = useRouter();
    const [value, setValue] = useState<string>('');
    const handleCategoryClick = (category:string)=> {
        const query = {
            category: category,
        };

        const url = qs.stringifyUrl({
            url: '/search',
            query
        });

        router.push(url);
    }


    if (songs.length === 0) {
        return (
            <div
                className="
          flex
          flex-col
          gap-y-2
          w-full
          px-6
          text-neutral-400
        "
            >
                No songs found.
            </div>
        )
    }




    // flex flex-col gap-y-2 w-full px-6
    return (
        <div className=" grid  grid-cols-2  sm:grid-cols-3  md:grid-cols-3  lg:grid-cols-4  xl:grid-cols-5  2xl:grid-cols-8  gap-4  mt-4 p-10">

                <style>
                    {`.searching-image {
                                width: 180px;
                                height: 180px;
                                bottom: 0;
                                right: 0;
                                position: absolute;
                                background: url(Black-Eyed-Peas-kopiya.jpg);
                            }
                            .searching-title {
                                padding: 13px;
                            }
                            `}
                </style>
                <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#FFB800]" onClick={()=>{handleCategoryClick('Поп')}}>

                    <p className="searching-title">
                        Поп
                    </p>
                    <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                         src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group.png"
                        />
                </div>

                <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#00d1ff]" onClick={()=>{handleCategoryClick('Рок')}}>

                    <p className="searching-title">
                        Рок
                    </p>
                    <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                         src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(1).png"
                    />
                </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#f40df9]" onClick={()=>{handleCategoryClick('Хип-хоп')}}>

                <p className="searching-title">
                    Хип-хоп
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(2).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#00ff57]" onClick={()=>{handleCategoryClick('R&B')}}>

                <p className="searching-title">
                    R&B
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(3).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#c800fa]" onClick={()=>{handleCategoryClick('K-Pop')}}>

                <p className="searching-title">
                    K-Pop
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(4).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#ff7a00]" onClick={()=>{handleCategoryClick('Классика')}}>

                <p className="searching-title">
                    Классика
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(5).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#ff2424]" onClick={()=>{handleCategoryClick('Для спорта')}}>

                <p className="searching-title">
                    Для спорта
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(6).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#2461ff]" onClick={()=>{handleCategoryClick('Вечеринка')}}>

                <p className="searching-title">
                    Вечеринка
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(8).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#24ffa3]" onClick={()=>{handleCategoryClick('Сон')}}>

                <p className="searching-title">
                    Сон
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(9).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#ff24a7]" onClick={()=>{handleCategoryClick('Инди')}}>

                <p className="searching-title">
                    Инди
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(10).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#24b0ff]" onClick={()=>{handleCategoryClick('Латино')}}>

                <p className="searching-title">
                    Латино
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(11).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#d19700]" onClick={()=>{handleCategoryClick('В дорогу')}}>

                <p className="searching-title">
                    В дорогу
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(12).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#9d9d9d]" onClick={()=>{handleCategoryClick('Любовь')}}>

                <p className="searching-title">
                    Любовь
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(13).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#d10d00]" onClick={()=>{handleCategoryClick('Джаз')}}>

                <p className="searching-title">
                    Джаз
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(14).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#d19700]" onClick={()=>{handleCategoryClick('Метал')}}>

                <p className="searching-title">
                    Метал
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(15).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#0015d1]" onClick={()=>{handleCategoryClick('Кантри')}}>

                <p className="searching-title">
                    Кантри
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(16).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#50d100]" onClick={()=>{handleCategoryClick('Для геймеров')}}>

                <p className="searching-title">
                    Для геймеров
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(17).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#00d1b8]" onClick={()=>{handleCategoryClick('Панк')}}>

                <p className="searching-title">
                    Панк
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(18).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#d16400]" onClick={()=>{handleCategoryClick('Блюз')}}>

                <p className="searching-title">
                    Блюз
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(19).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#d1c900]" onClick={()=>{handleCategoryClick('Фанк')}}>

                <p className="searching-title">
                    Фанк
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(20).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#d100bc]" onClick={()=>{handleCategoryClick('Афро')}}>

                <p className="searching-title">
                    Афро
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(21).png"
                />
            </div>
        </div>
    );
}

export default OtherCategories;