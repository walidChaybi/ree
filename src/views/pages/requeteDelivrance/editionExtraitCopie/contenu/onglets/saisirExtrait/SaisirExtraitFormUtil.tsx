import {
  DERNIER_CONJOINT,
  EVENEMENT,
  PARENT_NAISS,
  TITULAIRE_EVT_1,
  TITULAIRE_EVT_2
} from "@composant/formulaire/ConstantesNomsForm";
import { IEvenement } from "@model/etatcivil/acte/IEvenement";
import { IFiliation } from "@model/etatcivil/acte/IFiliation";
import {
  ITitulaireActe,
  TitulaireActe
} from "@model/etatcivil/acte/ITitulaireActe";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { CODE_EXTRAIT_PLURILINGUE } from "@model/requete/enum/DocumentDelivranceConstante";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { getLibelle } from "@util/Utils";
import { AccordionRece } from "@widget/accordion/AccordionRece";
import { withNamespace } from "@widget/formulaire/utils/FormUtil";
import React from "react";
import { EvenementForm } from "../../../../../../common/composant/formulaire/EvenementForm";
import { DernierConjointForm } from "./contenu/sousFormulaires/DernierConjointForm";
import { getLabels } from "./contenu/sousFormulaires/LabelsUtil";
import { ParentNaissanceForm } from "./contenu/sousFormulaires/ParentNaissanceForm";
import { TitulaireEvenementForm } from "./contenu/sousFormulaires/TitulaireEvenementForm";

export function parentMemeSexeOuIndeterminCasPlurilingue(
  titulaires: ITitulaireActe[],
  documentsReponses: IDocumentReponse[]
) {
  return (
    titulaires.some(
      el => el != null && TitulaireActe.genreIndetermineOuParentDeMemeSexe(el)
    ) &&
    documentsReponses.some(
      el =>
        el.typeDocument ===
        DocumentDelivrance.getKeyForCode(CODE_EXTRAIT_PLURILINGUE)
    )
  );
}

export function getTitulairesEvenementsEtParentsForm(
  titulairesAMs: (ITitulaireActe | undefined)[],
  natureActe: NatureActe,
  titulaire1Parents: IFiliation[],
  titulaire2Parents: IFiliation[],
  evenement?: IEvenement
) {
  return (
    <>
      {natureActe !== NatureActe.NAISSANCE &&
        getEvenementForm(natureActe, evenement)}
      {/* Premier titulaire avec accordéon */}
      {titulairesAMs[0] &&
        getTitulaireEvenementForm(
          TITULAIRE_EVT_1,
          titulairesAMs[0],
          evenement,
          natureActe
        )}
      {natureActe === NatureActe.DECES &&
        titulairesAMs[0] &&
        getDernierConjointForm()}
      {/* Parents titulaire 1 */}
      {titulairesAMs[0] &&
        getTitulaireParentsForm(TITULAIRE_EVT_1, natureActe, titulaire1Parents)}

      {/* Deuxième titulaire avec accordéon */}
      {titulairesAMs[1] &&
        getTitulaireEvenementForm(
          TITULAIRE_EVT_2,
          titulairesAMs[1],
          evenement,
          natureActe
        )}
      {/* Parents titulaire 2 */}
      {titulairesAMs[1] &&
        getTitulaireParentsForm(TITULAIRE_EVT_2, natureActe, titulaire2Parents)}
    </>
  );
}

function getDernierConjointForm() {
  return (
    <AccordionRece expanded={true} titre={getLibelle("Dernier conjoint")}>
      <DernierConjointForm nom={DERNIER_CONJOINT} />
    </AccordionRece>
  );
}

function getEvenementForm(natureActe: NatureActe, evenement?: IEvenement) {
  return (
    <AccordionRece
      className={{ content: "AccordeonEvenementForm" }}
      expanded={true}
      titre={getLabels(natureActe).evenement}
    >
      <EvenementForm
        nom={EVENEMENT}
        labelDate={getLabels(natureActe).dateEvenement}
        labelLieu={getLabels(natureActe).lieuEvenement}
        evenement={evenement}
        afficheHeure={false}
        gestionEtrangerFrance={false}
      />
    </AccordionRece>
  );
}

function getTitulaireParentsForm(
  nomFormTitulaire: string,
  natureActe: NatureActe,
  parents: IFiliation[]
) {
  return parents.map((parent: IFiliation, index: number) => {
    const titreAccordeonParent = getLibelle(`Parent ${index + 1}`);
    return (
      <AccordionRece
        key={titreAccordeonParent}
        expanded={true}
        titre={titreAccordeonParent}
      >
        <ParentNaissanceForm
          nom={withNamespace(nomFormTitulaire, `${PARENT_NAISS}${index + 1}`)}
          parent={parent}
          sansDateAgeEtLieuNaissance={natureActe === NatureActe.DECES}
        />
      </AccordionRece>
    );
  });
}

function getTitulaireEvenementForm(
  nomFormTitulaire1: string,
  titulaire: ITitulaireActe,
  evenement: IEvenement | undefined,
  natureActe: NatureActe
) {
  return (
    <AccordionRece
      expanded={true}
      titre={getLabels(natureActe).titulaireEtOuEvenenement}
    >
      <TitulaireEvenementForm
        nom={nomFormTitulaire1}
        titulaire={titulaire}
        evenement={evenement}
        natureActe={natureActe}
      ></TitulaireEvenementForm>
    </AccordionRece>
  );
}
