'use client';
import { useCallback, useState } from "react";
import { CustomNodeType } from "../Nodes/NodeTypes";
import { useReactFlow, useUpdateNodeInternals } from "@xyflow/react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	selectedNode: CustomNodeType | null;
	setSelectedNode: React.Dispatch<React.SetStateAction<CustomNodeType | null>>;
}

type ConnectorType = "source" | "target" | "none";

const sides = ["left", "right", "top", "bottom"] as const;

const options: ConnectorType[] = ["source", "target", "none"];

const NodeConfigModal = ({
	isOpen,
	onClose,
	selectedNode
}: ModalProps) => {

	const [title, setTitle] = useState<string>(selectedNode?.data?.title ?? "");
	const [handles, setHandles] = useState<Record<string, ConnectorType>>(selectedNode?.data?.handleMetaData ?? {});
	const updateNodeInternals = useUpdateNodeInternals();
	const { setNodes } = useReactFlow();

	const updateNodeMetaData = useCallback(() => {
		if (!selectedNode) return;
		const updatedNode = {
			...selectedNode,
			data: {
				...selectedNode.data,
				title,
				handleMetaData: handles,
			},
		};
		setNodes((nodes) => nodes.map((node) => (node.id === updatedNode.id ? updatedNode : node)));
		updateNodeInternals(selectedNode.id);
		onClose();
	}, [selectedNode, title, handles]);

	if (!isOpen || !selectedNode) return null;

	console.log(handles);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			{/* Overlay */}
			<div
				className="absolute inset-0 bg-black/40 backdrop-blur-sm"
				onClick={onClose}
			/>

			{/* Modal */}
			<div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl">
				{/* Header */}
				<div className="flex items-center justify-between border-b px-5 py-4">
					<h2 className="text-lg font-semibold text-gray-800">
						{selectedNode?.data.label + " Config"}
					</h2>

					<button
						onClick={onClose}
						className="rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
					>
						✕
					</button>
				</div>

				{/* Body */}
				<div className="space-y-5 px-5 py-4">
					{/* Name Section */}
					<div>
						<label className="text-sm font-medium text-gray-700">
							Node Name
						</label>

						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Enter node name"
							className="
                placeholder:text-gray-500
                mt-2 w-full rounded-lg border border-gray-200
                px-3 py-2 text-sm
                outline-none transition
                focus:border-sky-400 focus:ring-2 focus:ring-sky-100
              "
						/>
					</div>

					{/* Connectors Section */}
					<div>
						<h3 className="mb-3 text-sm font-semibold text-gray-800">
							Connectors
						</h3>

						<div className="space-y-3">
							{sides.map((side) => (
								<div
									key={side}
									className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2"
								>
									<span className="text-sm capitalize text-gray-700">
										{side}
									</span>

									<div className="flex gap-1">
										{options.map((option) => {
											const active = handles[side] === option;

											return (
												<button
													key={option}
													onClick={() => setHandles((prev) => ({ ...prev, [side]: option }))}
													className={`
                            rounded-md px-2 py-1 text-xs font-medium
                            transition
                            ${active
															? "bg-sky-500 text-white shadow-sm"
															: "text-gray-500 hover:bg-gray-200"
														}
                          `}
												>
													{option}
												</button>
											);
										})}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="flex gap-2 border-t px-5 py-4">
					<button
						onClick={onClose}
						className="
              flex-1 rounded-lg border border-gray-200
              py-2 text-sm font-medium text-gray-600
              transition hover:bg-gray-50
            "
					>
						Cancel
					</button>

					<button
						onClick={updateNodeMetaData}
						className="
              flex-1 rounded-lg bg-sky-500
              py-2 text-sm font-medium text-white
              transition hover:bg-sky-600 active:scale-[0.98]
            "
					>
						Save Changes
					</button>
				</div>
			</div>
		</div>
	);
};

export default NodeConfigModal;