import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Howl } from 'howler';

export const usePlayerStore = create(
    persist(
        (set, get) => ({
            likedSongs: [],
            volume: 0.7,
            currentTrack: null,
            queue: [],
            isPlaying: false,
            howl: null,
            repeatMode: 0,
            isShuffled: false,

            // ✅ LIKED LOGIC
            toggleLike: (track) => set((state) => {
                const isLiked = state.likedSongs.some(s => s.id === track.id);
                const updatedLiked = isLiked
                    ? state.likedSongs.filter(s => s.id !== track.id)
                    : [track, ...state.likedSongs];
                return { likedSongs: updatedLiked };
            }),

            setQueue: (list) => set({ queue: list }),

            // ✅ PROGRESS BAR SEEK LOGIC
            seek: (val) => {
                const { howl } = get();
                if (howl) howl.seek(val);
            },

            setTrack: (track) => {
                const { howl, volume, repeatMode } = get();
                if (howl) {
                    howl.stop();
                    howl.unload();
                }

                const newHowl = new Howl({
                    src: [track.url],
                    html5: true,
                    volume: volume,
                    loop: repeatMode === 2,
                    onplay: () => set({ isPlaying: true }),
                    onpause: () => set({ isPlaying: false }),
                    onend: () => {
                        const currentMode = get().repeatMode;
                        if (currentMode === 2) return;
                        get().playNext();
                    },
                });

                newHowl.play();
                set({ currentTrack: track, howl: newHowl, isPlaying: true });
            },

            togglePlay: () => {
                const { howl, isPlaying } = get();
                if (!howl) return;
                isPlaying ? howl.pause() : howl.play();
            },

            playNext: () => {
                const { queue, currentTrack, setTrack, isShuffled } = get();
                if (queue.length === 0) return;
                const currentIndex = queue.findIndex(t => t.id === currentTrack?.id);
                let nextIndex = isShuffled ? Math.floor(Math.random() * queue.length) : currentIndex + 1;
                if (nextIndex < queue.length) setTrack(queue[nextIndex]);
            },

            playPrevious: () => {
                const { queue, currentTrack, setTrack, howl } = get();
                if (howl && howl.seek() > 3) return howl.seek(0);
                const currentIndex = queue.findIndex(t => t.id === currentTrack?.id);
                if (currentIndex > 0) setTrack(queue[currentIndex - 1]);
            },

            setVolume: (val) => {
                const { howl } = get();
                if (howl) howl.volume(val);
                set({ volume: val });
            }
        }),
        {
            name: 'levels-state',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ likedSongs: state.likedSongs, volume: state.volume })
        }
    )
);