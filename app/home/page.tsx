'use client';
import React, { useState, useEffect, useCallback } from 'react';
import '@xyflow/react/dist/style.css';

import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, ReactFlowProvider, useReactFlow, NodeMouseHandler } from '@xyflow/react';
import { useSystemContext } from '../providers/SystemContext';
import nodeTypes, { CustomNodeType } from '@/components/Nodes/NodeTypes';
import NodeSidebar from './toolbar';
import DnDProvider from '../providers/DnDProvider';
import { useModalContext } from '../providers/ModalContext';
import NodeConfigModal from '@/components/Modal/NodeConfigModal';
import AgentChat from '@/components/ui/Chat';

export default function Home() {

    const { isOpen, onClose, setSelectedNode, selectedNode } = useModalContext();

    const { edges, nodes, setEdges, setNodes } = useSystemContext();

    // const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

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

    // const onSave = useCallback(() => {
    //     if (!reactFlowInstance) return;
    //     const flow = reactFlowInstance.toObject();
    //     localStorage.setItem("system-design-flow", JSON.stringify(flow));
    //     alert("Diagram Saved!");
    // }, [reactFlowInstance]);

    // useEffect(() => {
    //     const savedFlow = localStorage.getItem("system-design-flow");
    //     if (savedFlow) {
    //         const parsedFlow = JSON.parse(savedFlow);
    //         setNodes(parsedFlow.nodes || []);
    //         setEdges(parsedFlow.edges || []);

    //         if (parsedFlow.viewport && reactFlowInstance) {
    //             reactFlowInstance.setViewport(parsedFlow.viewport);
    //         }
    //     }
    // }, []);


    const onNodeClickHandler: NodeMouseHandler<CustomNodeType> = (event, node: CustomNodeType) => {
        setSelectedNode(node);
    }


    return (
        <ReactFlowProvider>
            <DnDProvider>
                <div className='react-flow-wrapper relative' style={{ width: '100vw', height: '100vh' }}>

                    <div className="absolute top-4 right-4 z-50 flex gap-2">
                        <button
                            // onClick={onSave}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                        >
                            Save
                        </button>

                        <button
                            onClick={() => {
                                setNodes([]);
                                setEdges([]);
                                localStorage.removeItem("system-design-flow");
                            }}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg"
                        >
                            Clear
                        </button>
                    </div>

                    {isOpen && <NodeConfigModal
                        isOpen={isOpen}
                        onClose={onClose}
                        setSelectedNode={setSelectedNode}
                        selectedNode={selectedNode}
                    />}


                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        // onInit={setReactFlowInstance}
                        onNodeClick={onNodeClickHandler}
                        fitView
                    >
                        <Background color='oklch(62.3% 0.214 259.815)' />
                    </ReactFlow>

                </div>
                <NodeSidebar />
                <AgentChat setNode={setNodes} setEdges={setEdges} />
            </DnDProvider>
        </ReactFlowProvider>
    );
}