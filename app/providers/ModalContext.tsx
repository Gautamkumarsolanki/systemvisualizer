'use client'

import React from "react";

interface ModalContext {
    isOpen: boolean;
    onClose: () => void;
    open: () => void
}


const ModalContext = React.createContext<ModalContext | undefined>(undefined);

const ModalContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const onClose = () => setIsOpen(false);
    const open = () => setIsOpen(true);


    return (
        <ModalContext.Provider value={{ isOpen, onClose, open }}>
            {children}
        </ModalContext.Provider>
    );
}

const useModalContext = () => {
    const context = React.useContext(ModalContext);
    if (!context) {
        throw new Error("useModalContext must be used within a ModalProvider");
    }
    return context;
};

export { ModalContext, ModalContextProvider, useModalContext };