import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-ui/core";
import React, { useState } from "react";
import {
  FenetreExterne,
  FenetreExterneUtil
} from "../../common/util/FenetreExterne";
import { getLibelle } from "../../common/util/Utils";
import { RMCActeInscriptionPage } from "../../pages/rechercheMultiCriteres/acteInscription/RMCActeInscriptionPage";
import "../../pages/rechercheMultiCriteres/acteInscription/scss/RMCActeInscriptionPage.scss";

const width = 1200;
const ratioHeight = 1;

export const BoutonRechercheRmc: React.FC = () => {
  const [rmcExterne, setRmcExterne] = useState<boolean>(false);
  const [
    fenetreExterneUtil,
    setFenetreExterneUtil
  ] = useState<FenetreExterneUtil>();

  const handleClick = () => {
    if (!rmcExterne) {
      setRmcExterne(true);
    } else {
      fenetreExterneUtil?.ref.focus();
    }
  };

  return (
    <>
      <Button
        onClick={handleClick}
        title={getLibelle("Recherche acte/inscription")}
      >
        <FontAwesomeIcon className="loupeChampsRecherche" icon={faSearch} />
      </Button>
      {rmcExterne && (
        <FenetreExterne
          onCloseHandler={() => setRmcExterne(false)}
          width={width}
          ratioHeight={ratioHeight}
          titre="Recherche acte et inscription"
          setFenetreExterneUtil={setFenetreExterneUtil}
        >
          <RMCActeInscriptionPage noAutoScroll={true}></RMCActeInscriptionPage>
        </FenetreExterne>
      )}
    </>
  );
};
