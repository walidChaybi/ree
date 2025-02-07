import { Identite } from "@model/etatcivil/enum/Identite";
import { IDateForm } from "@model/form/creation/transcription/ISaisirRequeteRCTCPageForm";
import { ILocation, IParent } from "@model/requete/IParents";
import { IPrenomOrdonnes } from "@model/requete/IPrenomOrdonnes";
import { ITitulaireRequeteConsulaire } from "@model/requete/ITitulaireRequeteConsulaire";
import { Formik } from "formik";
import { useMemo } from "react";
import SchemaValidation from "../../../../../utils/SchemaValidation";
import ConteneurAccordeon from "../../../../commun/conteneurs/accordeon/ConteneurAccordeon";
import BlocActeEtranger from "./BlocActeEtranger";
import BlocAutres from "./BlocAutres";
import BlocDeclarant from "./BlocDeclarant";
import BlocFormuleFinale from "./BlocFormuleFinale";
import BlocMentions from "./BlocMentions";
import BlocParents from "./BlocParents";
import BlocTitulaire from "./BlocTitulaire";

interface ISaisieProjetActeProps {
  titulaire?: ITitulaireRequeteConsulaire;
  parents?: IBLocParents;
  declarant?: IBlocDeclarant;
  mentions?: string[];
  autres?: string[];
}

export interface ISaisieProjetActeForm {
  titulaire: IBlocTitulaire;
  declarant: IBlocDeclarant;
  parents: IBLocParents;
}
interface IBlocTitulaire {
  nomNaissance: string | null;
  nomOEC: string | null;
  nomSouhaite: string | null;
  prenomsChemin: { [prenom: string]: string };
  sexe: string | null;
  dateNaissance: IDateForm | null;
  secable: boolean | null;
  villeNaissance: string | null;
  regionNaissance: string | null;
  paysNaissance: string | null;
  adresseNaissance: string | null;
}

export interface IBLocParents {
  parent1: IParent;
  parent2: IParent;
  domicileCommun?: boolean;
}

interface IBlocDeclarant {
  identite: string;
  nom: string | null;
  prenomsChemin?: { [prenom: string]: string };
  sexe: string;
  age?: number | null;
  qualite?: string | null;
  profession?: string | null;
  sansProfession?: boolean;
  domicile?: ILocation | null;
  complement?: string | null;
}

const TitulaireSchemaValidationFormulaire = SchemaValidation.objet({
  nomNaissance: SchemaValidation.texte({ obligatoire: false }),
  nomOEC: SchemaValidation.texte({ obligatoire: true }),
  prenomsChemin: SchemaValidation.prenoms("titulaire.prenomsChemin.prenom"),
  sexe: SchemaValidation.texte({ obligatoire: false }),
  dateNaissance: SchemaValidation.dateIncomplete({ obligatoire: true }),
  villeNaissance: SchemaValidation.texte({ obligatoire: false }),
  regionNaissance: SchemaValidation.texte({ obligatoire: false }),
  paysNaissance: SchemaValidation.texte({ obligatoire: false }),
  adresseNaissance: SchemaValidation.texte({ obligatoire: false })
});

const AdresseSchemaValidationFormulaire = SchemaValidation.objet({
  typeLieu: SchemaValidation.texte({ obligatoire: false }),
  ville: SchemaValidation.texte({ obligatoire: false }),
  adresse: SchemaValidation.texte({ obligatoire: false }),
  departement: SchemaValidation.texte({ obligatoire: false }),
  arrondissement: SchemaValidation.texte({ obligatoire: false }),
  pays: SchemaValidation.texte({ obligatoire: false }),
  etatProvince: SchemaValidation.texte({ obligatoire: false })
});

const ParentSchemaValidationFormulaire = (parentId: number) =>
  SchemaValidation.objet({
    nom: SchemaValidation.texte({ obligatoire: false }),
    prenoms: SchemaValidation.prenoms(`parents.parent${parentId}.prenoms.prenom`),
    sexe: SchemaValidation.texte({ obligatoire: false }),
    dateNaissance: SchemaValidation.dateIncomplete({ obligatoire: false }),
    renseignerAge: SchemaValidation.booleen({ obligatoire: false }),
    age: SchemaValidation.texte({ obligatoire: false }),
    lieuNaissance: AdresseSchemaValidationFormulaire,
    profession: SchemaValidation.texte({ obligatoire: false }),
    sansProfession: SchemaValidation.booleen({ obligatoire: false }),
    domicile: AdresseSchemaValidationFormulaire
  });

const ParentsSchemaValidationFormulaire = SchemaValidation.objet({
  parent1: ParentSchemaValidationFormulaire(1),
  parent2: ParentSchemaValidationFormulaire(2)
});

const DeclarantSchemaValidationFormulaire = SchemaValidation.objet({
  Identite: SchemaValidation.texte({ obligatoire: true }),
  nom: SchemaValidation.texte({ obligatoire: true }),
  prenomsChemin: SchemaValidation.prenoms("declarant.prenomsChemin.prenom"),
  age: SchemaValidation.entier({ obligatoire: false }),
  qualite: SchemaValidation.texte({ obligatoire: false }),
  profession: SchemaValidation.texte({ obligatoire: false }),
  domicile: SchemaValidation.objet({}),
  complement: SchemaValidation.texte({ obligatoire: false })
});

