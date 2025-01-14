import ConteneurAccordeon from "../../../../commun/conteneurs/accordeon/ConteneurAccordeon";
import BlocActeEtranger from "./BlocActeEtranger";
import BlocAutres from "./BlocAutres";
import BlocDeclarants from "./BlocDeclarants";
import BlocFormuleFinale from "./BlocFormuleFinale";
import BlocMentions from "./BlocMentions";
import BlocParents from "./BlocParents";
import BlocTitulaire from "./BlocTitulaire";

interface ISaisieProjetActeProps {
  titulaire?: string[];
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

const FormulaireSaisirProjet: React.FC<ISaisieProjetActeProps> = () => (
  <>
    {/* Bloc Titulaire */}
    <ConteneurAccordeon
      titre={ECleFormulaireSaisieProjet.TITULAIRE}
      ouvertParDefaut
    >
      <BlocTitulaire />
    </ConteneurAccordeon>

    {/* Bloc Parents  */}
    <ConteneurAccordeon
      titre={ECleFormulaireSaisieProjet.PARENTS}
      ouvertParDefaut
    >
      <BlocParents />
    </ConteneurAccordeon>

    {/* Bloc Declarent */}
    <ConteneurAccordeon
      titre={ECleFormulaireSaisieProjet.DECLARANT}
      ouvertParDefaut
    >
      <BlocDeclarants />
    </ConteneurAccordeon>

    {/* Bloc Autre énonciations */}
    <ConteneurAccordeon
      titre={ECleFormulaireSaisieProjet.AUTRES}
      ouvertParDefaut
    >
      <BlocAutres />
    </ConteneurAccordeon>

    {/* Bloc Acte Etranger */}
    <ConteneurAccordeon
      titre={ECleFormulaireSaisieProjet.ACTE_ETRANGER}
      ouvertParDefaut
    >
      <BlocActeEtranger />
    </ConteneurAccordeon>

    {/* Bloc Mentions */}
    <ConteneurAccordeon
      titre={ECleFormulaireSaisieProjet.MENTIONS}
      ouvertParDefaut
    >
      <BlocMentions />
    </ConteneurAccordeon>

    {/* Bloc Formule Finale */}
    <ConteneurAccordeon
      titre={ECleFormulaireSaisieProjet.FORMULE_FINALE}
      ouvertParDefaut
    >
      <BlocFormuleFinale />
    </ConteneurAccordeon>
  </>
);

export default FormulaireSaisirProjet;
