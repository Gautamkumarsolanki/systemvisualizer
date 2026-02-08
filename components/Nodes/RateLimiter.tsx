import { Handle, Node, NodeProps, Position } from "@xyflow/react";

export type rateLimiterNodeData = Node<{ label: string }, 'ratelimiter'>;

function Proxy({ data, selected }: NodeProps<rateLimiterNodeData>) {
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
                        src={"../../assets/ratelimit.png"}
                        alt={data.label}
                        className="h-6 w-6 object-cover"
                    />
                    <div className="text-[6px] font-semibold text-gray-900 flex justify-center">
                        Rate Limiter
                    </div>
                </div>
            </div>


            <Handle
                type="target"
                position={Position.Left}
                className="!h-3 !w-3 !bg-sky-500"
            />
            <Handle
                type="source"
                position={Position.Right}
                className="!h-3 !w-3 !bg-sky-500"
            />
        </div>
    );
}

export default Proxy;