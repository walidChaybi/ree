import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import { IUuidRequeteParams } from "../../../../model/requete/v2/IUuidRequeteParams";
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

export interface DataRMCAuto {
  dataRMCAutoActe: IResultatRMCActe[];
  dataTableauRMCAutoActe: IParamsTableau;
  dataRMCAutoInscription: IResultatRMCInscription[];
  dataTableauRMCAutoInscription: IParamsTableau;
}

export const ApercuRequetePriseEnChargePage: React.FC = () => {
  const { idRequete } = useParams<IUuidRequeteParams>();

  const history = useHistory();

  const [dataHistory] = useState<DataRMCAuto>(
    history?.location?.state as DataRMCAuto
  );

  const { detailRequeteState } = useDetailRequeteApiHook(idRequete);

  const [requete, setRequete] = useState<IRequeteDelivrance>();

  useEffect(() => {
    if (detailRequeteState) {
      setRequete(detailRequeteState as IRequeteDelivrance);
    }
  }, [detailRequeteState]);

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
      {requete && (
        <ProtectionApercu
          statut={requete.statutCourant?.statut}
          type={requete.type}
        >
          {isFenetreOuverte === true && (
            <FenetreDocumentReponse
              toggleFenetre={toggleFenetre}
              numRequete={requete?.numero}
              idDocument={documentReponse?.id}
              nom={getValeurOuVide(documentReponse?.nom)}
            />
          )}
          <BandeauRequete detailRequete={requete} />
          <div className="contenu-requete">
            <ApercuRequetePriseEnChargePartieGauche
              detailRequete={requete}
              openFenetre={openFenetre}
            />
            <ApercuRequetePriseEnChargePartieDroite
              detailRequete={requete}
              dataHistory={dataHistory}
            />
          </div>
        </ProtectionApercu>
      )}
    </div>
  );
};
