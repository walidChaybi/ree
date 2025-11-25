import { Filiation } from "@model/etatcivil/acte/Filiation";
import { IEvenement } from "@model/etatcivil/acte/IEvenement";
import { ITitulaireActeDto, TitulaireActe } from "@model/etatcivil/acte/TitulaireActe";
import { ENatureActe } from "@model/etatcivil/enum/NatureActe";
import { ISaisieExtraitForm } from "@model/form/delivrance/ISaisieExtraitForm";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { DocumentDelivrance, ECodeDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { DEUX, UN } from "@util/Utils";
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
} from "@views/common/composant/formulaire/ConstantesNomsForm";
import { EvenementForm } from "@views/common/composant/formulaire/EvenementForm";
import { EvenementValidationSchema } from "@views/common/composant/formulaire/validation/EvenementValidationSchema";
import { AccordionRece } from "@widget/accordion/AccordionRece";
import { DateValidationSchema } from "@widget/formulaire/champsDate/DateComposeFormValidation";
import { withNamespace } from "@widget/formulaire/utils/FormUtil";
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

export const getValidationSchema = (natureActe: keyof typeof ENatureActe, titulairesAMs: TitulaireActe[]) => {
  let validationSchema;
  switch (natureActe) {
    case "NAISSANCE":
      validationSchema = ExtraitValidationNaissanceTitulaireSchema;
      break;

    case "MARIAGE":
      if (titulairesAMs.length === DEUX) {
        validationSchema = ExtraitValidationMariageTitulairesSchema;
      } else {
        validationSchema = ExtraitValidationMariageUnTitulaireSchema;
      }
      break;

    case "DECES":
      validationSchema = ExtraitValidationDecesTitulaireSchema;
      break;

    default:
      validationSchema = ExtraitValidationNaissanceTitulaireSchema;
      break;
  }

  return validationSchema;
};

export const parentMemeSexeOuIndeterminCasPlurilingue = (
  titulaires: (ITitulaireActeDto | undefined)[],
  documentsReponses: IDocumentReponse[]
) => {
  return (
    titulaires.some(
      titulaire =>
        (titulaire != null && titulaire.sexe === "INDETERMINE") ||
        parentsSontDeMemeSexe(titulaire) ||
        titulaire?.filiations.some(filiation => filiation.lienParente === "PARENT" && filiation.sexe === "INDETERMINE")
    ) && unDocumentPlurilingueEstPresent(documentsReponses)
  );
};

const parentsSontDeMemeSexe = (titulaire?: ITitulaireActeDto): boolean => {
  const parents = titulaire?.filiations.filter(filiation => filiation.lienParente === "PARENT");

  if (parents && parents.length >= DEUX) {
    return parents.every(parent => parent.sexe === parents[0].sexe);
  }

  return false;
};

export const titulairesMemeSexeOuIndeterminCasPlurilingue = (
  titulaires: (ITitulaireActeDto | undefined)[],
  documentsReponses: IDocumentReponse[]
) => {
  return (
    (titulaires.length && titulaires[0]?.sexe === titulaires[1]?.sexe) ||
    (titulaires.some(titulaire => titulaire?.sexe === "INDETERMINE") && unDocumentPlurilingueEstPresent(documentsReponses))
  );
};

const unDocumentPlurilingueEstPresent = (documentsReponses: IDocumentReponse[]) => {
  return documentsReponses.some(
    documentsReponse => documentsReponse.typeDocument === DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_PLURILINGUE)
  );
};

