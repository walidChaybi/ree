import React from "react";
import { Button } from "reakit/Button";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Badge from "@material-ui/core/Badge";
import "../accueil/sass/BoutonAccueil.scss";

interface BoutonAccueilProps {
  message: string;
  badge?: number;
  iconFA?: IconDefinition;
  disabled?: boolean;
  title: string;
  onClickHandler: (event: React.MouseEvent) => void;
}

export const BoutonAccueilTest: React.FC<BoutonAccueilProps> = ({
  message,
  badge = 0,
  iconFA,
  disabled = false,
  title,
  onClickHandler
}) => {
  function onClickDefaultHandler(event: React.MouseEvent) {
    if (!disabled) {
      onClickHandler(event);
    }
  }

  return (
    <div
      className="BoutonAccueil"
      onClick={event => onClickDefaultHandler(event)}
      data-testid="BtnAccueil"
    >
      <Badge invisible={disabled || badge === 0} badgeContent={badge}>
        {iconFA && (
          <FontAwesomeIcon
            className={"IconeBouton" + (disabled ? " Disabled" : "")}
            icon={iconFA}
            title={disabled ? "" : title}
            data-testid="IconAccueil"
            aria-labelledby={title}
          />
        )}
        <Button disabled={disabled} title={title}>
          {message}
        </Button>
      </Badge>
    </div>
  );
};
