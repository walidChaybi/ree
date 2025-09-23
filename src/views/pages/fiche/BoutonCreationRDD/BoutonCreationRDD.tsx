import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import { useEffect, useState } from "react";
import AfficherMessage from "../../../../utils/AfficherMessage";
import { ICreationRequeteDelivranceParams, useCreationRequeteDelivranceRDD } from "../hook/CreerRDDApiHook";
import { mappingActeVersRequeteDelivrance } from "../hook/mappingActeVersRequeteDelivrance";
import "./scss/BoutonCreationRDD.scss";

type BoutonCreationRDDProps = {
  label: string;
  labelPopin: string;
  acte: FicheActe;
  numeroFonctionnel?: string;
};

export const BoutonCreationRDD = (props: BoutonCreationRDDProps) => {
  const [popinOpen, setPopinOpen] = useState(false);
  const [creationRequeteDelivranceParams, setCreationRequeteDelivranceParams] = useState<ICreationRequeteDelivranceParams>();
  const resultat = useCreationRequeteDelivranceRDD(creationRequeteDelivranceParams);

  useEffect(() => {
    if (resultat) {
      AfficherMessage.succes("La requête a bien été enregistrée.", { fermetureAuto: true });
    }
  }, [resultat]);

  const messagesPopin = [props.labelPopin];
  const boutonsPopin = [
    {
      label: "Non",
      action: () => {
        setPopinOpen(false);
      }
    },
    {
      label: "Oui",
      action: () => {
        setPopinOpen(false);
        setCreationRequeteDelivranceParams({
          requete: mappingActeVersRequeteDelivrance(props.acte, props.numeroFonctionnel),
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
          aria-label={props.label}
          type="submit"
          onClick={() => setPopinOpen(true)}
        >
          {props.label}
        </button>
      </div>

      <ConfirmationPopin
        disablePortal={true}
        estOuvert={popinOpen}
        messages={messagesPopin}
        boutons={boutonsPopin}
      />
    </>
  );
};
