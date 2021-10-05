import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IResultatRMCActe } from "../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { IParamsTableau } from "../../../common/util/GestionDesLiensApi";
import { ProtectionApercu } from "../../../common/util/route/Protection/ProtectionApercu";
import { getValeurOuVide } from "../../../common/util/Utils";
import { getLibelle } from "../../../common/widget/Text";
import { useDetailRequeteApiHook } from "../../detailRequete/hook/DetailRequeteHook";
import { BandeauRequete } from "../contenu/BandeauRequete";
import { InfoDocumentAffiche } from "../contenu/document/DocumentsReponses";
import { FenetreDocumentReponse } from "../contenu/document/FenetreDocumentReponse";
import { ApercuRequetePriseEnChargePartieDroite } from "./contenu/ApercuRequetePriseEnChargePartieDroite";
import { ApercuRequetePriseEnChargePartieGauche } from "./contenu/ApercuRequetePriseEnChargePartieGauche";

interface IdRequeteParams {
  idRequete: string;
}

interface DataRMCAuto {
  dataRequetes: any[];
  dataRMCAutoActe: IResultatRMCActe[];
  dataTableauRMCAutoActe: IParamsTableau;
  dataRMCAutoInscription: IResultatRMCInscription[];
  dataTableauRMCAutoInscription: IParamsTableau;
}

export const ApercuRequetePriseEnChargePage: React.FC = () => {
  const { idRequete } = useParams<IdRequeteParams>();

  const history = useHistory();

  const [dataHistory] = useState<DataRMCAuto>(
    history?.location?.state as DataRMCAuto
  );

  const { detailRequeteState } = useDetailRequeteApiHook(idRequete);

  /* Etat gestion des documents délivrés */
  const [documentReponse, setDocumentReponse] = useState<InfoDocumentAffiche>({
    id: "",
    nom: ""
  });

  const [isFenetreOuverte, setIsFenetreOuverte] = useState<boolean>(false);

  function toggleFenetre() {
    setIsFenetreOuverte(!isFenetreOuverte);
  }

  function openFenetre(infoDoc: InfoDocumentAffiche) {
    setDocumentReponse(infoDoc);
    toggleFenetre();
  }

  return (
    <div className="ApercuRequetePriseEnCharge">
      <title>{getLibelle("Aperçu de la requête en prise en charge")}</title>
      {detailRequeteState && (
        <ProtectionApercu statut={detailRequeteState?.statutCourant?.statut}>
          {isFenetreOuverte === true && (
            <FenetreDocumentReponse
              toggleFenetre={toggleFenetre}
              numRequete={detailRequeteState?.numero}
              idDocument={documentReponse?.id}
              nom={getValeurOuVide(documentReponse?.nom)}
            />
          )}
          <BandeauRequete detailRequete={detailRequeteState} />
          <div className="contenu-requete">
            <ApercuRequetePriseEnChargePartieGauche
              idRequete={idRequete}
              detailRequete={detailRequeteState}
              dataRequetes={dataHistory?.dataRequetes}
              openFenetre={openFenetre}
            />
            <ApercuRequetePriseEnChargePartieDroite
              detailRequete={detailRequeteState}
              dataRMCAutoActe={dataHistory?.dataRMCAutoActe}
              dataTableauRMCAutoActe={dataHistory?.dataTableauRMCAutoActe}
              dataRMCAutoInscription={dataHistory?.dataRMCAutoInscription}
              dataTableauRMCAutoInscription={
                dataHistory?.dataTableauRMCAutoInscription
              }
            />
          </div>
        </ProtectionApercu>
      )}
    </div>
  );
};
