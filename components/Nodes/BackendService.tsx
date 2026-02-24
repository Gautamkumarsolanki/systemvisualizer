import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import React, { useState, useCallback } from "react";
import { useModalContext } from "@/app/providers/ModalContext";

export type BackendServiceNodeData = Node<{ label: string }, "backendservice">;

export type ConnectorType = "source" | "target" | "none";

export type NodeMetaDataType = {
  name: string;
  title: string;
  left: ConnectorType;
  right: ConnectorType;
  top: ConnectorType;
  bottom: ConnectorType;
};

const handlePositions = [
  { key: "left", position: Position.Left },
  { key: "right", position: Position.Right },
  { key: "top", position: Position.Top },
  { key: "bottom", position: Position.Bottom },
] as const;

function BackendServiceNode({ data, selected }: NodeProps<BackendServiceNodeData>) {
  const { open } = useModalContext();

  const [metaData, setMetaData] = useState<NodeMetaDataType>({
    name: "",
    title: "Backend Service",
    left: "source",
    right: "target",
    top: "none",
    bottom: "none",
  });

  const openConfig = useCallback(() => {
    open(metaData, setMetaData);
  }, [open, metaData]);

  return (
    <div
      className={`
        group relative min-w-[50px]
        rounded-xl border bg-white px-2 py-2
        shadow-sm transition-all duration-200
        ${selected
          ? "border-sky-500 ring-2 ring-sky-200 shadow-md"
          : "border-gray-200 hover:border-sky-300"}
      `}
    >
      {/* Config Icon */}
      <button
        onClick={openConfig}
        className={`
          absolute right-1 top-1
          flex h-2 w-2 items-center justify-center
          rounded-md text-gray-400
          transition-all
        `}
      >
        ⚙
      </button>

      {/* Content */}
      <div className="flex flex-col items-center">
        <img
          src="/assets/backendservice.png"
          alt={data.label}
          className="h-5 w-5 object-contain"
        />

        <div className="flex flex-col">
          <span className="text-[6px] font-semibold text-gray-800">
            {metaData.title}
          </span>
        </div>
      </div>

      {/* Handles */}
      {handlePositions.map(({ key, position }) =>
        metaData[key] !== "none" ? (
          <Handle
            key={key}
            type={metaData[key]}
            position={position}
            className="
              !h-3 !w-3
              !border-2 !border-white
              !bg-sky-500
              hover:!scale-110 transition-transform
            "
          />
        ) : null
      )}
    </div>
  );
}

export default BackendServiceNode;