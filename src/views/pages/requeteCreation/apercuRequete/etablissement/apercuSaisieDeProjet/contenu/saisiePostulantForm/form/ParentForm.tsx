import {
  ARRONDISSEMENT_NAISSANCE,
  DATE_NAISSANCE,
  DEPARTEMENT_NAISSANCE,
  LIEU_DE_NAISSANCE,
  NOM,
  PAYS_NAISSANCE,
  PRENOM,
  PRENOMS,
  REGION_NAISSANCE,
  SEXE,
  VILLE_NAISSANCE
} from "@composant/formulaire/ConstantesNomsForm";
import DateNaissanceOuAgeDeForm from "@composant/formulaire/DateNaissanceOuAgeDeForm";
import LieuForm, { ILieuProps } from "@composant/formulaire/LieuForm";
import PrenomsForm from "@composant/formulaire/nomsPrenoms/PrenomsForm";
import { EtrangerFrance } from "@model/etatcivil/enum/EtrangerFrance";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import Item from "@pages/requeteCreation/apercuRequete/etablissement/commun/resumeRequeteCreationEtablissement/items/Item";
import { getLibelle } from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { RadioField } from "@widget/formulaire/champsSaisie/RadioField";
import { SelectField } from "@widget/formulaire/champsSaisie/SelectField";
import { MessageAvertissement } from "@widget/formulaire/erreur/MessageAvertissement";
import {
  FormikComponentProps,
  NB_CARACT_MAX_SAISIE,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
import "../scss/Parent.scss";

interface IParentFormProps {
  nom: string;
  libelle: string;
}

type ParentFormProps = IParentFormProps & FormikComponentProps;

const ParentForm: React.FC<ParentFormProps> = props => {
  const lieuNaissanceNamespace = `${props.nom}.${LIEU_DE_NAISSANCE}`;

  const villeNamespace = withNamespace(lieuNaissanceNamespace, VILLE_NAISSANCE);
  const sexe = withNamespace(props.nom, SEXE);

  const afficherMessageSexe = Sexe.estIndetermine(
    props.formik.getFieldProps(sexe).value
  );

  const lieuElements: ILieuProps = {
    lieu: (
      <RadioField
        name={withNamespace(lieuNaissanceNamespace, LIEU_DE_NAISSANCE)}
        label={getLibelle("Lieu de naissance")}
        values={EtrangerFrance.getAllEnumsAsOptions()}
      />
    ),
    ville: (
      <InputField
        name={villeNamespace}
        label={getLibelle("Ville")}
        maxLength={NB_CARACT_MAX_SAISIE}
      />
    ),
    arrondissement: (
      <SelectField
        name={withNamespace(lieuNaissanceNamespace, ARRONDISSEMENT_NAISSANCE)}
        label={getLibelle("Arrondissement")}
        options={LieuxUtils.getOptionsArrondissement(
          props.formik.getFieldProps(villeNamespace).value
        )}
      />
    ),
    departement: (
      <InputField
        name={withNamespace(lieuNaissanceNamespace, DEPARTEMENT_NAISSANCE)}
        label={getLibelle("Département")}
        maxLength={NB_CARACT_MAX_SAISIE}
      />
    ),
    region: (
      <InputField
        name={withNamespace(lieuNaissanceNamespace, REGION_NAISSANCE)}
        label={getLibelle("Etat, canton, province")}
        maxLength={NB_CARACT_MAX_SAISIE}
      />
    ),
    pays: (
      <InputField
        name={withNamespace(lieuNaissanceNamespace, PAYS_NAISSANCE)}
        label={getLibelle(`Pays`)}
        maxLength={NB_CARACT_MAX_SAISIE}
      />
    )
  };

  const afficherArrondissement = LieuxUtils.estVilleMarseilleLyonParis(
    props.formik.getFieldProps(villeNamespace).value
  );
  const afficherDepartement = !LieuxUtils.estVilleMarseilleLyon(
    props.formik.getFieldProps(villeNamespace).value
  );

  return (
    <div className="Parent">
      <Item titre={props.libelle}>
        <InputField
          name={withNamespace(props.nom, NOM)}
          label={getLibelle("Nom")}
          maxLength={NB_CARACT_MAX_SAISIE}
        />
        <PrenomsForm nom={withNamespace(props.nom, `${PRENOM}.${PRENOMS}`)} />
        <div className="AvertissementConteneur">
          <RadioField
            className="SexeRadio"
            name={withNamespace(props.nom, SEXE)}
            label={getLibelle("Sexe")}
            values={Sexe.getAllEnumsAsOptionsSansInconnu()}
          />
          <MessageAvertissement afficherMessage={afficherMessageSexe}>
            {getLibelle("Attention, sexe indéterminé")}
          </MessageAvertissement>
        </div>
        <div className="AvertissementConteneur">
          <div className="ConteneurDateCompose">
            <DateNaissanceOuAgeDeForm
              nom={withNamespace(props.nom, DATE_NAISSANCE)}
              labelDate={getLibelle("Date de naissance")}
            />
          </div>
        </div>
        <LieuForm
          elements={lieuElements}
          afficherArrondissement={afficherArrondissement}
          afficherDepartement={afficherDepartement}
        />
      </Item>
    </div>
  );
};

export default connect<IParentFormProps>(ParentForm);
