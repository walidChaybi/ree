import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { officierHabiliterPourLeDroit } from "../../../../../../model/agent/IOfficier";
import { Droit } from "../../../../../../model/Droit";
import { StatutRequete } from "../../../../../../model/requete/enum/StatutRequete";
import { DocumentReponse } from "../../../../../../model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "../../../../../../model/requete/IRequeteDelivrance";
import { MigratorV1V2 } from "../../../../../common/util/migration/MigratorV1V2";
import { storeRece } from "../../../../../common/util/storeRece";
import { getLibelle } from "../../../../../common/util/Utils";
import { BoutonOperationEnCours } from "../../../../../common/widget/attente/BoutonOperationEnCours";
import { BoutonSignature } from "../../../../../common/widget/signature/BoutonSignature";
import { receUrl } from "../../../../../router/ReceUrls";
import { mappingRequeteDelivranceToRequeteTableau } from "../../mapping/ReqDelivranceToReqTableau";
import { BoutonValiderTerminer } from "./BoutonValiderTerminer";

interface BoutonsTerminerProps {
  requete: IRequeteDelivrance;
}

export const BoutonsTerminer: React.FC<BoutonsTerminerProps> = ({ requete }) => {
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
    receUrl.goBack(history);
  }, [history]);

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
      {MigratorV1V2.nEstPasRDDouRDCouEstEtape2Bis(requete) && (
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
          <BoutonOperationEnCours
            title={getLibelle("Terminer")}
            onClick={goBack}
            estDesactive={estDisabled}
            checkDirtyActive={true}
          >
            Terminer
          </BoutonOperationEnCours>
        </>
      )}
    </>
  );
};
