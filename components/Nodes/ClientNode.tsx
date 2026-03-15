import { useModalContext } from "@/app/providers/ModalContext";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { useCallback, useState } from "react";

export type ClientNodeData = Node<{ label: string, title: string, handleMetaData: Record<string, ConnectorType> }, "client">;

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

function ClientNode({ data, selected }: NodeProps<ClientNodeData>) {
  const { open } = useModalContext();
  console.log("Rendering ClientNode with data:", data);

  const [metaData, setMetaData] = useState<NodeMetaDataType>({
    name: "",
    title: "Client",
    left: "none",
    right: "source",
    top: "none",
    bottom: "none",
  });

  const openConfig = useCallback(() => {
    open();
  }, [open, metaData]);

  return (
    <div
      className={`
        relative min-w-[40px]
        rounded-md p-2
        shadow-md transition-all

        bg-white dark:bg-zinc-900

        border
        ${
          selected
            ? "border-sky-500 ring-2 ring-sky-200 dark:ring-sky-800 dark:border-sky-500"
            : "border-sky-200 dark:border-zinc-700"
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
          src="/assets/customer.png"
          alt={data.label}
          className="h-5 w-5 object-contain"
        />

        <span className="text-[6px] font-semibold text-gray-800 dark:text-gray-200">
          {data.title}
        </span>
      </div>

      {/* Handles */}
      {
        data.handleMetaData && handlePositions.map(({ key, position }) => {
          const handleType = data.handleMetaData[key];
          if (handleType === "none") return null;

          return (
            <Handle
              key={key}
              type={handleType}
              position={position}
              id={`${key}-handle`}
              style={{ background: "#555" }}
            />
          );
        })
      }
    </div>
  );
}

export default ClientNode;