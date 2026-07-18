// const BASE_URL = "https://saavn.sumit.co/api";

// /**
//  * Normalizes song/album objects so they always work with your SongCard.
//  */
// const formatSong = (song) => {
//     if (!song) return null;
//     return {
//         id: song.id,
//         title: (song.name || song.title || "Unknown Track")
//             .replace(/&quot;/g, '"')
//             .replace(/&amp;/g, '&'),
//         artist: (song.artists?.primary?.[0]?.name || song.primaryArtists || song.subtitle || "Various Artists")
//             .replace(/&quot;/g, '"')
//             .replace(/&amp;/g, '&'),
//         cover: song.image?.[song.image.length - 1]?.url || song.image?.[0]?.url || "",
//         url: song.downloadUrl?.[song.downloadUrl.length - 1]?.url || song.downloadUrl?.[0]?.url || "",
//         duration: song.duration || 0
//     };
// };

// export const searchGlobalSongs = async (query, limit = 40) => {
//     if (!query || query.length < 2) return [];
//     try {
//         const response = await fetch(`/api/search/songs?query=${encodeURIComponent(query)}&limit=${limit}`);
//         const result = await response.json();
//         return result.success ? result.data.results.map(formatSong).filter(Boolean) : [];
//     } catch (error) {
//         console.error("Search API Error:", error);
//         return [];
//     }
// };

// export const getHomePageData = async () => {
//     try {
//         const response = await fetch(`/api/modules?language=hindi,english`);
//         const result = await response.json();
//         if (result.success && result.data) {
//             return {
//                 trending: (result.data.trending?.songs || []).map(formatSong).filter(Boolean),
//                 albums: (result.data.albums || []).map(formatSong).filter(Boolean),
//                 charts: (result.data.charts || []).map(item => ({
//                     id: item.id,
//                     title: item.name || item.title,
//                     artist: "Playlist",
//                     cover: item.image?.[item.image.length - 1]?.url || "",
//                 }))
//             };
//         }
//         return { trending: [], charts: [], albums: [] };
//     } catch (error) {
//         console.error("Home Data API Error:", error);
//         return { trending: [], charts: [], albums: [] };
//     }
// };












const BASE_URL = "https://saavn.sumit.co/api";

/**
 * Normalizes song/album objects so they always work with your SongCard.
 */
const formatSong = (song) => {
    if (!song) return null;

    return {
        id: song.id,

        title: (song.name || song.title || "Unknown Track")
            .replace(/&quot;/g, '"')
            .replace(/&amp;/g, '&'),

        artist: (
            song.artists?.primary?.[0]?.name ||
            song.primaryArtists ||
            song.subtitle ||
            "Various Artists"
        )
            .replace(/&quot;/g, '"')
            .replace(/&amp;/g, '&'),

        cover:
            song.image?.[song.image.length - 1]?.url ||
            song.image?.[0]?.url ||
            "",

        url:
            song.downloadUrl?.[song.downloadUrl.length - 1]?.url ||
            song.downloadUrl?.[0]?.url ||
            "",

        duration: song.duration || 0
    };
};



export const searchGlobalSongs = async (query, limit = 40) => {

    if (!query || query.length < 2)
        return [];


    try {

        const response = await fetch(
            `${BASE_URL}/search/songs?query=${encodeURIComponent(query)}&limit=${limit}`
        );


        const result = await response.json();


        return result.success
            ? result.data.results.map(formatSong).filter(Boolean)
            : [];


    } catch (error) {

        console.error(
            "Search API Error:",
            error
        );

        return [];

    }

};




export const getHomePageData = async () => {

    try {

        const response = await fetch(
            `${BASE_URL}/modules?language=hindi,english`
        );


        const result = await response.json();


        if (
            result.success &&
            result.data
        ) {

            return {

                trending:
                    (result.data.trending?.songs || [])
                        .map(formatSong)
                        .filter(Boolean),


                albums:
                    (result.data.albums || [])
                        .map(formatSong)
                        .filter(Boolean),


                charts:
                    (result.data.charts || [])
                        .map(item => ({
                            id: item.id,
                            title: item.name || item.title,
                            artist: "Playlist",
                            cover:
                                item.image?.[
                                    item.image.length - 1
                                ]?.url || ""
                        }))

            };

        }


        return {
            trending: [],
            charts: [],
            albums: []
        };


    } catch (error) {

        console.error(
            "Home Data API Error:",
            error
        );


        return {
            trending: [],
            charts: [],
            albums: []
        };

    }

};