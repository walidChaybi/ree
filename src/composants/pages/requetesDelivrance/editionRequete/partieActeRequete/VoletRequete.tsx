import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import React from "react";
import { ResumeRequetePartieHaute } from "../../../../../views/pages/requeteDelivrance/apercuRequete/apercuRequetePartieGauche/contenu/resume/ResumeRequetePartieHaute";
import ConteneurAccordeon from "../../../../commun/conteneurs/accordeon/ConteneurAccordeon";
import ObservationsRequete from "../../commun/requete/ObservationsRequete";
import TypeRequete from "../../commun/requete/TypeRequete";

interface IVoletRequeteProps {
  requete: IRequeteDelivrance;
}

const VoletRequete: React.FC<IVoletRequeteProps> = ({ requete }) => (
  <div className="flex flex-col gap-2">
    <ConteneurAccordeon
      titre={`Description requête ${requete.numero}`}
      ouvertParDefaut
    >
      <ResumeRequetePartieHaute requete={requete} />
    </ConteneurAccordeon>

    <ConteneurAccordeon titre="Type requête">
      <TypeRequete requete={requete} />
    </ConteneurAccordeon>

    <ConteneurAccordeon
      titre="Observations requête"
      ouvertParDefaut
    >
      <ObservationsRequete requete={requete} />
    </ConteneurAccordeon>

    <ConteneurAccordeon titre="Suivi requête">
      <div className="grid gap-1 p-4 text-left">
        {requete.actions
          ?.sort((actA, actB) => (actA.numeroOrdre > actB.numeroOrdre ? 1 : -1))
          .map(action => (
            <div key={action.id}>{action.phraseHistorique}</div>
          ))}
      </div>
    </ConteneurAccordeon>
  </div>
);
export default VoletRequete;
