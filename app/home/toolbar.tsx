"use client";

import { Node, useReactFlow } from "@xyflow/react";
import { DropAction, useDnd } from "../providers/DnDContext";
import React, { useCallback } from "react";
import DragGhost from "./DragGhost";

import {
  Database,
  HardDrive,
  MessageSquare,
  Shuffle,
  Globe,
  Server,
  ArrowRightLeft,
  Shield,
  Repeat,
  Waypoints,
} from "lucide-react";

type NodeType = {
  type: string;
  label: string;
  icon: React.ReactNode;
};

const SIDEBAR_NODES: NodeType[] = [
  { type: "apigateway", label: "API Gateway", icon: <Waypoints size={18} /> },
  { type: "database", label: "Database", icon: <Database size={18} /> },
  { type: "cache", label: "Cache", icon: <HardDrive size={18} /> },
  { type: "messagequeue", label: "Queue", icon: <MessageSquare size={18} /> },
  { type: "loadbalancer", label: "Load Balancer", icon: <Shuffle size={18} /> },
  { type: "cdn", label: "CDN", icon: <Globe size={18} /> },
  { type: "backendservice", label: "Backend Service", icon: <Server size={18} /> },
  { type: "proxy", label: "Proxy", icon: <ArrowRightLeft size={18} /> },
  { type: "ratelim", label: "Rate Limiter", icon: <Shield size={18} /> },
  { type: "reverseProxy", label: "Reverse Proxy", icon: <Repeat size={18} /> },
];

export default function NodeSidebar() {
  const { isDragging, onDragStart } = useDnd();
  const { setNodes } = useReactFlow();
  const [type, setType] = React.useState<string | null>(null);

  const addNewNode = useCallback(
    (nodeType: string, label: string): DropAction => {
      return (params) => {
        if (!params?.position) return;

        const newNode: Node<{ label: string }, string> = {
          id: `${nodeType}-${Math.random().toString(36).slice(2, 9)}`,
          type: nodeType,
          position: params.position,
          data: { label },
        };

        setNodes((nds) => nds.concat(newNode));
        setType(null);
      };
    },
    [setNodes]
  );

  return (
    <>
      {isDragging && <DragGhost type={type} />}

      <aside
        className="
          
          transition-all duration-150
          fixed top-16 left-5
          w-60 max-h-[70vh]
          bg-white/80 backdrop-blur-lg
          border border-gray-200
          rounded-2xl shadow-xl
          flex flex-col
          z-50

        "
      >
        {/* Header */}
        <div className="sticky top-0 px-4 py-3 border-b bg-white/70 backdrop-blur text-sm font-semibold text-gray-700">
          Components
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 p-3 overflow-y-auto bg-white border-r shadow-xl ">
          {SIDEBAR_NODES.map((node) => (
            <button
              key={node.type}
              title={node.label}
              onPointerDown={(e) => {
                setType(node.type);
                onDragStart(e, addNewNode(node.type, node.label));
              }}
              className="
                hover:-translate-y-0.5
                hover:shadow-md
                active:scale-95
                transition-all duration-150
                flex flex-col items-center justify-center gap-2
                p-4
                rounded-xl
                bg-white
                border
                shadow-sm
                hover:shadow-md
                hover:border-sky-300
                hover:bg-sky-50
                active:scale-95
                cursor-grab active:cursor-grabbing
                transition-all
                text-xs font-medium text-gray-700
              "
            >
              <div className="text-sky-600 ">{node.icon}</div>
              {node.label}
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}
