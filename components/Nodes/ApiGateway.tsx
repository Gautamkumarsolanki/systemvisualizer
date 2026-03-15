import { Node, NodeProps } from "@xyflow/react";

export type ApiGatewayNodeData = Node<{ label: string, title: string, handleMetaData: Record<string, ConnectorType> }, "apigateway">;

export type ConnectorType = "source" | "target" | "none";

function ApiGatewayNode({ data, selected }: NodeProps<ApiGatewayNodeData>) {

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
		</div>
	);
}

export default ApiGatewayNode;