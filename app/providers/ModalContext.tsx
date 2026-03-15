'use client'

import { CustomNodeType } from "@/components/Nodes/NodeTypes";
import React, { useEffect, useState } from "react";

interface ModalContext {
    isOpen: boolean;
    onClose: () => void;
    selectedNode: CustomNodeType | null;
    setSelectedNode: React.Dispatch<React.SetStateAction<CustomNodeType | null>>;
    open: () => void;
}


const ModalContext = React.createContext<ModalContext | undefined>(undefined);

const ModalContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const onClose = () => setIsOpen(false);
    const [selectedNode, setSelectedNode] = React.useState<CustomNodeType | null>(null);
    const open = () => {
        setIsOpen(true);
    }


    return (
        <ModalContext.Provider value={{ isOpen, onClose, selectedNode, setSelectedNode, open }}>
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