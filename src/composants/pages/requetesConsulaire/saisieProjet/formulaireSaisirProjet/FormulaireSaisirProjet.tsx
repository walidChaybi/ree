import { ITitulaireRequeteConsulaire } from "@model/requete/ITitulaireRequeteConsulaire";
import { Formik } from "formik";
import SchemaValidation from "../../../../../utils/SchemaValidation";
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

const TitulaireSchemaValidationFormulaire = SchemaValidation.objet({
  nomNaissance: SchemaValidation.texte({ obligatoire: false }),
  nomOEC: SchemaValidation.texte({ obligatoire: true }),
  prenoms: SchemaValidation.prenoms(),
  sexe: SchemaValidation.texte({ obligatoire: false }),
  dateNaissance: SchemaValidation.dateIncomplete({ obligatoire: true }),
  villeNaissance: SchemaValidation.texte({ obligatoire: false }),
  regionNaissance: SchemaValidation.texte({ obligatoire: false }),
  paysNaissance: SchemaValidation.texte({ obligatoire: false }),
  adresseNaissance: SchemaValidation.texte({ obligatoire: false })
});

const FormulaireSaisirProjet: React.FC<ISaisieProjetActeProps> = requete => {
  return (
    <Formik
      validationSchema={SchemaValidation.objet({ titulaire: TitulaireSchemaValidationFormulaire })}
      initialValues={{
        titulaire: {
          ...requete.titulaire,
          dateNaissance: {
            jour: requete.titulaire?.jourNaissance ? `${requete.titulaire?.jourNaissance}`.padStart(2, "0") : "",
            mois: requete.titulaire?.moisNaissance ? `${requete.titulaire?.moisNaissance}`.padStart(2, "0") : "",
            annee: requete.titulaire?.anneeNaissance
          },
          prenomsChemin: requete.titulaire?.prenoms?.reduce(
            (prenoms: { [prenom: string]: string }, prenom) => {
              prenoms[`prenom${prenom.numeroOrdre}`] = prenom.prenom;
              return prenoms;
            },
            { prenom1: "" }
          ) ?? { prenom1: "" }
        }
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
          <BlocDeclarants />
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

export default FormulaireSaisirProjet;
