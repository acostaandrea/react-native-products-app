import { create } from "zustand";

interface TemporaCameraStoreState{
    selectedImages: string[];
    addSelectedImage: (image: string) => void;
    clearImages: () => void;
}

export const useCameraStore = create<TemporaCameraStoreState>() ((set) =>({
    selectedImages: [],
    addSelectedImage: (image: string) =>{
        set((state) => ({
            selectedImages: [...state.selectedImages, image],
        }));
    },
    clearImages: () => set({ selectedImages: [] }),
}))