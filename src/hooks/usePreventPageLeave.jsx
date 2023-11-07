import { useEffect, useState, useRef, useCallback } from "react";
import { useBeforeUnload, useNavigate } from "react-router-dom";

export default function usePreventPageLeave(homePage) {
  const prevPopStateHandler = useRef();
  const [isDirty, setIsDirty] = useState(false);
  const navigate = useNavigate();

  //   handle browser's back button if the page is not home page
  if (!homePage) {
    useEffect(() => {
      if (isDirty) {
        const currentRoute = window.location.pathname;
        prevPopStateHandler.current && window.removeEventListener("popstate", prevPopStateHandler.current);
        const popStateHandler = function (event) {
          event.preventDefault();
          // The popstate event is fired each time when the current history entry changes.
          const confirmValue = confirm("You pressed a Back button! Are you sure?!");
          if (confirmValue === true) {
            navigate(window.location.pathname);
            prevPopStateHandler.current && window.removeEventListener("popstate", prevPopStateHandler.current);
          } else {
            // Stay on the current page.
            navigate(currentRoute);
          }
        };
        prevPopStateHandler.current = popStateHandler;
        window.addEventListener("popstate", popStateHandler, false);
      } else {
        prevPopStateHandler.current && window.removeEventListener("popstate", prevPopStateHandler.current);
      }
    }, [isDirty]);
  }

  //   handle the BeforeUnload Event
  useBeforeUnload(
    useCallback((e) => {
      e.preventDefault();
      console.log("Are you sure you want to leave this page?");
      // Prompt a confirmation message when the user tries to leave the route
      e.returnValue = "Are you sure you want to leave this page?";
    },[])
  );

  return {
    isDirty,
    setIsDirty,
  };
}
