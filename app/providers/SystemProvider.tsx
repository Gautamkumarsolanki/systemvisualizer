'use client';

import React from "react";
import SystemContext from "./SystemContext";
import { Node, Edge } from '@xyflow/react';


export default function SystemContextProvider({ children }: { children: React.ReactNode }) {

    const [nodes, setNodes] = React.useState<Node[]>(
        [
            { id: 'n1', type: "client", position: { x: 0, y: 0 }, data: { label: 'Client' } }
        ]
    );

    const [edges, setEdges] = React.useState<Edge[]>(
        []
    );

    return (
        <SystemContext.Provider value={{ nodes, edges, setNodes, setEdges }}>
            {children}
        </SystemContext.Provider>
    );
}