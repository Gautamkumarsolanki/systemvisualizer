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
import { ConnectorType } from "@/components/Nodes/ReverseProxy";

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

        const newNode: Node<{ label: string, title: string , handleMetaData: Record<string, ConnectorType> }, string> = {
          id: `${nodeType}-${Math.random().toString(36).slice(2, 9)}`,
          type: nodeType,
          position: params.position,
          data: { label, title: "", handleMetaData: {"left": "source", "right": "target", "top": "none", "bottom": "none"} },
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
        fixed top-16 left-5
        w-60 max-h-[70vh]
        rounded-2xl
        shadow-xl
        flex flex-col
        z-50
        transition-all duration-150

        bg-white/80 dark:bg-zinc-900/80
        backdrop-blur-lg

        border border-gray-200 dark:border-zinc-700
        "
      >

        {/* Header */}
        <div
          className="
          sticky top-0
          px-4 py-3
          text-sm font-semibold

          border-b border-gray-200 dark:border-zinc-700

          bg-white/70 dark:bg-zinc-900/70
          backdrop-blur

          text-gray-700 dark:text-gray-200
          "
        >
          Components
        </div>


        {/* Grid */}
        <div
          className="
          grid grid-cols-2 gap-3
          p-3 overflow-y-auto

          bg-white dark:bg-zinc-900
          border-r border-gray-200 dark:border-zinc-800
          "
        >

          {SIDEBAR_NODES.map((node) => (

            <button
              key={node.type}
              title={node.label}
              onPointerDown={(e) => {
                setType(node.type);
                onDragStart(e, addNewNode(node.type, node.label));
              }}
              className="
              flex flex-col items-center justify-center gap-2
              p-4 rounded-xl

              text-xs font-medium

              transition-all duration-150

              cursor-grab active:cursor-grabbing

              bg-white dark:bg-zinc-800
              border border-gray-200 dark:border-zinc-700

              text-gray-700 dark:text-gray-200

              shadow-sm
              hover:shadow-md

              hover:border-sky-300 dark:hover:border-sky-500
              hover:bg-sky-50 dark:hover:bg-zinc-700

              active:scale-95
              hover:-translate-y-0.5
              "
            >

              <div className="text-sky-600 dark:text-sky-400">
                {node.icon}
              </div>

              {node.label}

            </button>

          ))}

        </div>

      </aside>
    </>
  );
}