export const getTitulairesEvenementsEtParentsForm = (params: {
  titulairesAMs: (TitulaireActe | undefined)[];
  natureActe: keyof typeof ENatureActe;
  titulaire1Parents: Filiation[];
  titulaire2Parents: Filiation[];
  titulaire1ParentsAdoptants: Filiation[];
  titulaire2ParentsAdoptants: Filiation[];
  donneesComplementairesPlurilingue: boolean;
  evenement?: IEvenement;
  naissanceTitulaire1?: IEvenement;
  naissanceTitulaire2?: IEvenement;
  saisieVerrouillee: boolean;
}) => {
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
      {natureActe !== "NAISSANCE" && getEvenementForm(natureActe, evenement, saisieVerrouillee)}
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
      {donneesComplementairesPlurilingue && natureActe === "MARIAGE" && getDonneesComplementairesPlurilingue()}
    </>
  );
};

const getTitulaire1EvenementsEtParentsForm = (
  titulairesAM1: TitulaireActe | undefined,
  natureActe: keyof typeof ENatureActe,
  titulaire1Parents: Filiation[],
  titulaire1ParentsAdoptants: Filiation[],
  evenement?: IEvenement,
  naissanceTitulaire1?: IEvenement
) => {
  return (
    <>
      {titulairesAM1 &&
        getTitulaireEvenementForm(
          TITULAIRE_EVT_1,
          titulairesAM1,
          natureActe === "NAISSANCE" ? evenement : naissanceTitulaire1,
          natureActe,
          UN
        )}
      {natureActe === "DECES" && titulairesAM1 && getDernierConjointForm()}
      {titulairesAM1 /* Parents titulaire 1 */ &&
        getTitulaireParentsForm(UN, TITULAIRE_EVT_1, natureActe, titulaire1Parents, titulaire1ParentsAdoptants)}
    </>
  );
};

const getTitulaire2EvenementsEtParentsForm = (
  titulaireAM2: TitulaireActe | undefined,
  natureActe: keyof typeof ENatureActe,
  titulaire2Parents: Filiation[],
  titulaire2ParentsAdoptants: Filiation[],
  naissanceTitulaire2?: IEvenement
) => {
  return (
    <>
      {titulaireAM2 &&
        natureActe === "MARIAGE" && [
          getTitulaireEvenementForm(TITULAIRE_EVT_2, titulaireAM2, naissanceTitulaire2, natureActe, DEUX),
          /* Parents titulaire 2 */
          getTitulaireParentsForm(DEUX, TITULAIRE_EVT_2, natureActe, titulaire2Parents, titulaire2ParentsAdoptants)
        ]}
    </>
  );
};

const getDonneesComplementairesPlurilingue = () => {
  return (
    <AccordionRece
      className={{ content: "AccordeonForm" }}
      expanded={true}
      titre={"Données complémentaires extrait plurilingue"}
    >
      <DonneesComplementairesPlurilingue nom={DONNEES_COMPLEMENTAIRES_PLURILINGUE} />
    </AccordionRece>
  );
};

const getDernierConjointForm = () => {
  return (
    <AccordionRece
      expanded={true}
      titre={"Dernier conjoint"}
    >
      <DernierConjointForm nom={DERNIER_CONJOINT} />
    </AccordionRece>
  );
};

const getEvenementForm = (natureActe: keyof typeof ENatureActe, evenement: IEvenement | undefined, saisieVerrouillee: boolean) => {
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
      {natureActe === "MARIAGE" && <ContratMariageForm nom={`${EVENEMENT}.${CONTRAT_MARIAGE}`} />}
    </AccordionRece>
  );
};

const getTitulaireParentsForm = (
  numeroTitulaire: number,
  nomFormTitulaire: string,
  natureActe: keyof typeof ENatureActe,
  parents: Filiation[],
  parentsAdoptants: Filiation[]
) => {
  let form;
  if (natureActe === "MARIAGE") {
    if (parentsAdoptants.length) {
      form = [
        getTitulaireParentsDansUnSeulForm(numeroTitulaire, nomFormTitulaire, natureActe, parents),
        getTitulaireParentsAdoptantsDansUnSeulForm(numeroTitulaire, nomFormTitulaire, natureActe, parentsAdoptants)
      ];
    } else {
      form = getTitulaireParentsDansUnSeulForm(numeroTitulaire, nomFormTitulaire, natureActe, parents);
    }
  } else {
    form = getTitulaireParentsDansPlusieursForm(nomFormTitulaire, natureActe, parents);
  }

  return form;
};

