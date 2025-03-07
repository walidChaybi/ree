import { Identite } from "@model/etatcivil/enum/Identite";
import { ConditionChamp, EOperateurCondition } from "@model/form/commun/ConditionChamp";
import { IDateForm } from "@model/form/creation/transcription/ISaisirRequeteRCTCPageForm";
import { ILocalisation, IParent } from "@model/requete/IParents";
import { IPrenomOrdonnes } from "@model/requete/IPrenomOrdonnes";
import { ITitulaireRequeteConsulaire } from "@model/requete/ITitulaireRequeteConsulaire";
import { Formik } from "formik";
import { useMemo } from "react";
import SchemaValidation from "../../../../../utils/SchemaValidation";
import ConteneurAccordeon from "../../../../commun/conteneurs/accordeon/ConteneurAccordeon";
import BlocActeEtranger from "./BlocActeEtranger";
import BlocAutresEnonciations from "./BlocAutresEnonciations";
import BlocDeclarant from "./BlocDeclarant";
import BlocFormuleFinale from "./BlocFormuleFinale";
import BlocMentions from "./BlocMentions";
import BlocParent from "./BlocParent";
import BlocTitulaire from "./BlocTitulaire";

interface ISaisieProjetActeProps {
  titulaire?: ITitulaireRequeteConsulaire;
  parents?: IBLocParents;
  autres?: string[];
}

export interface ISaisieProjetActeForm {
  titulaire: IBlocTitulaire;
  declarant: IBlocDeclarant;
  parents: IBLocParents;
  mentions: IBlocMentions;
  formuleFinale: IBlocFormuleFinale;
  acteEtranger: IBlocActeEtranger;
  autresEnonciations?: String;
}

export interface IBlocActeEtranger {
  typeActe?: string;
  typeActeAutre?: string;
  dateEnregistrement?: IDateForm;
  lieuEnregistrement?: {
    ville?: string;
    etatProvince?: string;
    pays?: string;
  };
  redacteur?: string;
  referenceComplement: string;
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
  age?: number | string;
  qualite?: string | null;
  profession?: string | null;
  sansProfession?: boolean;
  domicile?: ILocalisation | null;
  complement?: string | null;
}

interface IBlocMentions {
  mentions?: string | null;
}

interface IBlocFormuleFinale {
  identiteDemandeur: string;
  nom?: string | null;
  prenomsChemin?: { [prenom: string]: string };
  qualite?: string | null;
  piecesProduites: string;
  legalisationApostille?: string | null;
  autresPieces?: string | null;
  modeDepot: string;
  identiteTransmetteur: string;
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
  identite: SchemaValidation.texte({ obligatoire: true }),
  nom: SchemaValidation.texte({ obligatoire: true }),
  prenomsChemin: SchemaValidation.prenoms("declarant.prenomsChemin.prenom"),
  age: SchemaValidation.entier({ obligatoire: false }),
  qualite: SchemaValidation.texte({ obligatoire: false }),
  profession: SchemaValidation.texte({ obligatoire: false }),
  domicile: SchemaValidation.objet({}),
  complement: SchemaValidation.texte({ obligatoire: false })
});

const MentionsSchemaValidationFormulaire = SchemaValidation.objet({
  mentions: SchemaValidation.texte({ obligatoire: false })
});

const FormuleFinaleSchemaValidationFormulaire = SchemaValidation.objet({
  identite: SchemaValidation.texte({ obligatoire: true }),
  nom: SchemaValidation.texte({ obligatoire: true }),
  prenomsChemin: SchemaValidation.prenoms("mentionsEtFormuleFinale.prenomsChemin.prenom"),
  qualite: SchemaValidation.texte({ obligatoire: false }),
  piecesProduites: SchemaValidation.texte({ obligatoire: true }),
  legalisationApostille: SchemaValidation.texte({ obligatoire: false }),
  autresPieces: SchemaValidation.texte({ obligatoire: true }),
  modeDepot: SchemaValidation.texte({ obligatoire: true }),
  identiteTransmetteur: SchemaValidation.texte({ obligatoire: true })
});

const LieuEnregistrementSchemaValidation = SchemaValidation.objet({
  ville: SchemaValidation.texte({
    obligatoire: false
  }),
  etatProvince: SchemaValidation.texte({
    obligatoire: false
  }),
  pays: SchemaValidation.texte({
    obligatoire: false
  })
});

const typeActeAutreCondition = ConditionChamp.depuisTableau([
  {
    idChampReference: "acteEtranger.typeActe",
    operateur: EOperateurCondition.EGAL,
    valeurs: ["AUTRE"]
  }
]);

const ActeEtrangerSchemaValidationFormulaire = SchemaValidation.objet({
  typeActe: SchemaValidation.listeDeroulante({
    obligatoire: true,
    options: ["ACTE_DRESSE", "ACTE_TRANSCRIT", "ACTE_ENREGISTRE", "JUGEMENT_DECLARATIF", "JUGEMENT_SUPPLETIF", "AUTRE"]
  }),
  typeActeAutre: SchemaValidation.texte({
    obligatoire: typeActeAutreCondition
  }),
  dateEnregistrement: SchemaValidation.dateIncomplete({
    obligatoire: false,
    bloquerDateFutur: true
  }),
  lieuEnregistrement: LieuEnregistrementSchemaValidation,
  redacteur: SchemaValidation.texte({
    obligatoire: false
  }),
  referenceComplement: SchemaValidation.texte({
    obligatoire: false
  })
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
        parents: ParentsSchemaValidationFormulaire,
        mentions: MentionsSchemaValidationFormulaire,
        formuleFinale: FormuleFinaleSchemaValidationFormulaire,
        acteEtranger: ActeEtrangerSchemaValidationFormulaire
      })}
      initialValues={{
        titulaire: { ...initialValueTitulaire },
        declarant: { ...initialValueDeclarant },
        parents: { ...initialValueParents },
        acteEtranger: {
          typeActe: "ACTE_DRESSE",
          referenceComplement: ""
        },
        mentions: { ...initialValueMentions },
        formuleFinale: { ...initialValueFormuleFinale }
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
          <BlocParent estparent1 />
          <BlocParent />
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
          <BlocAutresEnonciations />
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
  const estFranceouEtranger = parent?.paysNaissance?.toUpperCase() === "FRANCE" ? "France" : "Étranger";

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
      typeLieu: parent?.paysNaissance ? estFranceouEtranger : "Inconnu",
      ville: parent?.villeNaissance || "",
      adresse: parent?.adresseNaissance ?? "",
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

const initialValueDeclarant: IBlocDeclarant = {
  identite: Identite.getKey(Identite.PERE),
  nom: "",
  prenomsChemin: { prenom1: "" },
  sexe: "",
  age: "",
  qualite: "",
  profession: "",
  sansProfession: false,
  domicile: { typeLieu: "Inconnu" }
};

const initialValueMentions: IBlocMentions = {
  mentions: ""
};

const initialValueFormuleFinale: IBlocFormuleFinale = {
  identiteDemandeur: Identite.getKey(Identite.PERE),
  nom: "",
  prenomsChemin: { prenom1: "" },
  qualite: "",
  piecesProduites: "COPIE",
  autresPieces: "",
  legalisationApostille: "",
  modeDepot: "TRANSMISE",
  identiteTransmetteur: "Identique au demandeur"
};

export default FormulaireSaisirProjet;
