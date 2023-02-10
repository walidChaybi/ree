import {
  CONTRAT_MARIAGE,
  DATE_EVENEMENT,
  DERNIER_CONJOINT,
  DONNEES_COMPLEMENTAIRES_PLURILINGUE,
  EVENEMENT,
  PARENT_ADOPTANT_NAISS,
  PARENT_NAISS,
  TITULAIRE_EVT_1,
  TITULAIRE_EVT_2
} from "@composant/formulaire/ConstantesNomsForm";
import { EvenementForm } from "@composant/formulaire/EvenementForm";
import { EvenementValidationSchema } from "@composant/formulaire/validation/EvenementValidationSchema";
import { IEvenement } from "@model/etatcivil/acte/IEvenement";
import { FicheActe, IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IFiliation } from "@model/etatcivil/acte/IFiliation";
import {
  ITitulaireActe,
  TitulaireActe
} from "@model/etatcivil/acte/ITitulaireActe";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { ISaisieExtraitForm } from "@model/form/delivrance/ISaisieExtraitForm";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { CODE_EXTRAIT_PLURILINGUE } from "@model/requete/enum/DocumentDelivranceConstante";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { DEUX, estRenseigne, getLibelle, UN } from "@util/Utils";
import { AccordionRece } from "@widget/accordion/AccordionRece";
import { DateValidationSchema } from "@widget/formulaire/champsDate/DateComposeFormValidation";
import { withNamespace } from "@widget/formulaire/utils/FormUtil";
import React from "react";
import * as Yup from "yup";
import { ContratMariageForm } from "./contenu/sousFormulaires/ContratMariageForm";
import { DernierConjointForm } from "./contenu/sousFormulaires/DernierConjointForm";
import { DonneesComplementairesPlurilingue } from "./contenu/sousFormulaires/DonneesComplementairesPlurilingue";
import { getLabels } from "./contenu/sousFormulaires/LabelsUtil";
import { ParentNaissanceForm } from "./contenu/sousFormulaires/ParentNaissanceForm";
import TitulaireEvenementForm from "./contenu/sousFormulaires/TitulaireEvenementForm";
import { ContratMariageValidationSchema } from "./contenu/sousFormulaires/validation/ContratMariageValidationSchema";
import {
  TitulaireEvtActeDecesValidationSchema,
  TitulaireEvtActeMariageValidationSchema,
  TitulaireEvtActeNaissanceValidationSchema
} from "./contenu/sousFormulaires/validation/TitulaireEvenementFormValidation";
import "./scss/FormulaireSaisirExtrait.scss";

// Schéma de validation en sortie de champs
// Validation formulaire naissance
const ExtraitValidationNaissanceTitulaireSchema = Yup.object({
  [TITULAIRE_EVT_1]: TitulaireEvtActeNaissanceValidationSchema
});

// Validation formulaire décès
const ExtraitValidationDecesTitulaireSchema = Yup.object({
  [EVENEMENT]: EvenementValidationSchema,
  [TITULAIRE_EVT_1]: TitulaireEvtActeDecesValidationSchema
});

// Validation formulaire mariage
const ExtraitValidationMariageTitulairesSchema = Yup.object({
  [EVENEMENT]: Yup.object({
    [DATE_EVENEMENT]: DateValidationSchema,
    [CONTRAT_MARIAGE]: ContratMariageValidationSchema
  }),
  [TITULAIRE_EVT_1]: TitulaireEvtActeMariageValidationSchema,
  [TITULAIRE_EVT_2]: TitulaireEvtActeMariageValidationSchema
});

const ExtraitValidationMariageUnTitulaireSchema = Yup.object({
  [EVENEMENT]: Yup.object({
    [DATE_EVENEMENT]: DateValidationSchema,
    [CONTRAT_MARIAGE]: ContratMariageValidationSchema
  }),
  [TITULAIRE_EVT_1]: TitulaireEvtActeMariageValidationSchema
});

export function getValidationSchema(
  natureActe: NatureActe,
  titulairesAMs: ITitulaireActe[]
) {
  let validationSchema;
  switch (natureActe) {
    case NatureActe.NAISSANCE:
      validationSchema = ExtraitValidationNaissanceTitulaireSchema;
      break;

    case NatureActe.MARIAGE:
      if (titulairesAMs.length === DEUX) {
        validationSchema = ExtraitValidationMariageTitulairesSchema;
      } else {
        validationSchema = ExtraitValidationMariageUnTitulaireSchema;
      }
      break;

    case NatureActe.DECES:
      validationSchema = ExtraitValidationDecesTitulaireSchema;
      break;

    default:
      validationSchema = ExtraitValidationNaissanceTitulaireSchema;
      break;
  }

  return validationSchema;
}

export function parentMemeSexeOuIndeterminCasPlurilingue(
  titulaires: (ITitulaireActe | undefined)[],
  documentsReponses: IDocumentReponse[]
) {
  return (
    titulaires.some(
      titulaire =>
        titulaire != null &&
        TitulaireActe.genreIndetermineOuParentDeMemeSexe(titulaire)
    ) && unDocumentPlurilingueEstPresent(documentsReponses)
  );
}

