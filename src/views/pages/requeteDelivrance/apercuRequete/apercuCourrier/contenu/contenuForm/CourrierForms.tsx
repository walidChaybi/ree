import { OptionsCourrier } from "@model/requete/IOptionCourrier";
import { IRequerant } from "@model/requete/IRequerant";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { Options } from "@util/Type";
import { ADRESSE, CHOIX_COURRIER, OPTION, REQUERANT, REQUETE, TEXTE_LIBRE } from "@views/common/composant/formulaire/ConstantesNomsForm";
import RequerantCourrierForm, {
  IRequerantCourrierFormProps
} from "@views/pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/contenuForm/sousFormulaires/RequerantCourrierForm";
import AdresseForm from "@widget/formulaire/adresse/AdresseForm";
import RequeteForm from "@widget/formulaire/requete/RequeteForm";
import { SubFormProps } from "@widget/formulaire/utils/FormUtil";
import "./scss/CourrierForm.scss";
import ChoixCourrierForm, { ChoixCourrierSubFormProps } from "./sousFormulaires/ChoixCourrierForm";
import OptionsCourrierForm, { OptionsCourrierSubFormProps } from "./sousFormulaires/OptionsCourrierForm";
import TexteLibreForm from "./sousFormulaires/TexteLibreForm";

export function getChoixCourrier(typesCourrier: Options, onChangeTypeCourrier: (typeCourrierChoisi: string) => void): JSX.Element {
  const choixCourrierFormProps = {
    nom: CHOIX_COURRIER,
    typesCourrier,
    onChange: onChangeTypeCourrier
  } as ChoixCourrierSubFormProps;

  return (
    <ChoixCourrierForm
      key={CHOIX_COURRIER}
      {...choixCourrierFormProps}
    />
  );
}

export function getOptionsCourrier(
  requete: IRequeteDelivrance,
  optionsChoisies: OptionsCourrier,
  setOptionsChoisies: (value: OptionsCourrier) => void,
  setCheckOptions: () => void,
  documentDelivranceChoisi?: IDocumentDelivrance | null
): JSX.Element {
  const optionsCourrierFormProps = {
    nom: OPTION,
    documentDelivranceChoisi,
    titre: "Options",
    requete,
    optionsChoisies,
    setOptionsChoisies,
    setCheckOptions
  } as any as OptionsCourrierSubFormProps;
  return (
    <OptionsCourrierForm
      key={OPTION}
      {...optionsCourrierFormProps}
    />
  );
}

export function getTexteLibre(requete: IRequeteDelivrance, documentDelivranceChoisi?: IDocumentDelivrance | null): JSX.Element {
  const texteLibreFormProps = {
    nom: TEXTE_LIBRE,
    titre: "Texte libre",
    requete
  } as SubFormProps;
  return <div key={TEXTE_LIBRE}>{documentDelivranceChoisi?.texteLibre && <TexteLibreForm {...texteLibreFormProps} />}</div>;
}

export function getRequerantCourrierForm(visible: boolean, requerant: IRequerant) {
  const requerantFormProps = {
    requerant,
    titre: "Identité du requérant",
    formulaireReduit: true
  } as SubFormProps & IRequerantCourrierFormProps;
  return <div key={REQUERANT}>{visible && <RequerantCourrierForm {...requerantFormProps} />}</div>;
}

export function getAdresseCourrierForm(visible: boolean): JSX.Element {
  const adresseFormProps = {
    nom: ADRESSE,
    titre: "Adresse postale du requérant",
    formulaireReduit: true
  } as SubFormProps;
  return <div key={ADRESSE}>{visible && <AdresseForm {...adresseFormProps} />}</div>;
}

export function getRequeteCourrierForm(visible: boolean): JSX.Element {
  const requeteFormProps = {
    nom: REQUETE,
    titre: "Requête",
    formulaireReduit: true
  } as SubFormProps;
  return (
    <div key={REQUETE}>
      {visible && (
        <RequeteForm
          {...requeteFormProps}
          champDocumentDemandeCharge
        />
      )}
    </div>
  );
}
