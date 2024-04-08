import { RECEContext } from "@core/body/RECEContext";
import { Droit } from "@model/agent/enum/Droit";
import { officierHabiliterPourLeDroit } from "@model/agent/IOfficier";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { DocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { validerMentionsPlusieursDocuments } from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/mentions/GestionMentionsUtil";
import { URL_MES_REQUETES_DELIVRANCE } from "@router/ReceUrls";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { storeRece } from "@util/storeRece";
import { checkDirty, getLibelle } from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { BoutonSignature } from "@widget/signature/BoutonSignature";
import React, { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mappingRequeteDelivranceToRequeteTableau } from "../../mapping/ReqDelivranceToReqTableau";
import { BoutonTerminerApresImpression } from "./BoutonTerminerApresImpression";
import { BoutonTransmettreAValideur } from "./BoutonTransmettreAValideur";
import { BoutonValiderTerminer } from "./BoutonValiderTerminer";

interface BoutonsTerminerProps {
  requete: IRequeteDelivrance;
  acte?: IFicheActe;
}

export const BoutonsTerminer: React.FC<BoutonsTerminerProps> = ({
  requete,
  acte
}) => {
  const navigate = useNavigate();
  const [estDisabled, setEstDisabled] = useState(true);
  const { isDirty, setIsDirty } = useContext(RECEContext);

  const aDroitSignerEtStatutSigner = estPossibleDeSigner(
    requete.statutCourant.statut,
    requete.sousType
  );

  const afficheBoutonTransmettreAValideur = possibleDeTransmettreAValideur(
    requete.statutCourant.statut
  );

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

  const onClickTerminer = useCallback(() => {
    if (checkDirty(isDirty, setIsDirty)) {
      validerMentionsPlusieursDocuments(
        () => navigate(URL_MES_REQUETES_DELIVRANCE),
        acte,
        requete.documentsReponses
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acte, requete.documentsReponses, isDirty, setIsDirty]);

  const actionApresSignature = useCallback(
    (allsigned: boolean) => {
      if (allsigned === true) {
        onClickTerminer();
      }
    },
    [onClickTerminer]
  );

  return (
    <>
      {afficheBoutonTransmettreAValideur && (
        <BoutonTransmettreAValideur idRequete={requete.id} />
      )}
      {afficherBoutonValiderTerminer(requete) && (
        <>
          <BoutonTerminerApresImpression requete={requete} />
          <BoutonValiderTerminer requete={requete} />
        </>
      )}
      {aDroitSignerEtStatutSigner && (
        <>
          <BoutonSignature
            checkDirtyActive={true}
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
            validerMentionsPlusieursDocuments={
              validerMentionsPlusieursDocuments
            }
          />
          {gestionnaireFeatureFlag.estActif(
            FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES
          ) && (
            <Bouton
              title={getLibelle("Terminer")}
              onClick={onClickTerminer}
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
  (gestionnaireFeatureFlag.estActif(
    FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES
  ) &&
    SousTypeDelivrance.estRDDouRDCouRDDP(requete?.sousType)) ||
  (gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_CS) &&
    SousTypeDelivrance.estRDCSDouRDCSC(requete.sousType));

const estPossibleDeSigner = (
  statut: StatutRequete,
  sousTypeDelivrance: SousTypeDelivrance
): boolean => {
  return (
    officierHabiliterPourLeDroit(Droit.SIGNER) &&
    StatutRequete.estASigner(statut) &&
    SousTypeDelivrance.estSousTypeSignable(sousTypeDelivrance)
  );
};

const possibleDeTransmettreAValideur = (statut: StatutRequete): boolean => {
  return (
    StatutRequete.estASignerOuAValider(statut) &&
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES)
  );
};
