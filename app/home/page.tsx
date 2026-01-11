'use client';
import { useCallback } from 'react';
import '@xyflow/react/dist/style.css';

import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, ReactFlowProvider } from '@xyflow/react';
import { useSystemContext } from '../providers/SystemContext';
import nodeTypes from '@/components/Nodes/NodeTypes';
import NodeSidebar from './toolbar';
import DnDProvider from '../providers/DnDProvider';

export default function Home() {

    const { edges, nodes, setEdges, setNodes } = useSystemContext();

    const onNodesChange = useCallback(
        (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect = useCallback(
        (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );
    console.log("Nodes in Home:", nodes);
    console.log("Edges in Home:", edges);
    return (
        <ReactFlowProvider>
            <DnDProvider>
                <div className='react-flow-wrapper' style={{ width: '100vw', height: '100vh' }}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        fitView
                    >
                        <Background color='oklch(62.3% 0.214 259.815)' />
                    </ReactFlow>
                </div>
                <NodeSidebar />
            </DnDProvider>
        </ReactFlowProvider>
    );
}