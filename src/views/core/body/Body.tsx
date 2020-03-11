import React from "react";
import { RouterComponent } from "../../router/RouteComponent";
import { FilAriane } from "../../common/widget/filAriane/FilAriane";

export const Body: React.FC = () => {
  return (
    <>
      <div className="AppBody">
        <FilAriane />
        <RouterComponent />
      </div>
    </>
  );
};
