import { Handle, Node, NodeProps, Position } from "@xyflow/react";

export type CacheNodeData = Node<{ label: string }, 'cache'>;

function CacheNode({ data, selected }: NodeProps<CacheNodeData>) {
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
                        src={"../../assets/cache.png"}
                        alt={data.label}
                        className="h-6 w-6 object-cover"
                    />
                    <div className="text-[6px] font-semibold text-gray-900 flex justify-center">
                        Cache
                    </div>
                </div>
            </div>


            <Handle
                type="source"
                position={Position.Left}
                className="!h-3 !w-3 !bg-sky-500"
            />
        </div>
    );
}

export default CacheNode;