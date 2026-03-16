import { useModalContext } from "@/app/providers/ModalContext";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { useCallback } from "react";

export type ApiGatewayNodeData = Node<{ label: string, title: string, handleMetaData: Record<string, ConnectorType> }, "apigateway">;

export type ConnectorType = "source" | "target" | "none";

const handlePositions = [
	{ key: "left", position: Position.Left },
	{ key: "right", position: Position.Right },
	{ key: "top", position: Position.Top },
	{ key: "bottom", position: Position.Bottom },
] as const;

function ApiGatewayNode({ data, selected }: NodeProps<ApiGatewayNodeData>) {

	const { open } = useModalContext();

	const openConfig = useCallback(() => {
		open();
	}, [open]);

	return (
		<div
			className={`
      relative
      min-w-[40px]
      rounded-md
      p-2
      shadow-md
      transition-all

      bg-white dark:bg-zinc-900

      border
      border-sky-200 dark:border-sky-700

      ${selected
					? "ring-2 ring-sky-200 border-sky-500 dark:ring-sky-800 dark:border-sky-500"
					: ""
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
					src="/assets/apigateway.png"
					alt={data.label}
					className="h-5 w-5 object-contain"
				/>

				<span
					className="
          text-[6px]
          font-semibold
          text-gray-800 dark:text-gray-200
          "
				>
					{data.label}
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

export default ApiGatewayNode;