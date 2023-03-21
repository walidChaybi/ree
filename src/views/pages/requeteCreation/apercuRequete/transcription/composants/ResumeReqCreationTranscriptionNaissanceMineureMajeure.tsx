import { Requete } from "@model/requete/IRequete";
import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import { OperationLocaleEnCoursSimple } from "@widget/attente/OperationLocaleEnCoursSimple";
import React from "react";
import {
  getParents,
  getTitulaires
} from "../ApercuReqCreationTranscriptionUtils";
import { AccordionTranscriptionMineureMajeure } from "./resumesRequete/AccordionTranscriptionMineureMajeure";
import { AccordionTranscriptionParents } from "./resumesRequete/AccordionTranscriptionParents";
import { AccordionTranscriptionRequerant } from "./resumesRequete/AccordionTranscriptionRequerant";
import { AccordionTranscriptionTitulaire } from "./resumesRequete/AccordionTranscriptionTitulaire";

export interface ResumeRequeteCreationTranscriptionNaissanceMineureMajeureProps {
  requete?: IRequeteCreation;
}

export const ResumeRequeteCreationTranscriptionNaissanceMineureMajeure: React.FC<
  ResumeRequeteCreationTranscriptionNaissanceMineureMajeureProps
> = props => {
  return (
    <div className="ResumeRequeteCreationTranscriptionNaissanceMineureMajeure">
      {props.requete ? (
        <>
          <AccordionTranscriptionMineureMajeure
            natureActe={props.requete?.natureActeTranscrit}
            statutCourant={props.requete.statutCourant}
            provenanceRequete={props.requete.provenance}
            dateCreation={Requete.getDateCreation(props.requete)}
            numeroFonctionnel={props.requete.numeroFonctionnel}
            sousType={props.requete.sousType}
            numeroTeledossier={
              props.requete.provenanceNatali?.numeroDossierNational
            }
          />

          <AccordionTranscriptionTitulaire
            titulaires={getTitulaires(props.requete.titulaires)}
          />

          <AccordionTranscriptionParents
            parents={getParents(props.requete.titulaires)}
          />

          <AccordionTranscriptionRequerant
            requerant={props.requete.requerant}
          />
        </>
      ) : (
        <OperationLocaleEnCoursSimple />
      )}
    </div>
  );
};
