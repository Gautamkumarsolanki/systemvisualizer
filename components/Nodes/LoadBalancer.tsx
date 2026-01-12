import { Handle, Node, NodeProps, Position } from "@xyflow/react";

export type LoadBalancerNodeData = Node<{ label: string }, 'loadbalancer'>;

function LoadBalancerNode({ data, selected }: NodeProps<LoadBalancerNodeData>) {
    return (
        <div
            className={`
        min-w-[40px] rounded-md border-1 border-blue-500 bg-white
        p-2 shadow-md transition-all
        ${selected ? "border-sky-500 ring-2 ring-sky-200" : "border-sky-200"}
      `}
        >
            <div className="w-full">
                {/* Image or default emoji */}
                <div className="flex justify-center">
                    <img
                        src={"../../assets/loadbalancer.png"}
                        alt={data.label}
                        className="h-6 w-6 object-cover"
                    />
                </div>
                <div className="text-[6px] font-semibold text-gray-900 flex justify-center">
                    Load Balancer
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

export default LoadBalancerNode;