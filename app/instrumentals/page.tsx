import Header from "@/components/Header";
import getAccessToken from "@/app/instrumentals/components/getAccessToken";
import getTopInstrumentalBeats from "@/app/instrumentals/components/top-instrumentals";
import {Song} from "@/types";
import TopPageContent from "@/app/instrumentals/components/topInsrumentalsComponent";
import getInstrumentalBeatsRecommendation from "@/app/instrumentals/components/instrumentals-recommendation";

const Instrumentals = async () => {
    const token = await  getAccessToken();
    const instrumentalBeats = await getTopInstrumentalBeats(token);

    const songs: Song[] = instrumentalBeats.map((item) => ({
        id: item.id,
        user_id: '', // Replace with the actual user ID
        author: item.album.artists[0].name,
        title: item.album.name,
        song_path: item.album.external_urls.spotify,
        image_path: item.album.images[0].url,
        price: ""
    }));

    const instrumentalRecommendations = await getInstrumentalBeatsRecommendation(songs);
    const recommendations: Song[] = instrumentalRecommendations.map((item) => ({
        id: item.id,
        user_id: '', // Replace with the actual user ID
        author: item.album.artists[0].name,
        title: item.album.name,
        song_path: item.album.external_urls.spotify,
        image_path: item.album.images[0].url,
        price:""
    }));


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
                        Top Instrumental Beats
                    </h1>
                </div>
                <TopPageContent songs={songs} />

                <br/>
                <br/>
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className="text-white text-3xl font-semibold">
                        Recommendations Only for You
                    </h1>
                </div>
                <TopPageContent songs={recommendations} />
            </Header>

        </div>
    );
}

export default Instrumentals;