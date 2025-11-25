import { EvenementUnion } from "@model/requete/IEvenementUnion";
import { ITitulaireRequeteCreation, TitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { DEUX, UN, estRenseigne } from "@util/Utils";
import { AccordionRece } from "@widget/accordion/AccordionRece";
import React from "react";
import { resume } from "../../../../commun/Labels";
import { LigneAccordion } from "./LigneAccordion";

interface AccordionTranscriptionParentsProps {
  parents?: ITitulaireRequeteCreation[];
}

export const AccordionTranscriptionParents: React.FC<AccordionTranscriptionParentsProps> = props => {
  const estPresentUnParent = props.parents && props.parents?.length < DEUX ? "contenuAccordionUnSeulElement" : "";

  const getTitreAccordionParents = (): string => {
    return `${resume.parent}${props.parents && props.parents?.length > UN ? "s" : ""}`;
  };

  const getDateLieuMariage = (titulaire?: ITitulaireRequeteCreation): string | undefined => {
    const evenementReconnaissance = TitulaireRequeteCreation.getEvenementUnionTypeMariage(titulaire);

    return EvenementUnion.getDateEtLieuFormate(evenementReconnaissance);
  };

  const formatNationalites = (nationalites: string[]): string | undefined => {
    return nationalites ? nationalites.join(", ") : undefined;
  };

  return (
    <div className="AccordionTranscriptionParents">
      <AccordionRece
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
                key={`${parent.nomNaissance ?? "inconnu"}_${parent.dateNaissanceFormatee ?? "inconnue"}`}
                className={`contenuBlocAccordion ${estPresentUnParent}`}
              >
                <LigneAccordion
                  texte={TitulaireRequeteCreation.getNomNaissanceOuSNP(parent)}
                  ariaLabel={"Nom naissance"}
                />

                <LigneAccordion
                  texte={TitulaireRequeteCreation.getPrenomsOuSPC(parent)}
                  ariaLabel={"Prénoms"}
                />

                <LigneAccordion
                  texte={TitulaireRequeteCreation.getSexe(parent)}
                  ariaLabel={"Sexe"}
                />

                <LigneAccordion
                  texte={parent.dateNaissanceFormatee}
                  ariaLabel={"Date de naissance"}
                />

                <LigneAccordion
                  texte={parent.lieuNaissanceFormate}
                  ariaLabel={"Lieu de naissance"}
                />

                <LigneAccordion
                  texte={formatNationalites(TitulaireRequeteCreation.getTableauDeNationalites(parent))}
                  ariaLabel={"Nationalité"}
                />

                <LigneAccordion
                  texte={parent.paysStatutRefugie}
                  label={"Pays statut réfugié"}
                  ariaLabel={"Pays statut réfugié"}
                />

                <LigneAccordion
                  texte={parent.paysOrigine}
                  label={"Pays d'origine"}
                  ariaLabel={"Pays d'origine"}
                />
              </div>
            );
          })}
        </div>
        <LigneAccordion
          texte={getDateLieuMariage(props.parents?.[0])}
          label={"Mariage"}
          ariaLabel={"Date de mariage"}
        />
      </AccordionRece>
    </div>
  );
};
