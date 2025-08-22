import { EvenementUnion } from "@model/requete/IEvenementUnion";
import { ITitulaireRequeteCreation, TitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { resume } from "@pages/requeteCreation/commun/Labels";
import { DEUX, UN } from "@util/Utils";
import { AccordionRece } from "@widget/accordion/AccordionRece";
import React from "react";
import { LigneAccordion } from "./LigneAccordion";

interface AccordionTranscriptionTitulaireProps {
  titulaires?: ITitulaireRequeteCreation[];
}

function formatNomSouhaite(nomSouhaite?: string): string | undefined {
  return nomSouhaite ? `(${"souhaité"} : ${nomSouhaite})` : "";
}

function formatNomsEtNomSouhaite(titulaire?: ITitulaireRequeteCreation): string {
  return `${TitulaireRequeteCreation.getNomNaissanceOuSNP(titulaire)} ${formatNomSouhaite(titulaire?.nomSouhaite)}`;
}

export const AccordionTranscriptionTitulaire: React.FC<AccordionTranscriptionTitulaireProps> = props => {
  const classeNameUnSeulTitulaire = props.titulaires && props.titulaires?.length < DEUX ? "contenuAccordionUnSeulElement" : "";

  function getTitreAccordionTitulaire(): string {
    return `${resume.titulaire}${props.titulaires && props.titulaires?.length > UN ? "s" : ""}`;
  }

  function getDateLieuReconnaissance(titulaire: ITitulaireRequeteCreation): string | undefined {
    const evenementReconnaissance = TitulaireRequeteCreation.getEvenementUnionTypeReconnaissance(titulaire);

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
                key={`${titulaire.dateNaissanceFormatee ?? "inconnue"}_${titulaire.nomNaissance ?? "inconnu"}`}
                className={`contenuBlocAccordion ${classeNameUnSeulTitulaire}`}
              >
                <LigneAccordion
                  texte={formatNomsEtNomSouhaite(titulaire)}
                  ariaLabel={"Nom naissance et nom souhaité"}
                />

                <LigneAccordion
                  texte={TitulaireRequeteCreation.getPrenomsOuSPC(titulaire)}
                  ariaLabel={"Prénoms"}
                />

                <LigneAccordion
                  texte={TitulaireRequeteCreation.getSexe(titulaire)}
                  ariaLabel={"Sexe"}
                />

                <LigneAccordion
                  texte={titulaire.dateNaissanceFormatee}
                  ariaLabel={"Date de naissance"}
                />

                <LigneAccordion
                  texte={titulaire.lieuNaissanceFormate}
                  ariaLabel={"Lieu de naissance"}
                />

                <LigneAccordion
                  label={"Reconnaissance"}
                  texte={getDateLieuReconnaissance(titulaire)}
                  ariaLabel={"Reconnaissance"}
                />
              </div>
            );
          })}
        </div>
      </AccordionRece>
    </div>
  );
};
