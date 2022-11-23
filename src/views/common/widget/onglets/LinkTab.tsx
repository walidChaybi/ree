import Tab from "@mui/material/Tab";
import React from "react";

interface LinkTabProps {
  label?: string;
  href?: string;
  disabled?: boolean;
}

export function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
      className={props.disabled ? "tab-disabled" : ""}
    />
  );
}
