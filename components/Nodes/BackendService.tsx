import { Handle, Node, NodeProps, Position, useNodeConnections } from "@xyflow/react";
import React, { useState, useCallback, use } from "react";
import { useModalContext } from "@/app/providers/ModalContext";

export type BackendServiceNodeData = Node<{ label: string, title: string, handleMetaData: Record<string, ConnectorType> }, "backendservice">;

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
    open();
  }, [open, metaData]);

  return (
    <div
      className={`
        group relative min-w-[50px]
        rounded-xl px-2 py-2
        transition-all duration-200
        shadow-sm

        bg-white dark:bg-zinc-900

        border
        ${
          selected
            ? "border-sky-500 ring-2 ring-sky-200 dark:ring-sky-800 dark:border-sky-500 shadow-md"
            : "border-gray-200 dark:border-zinc-700 hover:border-sky-300 dark:hover:border-sky-500"
        }
      `}
    >
      {/* Config Icon */}
      <button
        onClick={openConfig}
        className="
          absolute right-1 top-1
          flex h-3 w-3 items-center justify-center
          rounded-md
          text-gray-400 dark:text-gray-500
          hover:text-black dark:hover:text-white
          transition-all
        "
      >
        ⚙
      </button>

      {/* Content */}
      <div className="flex flex-col items-center gap-1">
        <img
          src="/assets/backendservice.png"
          alt={data.label}
          className="h-5 w-5 object-contain"
        />

        <span className="text-[6px] font-semibold text-gray-800 dark:text-gray-200">
          {metaData.title}
        </span>
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
              !bg-sky-500 dark:!bg-sky-400
              !border-2
              !border-white dark:!border-zinc-900
              hover:!scale-110
              transition-transform
            "
          />
        ) : null
      )}
    </div>
  );
}

export default BackendServiceNode;