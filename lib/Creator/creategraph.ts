import { Dispatch, SetStateAction } from "react";
import { AIEdge, AINode } from "../types";
import { CustomNodeType } from "@/components/Nodes/NodeTypes";
import { Edge, ReactFlowInstance } from "@xyflow/react";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

function getDynamicZoom() {
  const w = window.innerWidth;

  if (w < 600) return 0.7;
  if (w < 900) return 0.85;
  if (w < 1400) return 1;
  return 1.1;
}

export async function CreateGraph(
  node: AINode[],
  edge: AIEdge[],
  setNode: Dispatch<SetStateAction<CustomNodeType[]>>,
  setEdges: Dispatch<SetStateAction<Edge[]>>,
  reactFlow?: ReactFlowInstance
) {
  // clear
  setNode([]);
  setEdges([]);

  await delay(400);

  const zoom = getDynamicZoom();

  // ✅ build nodes slowly
  for (let i = 0; i < node.length; i++) {
    const n = node[i];

    const newNode: CustomNodeType = {
      id: n.id,
      type: n.type,
      position: n.position,
      data: {
        label: n.data.label,
        title: n.data.title,
        handleMetaData: n.data.handles,
      },
    };

    setNode((prev) => [...prev, newNode]);

    // smooth camera move
    if (reactFlow) {
      reactFlow.setCenter(
        n.position.x,
        n.position.y,
        {
          zoom,
          duration: 800, // slower camera
        }
      );
    }

    await delay(700); // slower node drop
  }

  await delay(500);

  // ✅ build edges slowly
  for (let i = 0; i < edge.length; i++) {
    const e = edge[i];

    const newEdge: Edge = {
      id: e.id,
      source: e.source,
      target: e.target,
      animated: true,
      type: "smoothstep",
      style: {
        strokeWidth: 2,
        strokeDasharray: "8 8",
        animation: "dash 1.5s linear infinite",
      },
    };

    setEdges((prev) => [...prev, newEdge]);

    if (reactFlow) {
      const src = node.find((n) => n.id === e.source);

      if (src) {
        reactFlow.setCenter(
          src.position.x,
          src.position.y,
          {
            zoom,
            duration: 1000,
          }
        );
      }
    }

    await delay(600); 
  }

  await delay(600);

  if (reactFlow) {
    reactFlow.fitView({
      duration: 1200,
      padding: window.innerWidth < 700 ? 0.4 : 0.2,
    });
  }
}