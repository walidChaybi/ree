import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}));

export interface OperationEnCoursProps {
  visible: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const OperationEnCours: React.FC<OperationEnCoursProps> = props => {
  const classes = useStyles();
  return (
    <Backdrop
      className={classes.backdrop}
      open={props.visible}
      onClick={props.onClick}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
