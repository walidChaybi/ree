import { IStatutCourant } from "@model/requete/IStatutCourant";
import { ELibelleNatureActeTranscrit, ENatureActeTranscrit } from "@model/requete/NatureActeTranscription";
import { Provenance } from "@model/requete/enum/Provenance";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { AccordionRece } from "@widget/accordion/AccordionRece";
import React from "react";
import { LigneAccordion } from "./LigneAccordion";

interface AccordionTranscriptionMineureMajeureProps {
  numeroTeledossier?: string;
  natureActe?: ENatureActeTranscrit;
  sousType: SousTypeCreation;
  statutCourant?: IStatutCourant;
  provenanceRequete?: Provenance;
  dateCreation: string;
  numeroFonctionnel?: string;
}

export const AccordionTranscriptionMineureMajeure: React.FC<AccordionTranscriptionMineureMajeureProps> = props => {
  return (
    <div className="AccordionTranscriptionMineureMajeure">
      <AccordionRece
        key={`${props.numeroTeledossier}`}
        titre={`"Transcription" ${props.natureActe ? ELibelleNatureActeTranscrit[props.natureActe].long : ""}`}
        className={{
          container: "accordionContainer",
          content: "accordionContent",
          title: "tagTitleAccordion"
        }}
        expanded={false}
      >
        <LigneAccordion
          texte={props.numeroTeledossier}
          ariaLabel={"Numéro de télédossier"}
        />

        <div className="accordionTexteDouble">
          <LigneAccordion texte={props.sousType?.libelle} />
          <LigneAccordion
            label={"Statut"}
            texte={props.statutCourant?.statut.libelle}
            ariaLabel={"Statut de la requête"}
          />
        </div>

        <div className="accordionTexteDouble">
          <LigneAccordion texte={props.provenanceRequete?.libelle} />
          <LigneAccordion
            label={"Date création"}
            texte={props.dateCreation}
            ariaLabel={"Date de création"}
          />
        </div>

        <LigneAccordion
          label={"Numéro fonctionnel"}
          texte={props.numeroFonctionnel}
          ariaLabel={"Numéro fonctionnel"}
        />
      </AccordionRece>
    </div>
  );
};
