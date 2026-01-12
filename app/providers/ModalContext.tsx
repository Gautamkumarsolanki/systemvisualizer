import React, { Dispatch } from "react";



interface ModalContextType {
    isOpen: boolean;
    setIsOpen: Dispatch<React.SetStateAction<boolean>>;
    onClose: () => void;
    modal: React.ReactNode | null;
    setModal: Dispatch<React.SetStateAction<React.ReactNode | null >>;
}

const ModalContext = React.createContext<ModalContextType | null>(null);


const useModal=() => {
    const context = React.useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};
export { ModalContext, useModal };