import { Handle, Node, NodeProps, Position } from "@xyflow/react";

export type ClientNodeData = Node<{ label: string }, 'client'>;

function ClientNode({ data, selected }: NodeProps<ClientNodeData>) {
    return (
        <div
            className={`
        min-w-[80px] rounded-2xl border-1 border-blue-500 bg-white
        p-4 shadow-md transition-all
        ${selected ? "border-sky-500 ring-2 ring-sky-200" : "border-sky-200"}
      `}
        >
            <div className="flex justify-center gap-3">
                {/* Image or default emoji */}
                <div>

                    <img
                        src={"../../assets/customer.png"}
                        alt={data.label}
                        className="h-10 w-10 object-cover"
                    />
                    <div className="text-[8px] font-semibold text-gray-900 flex justify-center">
                        {data.label}
                    </div>
                </div>
            </div>


            <Handle
                type="source"
                position={Position.Right}
                className="!h-3 !w-3 !bg-sky-500"
            />
        </div>
    );
}

export default ClientNode;