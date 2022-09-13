import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import messageManager from "@util/messageManager";
import { getLibelle } from "@util/Utils";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import React, { useEffect, useState } from "react";
import {
  ICreationRequeteDelivranceParams,
  useCreationRequeteDelivranceRDD
} from "../hook/CreerRDDApiHook";
import { mappingActeVersRequeteDelivrance } from "../hook/mappingActeVersRequeteDelivrance";
import "./scss/BoutonCreationRDD.scss";

type BoutonCreationRDDProps = {
  label: string;
  labelPopin: string;
  acte: IFicheActe;
  numeroFonctionnel?: string;
};

export const BoutonCreationRDD = (props: BoutonCreationRDDProps) => {
  const [popinOpen, setPopinOpen] = useState(false);
  const [creationRequeteDelivranceParams, setCreationRequeteDelivranceParams] =
    useState<ICreationRequeteDelivranceParams>();
  const resultat = useCreationRequeteDelivranceRDD(
    creationRequeteDelivranceParams
  );

  useEffect(() => {
    if (resultat) {
      messageManager.showSuccessAndClose(
        getLibelle("La requête a bien été enregistrée.")
      );
    }
  }, [resultat]);

  const messagesPopin = [getLibelle(props.labelPopin)];
  const boutonsPopin = [
    {
      label: getLibelle("Non"),
      action: () => {
        setPopinOpen(false);
      }
    },
    {
      label: getLibelle("Oui"),
      action: () => {
        setPopinOpen(false);
        setCreationRequeteDelivranceParams({
          requete: mappingActeVersRequeteDelivrance(
            props.acte,
            props.numeroFonctionnel
          ),
          futurStatut: StatutRequete.A_TRAITER
        });
      }
    }
  ];

  // Obligatoire pour les styles qui sont chargés dynamiquement
  useEffect(() => {
    if (popinOpen) {
      const event = new CustomEvent("refreshStyles");
      if (window.top) {
        window.top.dispatchEvent(event);
      }
    }
  }, [popinOpen]);

  return (
    <>
      <div className="BoutonCreationRDD">
        <button
          aria-label={getLibelle(props.label)}
          type="submit"
          onClick={() => setPopinOpen(true)}
        >
          {getLibelle(props.label)}
        </button>
      </div>

      <ConfirmationPopin
        disablePortal={true}
        isOpen={popinOpen}
        messages={messagesPopin}
        boutons={boutonsPopin}
      />
    </>
  );
};
