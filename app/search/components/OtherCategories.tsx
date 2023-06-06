"use client";

import { Song } from "@/types";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";


interface SearchContentProps {
    songs: Song[];
}

const OtherCategories: React.FC<SearchContentProps> = ({
                                                         songs
                                                     }) => {
    const onPlay = useOnPlay(songs);

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

                <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#FFB800]">

                    <p className="searching-title">
                        Поп
                    </p>
                    <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                         src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group.png"
                        />
                </div>

                <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#00d1ff]">

                    <p className="searching-title">
                        Рок
                    </p>
                    <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                         src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(1).png"
                    />
                </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#f40df9]">

                <p className="searching-title">
                    Хип-хоп
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(2).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#00ff57]">

                <p className="searching-title">
                    R&B
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(3).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#c800fa]">

                <p className="searching-title">
                    K-Pop
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(4).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#ff7a00]">

                <p className="searching-title">
                    Классика
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(5).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#ff2424]">

                <p className="searching-title">
                    Для спорта
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(6).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#2461ff]">

                <p className="searching-title">
                    Набирает популярность
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(7).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#2461ff]">

                <p className="searching-title">
                    Вечеринка
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(8).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#24ffa3]">

                <p className="searching-title">
                    Сон
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(9).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#ff24a7]">

                <p className="searching-title">
                    Инди
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(10).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#24b0ff]">

                <p className="searching-title">
                    Латино
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(11).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#d19700]">

                <p className="searching-title">
                    В дорогу
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(12).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#9d9d9d]">

                <p className="searching-title">
                    Любовь
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(13).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#d10d00]">

                <p className="searching-title">
                    Джаз
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(14).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#d19700]">

                <p className="searching-title">
                    Метал
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(15).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#0015d1]">

                <p className="searching-title">
                    Кантри
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(16).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#50d100]">

                <p className="searching-title">
                    Для геймеров
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(17).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#00d1b8]">

                <p className="searching-title">
                    Панк
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(18).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#d16400]">

                <p className="searching-title">
                    Блюз
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(19).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#d1c900]">

                <p className="searching-title">
                    Фанк
                </p>
                <img alt="Image" loading="lazy" decoding="async" data-nimg="fill" className="object-cover searching-image"
                     src="https://uaenfmjmypunityiredl.supabase.co/storage/v1/object/public/site-images/Mask%20group%20(20).png"
                />
            </div>

            <div className="relative  aspect-square  w-full h-full  rounded-md  overflow-hidden bg-[#d100bc]">

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