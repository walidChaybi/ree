import { Provenance } from "@model/requete/enum/Provenance";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { IStatutCourant } from "@model/requete/IStatutCourant";
import { NatureActeTranscription } from "@model/requete/NatureActeTranscription";
import { getLibelle } from "@util/Utils";
import { AccordionRece } from "@widget/accordion/AccordionRece";
import React from "react";
import { LigneAccordion } from "./LigneAccordion";

export interface AccordionTranscriptionMineureMajeureProps {
  numeroTeledossier?: string;
  natureActe?: NatureActeTranscription;
  sousType: SousTypeCreation;
  statutCourant?: IStatutCourant;
  provenanceRequete?: Provenance;
  dateCreation: string;
  numeroFonctionnel?: string;
}

export const AccordionTranscriptionMineureMajeure: React.FC<
  AccordionTranscriptionMineureMajeureProps
> = props => {
  return (
    <div className="AccordionTranscriptionMineureMajeure">
      <AccordionRece
        key={`${props.numeroTeledossier}`}
        titre={`${getLibelle("Transcription")} ${props.natureActe?.libelle}`}
        className={{
          container: "accordionContainer",
          content: "accordionContent",
          title: "tagTitleAccordion"
        }}
        expanded={false}
      >
        <LigneAccordion
          texte={props.numeroTeledossier}
          ariaLabel={getLibelle("Numéro de télédossier")}
        />

        <div className="accordionTexteDouble">
          <LigneAccordion texte={props.sousType?.libelle} />
          <LigneAccordion
            label={getLibelle("Statut")}
            texte={props.statutCourant?.statut.libelle}
            ariaLabel={getLibelle("Statut de la requête")}
          />
        </div>

        <div className="accordionTexteDouble">
          <LigneAccordion texte={props.provenanceRequete?.libelle} />
          <LigneAccordion
            label={getLibelle("Date création")}
            texte={props.dateCreation}
            ariaLabel={getLibelle("Date de création")}
          />
        </div>

        <LigneAccordion
          label={getLibelle("Numéro fonctionnel")}
          texte={props.numeroFonctionnel}
          ariaLabel={getLibelle("Numéro fonctionnel")}
        />
      </AccordionRece>
    </div>
  );
};
