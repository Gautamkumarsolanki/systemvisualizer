import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import React, { useCallback, useState } from "react";
import { useModalContext } from "@/app/providers/ModalContext";
import { NodeMetaDataType } from "./BackendService";

export type CDNNodeData = Node<{ label: string }, "cdn">;

export type ConnectorType = "source" | "target" | "none";

const handlePositions = [
    { key: "left", position: Position.Left },
    { key: "right", position: Position.Right },
    { key: "top", position: Position.Top },
    { key: "bottom", position: Position.Bottom },
] as const;

function CDNNode({ data, selected }: NodeProps<CDNNodeData>) {

    const [metaData, setMetaData] = useState<NodeMetaDataType>({
        name: "",
        title: "CDN",
        left: "source",
        right: "none",
        top: "none",
        bottom: "none",
    });
    const { open } = useModalContext();

    const openConfig = useCallback(() => {
        open(metaData, setMetaData); // adjust if metadata exists
    }, [open]);

    return (
        <div
            className={`
        group relative min-w-[120px]
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
          flex h-6 w-6 items-center justify-center
          rounded-md text-gray-400
          transition-all
        `}
            >
                ⚙
            </button>

            {/* Content */}
            <div className="flex items-center gap-2">
                <img
                    src="/assets/cdn.png"
                    alt={data.label}
                    className="h-4 w-4 object-contain"
                />

                <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-800">CDN</span>
                    <span className="text-[10px] text-gray-500">{data.label}</span>
                </div>
            </div>

            {/* Handle */}
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

export default CDNNode;