const getTitulaireParentsAdoptantsDansUnSeulForm = (
  numeroTitulaire: number,
  nomFormTitulaire: string,
  natureActe: keyof typeof ENatureActe,
  parentsAdoptants: Filiation[]
) => {
  return getTitulaireParentsDansUnSeulForm(numeroTitulaire, nomFormTitulaire, natureActe, parentsAdoptants, true);
};

const getTitulaireParentsDansUnSeulForm = (
  numeroTitulaire: number,
  nomFormTitulaire: string,
  natureActe: keyof typeof ENatureActe,
  parents: Filiation[],
  parentsAdoptants = false
) => {
  const titreAccordeonParent = `Parents ${parentsAdoptants ? "adoptants " : ""}titulaire ${numeroTitulaire}`;
  return (
    <AccordionRece
      expanded={true}
      titre={titreAccordeonParent}
      key={titreAccordeonParent}
    >
      {parents.map((parent: Filiation, index: number) => {
        const nomComposant = withNamespace(nomFormTitulaire, `${parentsAdoptants ? PARENT_ADOPTANT_NAISS : PARENT_NAISS}${index + 1}`);
        return (
          <div key={nomComposant}>
            <div className={`SouligneGras parent${index + 1}`}>
              Parent {parentsAdoptants ? "adoptant " : ""}
              {index + 1}
            </div>
            <ParentNaissanceForm
              nom={nomComposant}
              parent={parent}
              sansDateAgeEtLieuNaissance={natureActe === "MARIAGE"}
              sansSexe={true}
            />
          </div>
        );
      })}
    </AccordionRece>
  );
};

const getTitulaireParentsDansPlusieursForm = (nomFormTitulaire: string, natureActe: keyof typeof ENatureActe, parents: Filiation[]) => {
  return parents.map((parent: Filiation, index: number) => {
    const titreAccordeonParent = `Parent ${index + 1}`;
    return (
      <AccordionRece
        key={titreAccordeonParent}
        expanded={true}
        titre={titreAccordeonParent}
      >
        <ParentNaissanceForm
          nom={withNamespace(nomFormTitulaire, `${PARENT_NAISS}${index + 1}`)}
          parent={parent}
          sansDateAgeEtLieuNaissance={natureActe === "DECES"}
        />
      </AccordionRece>
    );
  });
};

const getTitulaireEvenementForm = (
  nomFormTitulaire: string,
  titulaire: TitulaireActe,
  evenement: IEvenement | undefined,
  natureActe: keyof typeof ENatureActe,
  numeroTitulaire: number
) => {
  return (
    <AccordionRece
      expanded={true}
      key={nomFormTitulaire}
      titre={`${getLabels(natureActe).titulaireEtOuEvenenement} ${natureActe === "MARIAGE" ? numeroTitulaire : ""}`}
    >
      <TitulaireEvenementForm
        nom={nomFormTitulaire}
        titulaire={titulaire}
        evenement={evenement}
        natureActe={natureActe}
        gestionEtrangerFrance={natureActe !== "NAISSANCE"}
        etrangerParDefaut={natureActe === "NAISSANCE"}
      ></TitulaireEvenementForm>
    </AccordionRece>
  );
};

export interface IProprietesFormulaire {
  initialise: boolean;
  titulairesAMs: TitulaireActe[];
  evenement?: IEvenement;
  titulaireActe1: TitulaireActe;
  titulaireActe2: TitulaireActe;
  titulaire1Parents: Filiation[];
  titulaire2Parents: Filiation[];
  natureActe: keyof typeof ENatureActe;
  formDefaultValues: ISaisieExtraitForm;
}

export const initProprietesFormulaire = (): IProprietesFormulaire => {
  return { initialise: false } as any as IProprietesFormulaire;
};