const FormulaireSaisirProjet: React.FC<ISaisieProjetActeProps> = requete => {
  const initialValueParents: IBLocParents = useMemo(
    () => ({
      parent1: initialiseParents(requete.parents?.parent1),
      parent2: initialiseParents(requete.parents?.parent2)
    }),
    [requete]
  );

  const initialValueTitulaire: IBlocTitulaire = useMemo(() => initialiseTitulaires(requete), [requete]);

  return (
    <Formik<ISaisieProjetActeForm>
      validationSchema={SchemaValidation.objet({
        titulaire: TitulaireSchemaValidationFormulaire,
        declarant: DeclarantSchemaValidationFormulaire,
        parents: ParentsSchemaValidationFormulaire
      })}
      initialValues={{
        titulaire: { ...initialValueTitulaire },
        declarant: { ...initialValueDeclarant },
        parents: { ...initialValueParents }
      }}
      onSubmit={() => {}}
    >
      <>
        <ConteneurAccordeon
          titre="Titulaire"
          ouvertParDefaut
        >
          <BlocTitulaire />
        </ConteneurAccordeon>

        <ConteneurAccordeon
          titre="Parents"
          ouvertParDefaut
        >
          <BlocParents />
        </ConteneurAccordeon>

        <ConteneurAccordeon
          titre="Déclarant"
          ouvertParDefaut
        >
          <BlocDeclarant />
        </ConteneurAccordeon>

        <ConteneurAccordeon
          titre="Autres énonciations intéressant l'état civil"
          ouvertParDefaut
        >
          <BlocAutres />
        </ConteneurAccordeon>

        <ConteneurAccordeon
          titre="Acte étranger"
          ouvertParDefaut
        >
          <BlocActeEtranger />
        </ConteneurAccordeon>

        <ConteneurAccordeon
          titre="Mentions figurant dans l'acte étranger"
          ouvertParDefaut
        >
          <BlocMentions />
        </ConteneurAccordeon>

        <ConteneurAccordeon
          titre="Formule finale"
          ouvertParDefaut
        >
          <BlocFormuleFinale />
        </ConteneurAccordeon>
      </>
    </Formik>
  );
};
const initialiseTitulaires = (requete: ISaisieProjetActeProps): IBlocTitulaire => {
  return {
    nomNaissance: requete.titulaire?.nomNaissance ?? "",
    nomOEC: requete.titulaire?.nomOEC ?? "",
    nomSouhaite: requete.titulaire?.nomSouhaite ?? "",
    prenomsChemin: requete.titulaire?.prenoms?.reduce(
      (prenoms: { [prenom: string]: string }, prenom: { numeroOrdre: any; prenom: string }) => {
        prenoms[`prenom${prenom.numeroOrdre}`] = prenom.prenom;
        return prenoms;
      },
      { prenom1: "" }
    ) ?? { prenom1: "" },
    sexe: requete.titulaire?.sexe ?? "",
    dateNaissance: {
      jour: requete.titulaire?.jourNaissance ? `${requete.titulaire?.jourNaissance}`.padStart(2, "0") : "",
      mois: requete.titulaire?.moisNaissance ? `${requete.titulaire?.moisNaissance}`.padStart(2, "0") : "",
      annee: requete.titulaire?.anneeNaissance?.toString() ?? ""
    },
    secable: null,
    villeNaissance: requete.titulaire?.villeNaissance ?? "",
    regionNaissance: requete.titulaire?.regionNaissance ?? "",
    paysNaissance: requete.titulaire?.paysNaissance ?? "",
    adresseNaissance: ""
  };
};

const initialiseParents = (parent?: any): IParent => {
  return {
    id: parent?.id || "",
    position: parent?.position || 0,
    sexe: parent?.sexe || "",
    nomNaissance: parent?.nomNaissance || "",
    nom: parent?.nomNaissance || "",
    prenoms: parent?.prenoms?.reduce(
      (prenoms: { [prenom: string]: string }, prenom: IPrenomOrdonnes) => {
        prenoms[`prenom${prenom.numeroOrdre}`] = prenom.prenom;
        return prenoms;
      },
      { prenom1: "" }
    ) ?? { prenom1: "" },
    dateNaissance: {
      jour: parent?.jourNaissance ? `${parent?.jourNaissance}`.padStart(2, "0") : "",
      mois: parent?.moisNaissance ? `${parent?.moisNaissance}`.padStart(2, "0") : "",
      annee: parent?.anneeNaissance
    },
    lieuNaissance: {
      typeLieu: parent?.paysNaissance ? (parent.paysNaissance.toUpperCase() === "FRANCE" ? "France" : "Étranger") : "Inconnu",
      ville: parent?.villeNaissance || "",
      adresse: parent?.adresseNaissance || "",
      departement: parent?.regionNaissance || "",
      arrondissement: parent?.arrondissementNaissance || "",
      pays: parent?.paysNaissance || "",
      etatProvince: parent?.regionNaissance || ""
    },
    sansProfession: parent?.sansProfession || false,
    profession: parent?.profession || "",
    domicile: {
      typeLieu: "Inconnu",
      ville: "",
      adresse: "",
      departement: "",
      arrondissement: "",
      pays: "",
      etatProvince: ""
    },
    renseignerAge: parent?.renseignerAge || false,
    age: parent?.age || ""
  };
};
export const initialValueDeclarant: IBlocDeclarant = {
  identite: Identite.getKey(Identite.PERE),
  nom: "",
  prenomsChemin: { prenom1: "" },
  sexe: "",
  age: null,
  qualite: "",
  profession: "",
  sansProfession: false,
  domicile: { typeLieu: "Inconnu" }
};
export default FormulaireSaisirProjet;
