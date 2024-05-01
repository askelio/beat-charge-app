import getSongsByTitle from "@/actions/getSongsByTitle";
import SearchInput from "@/components/SearchInput";
import Header from "@/components/Header";

import SearchContent from "./components/SearchContent";
import OtherCategories from "@/app/search/components/OtherCategories";
import getSongsByCategory from "@/actions/getSongsByCategory";

export const revalidate = 0;

interface SearchProps {
  searchParams: { title: string , category?:string}
};

const Search = async ({ searchParams }: SearchProps) => {

  let songs = await getSongsByTitle(searchParams.title);

  if (searchParams.category) {
    songs = await getSongsByCategory(searchParams.category);
  }

  return (
    <div 
      className="
        bg-neutral-900 
        rounded-lg 
        h-full 
        w-full 
        overflow-hidden 
        overflow-y-auto
      "
    >
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">
            Поиск
          </h1>
          <SearchInput />
          <h1 className="text-white font-semibold">
            История
          </h1>
        </div>
      </Header>
      <SearchContent songs={songs} />
      <OtherCategories songs={songs} />
    </div>
  );
}

export default Search;
