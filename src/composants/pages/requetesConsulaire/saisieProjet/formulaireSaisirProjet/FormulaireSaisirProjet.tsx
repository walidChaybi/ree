import {
  ADRESSE_DE_NAISSANCE,
  DATE_NAISSANCE,
  NOM_NAISSANCE,
  NOM_OEC,
  PAS_DE_NOM_OEC,
  PAYS_NAISSANCE,
  PRENOMS,
  REGION_NAISSANCE,
  SEXE,
  VILLE_NAISSANCE
} from "@composant/formulaire/ConstantesNomsForm";
import { creerValidationSchemaPrenom } from "@composant/formulaire/nomsPrenoms/PrenomsForm";
import { ITitulaireRequeteConsulaire } from "@model/requete/ITitulaireRequeteConsulaire";
import { CARACTERES_AUTORISES_MESSAGE } from "@widget/formulaire/FormulaireMessages";
import { DateValidationSchemaAnneeObligatoire } from "@widget/formulaire/champsDate/DateComposeFormValidation";
import { Formik } from "formik";
import * as Yup from "yup";
import { CaracteresAutorises } from "../../../../../ressources/Regex";
import ConteneurAccordeon from "../../../../commun/conteneurs/accordeon/ConteneurAccordeon";
import BlocActeEtranger from "./BlocActeEtranger";
import BlocAutres from "./BlocAutres";
import BlocDeclarants from "./BlocDeclarants";
import BlocFormuleFinale from "./BlocFormuleFinale";
import BlocMentions from "./BlocMentions";
import BlocParents from "./BlocParents";
import BlocTitulaire from "./BlocTitulaire";

interface ISaisieProjetActeProps {
  titulaire?: ITitulaireRequeteConsulaire;
  parents?: string[];
  declarant?: string[];
  mentions?: string[];
  autres?: string[];
}

export enum ECleFormulaireSaisieProjet {
  TITULAIRE = "Titulaire",
  PARENTS = "Parents",
  DECLARANT = "Déclarant",
  AUTRES = "Autres énonciations intéressant l'état civil",
  ACTE_ETRANGER = "Acte étranger",
  MENTIONS = "Mentions figurant dans l'acte étranger",
  FORMULE_FINALE = "Formule finale"
}

const TitulaireSchemaValidationFormulaire = Yup.object()
  .shape({
    [NOM_NAISSANCE]: Yup.string(),
    [NOM_OEC]: Yup.string().required("⚠ La saisie du nom retenu est obligatoire"),
    [PRENOMS]: creerValidationSchemaPrenom(),
    [SEXE]: Yup.string(),
    [DATE_NAISSANCE]: DateValidationSchemaAnneeObligatoire,
    [VILLE_NAISSANCE]: Yup.string(),
    [REGION_NAISSANCE]: Yup.string(),
    [PAYS_NAISSANCE]: Yup.string().matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
    [ADRESSE_DE_NAISSANCE]: Yup.string()
  })
  .test("titulaire.nomOEC", function (value, error) {
    const nomEOC = value[NOM_OEC] as string;
    const pasDeNomOECRenseigne = value[PAS_DE_NOM_OEC];

    const paramsError = {
      path: `${error.path}.titulaire.nomEOC`,
      message: "La saisie du nom retenu par l'OEC est obligatoire"
    };
    return pasDeNomOECRenseigne === "false" && !nomEOC ? this.createError(paramsError) : true;
  });

const FormulaireSaisirProjet: React.FC<ISaisieProjetActeProps> = requete => {
  return (
    <Formik
      validationSchema={TitulaireSchemaValidationFormulaire}
      initialValues={{
        titulaire: {
          ...requete.titulaire,
          dateNaissance: {
            jour: `${requete.titulaire?.jourNaissance}`.padStart(2, "0"),
            mois: `${requete.titulaire?.moisNaissance}`.padStart(2, "0"),
            annee: requete.titulaire?.anneeNaissance
          },
          prenomsChemin: requete.titulaire?.prenoms?.reduce((prenoms: { [prenom: string]: string }, prenom) => {
            prenoms[`prenom${prenom.numeroOrdre}`] = prenom.prenom;
            return prenoms;
          }, {}) ?? { prenom1: "" }
        }
      }}
      onSubmit={() => {}}
    >
      <>
        <ConteneurAccordeon
          titre={ECleFormulaireSaisieProjet.TITULAIRE}
          ouvertParDefaut
        >
          <BlocTitulaire />
        </ConteneurAccordeon>

        <ConteneurAccordeon
          titre={ECleFormulaireSaisieProjet.PARENTS}
          ouvertParDefaut
        >
          <BlocParents />
        </ConteneurAccordeon>

        <ConteneurAccordeon
          titre={ECleFormulaireSaisieProjet.DECLARANT}
          ouvertParDefaut
        >
          <BlocDeclarants />
        </ConteneurAccordeon>

        <ConteneurAccordeon
          titre={ECleFormulaireSaisieProjet.AUTRES}
          ouvertParDefaut
        >
          <BlocAutres />
        </ConteneurAccordeon>

        <ConteneurAccordeon
          titre={ECleFormulaireSaisieProjet.ACTE_ETRANGER}
          ouvertParDefaut
        >
          <BlocActeEtranger />
        </ConteneurAccordeon>

        <ConteneurAccordeon
          titre={ECleFormulaireSaisieProjet.MENTIONS}
          ouvertParDefaut
        >
          <BlocMentions />
        </ConteneurAccordeon>

        <ConteneurAccordeon
          titre={ECleFormulaireSaisieProjet.FORMULE_FINALE}
          ouvertParDefaut
        >
          <BlocFormuleFinale />
        </ConteneurAccordeon>
      </>
    </Formik>
  );
};

export default FormulaireSaisirProjet;
