import { CircularProgress } from "@mui/material";
import React from "react";
import "./scss/OperationLocaleEnCours.scss";
import "./scss/OperationLocaleEnCoursSimple.scss";

export const OperationLocaleEnCoursSimple: React.FC = props => {
  return (
    <div className="OperationLocaleEnCoursSimple">
      <CircularProgress />
    </div>
  );
};
