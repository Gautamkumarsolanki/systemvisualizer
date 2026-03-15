'use client';

import React from "react";
import SystemContext from "./SystemContext";
import { Node, Edge } from '@xyflow/react';
import { CustomNodeType } from "@/components/Nodes/NodeTypes";


export default function SystemContextProvider({ children }: { children: React.ReactNode }) {

    const [nodes, setNodes] = React.useState<CustomNodeType[]>(
        [
            { id: 'client-1', type: "client", position: { x: 0, y: 0 }, data: { label: 'Client' , title: '' , handleMetaData: {"left": "none", "right": "source", "top": "none", "bottom": "none"} } }
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