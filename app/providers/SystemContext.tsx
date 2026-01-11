'use client';
import React, { createContext, useContext } from 'react';
import { Node, Edge } from '@xyflow/react';

export interface SystemContextProps {
    nodes: Node[];
    edges: Edge[];
    setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
    setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

const SystemContext = createContext<SystemContextProps | null>(null);

export const useSystemContext = () => {
    const context = useContext(SystemContext);
    if (!context) {
        throw new Error('useSystemContext must be used within a SystemProvider');
    }
    return context;
}

export default SystemContext;