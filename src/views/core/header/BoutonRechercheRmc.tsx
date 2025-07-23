import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/material/Button";
import { RMCActeInscriptionPage } from "@pages/rechercheMultiCriteres/acteInscription/RMCActeInscriptionPage";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import React, { useState } from "react";
import FenetreExterne, { IFenetreExterneRef } from "../../../composants/commun/conteneurs/FenetreExterne";
import { PageRMCActeInscription } from "../../../pages/rmc/PageRMCActeInscription";
import "../../pages/rechercheMultiCriteres/acteInscription/scss/RMCActeInscriptionPage.scss";

const width = 1200;
const ratioHeight = 1;

export const BoutonRechercheRmc: React.FC = () => {
  const [rmcExterne, setRmcExterne] = useState<boolean>(false);
  const [fenetreExterne, setFenetreExterne] = useState<IFenetreExterneRef | null>(null);

  const handleClick = () => {
    if (!rmcExterne) {
      setRmcExterne(true);
    } else {
      fenetreExterne?.ref.focus();
    }
  };

  return (
    <>
      <Button
        onClick={handleClick}
        title={"Recherche acte/inscription"}
      >
        <FontAwesomeIcon
          className="loupeChampsRecherche"
          icon={faSearch}
        />
      </Button>
      {rmcExterne && (
        <FenetreExterne
          apresFermeture={() => setRmcExterne(false)}
          largeur={width}
          ratioHauteur={ratioHeight}
          ratioLargeur={1}
          titre="Recherche acte et inscription"
          setFenetreExterneRef={ref => setFenetreExterne(ref)}
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
