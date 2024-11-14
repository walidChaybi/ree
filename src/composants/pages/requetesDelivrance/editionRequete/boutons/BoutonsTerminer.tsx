import {
  RECEContextActions,
  RECEContextData,
} from "@core/contexts/RECEContext";
import {
  IOfficier,
  officierHabiliterPourLeDroit,
} from "@model/agent/IOfficier";
import { Droit } from "@model/agent/enum/Droit";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { DocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { mappingRequeteDelivranceToRequeteTableau } from "@pages/requeteDelivrance/apercuRequete/mapping/ReqDelivranceToReqTableau";
import { validerMentionsPlusieursDocuments } from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/mentions/GestionMentionsUtil";
import { URL_MES_REQUETES_DELIVRANCE } from "@router/ReceUrls";
import { checkDirty } from "@util/Utils";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import React, { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Bouton from "../../../../commun/bouton/Bouton";
import BoutonListeDeroulante from "../../../../commun/bouton/BoutonListeDeroulante";
import { BoutonSignature } from "../../../../commun/bouton/boutonsAvecAction/BoutonSignature";
import { BoutonTerminerApresImpression } from "./BoutonTerminerApresImpression";
import { BoutonTransmettreAValideur } from "./BoutonTransmettreAValideur";
import { BoutonValiderTerminer } from "./BoutonValiderTerminer";

interface BoutonsTerminerProps {
  requete: IRequeteDelivrance;
  acte?: IFicheActe;
}

export const BoutonsTerminer: React.FC<BoutonsTerminerProps> = ({
  requete,
  acte,
}) => {
  const navigate = useNavigate();
  const [estDisabled, setEstDisabled] = useState(true);
  const { isDirty, utilisateurConnecte } = useContext(RECEContextData);
  const { setIsDirty } = useContext(RECEContextActions);

  const afficherBoutonValiderTerminer = (requete: IRequeteDelivrance) =>
    (gestionnaireFeatureFlag.estActif(
      FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES,
    ) &&
      SousTypeDelivrance.estRDDouRDCouRDDP(requete?.sousType)) ||
    (gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_CS) &&
      SousTypeDelivrance.estRDCSDouRDCSC(requete.sousType));

  const estPossibleDeSigner = (
    statut: StatutRequete,
    sousTypeDelivrance: SousTypeDelivrance,
    utilisateurConnecte: IOfficier,
  ): boolean => {
    return (
      officierHabiliterPourLeDroit(
        utilisateurConnecte,
        Droit.SIGNER_DELIVRANCE_DEMAT,
      ) &&
      StatutRequete.estASigner(statut) &&
      SousTypeDelivrance.estSousTypeSignable(sousTypeDelivrance)
    );
  };

  const possibleDeTransmettreAValideur = (statut: StatutRequete): boolean => {
    return (
      StatutRequete.estASignerOuAValider(statut) &&
      gestionnaireFeatureFlag.estActif(
        FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES,
      )
    );
  };

  const aDroitSignerEtStatutSigner = estPossibleDeSigner(
    requete.statutCourant.statut,
    requete.sousType,
    utilisateurConnecte,
  );

  const afficheBoutonTransmettreAValideur = possibleDeTransmettreAValideur(
    requete.statutCourant.statut,
  );
  const afficherBoutonTerminerApresImpression =
    afficherBoutonValiderTerminer(requete) &&
    (requete.statutCourant.statut === StatutRequete.A_VALIDER ||
      requete.statutCourant.statut === StatutRequete.A_SIGNER) &&
    (requete.sousType === SousTypeDelivrance.RDC ||
      requete.sousType === SousTypeDelivrance.RDCSC);

  const mAppartient =
    requete.idUtilisateur === utilisateurConnecte?.idUtilisateur;

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
        requete.documentsReponses,
      );
    }
  }, [acte, requete.documentsReponses, isDirty, setIsDirty]);

  const actionApresSignature = useCallback(
    (allsigned: boolean) => {
      if (allsigned === true) {
        onClickTerminer();
      }
    },
    [onClickTerminer],
  );

  return (
    <>
      <BoutonListeDeroulante titre="Autres options" styleBouton="secondaire">
        {afficheBoutonTransmettreAValideur && (
          <BoutonTransmettreAValideur
            idRequete={requete.id}
            styleBouton="secondaire"
            className="shadow-lg"
          />
        )}
        {afficherBoutonTerminerApresImpression && (
          <BoutonTerminerApresImpression
            requete={requete}
            styleBouton="secondaire"
            className="shadow-lg"
          />
        )}
      </BoutonListeDeroulante>
      {afficherBoutonValiderTerminer(requete) && (
        <BoutonValiderTerminer requete={requete} />
      )}

      {aDroitSignerEtStatutSigner && (
        <>
          <BoutonSignature
            checkDirtyActive={true}
            libelle="Terminer et signer"
            requeteASignerProp={[
              {
                requete: mappingRequeteDelivranceToRequeteTableau(requete),
                acte,
              },
            ]}
            reloadData={actionApresSignature}
            uniqueSignature={true}
            connectedUser={utilisateurConnecte}
            validerMentionsPlusieursDocuments={
              validerMentionsPlusieursDocuments
            }
          />
          {gestionnaireFeatureFlag.estActif(
            FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES,
          ) && (
            <Bouton
              title="Terminer"
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
