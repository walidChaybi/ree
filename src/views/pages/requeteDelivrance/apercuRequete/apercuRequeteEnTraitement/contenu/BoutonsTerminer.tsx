import { RECEContext } from "@core/body/RECEContext";
import { Droit } from "@model/agent/enum/Droit";
import { officierHabiliterPourLeDroit } from "@model/agent/IOfficier";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { DocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { validerMentionsPlusieursDocuments } from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/mentions/GestionMentionsUtil";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { storeRece } from "@util/storeRece";
import { checkDirty, getLibelle } from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { BoutonSignature } from "@widget/signature/BoutonSignature";
import React, { useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { mappingRequeteDelivranceToRequeteTableau } from "../../mapping/ReqDelivranceToReqTableau";
import { BoutonTerminerApresImpression } from "./BoutonTerminerApresImpression";
import { BoutonValiderTerminer } from "./BoutonValiderTerminer";

interface BoutonsTerminerProps {
  requete: IRequeteDelivrance;
  acte?: IFicheActe;
}

export const BoutonsTerminer: React.FC<BoutonsTerminerProps> = ({
  requete,
  acte
}) => {
  const history = useHistory();
  const [estDisabled, setEstDisabled] = useState(true);
  const { isDirty, setIsDirty } = useContext(RECEContext);

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
    if (checkDirty(isDirty, setIsDirty)) {
      validerMentionsPlusieursDocuments(
        () => history.goBack(),
        acte,
        requete.documentsReponses
      );
    }
  }, [history, acte, requete.documentsReponses, isDirty, setIsDirty]);

  const actionApresSignature = useCallback(
    (allsigned: boolean) => {
      if (allsigned === true) {
        goBack();
      }
    },
    [goBack]
  );

  return (
    <>
      {afficherBoutonValiderTerminer(requete) && (
        <>
          <BoutonTerminerApresImpression requete={requete} />
          <BoutonValiderTerminer requete={requete} />
        </>
      )}
      {aDroitSignerEtStatutSigner && (
        <>
          <BoutonSignature
            libelle={getLibelle("Terminer et signer")}
            requetesASigner={[
              {
                requete: mappingRequeteDelivranceToRequeteTableau(requete),
                acte
              }
            ]}
            reloadData={actionApresSignature}
            uniqueSignature={true}
            connectedUser={storeRece.utilisateurCourant}
          />
          {gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC) && (
            <Bouton
              title={getLibelle("Terminer")}
              onClick={goBack}
              disabled={estDisabled}
            >
              Terminer
            </Bouton>
          )}
        </>
      )}
    </>
  );
};

const afficherBoutonValiderTerminer = (requete: IRequeteDelivrance) =>
  (gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC) &&
    SousTypeDelivrance.estRDDouRDCouRDDP(requete?.sousType)) ||
  (gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_CS) &&
    SousTypeDelivrance.estRDCSDouRDCSC(requete.sousType));
