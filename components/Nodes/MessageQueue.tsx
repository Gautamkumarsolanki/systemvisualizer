import { Handle, Node, NodeProps, Position } from "@xyflow/react";

export type MessageQueueNodeData = Node<{ label: string }, 'messagequeue'>;

function MessageQueue({ data, selected }: NodeProps<MessageQueueNodeData>) {
    return (
        <div
            className={`
        min-w-[60px] rounded-md border-1 border-blue-500 bg-white
        p-2 shadow-md transition-all
        ${selected ? "border-sky-500 ring-2 ring-sky-200" : "border-sky-200"}
      `}
        >
            <div className="flex justify-center gap-3">
                <div>

                    <img
                        src={"../../assets/emails.png"}
                        alt={data.label}
                        className="h-4 w-4 object-cover"
                    />
                    <div className="text-[6px] font-semibold text-gray-900 flex justify-center">
                        Message Queue
                    </div>
                </div>
            </div>

            <Handle
                type="source"
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

export default MessageQueue;