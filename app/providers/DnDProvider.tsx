import { useState } from "react";
import DnDContext, { DropAction } from "./DnDContext";


export function DnDProvider({ children }: { children: React.ReactNode }) {

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dropAction, setDropAction] = useState<(DropAction | null)>(null);

  return (
    <DnDContext.Provider
      value={{
        isDragging,
        setIsDragging,
        dropAction,
        setDropAction: (action) => setDropAction(() => action),
      }}
    >
      {children}
    </DnDContext.Provider>
  );
}

export default DnDProvider;