import React from "react";
import Tab from "@material-ui/core/Tab";
import "../sass/EspaceDelivrancePage.scss";
import WithHabilitation from "../../../common/util/habilitation/WithHabilitation";

interface LinkTabProps {
  label?: string;
  href?: string;
  disabled?: boolean;
}

export function a11yProps(index: any) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`
  };
}

export function LinkTabMesRequetes(props: LinkTabProps) {
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

export const LinkTabMesRequetesWithHabilitation = WithHabilitation(
  LinkTabMesRequetes
);
