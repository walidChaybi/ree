import React from "react";
import { DocumentDelivrance } from "../../../../../../model/requete/v2/enum/DocumentDelivrance";
import { OptionsCourrier } from "../../../../../../model/requete/v2/IOptionCourrier";
import { IRequeteDelivrance } from "../../../../../../model/requete/v2/IRequeteDelivrance";
import { Options } from "../../../../../common/util/Type";
import AdresseForm from "../../../../../common/widget/formulaire/adresse/AdresseForm";
import { InputField } from "../../../../../common/widget/formulaire/champsSaisie/InputField";
import RequeteForm from "../../../../../common/widget/formulaire/requete/RequeteForm";
import { SousFormulaire } from "../../../../../common/widget/formulaire/SousFormulaire";
import {
  SubFormProps,
  withNamespace
} from "../../../../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../../../../common/widget/Text";
import {
  ADRESSE,
  CHOIX_COURRIER,
  OPTION,
  REQUERANT,
  REQUERANT_LIGNE_1,
  REQUERANT_LIGNE_2,
  REQUETE,
  TEXTE_LIBRE
} from "../modelForm/ISaisiePageModel";
import "./scss/CourrierForm.scss";
import ChoixCourrierForm, {
  ChoixCourrierSubFormProps
} from "./sousFormulaires/ChoixCourrierForm";
import OptionsCourrierForm, {
  OptionsCourrierSubFormProps
} from "./sousFormulaires/OptionsCourrierForm";
import TexteLibreForm from "./sousFormulaires/TexteLibreForm";

export function getChoixCourrier(
  typesCourrier: Options,
  onChangeTypeCourrier: (typeCourrierChoisi: string) => void
): JSX.Element {
  const choixCourrierFormProps = {
    nom: CHOIX_COURRIER,
    typesCourrier,
    onChange: onChangeTypeCourrier
  } as ChoixCourrierSubFormProps;

  return <ChoixCourrierForm key={CHOIX_COURRIER} {...choixCourrierFormProps} />;
}

export function getOptionsCourrier(
  requete: IRequeteDelivrance,
  optionsChoisies: OptionsCourrier,
  setOptionsChoisies: (value: OptionsCourrier) => void,
  setCheckOptions: () => void,
  documentDelivranceChoisi?: DocumentDelivrance
): JSX.Element {
  const optionsCourrierFormProps = {
    nom: OPTION,
    documentDelivranceChoisi,
    titre: getLibelle("Options"),
    requete,
    optionsChoisies,
    setOptionsChoisies,
    setCheckOptions
  } as any as OptionsCourrierSubFormProps;
  return <OptionsCourrierForm key={OPTION} {...optionsCourrierFormProps} />;
}

export function getTexteLibre(
  requete: IRequeteDelivrance,
  documentDelivranceChoisi?: DocumentDelivrance
): JSX.Element {
  const texteLibreFormProps = {
    nom: TEXTE_LIBRE,
    titre: getLibelle("Texte libre"),
    requete
  } as SubFormProps;
  return (
    <div key={TEXTE_LIBRE}>
      {documentDelivranceChoisi?.texteLibre && (
        <TexteLibreForm {...texteLibreFormProps} />
      )}
    </div>
  );
}

export function getRequerantCourrierForm(disabled: boolean) {
  return (
    <SousFormulaire titre={getLibelle("Identité du requérant")} key={REQUERANT}>
      <div className="DeuxColonnesSansLabel">
        <InputField
          name={withNamespace(REQUERANT, REQUERANT_LIGNE_1)}
          disabled={disabled}
        />
        <InputField
          name={withNamespace(REQUERANT, REQUERANT_LIGNE_2)}
          disabled={disabled}
        />
      </div>
    </SousFormulaire>
  );
}

export function getAdresseCourrierForm(visible: boolean): JSX.Element {
  const adresseFormProps = {
    nom: ADRESSE,
    titre: getLibelle("Adresse postale du requérant"),
    formulaireReduit: true
  } as SubFormProps;
  return (
    <div key={ADRESSE}>{visible && <AdresseForm {...adresseFormProps} />}</div>
  );
}

export function getRequeteCourrierForm(visible: boolean): JSX.Element {
  const requeteFormProps = {
    nom: REQUETE,
    titre: getLibelle("Requête"),
    formulaireReduit: true
  } as SubFormProps;
  return (
    <div key={REQUETE}>{visible && <RequeteForm {...requeteFormProps} />}</div>
  );
}
