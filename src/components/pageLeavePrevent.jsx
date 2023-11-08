import { useCallback } from "react";
import { useBeforeUnload } from "react-router-dom";
import usePrompt from "../hooks/usePrompt";

const FormPrompt = ({ isDirty }) => {
  const onLocationChange = useCallback(() => {
    if (isDirty) {
      return !window.confirm("Please finish the match?");
    }
    return false;
  }, [isDirty]);

  usePrompt(onLocationChange, isDirty);
  useBeforeUnload(
    useCallback(
      (event) => {
        if (isDirty) {
          event.preventDefault();
          event.returnValue = "Please, finish the match";
        }
      },
      [isDirty]
    ),
    { capture: true }
  );

  return null;
};

export default FormPrompt;
