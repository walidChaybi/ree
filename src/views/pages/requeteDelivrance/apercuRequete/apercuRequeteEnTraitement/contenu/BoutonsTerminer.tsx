import { RECEContextActions, RECEContextData } from "@core/contexts/RECEContext";
import { IOfficier, officierHabiliterPourLeDroit } from "@model/agent/IOfficier";
import { Droit } from "@model/agent/enum/Droit";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { DocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { validerMentionsPlusieursDocuments } from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/mentions/GestionMentionsUtil";
import { URL_MES_REQUETES_DELIVRANCE } from "@router/ReceUrls";
import { checkDirty, getLibelle } from "@util/Utils";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import React, { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router";
import SignatureDelivrance from "../../../../../../composants/commun/signature/SignatureDelivrance";
import { BoutonTerminerApresImpression } from "./BoutonTerminerApresImpression";
import { BoutonTransmettreAValideur } from "./BoutonTransmettreAValideur";
import { BoutonValiderTerminer } from "./BoutonValiderTerminer";

interface BoutonsTerminerProps {
  requete: IRequeteDelivrance;
  acte?: IFicheActe;
}

export const BoutonsTerminer: React.FC<BoutonsTerminerProps> = ({ requete, acte }) => {
  const navigate = useNavigate();
  const [estDisabled, setEstDisabled] = useState(true);
  const { isDirty, utilisateurConnecte } = useContext(RECEContextData);
  const { setIsDirty } = useContext(RECEContextActions);

  const aDroitSignerEtStatutSigner = estPossibleDeSigner(requete.statutCourant.statut, requete.sousType, utilisateurConnecte);

  const afficheBoutonTransmettreAValideur = possibleDeTransmettreAValideur(requete.statutCourant.statut);

  const mAppartient = requete.idUtilisateur === utilisateurConnecte?.idUtilisateur;

  if (mAppartient && aDroitSignerEtStatutSigner && DocumentReponse.verifierDocumentsValides(requete.documentsReponses) && estDisabled) {
    setEstDisabled(false);
  }

  const onClickTerminer = useCallback(() => {
    if (checkDirty(isDirty, setIsDirty)) {
      validerMentionsPlusieursDocuments(() => navigate(URL_MES_REQUETES_DELIVRANCE), acte, requete.documentsReponses);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acte, requete.documentsReponses, isDirty, setIsDirty]);

  return (
    <>
      {afficheBoutonTransmettreAValideur && <BoutonTransmettreAValideur idRequete={requete.id} />}
      {afficherBoutonValiderTerminer(requete) && (
        <>
          <BoutonTerminerApresImpression requete={requete} />
          <BoutonValiderTerminer requete={requete} />
        </>
      )}
      {aDroitSignerEtStatutSigner && (
        <>
          <SignatureDelivrance
            titreBouton="Terminer et signer"
            titreModale="Signature"
            numerosFonctionnel={[requete.numero]}
            donneesAvertissementsMentions={{ acte: acte, documents: requete.documentsReponses }}
            chargerDocumentsAuClic
            apreSignature={succes => succes && navigate(URL_MES_REQUETES_DELIVRANCE)}
          />
          {gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES) && (
            <BoutonDoubleSubmit
              title={getLibelle("Terminer")}
              onClick={onClickTerminer}
              disabled={estDisabled}
            >
              Terminer
            </BoutonDoubleSubmit>
          )}
        </>
      )}
    </>
  );
};

const afficherBoutonValiderTerminer = (requete: IRequeteDelivrance) =>
  (gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES) &&
    SousTypeDelivrance.estRDDouRDCouRDDP(requete?.sousType)) ||
  (gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_CERTIFS_SITUATIONS) && SousTypeDelivrance.estRDCSDouRDCSC(requete.sousType));

const estPossibleDeSigner = (statut: StatutRequete, sousTypeDelivrance: SousTypeDelivrance, utilisateurConnecte: IOfficier): boolean => {
  return (
    officierHabiliterPourLeDroit(utilisateurConnecte, Droit.SIGNER_DELIVRANCE_DEMAT) &&
    StatutRequete.estASigner(statut) &&
    SousTypeDelivrance.estSousTypeSignable(sousTypeDelivrance)
  );
};

const possibleDeTransmettreAValideur = (statut: StatutRequete): boolean => {
  return StatutRequete.estASignerOuAValider(statut) && gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES);
};
