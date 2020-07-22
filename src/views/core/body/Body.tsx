import React, { useState } from "react";
import { RouterComponent } from "../../router/RouteComponent";
import { FilAriane } from "../../common/widget/filAriane/FilAriane";
import { AppUrls } from "../../router/UrlManager";

export const RetourContext = React.createContext(AppUrls.ctxAccueilUrl);

export const Body: React.FC = () => {
  const [retourState, setRetourState] = useState<string>(AppUrls.ctxAccueilUrl);
  return (
    <>
      <div className="AppBody">
        <RetourContext.Provider value={retourState}>
          <FilAriane setRetourState={setRetourState} />
          <RouterComponent />
        </RetourContext.Provider>
      </div>
    </>
  );
};
