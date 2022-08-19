import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { Droit } from "../../../../../../model/agent/enum/Droit";
import { officierHabiliterPourLeDroit } from "../../../../../../model/agent/IOfficier";
import { SousTypeDelivrance } from "../../../../../../model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "../../../../../../model/requete/enum/StatutRequete";
import { DocumentReponse } from "../../../../../../model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "../../../../../../model/requete/IRequeteDelivrance";
import { FeatureFlag } from "../../../../../common/util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "../../../../../common/util/featureFlag/gestionnaireFeatureFlag";
import { storeRece } from "../../../../../common/util/storeRece";
import { getLibelle } from "../../../../../common/util/Utils";
import { BoutonOperationEnCours } from "../../../../../common/widget/attente/BoutonOperationEnCours";
import { BoutonSignature } from "../../../../../common/widget/signature/BoutonSignature";
import { mappingRequeteDelivranceToRequeteTableau } from "../../mapping/ReqDelivranceToReqTableau";
import { BoutonValiderTerminer } from "./BoutonValiderTerminer";

interface BoutonsTerminerProps {
  requete: IRequeteDelivrance;
}

export const BoutonsTerminer: React.FC<BoutonsTerminerProps> = ({
  requete
}) => {
  const history = useHistory();
  const [estDisabled, setEstDisabled] = useState(true);

  const aDroitSignerEtStatutSigner =
    officierHabiliterPourLeDroit(Droit.SIGNER) &&
    requete.statutCourant.statut === StatutRequete.A_SIGNER;

  const mAppartient =
    requete.idUtilisateur === storeRece.utilisateurCourant?.idUtilisateur;

  if (
    mAppartient &&
    aDroitSignerEtStatutSigner &&
    DocumentReponse.verifierDocumentsValides(requete.documentsReponses) &&
    estDisabled
  ) {
    setEstDisabled(false);
  }

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const actionApresSignature = useCallback(
    (allsigned: boolean) => {
      if (allsigned === true) {
        goBack();
      }
    },
    [goBack]
  );

  const afficherBoutonValiderTerminer =
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_CS) &&
    SousTypeDelivrance.estRDDouRDCouRDDP(requete?.sousType);
  // || ChoixDelivrance.estReponseSansDelivrance(requete.choixDelivrance)); //TODO: dans le cas d'un refus, afficher "Valider et terminer". A confirmer avec la MOA

  return (
    <>
      {afficherBoutonValiderTerminer && (
        <BoutonValiderTerminer requete={requete} />
      )}
      {aDroitSignerEtStatutSigner && (
        <>
          <BoutonSignature
            libelle={getLibelle("Terminer et signer")}
            requetes={[mappingRequeteDelivranceToRequeteTableau(requete)]}
            reloadData={actionApresSignature}
            uniqueSignature={true}
            connectedUser={storeRece.utilisateurCourant}
          />
          {gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC) && (
            <BoutonOperationEnCours
              title={getLibelle("Terminer")}
              onClick={goBack}
              estDesactive={estDisabled}
              checkDirtyActive={true}
            >
              Terminer
            </BoutonOperationEnCours>
          )}
        </>
      )}
    </>
  );
};
