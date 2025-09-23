import { Droit } from "@model/agent/enum/Droit";
import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { DocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { validerMentionsPlusieursDocuments } from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/mentions/GestionMentionsUtil";
import { checkDirty } from "@util/Utils";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import React, { useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router";
import { RECEContextActions, RECEContextData } from "../../../../../contexts/RECEContextProvider";
import LiensRECE from "../../../../../router/LiensRECE";
import { INFO_PAGE_MES_REQUETES_DELIVRANCE } from "../../../../../router/infoPages/InfoPagesEspaceDelivrance";
import Bouton from "../../../../commun/bouton/Bouton";
import BoutonListeDeroulante from "../../../../commun/bouton/BoutonListeDeroulante";
import SignatureDelivrance from "../../../../commun/signature/SignatureDelivrance";
import { BoutonTerminerApresImpression } from "./BoutonTerminerApresImpression";
import { BoutonTransmettreAValideur } from "./BoutonTransmettreAValideur";
import { BoutonValiderTerminer } from "./BoutonValiderTerminer";

interface BoutonsTerminerProps {
  requete: IRequeteDelivrance;
  acte?: FicheActe;
}

export const BoutonsTerminer: React.FC<BoutonsTerminerProps> = ({ requete, acte }) => {
  const navigate = useNavigate();
  const { isDirty, utilisateurConnecte } = useContext(RECEContextData);
  const { setIsDirty } = useContext(RECEContextActions);
  const FFEstActif = useMemo(
    () => ({
      delivranceExtraitCopie: gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES_VIA_SAGA),
      delivCS: gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_CERTIFS_SITUATION)
    }),
    []
  );
  const utilisateurPeut = useMemo(() => {
    const signer =
      utilisateurConnecte.estHabilitePour({ leDroit: Droit.SIGNER_DELIVRANCE_DEMAT }) &&
      StatutRequete.estASigner(requete.statutCourant.statut) &&
      SousTypeDelivrance.estSousTypeSignable(requete.sousType);
    const validerEtTerminer =
      (FFEstActif.delivranceExtraitCopie && SousTypeDelivrance.estRDDouRDCouRDDP(requete.sousType)) ||
      (FFEstActif.delivCS && SousTypeDelivrance.estRDCSDouRDCSC(requete.sousType));

    return {
      signer: signer,

      transmettreAValideur: FFEstActif.delivranceExtraitCopie && StatutRequete.estASignerOuAValider(requete.statutCourant.statut),

      validerEtTerminer: validerEtTerminer,

      terminerApresImpression:
        validerEtTerminer &&
        [StatutRequete.A_VALIDER, StatutRequete.A_SIGNER].includes(requete.statutCourant.statut) &&
        [SousTypeDelivrance.RDC, SousTypeDelivrance.RDCSC].includes(requete.sousType),

      terminer:
        requete.idUtilisateur === utilisateurConnecte.id && signer && DocumentReponse.verifierDocumentsValides(requete.documentsReponses)
    };
  }, [requete, utilisateurConnecte, FFEstActif]);

  const onClickTerminer = useCallback(() => {
    if (checkDirty(isDirty, setIsDirty)) {
      validerMentionsPlusieursDocuments(
        () => navigate(LiensRECE.genererLien(INFO_PAGE_MES_REQUETES_DELIVRANCE.url)),
        acte,
        requete.documentsReponses
      );
    }
  }, [acte, requete.documentsReponses, isDirty, setIsDirty]);

  return (
    <>
      <BoutonListeDeroulante
        titre="Autres actions"
        styleBouton="secondaire"
        pointAncrageMenu="haut-gauche"
      >
        {utilisateurPeut.transmettreAValideur && (
          <BoutonTransmettreAValideur
            idRequete={requete.id}
            styleBouton="secondaire"
            className="shadow-lg"
          />
        )}

        {utilisateurPeut.terminerApresImpression && (
          <BoutonTerminerApresImpression
            requete={requete}
            styleBouton="secondaire"
            className="shadow-lg"
          />
        )}
      </BoutonListeDeroulante>

      {utilisateurPeut.validerEtTerminer && <BoutonValiderTerminer requete={requete} />}

      {utilisateurPeut.signer && (
        <>
          <SignatureDelivrance
            numerosFonctionnel={[requete.numero]}
            titreBouton="Terminer et signer"
            titreModale="Signature"
            apreSignature={succes => succes && navigate(LiensRECE.genererLien(INFO_PAGE_MES_REQUETES_DELIVRANCE.url))}
            donneesAvertissementsMentions={{ acte: acte, documents: requete.documentsReponses }}
            chargerDocumentsAuClic
          />
          {FFEstActif.delivranceExtraitCopie && (
            <Bouton
              title="Terminer"
              onClick={onClickTerminer}
              disabled={!utilisateurPeut.terminer}
            >
              Terminer
            </Bouton>
          )}
        </>
      )}
    </>
  );
};
