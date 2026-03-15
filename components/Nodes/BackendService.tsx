import { Handle, Node, NodeProps, Position, useNodeConnections } from "@xyflow/react";
import React, { useState, useCallback, use } from "react";
import { useModalContext } from "@/app/providers/ModalContext";

export type BackendServiceNodeData = Node<{ label: string, title: string, handleMetaData: Record<string, ConnectorType> }, "backendservice">;

export type ConnectorType = "source" | "target" | "none";

const handlePositions = [
	{ key: "left", position: Position.Left },
	{ key: "right", position: Position.Right },
	{ key: "top", position: Position.Top },
	{ key: "bottom", position: Position.Bottom },
] as const;

function BackendServiceNode({ data, selected }: NodeProps<BackendServiceNodeData>) {
	const { open } = useModalContext();

	const openConfig = useCallback(() => {
		open();
	}, [open]);

	return (
		<div
			className={`
        group relative min-w-[50px]
        rounded-xl px-2 py-2
        transition-all duration-200
        shadow-sm

        bg-white dark:bg-zinc-900

        border
        ${selected
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

export default BackendServiceNode;