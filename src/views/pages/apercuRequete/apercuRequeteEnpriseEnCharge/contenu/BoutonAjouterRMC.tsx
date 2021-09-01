import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";
import { Button } from "reakit/Button";
import { DialogDisclosureHTMLProps } from "reakit/Dialog";
import { getText } from "../../../../common/widget/Text";
import "./../scss/BoutonAjouterRMC.scss";
import { PopinAjouterRMC } from "./PopinAjouterRMC";

interface BoutonAjouterRMCProps extends DialogDisclosureHTMLProps {
  libelle: string;
}

export const BoutonAjouterRMC: React.FC<BoutonAjouterRMCProps> = ({
  libelle
}) => {
  const [showWaitState, setShowWaitState] = useState<boolean>(false);
  const closePopin = useCallback(
    (showPopin: boolean) => {
      if (showWaitState && showPopin === false) {
        setShowWaitState(showPopin);
      }
    },
    [showWaitState]
  );

  const handleClickAjouterRMC = () => {
    setShowWaitState(true);
  };

  return (
    <>
      <Button onClick={handleClickAjouterRMC}>
        <FontAwesomeIcon className="loupeChampsRecherche" icon={faSearch} />
        {getText(libelle, [], true)}
      </Button>

      <PopinAjouterRMC open={showWaitState} onClose={closePopin} />
    </>
  );
};
