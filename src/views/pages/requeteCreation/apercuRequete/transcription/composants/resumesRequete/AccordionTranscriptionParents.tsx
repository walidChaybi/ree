import { EvenementUnion } from "@model/requete/IEvenementUnion";
import {
  ITitulaireRequeteCreation,
  TitulaireRequeteCreation
} from "@model/requete/ITitulaireRequeteCreation";
import { resume } from "@pages/requeteCreation/commun/Labels";
import { DEUX, estRenseigne, getLibelle, UN } from "@util/Utils";
import { AccordionRece } from "@widget/accordion/AccordionRece";
import React from "react";
import { LigneAccordion } from "./LigneAccordion";

export interface AccordionTranscriptionParentsProps {
  parents?: ITitulaireRequeteCreation[];
}

export const AccordionTranscriptionParents: React.FC<
  AccordionTranscriptionParentsProps
> = props => {
  const estPresentUnParent =
    props.parents && props.parents?.length < DEUX
      ? "contenuAccordionUnSeulElement"
      : "";

  function getTitreAccordionParents(): string {
    return `${getLibelle(resume.parent)}${
      props.parents && props.parents?.length > UN ? "s" : ""
    }`;
  }

  function getDateLieuMariage(
    titulaire?: ITitulaireRequeteCreation
  ): string | undefined {
    const evenementReconnaissance =
      TitulaireRequeteCreation.getEvenementUnionTypeMariage(titulaire);

    return EvenementUnion.getDateEtLieuFormate(evenementReconnaissance);
  }

  function formatNationalites(nationalites: string[]): string | undefined {
    return nationalites ? nationalites.join(", ") : undefined;
  }

  return (
    <div className="AccordionTranscriptionParents">
      <AccordionRece
        key={`${props.parents}`}
        titre={getTitreAccordionParents()}
        className={{
          container: "accordionContainer",
          content: "accordionContent",
          title: "tagTitleAccordion"
        }}
        expanded={estRenseigne(props.parents)}
        disabled={!estRenseigne(props.parents)}
      >
        <div className="contenuAccordion">
          {props.parents?.map(parent => {
            return (
              <div
                key={parent.nomNaissance + parent.dateNaissanceFormatee}
                className={`contenuBlocAccordion  ${estPresentUnParent}`}
              >
                <LigneAccordion
                  texte={TitulaireRequeteCreation.getNomNaissanceOuSNP(parent)}
                  ariaLabel={getLibelle("Nom naissance")}
                />

                <LigneAccordion
                  texte={TitulaireRequeteCreation.getPrenomsOuSPC(parent)}
                  ariaLabel={getLibelle("Prénoms")}
                />

                <LigneAccordion
                  texte={TitulaireRequeteCreation.getSexe(parent)}
                  ariaLabel={getLibelle("Sexe")}
                />

                <LigneAccordion
                  texte={parent.dateNaissanceFormatee}
                  ariaLabel={getLibelle("Date de naissance")}
                />

                <LigneAccordion
                  texte={parent.lieuNaissanceFormate}
                  ariaLabel={getLibelle("Lieu de naissance")}
                />

                <LigneAccordion
                  texte={formatNationalites(
                    TitulaireRequeteCreation.getTableauDeNationalites(parent)
                  )}
                  ariaLabel={getLibelle("Nationalité")}
                />

                <LigneAccordion
                  texte={parent.paysStatutRefugie}
                  label={getLibelle("Pays statut réfugié")}
                  ariaLabel={getLibelle("Pays statut réfugié")}
                />

                <LigneAccordion
                  texte={parent.paysOrigine}
                  label={getLibelle("Pays d'origine")}
                  ariaLabel={getLibelle("Pays d'origine")}
                />
              </div>
            );
          })}
        </div>
        <LigneAccordion
          texte={getDateLieuMariage(props.parents?.[0])}
          label={getLibelle("Mariage")}
          ariaLabel={getLibelle("Date de mariage")}
        />
      </AccordionRece>
    </div>
  );
};
