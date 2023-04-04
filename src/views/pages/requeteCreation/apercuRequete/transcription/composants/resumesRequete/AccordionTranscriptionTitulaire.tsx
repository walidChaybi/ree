import { EvenementUnion } from "@model/requete/IEvenementUnion";
import {
  ITitulaireRequeteCreation,
  TitulaireRequeteCreation
} from "@model/requete/ITitulaireRequeteCreation";
import { resume } from "@pages/requeteCreation/commun/Labels";
import { DEUX, getLibelle, UN } from "@util/Utils";
import { AccordionRece } from "@widget/accordion/AccordionRece";
import React from "react";
import { LigneAccordion } from "./LigneAccordion";

export interface AccordionTranscriptionTitulaireProps {
  titulaires?: ITitulaireRequeteCreation[];
}

export function formatNomSouhaite(nomSouhaite?: string): string | undefined {
  return nomSouhaite ? `(${getLibelle("souhaité")} : ${nomSouhaite})` : "";
}

export function formatNomsEtNomSouhaite(
  nomNaissance?: string,
  nomSouhaite?: string
): string {
  return `${nomNaissance} ${formatNomSouhaite(nomSouhaite)}`;
}

export const AccordionTranscriptionTitulaire: React.FC<
  AccordionTranscriptionTitulaireProps
> = props => {
  const classeNameUnSeulTitulaire =
    props.titulaires && props.titulaires?.length < DEUX
      ? "contenuAccordionUnSeulElement"
      : "";

  function getTitreAccordionTitulaire(): string {
    return `${getLibelle(resume.titulaire)}${
      props.titulaires && props.titulaires?.length > UN ? "s" : ""
    }`;
  }

  function getDateLieuReconnaissance(
    titulaire: ITitulaireRequeteCreation
  ): string | undefined {
    const evenementReconnaissance =
      TitulaireRequeteCreation.getEvenementUnionTypeReconnaissance(titulaire);

    return EvenementUnion.getDateEtLieuFormate(evenementReconnaissance);
  }

  return (
    <div className="AccordionTranscriptionTitulaire">
      <AccordionRece
        key={`${props.titulaires}`}
        titre={getTitreAccordionTitulaire()}
        className={{
          container: "accordionContainer",
          content: "accordionContent",
          title: "tagTitleAccordion"
        }}
        expanded={true}
      >
        <div className="contenuAccordion">
          {props.titulaires?.map(titulaire => {
            return (
              <div
                key={titulaire.dateNaissanceFormatee + titulaire.nomNaissance}
                className={`contenuBlocAccordion  ${classeNameUnSeulTitulaire}`}
              >
                <LigneAccordion
                  texte={formatNomsEtNomSouhaite(
                    titulaire.nomNaissance,
                    titulaire.nomSouhaite
                  )}
                  ariaLabel={getLibelle("Nom naissance et nom souhaité")}
                />

                <LigneAccordion
                  texte={TitulaireRequeteCreation.getPrenomsOuSPC(titulaire)}
                  ariaLabel={getLibelle("Prénoms")}
                />

                <LigneAccordion
                  texte={TitulaireRequeteCreation.getSexe(titulaire)}
                  ariaLabel={getLibelle("Sexe")}
                />

                <LigneAccordion
                  texte={titulaire.dateNaissanceFormatee}
                  ariaLabel={getLibelle("Date de naissance")}
                />

                <LigneAccordion
                  texte={titulaire.lieuNaissanceFormate}
                  ariaLabel={getLibelle("Lieu de naissance")}
                />

                <LigneAccordion
                  label={getLibelle("Reconnaissance")}
                  texte={getDateLieuReconnaissance(titulaire)}
                  ariaLabel={getLibelle("Reconnaissance")}
                />
              </div>
            );
          })}
        </div>
      </AccordionRece>
    </div>
  );
};