export function titulairesMemeSexeOuIndeterminCasPlurilingue(
  titulaires: (ITitulaireActe | undefined)[],
  documentsReponses: IDocumentReponse[]
) {
  const pseudoActe = { titulaires } as IFicheActe;
  return (
    (FicheActe.aTitulairesDeMemeSexe(pseudoActe) ||
      FicheActe.aTitulaireGenreIndetermine(pseudoActe)) &&
    unDocumentPlurilingueEstPresent(documentsReponses)
  );
}

function unDocumentPlurilingueEstPresent(
  documentsReponses: IDocumentReponse[]
) {
  return documentsReponses.some(
    documentsReponse =>
      documentsReponse.typeDocument ===
      DocumentDelivrance.getKeyForCode(CODE_EXTRAIT_PLURILINGUE)
  );
}

export function getTitulairesEvenementsEtParentsForm(params: {
  titulairesAMs: (ITitulaireActe | undefined)[];
  natureActe: NatureActe;
  titulaire1Parents: IFiliation[];
  titulaire2Parents: IFiliation[];
  titulaire1ParentsAdoptants: IFiliation[];
  titulaire2ParentsAdoptants: IFiliation[];
  donneesComplementairesPlurilingue: boolean;
  evenement?: IEvenement;
  naissanceTitulaire1?: IEvenement;
  naissanceTitulaire2?: IEvenement;
  saisieVerrouillee: boolean;
}) {
  const {
    titulairesAMs,
    natureActe,
    titulaire1Parents,
    titulaire2Parents,
    titulaire1ParentsAdoptants,
    titulaire2ParentsAdoptants,
    donneesComplementairesPlurilingue,
    evenement,
    naissanceTitulaire1,
    naissanceTitulaire2,
    saisieVerrouillee
  } = { ...params };
  return (
    <>
      {natureActe !== NatureActe.NAISSANCE &&
        getEvenementForm(natureActe, evenement, saisieVerrouillee)}
      {/* Premier titulaire avec accordéon */}
      {getTitulaire1EvenementsEtParentsForm(
        titulairesAMs[0],
        natureActe,
        titulaire1Parents,
        titulaire1ParentsAdoptants,
        evenement,
        naissanceTitulaire1
      )}
      {/* Deuxième titulaire avec accordéon (cas d'un mariage) */}
      {getTitulaire2EvenementsEtParentsForm(
        titulairesAMs[1],
        natureActe,
        titulaire2Parents,
        titulaire2ParentsAdoptants,
        naissanceTitulaire2
      )}
      {/* Données complémentaires plurilingue */}
      {donneesComplementairesPlurilingue &&
        natureActe === NatureActe.MARIAGE &&
        getDonneesComplementairesPlurilingue()}
    </>
  );
}

function getTitulaire1EvenementsEtParentsForm(
  titulairesAM1: ITitulaireActe | undefined,
  natureActe: NatureActe,
  titulaire1Parents: IFiliation[],
  titulaire1ParentsAdoptants: IFiliation[],
  evenement?: IEvenement,
  naissanceTitulaire1?: IEvenement
) {
  return (
    <>
      {titulairesAM1 &&
        getTitulaireEvenementForm(
          TITULAIRE_EVT_1,
          titulairesAM1,
          natureActe === NatureActe.NAISSANCE ? evenement : naissanceTitulaire1,
          natureActe,
          UN
        )}
      {natureActe === NatureActe.DECES &&
        titulairesAM1 &&
        getDernierConjointForm()}
      {titulairesAM1 /* Parents titulaire 1 */ &&
        getTitulaireParentsForm(
          UN,
          TITULAIRE_EVT_1,
          natureActe,
          titulaire1Parents,
          titulaire1ParentsAdoptants
        )}
    </>
  );
}

function getTitulaire2EvenementsEtParentsForm(
  titulaireAM2: ITitulaireActe | undefined,
  natureActe: NatureActe,
  titulaire2Parents: IFiliation[],
  titulaire2ParentsAdoptants: IFiliation[],
  naissanceTitulaire2?: IEvenement
) {
  return (
    <>
      {titulaireAM2 &&
        natureActe === NatureActe.MARIAGE && [
          getTitulaireEvenementForm(
            TITULAIRE_EVT_2,
            titulaireAM2,
            naissanceTitulaire2,
            natureActe,
            DEUX
          ),
          /* Parents titulaire 2 */
          getTitulaireParentsForm(
            DEUX,
            TITULAIRE_EVT_2,
            natureActe,
            titulaire2Parents,
            titulaire2ParentsAdoptants
          )
        ]}
    </>
  );
}

function getDonneesComplementairesPlurilingue() {
  return (
    <AccordionRece
      className={{ content: "AccordeonForm" }}
      expanded={true}
      titre={getLibelle("Données complémentaires extrait plurilingue")}
    >
      <DonneesComplementairesPlurilingue
        nom={DONNEES_COMPLEMENTAIRES_PLURILINGUE}
      />
    </AccordionRece>
  );
}

