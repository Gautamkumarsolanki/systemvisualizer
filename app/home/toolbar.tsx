"use client";

import { Node, useReactFlow, XYPosition } from "@xyflow/react";
import { DropAction, useDnd } from "../providers/DnDContext";
import React, { useCallback } from "react";
import DragGhost from "./DragGhost";
import nodeTypes from "@/components/Nodes/NodeTypes";


type NodeType = {
  type: string;
  label: string;
};

const SIDEBAR_NODES: NodeType[] = [
  { type: "client", label: "Client Layer" },
  { type: "client", label: "API Layer" },
  { type: "client", label: "Database" },
  { type: "client", label: "Cache" },
  { type: "client", label: "Messaging Layer" },
  { type: "client", label: "Load Balancer Layer" },
  { type: "client", label: "Security Layer" },
  // { type: "edgelayer", label: "Edge Layer" },
];

export default function NodeSidebar() {

  const { isDragging, onDragStart } = useDnd();
  const { setNodes } = useReactFlow();
  const [type, setType] = React.useState<string | null>(null);

  const addNewNode = useCallback((nodeType: string): DropAction => {
    console.log("Creating drop action for node type:", nodeType);
    return (params) => {
      if (!params || !params.position) return;
      const newNode: Node<{ label: string }, string> = {
        id: `${nodeType}-${Math.random().toString(36).substring(2, 9)}`,
        type: nodeType,
        position: params.position,
        data: { label: `${nodeType} Node` },
      };
      setNodes((nds) => nds.concat(newNode));
      setType(null);
    }
  }, [setType, setNodes]);

  return (
    <>
      {isDragging && <DragGhost type={type} />}
      <aside className="fixed top-16 left-5 h-[60vh] w-24 flex flex-col gap-3 bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-lg border border-gray-200 z-50 overflow-y-auto">
        <h3 className="text-xs font-semibold text-gray-700 mb-2 text-center">Nodes</h3>

        {SIDEBAR_NODES.map((node) => (
          <div
            key={node.type + node.label}
            className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-sky-50 cursor-grab touch-none active:cursor-grabbing select-none"
            title={node.label}
            onPointerDown={(e) => {
              setType(node.type);
              onDragStart(e, addNewNode(node.type))
            }
            }
          >
            <span className="text-[10px] text-gray-900 text-center">{node.label}</span>
          </div>
        ))}
      </aside>
    </>
  );
}

