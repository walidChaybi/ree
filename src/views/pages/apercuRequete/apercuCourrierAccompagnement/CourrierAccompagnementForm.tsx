import React from "react";
import { MotifDelivrance } from "../../../../model/requete/v2/enum/MotifDelivrance";
import { SousTypeDelivrance } from "../../../../model/requete/v2/enum/SousTypeDelivrance";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import { Options } from "../../../common/util/Type";
import { InputField } from "../../../common/widget/formulaire/champsSaisie/InputField";
import { SelectField } from "../../../common/widget/formulaire/champsSaisie/SelectField";
import { SousFormulaire } from "../../../common/widget/formulaire/SousFormulaire";
import {
  NB_CARACT_MAX_SAISIE,
  withNamespace
} from "../../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../../common/widget/Text";
import {
  ADRESSE_CODEPOSTAL,
  ADRESSE_LIGNE_2,
  ADRESSE_LIGNE_3,
  ADRESSE_LIGNE_4,
  ADRESSE_LIGNE_5,
  ADRESSE_PAYS,
  ADRESSE_VILLE,
  COMPLEMENT,
  COURRIER,
  DELIVRANCE,
  EN_TETE,
  MOTIF,
  NB_EXEMPLAIRE,
  REQUERANT,
  REQUERANT_LIGNE_1,
  REQUERANT_LIGNE_2,
  REQUETE
} from "./modelForm/ISaisieAccompagnementPageModel";

export const getFormCA = (
  optionsCourrier: Options,
  requete: IRequeteDelivrance
): JSX.Element[] => {
  return [
    getHeader(optionsCourrier),
    //getTexteLibre(),
    getRequerant(requete),
    getRequete(requete)
  ];
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
    <div key={REQUERANT}>
      <SousFormulaire titre={getLibelle("Identité du requérant")}>
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
      {requete.sousType === SousTypeDelivrance.RDC && (
        <SousFormulaire titre={getLibelle("Adresse postale du requérant")}>
          <InputField
            name={withNamespace(REQUERANT, ADRESSE_LIGNE_2)}
            label={getLibelle("Numéro, type et nom de la voie")}
          />
          <InputField
            name={withNamespace(REQUERANT, ADRESSE_LIGNE_3)}
            label={getLibelle(
              "Lieu-dit, boîte postale ou état/province (à l'étranger)"
            )}
          />
          <InputField
            name={withNamespace(REQUERANT, ADRESSE_LIGNE_4)}
            label={getLibelle("Complément d'identification du destinataire")}
          />
          <InputField
            name={withNamespace(REQUERANT, ADRESSE_LIGNE_5)}
            label={getLibelle(
              "Complément d'identification du point géographique"
            )}
          />
          <div className="DeuxColonnes">
            <InputField
              name={withNamespace(REQUERANT, ADRESSE_CODEPOSTAL)}
              label={getLibelle("Code Postal")}
              key={ADRESSE_CODEPOSTAL}
            />
            <InputField
              name={withNamespace(REQUERANT, ADRESSE_VILLE)}
              label={getLibelle("Commune")}
            />
          </div>
          <InputField
            name={withNamespace(REQUERANT, ADRESSE_PAYS)}
            label={getLibelle("Pays")}
          />
        </SousFormulaire>
      )}
    </div>
  );
};

const getRequete = (requete: IRequeteDelivrance) => {
  return (
    <div key="REQUETE">
      {requete.sousType === SousTypeDelivrance.RDC && (
        <SousFormulaire titre={getLibelle("Requête")}>
          <InputField
            name={withNamespace(REQUETE, NB_EXEMPLAIRE)}
            label={getLibelle("Nombre d'exemplaires")}
          />
          <SelectField
            name={withNamespace(REQUETE, MOTIF)}
            label={getLibelle("Motif")}
            options={MotifDelivrance.getAllEnumsAsOptions()}
            pasPremiereOptionVide={true}
          />
          <InputField
            name={withNamespace(REQUETE, COMPLEMENT)}
            label={getLibelle("Complément motif")}
          />
        </SousFormulaire>
      )}
    </div>
  );
};
