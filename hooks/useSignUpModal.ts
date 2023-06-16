import { create } from 'zustand';

interface SignUPModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}


const useSignUPModal = create<SignUPModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useSignUPModal;
