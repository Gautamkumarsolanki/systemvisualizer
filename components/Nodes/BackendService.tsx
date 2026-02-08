import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import React from 'react';
import NodeConfigModal from "../Modal/NodeConfigModal";
import { useModalContext } from "@/app/providers/ModalContext";

export type BackendServiceNodeData = Node<{ label: string }, 'backendservice'>;

function BackendServiceNode({ data, selected }: NodeProps<BackendServiceNodeData>) {

    const {open}=useModalContext();

    return (
        
            <div
                className={`
        min-w-[40px] rounded-md border-1 border-blue-500 bg-white
        p-2 shadow-md transition-all
        ${selected ? "border-sky-500 ring-2 ring-sky-200" : "border-sky-200"}
      `}
            >
                <div className="flex justify-center gap-3">
                    {/* Image or default emoji */}
                    <div>

                        <img
                            src={"../../assets/backendservice.png"}
                            alt={data.label}
                            className="h-4 w-4 object-cover"
                        />
                        <div className="text-[6px] font-semibold text-gray-900 flex justify-center">
                            Backend Service
                        </div>
                    </div>
                </div>
                <Handle
                    type="source"
                    position={Position.Right}
                    className="!h-3 !w-3 !bg-sky-500"
                />
                <Handle
                    type="source"
                    position={Position.Left}
                    className="!h-3 !w-3 !bg-sky-500"
                />
                <Handle
                    type="source"
                    position={Position.Top}
                    className="!h-3 !w-3 !bg-sky-500"
                />
                <Handle
                    type="source"
                    position={Position.Bottom}
                    className="!h-3 !w-3 !bg-sky-500"
                />
            <button onClick={() => open()}>Configure</button>
            </div>
       
    );
}

export default BackendServiceNode;