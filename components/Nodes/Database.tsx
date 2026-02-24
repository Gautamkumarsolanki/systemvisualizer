import { useModalContext } from "@/app/providers/ModalContext";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { useCallback, useState } from "react";

export type DatabaseNodeData = Node<{ label: string }, 'database'>;

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

function DatabaseNode({ data, selected }: NodeProps<DatabaseNodeData>) {

    const { open } = useModalContext();

    const [metaData, setMetaData] = useState<NodeMetaDataType>({
        name: "",
        title: "Database",
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
        min-w-[40px] rounded-md border-1 border-blue-500 bg-white
        p-2 shadow-md transition-all
        ${selected ? "border-sky-500 ring-2 ring-sky-200" : "border-sky-200"}
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
                    src="/assets/database.png"
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

export default DatabaseNode;