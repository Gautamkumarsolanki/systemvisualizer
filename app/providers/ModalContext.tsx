'use client'

import { NodeMetaDataType } from "@/components/Nodes/BackendService";
import React from "react";

interface ModalContext {
    isOpen: boolean;
    onClose: () => void;
    open: (metadata: NodeMetaDataType, updateFn: ((metadata: NodeMetaDataType) => void)) => void;
    nodeMetaData: NodeMetaDataType | null;
    setNodeMetaData: React.Dispatch<React.SetStateAction<NodeMetaDataType | null>>;
}


const ModalContext = React.createContext<ModalContext | undefined>(undefined);

const ModalContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const onClose = () => setIsOpen(false);
    const [nodeMetaData, setNodeMetaData] = React.useState<NodeMetaDataType | null>(null);
    let updateMetaDataFn: ((metadata: NodeMetaDataType) => void) | null = null;

    const open = (metadata: NodeMetaDataType, updateFn: ((metadata: NodeMetaDataType) => void)) => {
        setNodeMetaData(metadata);
        setIsOpen(true);
        updateMetaDataFn = updateFn;
    };


    return (
        <ModalContext.Provider value={{ isOpen, onClose, open, nodeMetaData, setNodeMetaData }}>
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