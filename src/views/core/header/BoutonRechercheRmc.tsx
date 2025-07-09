import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/material/Button";
import { RMCActeInscriptionPage } from "@pages/rechercheMultiCriteres/acteInscription/RMCActeInscriptionPage";
import { FenetreExterne, FenetreExterneUtil } from "@util/FenetreExterne";
import { getLibelle } from "@util/Utils";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import React, { useState } from "react";
import { PageRMCActeInscription } from "../../../pages/rmc/PageRMCActeInscription";
import "../../pages/rechercheMultiCriteres/acteInscription/scss/RMCActeInscriptionPage.scss";

const width = 1200;
const ratioHeight = 1;

export const BoutonRechercheRmc: React.FC = () => {
  const [rmcExterne, setRmcExterne] = useState<boolean>(false);
  const [fenetreExterneUtil, setFenetreExterneUtil] = useState<FenetreExterneUtil>();

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
        <FontAwesomeIcon
          className="loupeChampsRecherche"
          icon={faSearch}
        />
      </Button>
      {rmcExterne && (
        <FenetreExterne
          onCloseHandler={() => setRmcExterne(false)}
          width={width}
          ratioHeight={ratioHeight}
          titre="Recherche acte et inscription"
          setFenetreExterneUtil={setFenetreExterneUtil}
        >
          {gestionnaireFeatureFlag.estActif(FeatureFlag.FF_UTILISER_NOUVELLE_RMC) ? (
            <PageRMCActeInscription dansFenetreExterne={true} />
          ) : (
            <RMCActeInscriptionPage
              noAutoScroll={true}
              dansFenetreExterne={true}
            ></RMCActeInscriptionPage>
          )}
        </FenetreExterne>
      )}
    </>
  );
};
