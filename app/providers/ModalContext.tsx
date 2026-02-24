'use client'

import { NodeMetaDataType } from "@/components/Nodes/BackendService";
import React, { useEffect, useState } from "react";

interface ModalContext {
    isOpen: boolean;
    onClose: () => void;
    open: (metadata: NodeMetaDataType, updateFn: ((metadata: NodeMetaDataType) => void)) => void;
    updateNodeMetaData: () => void;
    nodeMetaData: NodeMetaDataType | null;
    setNodeMetaData: React.Dispatch<React.SetStateAction<NodeMetaDataType | null>>;
}


const ModalContext = React.createContext<ModalContext | undefined>(undefined);

const ModalContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const onClose = () => setIsOpen(false);
    const [nodeMetaData, setNodeMetaData] = React.useState<NodeMetaDataType | null>(null);
    const [updateMetaDataFn,setUpdateMetaDataFn]=useState<((metadata: NodeMetaDataType) => void) | null>(null);

    const updateNodeMetaData = () => {
        if (updateMetaDataFn && nodeMetaData) {
            updateMetaDataFn(nodeMetaData);
        }
        onClose();
    };

    useEffect(() => {
        if(!isOpen){
            setNodeMetaData(null);
            setUpdateMetaDataFn(null);
        }
    },[isOpen]);

    const open = (metadata: NodeMetaDataType, updateFn: ((metadata: NodeMetaDataType) => void)) => {
        setNodeMetaData(metadata);
        setIsOpen(true);
        setUpdateMetaDataFn(() => updateFn);
    };


    return (
        <ModalContext.Provider value={{ isOpen, onClose, open, nodeMetaData, setNodeMetaData,updateNodeMetaData }}>
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