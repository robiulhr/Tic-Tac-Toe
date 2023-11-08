import { useEffect, useRef } from "react";
import { unstable_useBlocker as useBlocker } from "react-router-dom";

function usePrompt(onLocationChange, hasUnsavedChanges) {
  const blocker = useBlocker(hasUnsavedChanges ? onLocationChange : false);
  const prevState = useRef(blocker.state);

  useEffect(() => {
    if (blocker.state === "blocked") {
      blocker.reset();
    }
    prevState.current = blocker.state;
  }, [blocker]);
}
export default usePrompt;
