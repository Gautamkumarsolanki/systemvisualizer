import { ReactFlow, useReactFlow, XYPosition } from "@xyflow/react";
import { createContext, Dispatch, SetStateAction, useContext, useEffect } from "react";


export type DropAction = (params: { position: XYPosition } | null) => void;

interface DnDContextType {
    isDragging: boolean;
    setIsDragging: Dispatch<SetStateAction<boolean>>;
    dropAction: DropAction | null;
    setDropAction: Dispatch<SetStateAction<(DropAction | null)>>;
}

const DnDContext = createContext<DnDContextType | null>(null);

export function useDnd() {

    const { screenToFlowPosition } = useReactFlow();
    const context = useContext(DnDContext);
    const { isDragging, setIsDragging, dropAction, setDropAction } = context!;
    if (!context) {
        throw new Error("useDnd must be used within a DnDProvider");
    }
    function onDragStart(event: React.PointerEvent<HTMLButtonElement>, onDrop: DropAction) {
        event.preventDefault();
        (event.target as HTMLElement).setPointerCapture(event.pointerId);
        setIsDragging(true);
        setDropAction(onDrop);
    }

    function onDragEnd(e: PointerEvent) {
        if (!isDragging) {
            setIsDragging(false);
            return;
        }
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        const elementUnderPointer = document.elementFromPoint(e.clientX, e.clientY);
        const isDroppingOnFlow = elementUnderPointer?.closest('.react-flow');
        e.preventDefault();
        if (isDroppingOnFlow) {
            const flowPosition = screenToFlowPosition({ x: e.clientX, y: e.clientY });
            dropAction?.({ position: flowPosition });
        }
        setIsDragging(false);
    }

    useEffect(() => {
        if (!isDragging) return;
        document.addEventListener("pointerup", onDragEnd);
        return () => {
            document.removeEventListener("pointerup", onDragEnd);
        };
    }, [isDragging]);

    return { isDragging, onDragStart };
}

export default DnDContext;