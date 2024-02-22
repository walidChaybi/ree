import React from "react";

export const RECEContext = React.createContext({
  isDirty: false,
  setIsDirty: (isDirty: boolean) => {}
});
