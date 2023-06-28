import { checkDirty } from "@util/Utils";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { RECEContext } from "./RECEContext";

export function useBlockNavigation() {
  const { isDirty, setIsDirty } = useContext(RECEContext);
  const history = useHistory();

  useEffect(() => {
    const unblock = history.block(location => {
      const pathname = location.pathname;
      if (checkDirty(isDirty, setIsDirty)) {
        unblock();
        history.push(pathname);
      }
      return false;
    });
    return unblock;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.pathname, isDirty]);

  useEffect(() => {
    function handleBeforeUnload(event: any) {
      if (isDirty) {
        event.preventDefault();
      }
    }

    if (window.top) {
      window.top.removeEventListener("beforeunload", handleBeforeUnload);
      window.top.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      if (window.top) {
        window.top.removeEventListener("beforeunload", handleBeforeUnload);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.pathname, isDirty]);
}
