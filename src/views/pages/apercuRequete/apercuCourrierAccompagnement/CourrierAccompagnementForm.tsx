import React from "react";
import { SousTypeDelivrance } from "../../../../model/requete/v2/enum/SousTypeDelivrance";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import { Options } from "../../../common/util/Type";
import AdresseForm from "../../../common/widget/formulaire/adresse/AdresseForm";
import { InputField } from "../../../common/widget/formulaire/champsSaisie/InputField";
import { SelectField } from "../../../common/widget/formulaire/champsSaisie/SelectField";
import RequeteForm from "../../../common/widget/formulaire/requete/RequeteForm";
import { SousFormulaire } from "../../../common/widget/formulaire/SousFormulaire";
import {
  NB_CARACT_MAX_SAISIE,
  SubFormProps,
  withNamespace
} from "../../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../../common/widget/Text";
import {
  ADRESSE,
  COURRIER,
  DELIVRANCE,
  EN_TETE,
  REQUERANT,
  REQUERANT_LIGNE_1,
  REQUERANT_LIGNE_2,
  REQUETE
} from "./modelForm/ISaisieAccompagnementPageModel";

interface CourrierAccompagnementFormProps {
  optionsCourrier: Options;
  requete: IRequeteDelivrance;
}

export const CourrierAccompagnementForm: React.FC<CourrierAccompagnementFormProps> =
  props => {
    return (
      <>
        {getHeader(props.optionsCourrier)}
        {getRequerant(props.requete)}
        {props.requete.sousType === SousTypeDelivrance.RDC && (
          <>
            {getAdresseForm()}
            {getRequeteForm()}
          </>
        )}
      </>
    );
  };

const getHeader = (options: Options): JSX.Element => {
  return (
    <div className="DocumentInput" key={EN_TETE}>
      <InputField
        name={withNamespace(EN_TETE, DELIVRANCE)}
        label={getLibelle("Choix délivrance")}
        maxLength={NB_CARACT_MAX_SAISIE}
        disabled={true}
      />
      <SelectField
        name={withNamespace(EN_TETE, COURRIER)}
        label={getLibelle("Courrier")}
        options={options}
        pasPremiereOptionVide={true}
      />
    </div>
  );
};

export function getAdresseForm(): JSX.Element {
  const adresseFormProps = {
    nom: ADRESSE,
    titre: "ADRESSE POSTALE DU REQUÉRANT",
    formulaireReduit: true
  } as SubFormProps;
  return <AdresseForm key={ADRESSE} {...adresseFormProps} />;
}

export function getRequeteForm(): JSX.Element {
  const requeteFormProps = {
    nom: REQUETE,
    titre: getLibelle("Requête"),
    formulaireReduit: true
  } as SubFormProps;
  return <RequeteForm key={REQUETE} {...requeteFormProps} />;
}

// TODO ajouter section texte libre
/*const getTexteLibre = () => {
  return (
    <SousFormulaire titre={getLibelle("Texte libre")} key={TEXTE_LIBRE}>
      <SelectField
        name={withNamespace(TEXTE_LIBRE, TYPE_MEMO)}
        label={getLibelle("Type MEMO")}
        options={[]}
      />
      <SelectField
        name={withNamespace(TEXTE_LIBRE, MEMO)}
        label={getLibelle("MEMO")}
        options={[]}
      />
      <InputField
        name={withNamespace(TEXTE_LIBRE, TEXTE)}
        label={getLibelle("Texte libre")}
      />
    </SousFormulaire>
  );
};*/

const getRequerant = (requete: IRequeteDelivrance) => {
  return (
    <SousFormulaire titre={getLibelle("Identité du requérant")} key={REQUERANT}>
      <div className="DeuxColonnesSansLabel">
        <InputField
          name={withNamespace(REQUERANT, REQUERANT_LIGNE_1)}
          disabled={requete.sousType === SousTypeDelivrance.RDC}
        />
        <InputField
          name={withNamespace(REQUERANT, REQUERANT_LIGNE_2)}
          disabled={requete.sousType === SousTypeDelivrance.RDC}
        />
      </div>
    </SousFormulaire>
  );
};
