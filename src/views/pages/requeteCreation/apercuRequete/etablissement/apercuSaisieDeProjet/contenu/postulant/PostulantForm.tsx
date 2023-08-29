import {
  ADOPTE_PAR,
  ANALYSE_MARGINALE,
  DATE_NAISSANCE,
  ETAT_CANTON_PROVINCE,
  IDENTITE,
  LIEU_DE_NAISSANCE,
  NE_DANS_MARIAGE,
  NOM,
  NOM_SECABLE,
  PAYS_NAISSANCE,
  PRENOM,
  PRENOMS,
  SEXE,
  VILLE_NAISSANCE
} from "@composant/formulaire/ConstantesNomsForm";
import NomSecableForm from "@composant/formulaire/NomSecableForm";
import PrenomsConnusForm from "@composant/formulaire/nomsPrenoms/PrenomsConnusForm";
import PrenomsForm from "@composant/formulaire/nomsPrenoms/PrenomsForm";
import { OuiNon } from "@model/etatcivil/enum/OuiNon";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { getLibelle } from "@util/Utils";
import DateComposeForm, {
  ChampDateModifie
} from "@widget/formulaire/champsDate/DateComposeForm";
import { IDateComposeForm } from "@widget/formulaire/champsDate/DateComposeFormUtil";
import { CheckboxField } from "@widget/formulaire/champsSaisie/CheckBoxField";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { RadioField } from "@widget/formulaire/champsSaisie/RadioField";
import { WarningMessage } from "@widget/formulaire/erreur/WarningMessage";
import {
  FormikComponentProps,
  NB_CARACT_MAX_SAISIE,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useState } from "react";
import Item from "../../../commun/resumeRequeteCreationEtablissement/items/Item";
import {
  estJourMoisVide,
  getNomSecable,
  getPrenomsFrancises,
  getPrenomsNonFrancises
} from "./mapping/mappingTitulaireVersFormulairePostulant";

interface IPostulantFormProps {
  nom: string;
  titulaire: ITitulaireRequeteCreation;
}
type PostulantFormProps = IPostulantFormProps & FormikComponentProps;

const PostulantForm: React.FC<PostulantFormProps> = props => {
  const nomSecable = getNomSecable(props.titulaire.retenueSdanf);
  const prenomRetenu = props.titulaire.retenueSdanf?.prenomsRetenu;
  const nbPrenom = getPrenomsNonFrancises(prenomRetenu).length;
  const nbPrenomAnalyseMarginale =
    getPrenomsFrancises.length || getPrenomsNonFrancises(prenomRetenu).length;
  const analyseMarginale = withNamespace(props.nom, ANALYSE_MARGINALE);
  const sexe = withNamespace(props.nom, SEXE);
  const lieuNaissance = withNamespace(props.nom, LIEU_DE_NAISSANCE);
  const afficherMessageSexe = Sexe.estIndetermine(
    props.formik.getFieldProps(sexe).value
  );
  const [afficherMessageNaissance, setAfficherMessageNaissance] =
    useState<boolean>(estJourMoisVide(props.titulaire.retenueSdanf));

  function onChangeDateNaissance(
    date: IDateComposeForm,
    type?: ChampDateModifie
  ) {
    if (type === ChampDateModifie.JOUR || ChampDateModifie.MOIS) {
      setAfficherMessageNaissance(false);
    }
  }

  return (
    <Item titre={"Postulant"}>
      <InputField
        name={withNamespace(props.nom, NOM)}
        label={getLibelle("Nom")}
        maxLength={NB_CARACT_MAX_SAISIE}
      />
      <NomSecableForm
        nomComposant={withNamespace(props.nom, NOM_SECABLE)}
        nomTitulaire={nomSecable.nomTitulaire}
        nomPartie1={nomSecable.nomPartie1}
        nomPartie2={nomSecable.nomPartie2}
        saisieVerrouillee={false}
        afficherAvertissementVocable={nomSecable.estPaysSecable}
      />
      <PrenomsConnusForm
        libelleAucunPrenom={getLibelle("Pas de prénom")}
        pasDePrenomConnu={nbPrenom === 0}
        nom={withNamespace(props.nom, PRENOM)}
        nbPrenoms={nbPrenom}
      />
      <div className="Titre">{getLibelle("Analyse marginales")}</div>
      <InputField
        name={withNamespace(analyseMarginale, NOM)}
        label={getLibelle("Nom")}
        maxLength={NB_CARACT_MAX_SAISIE}
      />
      <PrenomsForm
        nom={withNamespace(analyseMarginale, PRENOMS)}
        nbPrenoms={nbPrenomAnalyseMarginale}
      />
      <InputField
        name={withNamespace(props.nom, IDENTITE)}
        label={getLibelle("Identité avant décret")}
        maxLength={NB_CARACT_MAX_SAISIE}
      />
      <div className="AvertissementConteneur">
        <RadioField
          name={withNamespace(props.nom, SEXE)}
          label={getLibelle("Sexe")}
          values={Sexe.getAllEnumsAsOptionsSansInconnu()}
        />
        <WarningMessage afficherMessage={afficherMessageSexe}>
          {getLibelle("Attention, sexe indéterminé")}
        </WarningMessage>
      </div>
      <div className="AvertissementConteneur">
        <div
          className={
            "ConteneurDateCompose" +
            (afficherMessageNaissance ? " AvertissementDateCompose" : "")
          }
        >
          <DateComposeForm
            nomDate={withNamespace(props.nom, DATE_NAISSANCE)}
            labelDate={getLibelle("Date de naissance")}
            anneeObligatoire={true}
            anneeMax={new Date().getFullYear()}
            showCroixSuppression={false}
            onChange={onChangeDateNaissance}
          />
        </div>
        <WarningMessage afficherMessage={afficherMessageNaissance}>
          {getLibelle("Jour et mois valorisés par défaut")}
        </WarningMessage>
      </div>
      <div className="Titre">{getLibelle("Lieu de naissance")}</div>
      <InputField
        name={withNamespace(lieuNaissance, VILLE_NAISSANCE)}
        label={getLibelle("Ville")}
        maxLength={NB_CARACT_MAX_SAISIE}
      />
      <InputField
        name={withNamespace(lieuNaissance, ETAT_CANTON_PROVINCE)}
        label={getLibelle("Etat, canton, province")}
        maxLength={NB_CARACT_MAX_SAISIE}
      />
      <InputField
        name={withNamespace(lieuNaissance, PAYS_NAISSANCE)}
        label={getLibelle("Pays")}
        maxLength={NB_CARACT_MAX_SAISIE}
      />
      <RadioField
        name={withNamespace(lieuNaissance, NE_DANS_MARIAGE)}
        label={getLibelle("Né dans le mariage")}
        values={OuiNon.getAllEnumsAsOptions()}
      />
      <CheckboxField
        name={withNamespace(props.nom, ADOPTE_PAR)}
        label={getLibelle("Adopté par")}
        values={[{ libelle: "", cle: "true" }]}
      />
    </Item>
  );
};

export default connect<IPostulantFormProps>(PostulantForm);