function getDernierConjointForm() {
  return (
    <AccordionRece expanded={true} titre={getLibelle("Dernier conjoint")}>
      <DernierConjointForm nom={DERNIER_CONJOINT} />
    </AccordionRece>
  );
}

function getEvenementForm(
  natureActe: NatureActe,
  evenement: IEvenement | undefined,
  saisieVerrouillee: boolean
) {
  return (
    <AccordionRece
      className={{ content: "AccordeonForm" }}
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
        etrangerParDefaut={true}
        saisieVerrouillee={saisieVerrouillee}
      />
      {natureActe === NatureActe.MARIAGE && (
        <ContratMariageForm nom={withNamespace(EVENEMENT, CONTRAT_MARIAGE)} />
      )}
    </AccordionRece>
  );
}

function getTitulaireParentsForm(
  numeroTitulaire: number,
  nomFormTitulaire: string,
  natureActe: NatureActe,
  parents: IFiliation[],
  parentsAdoptants: IFiliation[]
) {
  let form;
  if (natureActe === NatureActe.MARIAGE) {
    if (estRenseigne(parentsAdoptants)) {
      form = [
        getTitulaireParentsDansUnSeulForm(
          numeroTitulaire,
          nomFormTitulaire,
          natureActe,
          parents
        ),
        getTitulaireParentsAdoptantsDansUnSeulForm(
          numeroTitulaire,
          nomFormTitulaire,
          natureActe,
          parentsAdoptants
        )
      ];
    } else {
      form = getTitulaireParentsDansUnSeulForm(
        numeroTitulaire,
        nomFormTitulaire,
        natureActe,
        parents
      );
    }
  } else {
    form = getTitulaireParentsDansPlusieursForm(
      nomFormTitulaire,
      natureActe,
      parents
    );
  }

  return form;
}

function getTitulaireParentsAdoptantsDansUnSeulForm(
  numeroTitulaire: number,
  nomFormTitulaire: string,
  natureActe: NatureActe,
  parentsAdoptants: IFiliation[]
) {
  return getTitulaireParentsDansUnSeulForm(
    numeroTitulaire,
    nomFormTitulaire,
    natureActe,
    parentsAdoptants,
    true
  );
}

function getTitulaireParentsDansUnSeulForm(
  numeroTitulaire: number,
  nomFormTitulaire: string,
  natureActe: NatureActe,
  parents: IFiliation[],
  parentsAdoptants = false
) {
  const titreAccordeonParent = getLibelle(
    `Parents ${
      parentsAdoptants ? "adoptants " : ""
    }titulaire ${numeroTitulaire}`
  );
  return (
    <AccordionRece
      expanded={true}
      titre={titreAccordeonParent}
      key={titreAccordeonParent}
    >
      {parents.map((parent: IFiliation, index: number) => {
        const nomComposant = withNamespace(
          nomFormTitulaire,
          `${parentsAdoptants ? PARENT_ADOPTANT_NAISS : PARENT_NAISS}${
            index + 1
          }`
        );
        return (
          <div key={nomComposant}>
            <div className={`SouligneGras parent${index + 1}`}>
              Parent {parentsAdoptants ? "adoptant " : ""}
              {index + 1}
            </div>
            <ParentNaissanceForm
              nom={nomComposant}
              parent={parent}
              sansDateAgeEtLieuNaissance={natureActe === NatureActe.MARIAGE}
              sansSexe={true}
            />
          </div>
        );
      })}
    </AccordionRece>
  );
}

function getTitulaireParentsDansPlusieursForm(
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
  nomFormTitulaire: string,
  titulaire: ITitulaireActe,
  evenement: IEvenement | undefined,
  natureActe: NatureActe,
  numeroTitulaire: number
) {
  return (
    <AccordionRece
      expanded={true}
      key={nomFormTitulaire}
      titre={`${getLabels(natureActe).titulaireEtOuEvenenement} ${
        natureActe === NatureActe.MARIAGE ? numeroTitulaire : ""
      }`}
    >
      <TitulaireEvenementForm
        nom={nomFormTitulaire}
        titulaire={titulaire}
        evenement={evenement}
        natureActe={natureActe}
        gestionEtrangerFrance={natureActe !== NatureActe.NAISSANCE}
        etrangerParDefaut={natureActe === NatureActe.NAISSANCE}
      ></TitulaireEvenementForm>
    </AccordionRece>
  );
}

export interface IProprietesFormulaire {
  initialise: boolean;
  titulairesAMs: ITitulaireActe[];
  evenement?: IEvenement;
  titulaireActe1: ITitulaireActe;
  titulaireActe2: ITitulaireActe;
  titulaire1Parents: IFiliation[];
  titulaire2Parents: IFiliation[];
  natureActe: NatureActe;
  formDefaultValues: ISaisieExtraitForm;
}

export function initProprietesFormulaire(): IProprietesFormulaire {
  return { initialise: false } as any as IProprietesFormulaire;
}
