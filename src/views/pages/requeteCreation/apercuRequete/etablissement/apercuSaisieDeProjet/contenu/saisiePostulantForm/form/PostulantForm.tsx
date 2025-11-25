import { OuiNon } from "@model/etatcivil/enum/OuiNon";
import { Sexe } from "@model/etatcivil/enum/Sexe";
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
  PRENOMS,
  SEXE,
  VILLE_NAISSANCE
} from "@views/common/composant/formulaire/ConstantesNomsForm";
import NomSecableForm from "@views/common/composant/formulaire/NomSecableForm";
import PrenomsConnusForm from "@views/common/composant/formulaire/nomsPrenoms/PrenomsConnusForm";
import PrenomsForm from "@views/common/composant/formulaire/nomsPrenoms/PrenomsForm";
import DateComposeForm, { ChampDateModifie } from "@widget/formulaire/champsDate/DateComposeForm";
import { IDateComposeForm } from "@widget/formulaire/champsDate/DateComposeFormUtil";
import { CheckboxField } from "@widget/formulaire/champsSaisie/CheckBoxField";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { RadioField } from "@widget/formulaire/champsSaisie/RadioField";
import { MessageAvertissement } from "@widget/formulaire/erreur/MessageAvertissement";
import { FormikComponentProps, NB_CARACT_MAX_SAISIE, compteNombreDePrenoms, withNamespace } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useEffect, useState } from "react";
import Item from "../../../../commun/resumeRequeteCreationEtablissement/items/Item";

interface IPostulantFormProps {
  nom: string;
  afficherMessageNaissance: boolean;
}
type PostulantFormProps = IPostulantFormProps & FormikComponentProps;

const PostulantForm: React.FC<PostulantFormProps> = props => {
  const [afficherMessageNaissance, setAfficherMessageNaissance] = useState<boolean>(props.afficherMessageNaissance);

  const nbPrenoms = compteNombreDePrenoms(props.formik.values.titulaire.prenoms.prenoms);

  const nbPrenomAnalyseMarginale = compteNombreDePrenoms(props.formik.values.titulaire.analyseMarginale.prenoms);

  const nomSecableWithNamespace = withNamespace(props.nom, NOM_SECABLE);
  const analyseMarginale = withNamespace(props.nom, ANALYSE_MARGINALE);
  const sexe = withNamespace(props.nom, SEXE);
  const lieuNaissance = withNamespace(props.nom, LIEU_DE_NAISSANCE);

  const afficherMessageSexe = Sexe.estIndetermine(props.formik.getFieldProps(sexe).value);

  const onChangeDateNaissance = (date: IDateComposeForm, type?: ChampDateModifie) => {
    if (type === ChampDateModifie.JOUR || ChampDateModifie.MOIS) {
      setAfficherMessageNaissance(false);
    }
  };

  useEffect(() => {
    setAfficherMessageNaissance(props.afficherMessageNaissance);
  }, [props.afficherMessageNaissance]);

  return (
    <Item titre={"Postulant"}>
      <InputField
        name={withNamespace(props.nom, NOM)}
        label={"Nom"}
        maxLength={NB_CARACT_MAX_SAISIE}
      />
      <NomSecableForm
        nomComposant={nomSecableWithNamespace}
        nomTitulaire={props.formik.getFieldProps(withNamespace(props.nom, NOM)).value}
        saisieVerrouillee={false}
        afficherAvertissementVocable={true}
      />
      <PrenomsConnusForm
        libelleAucunPrenom={"Pas de prénom"}
        nom={withNamespace(props.nom, PRENOMS)}
        nbPrenomsAffiche={nbPrenoms}
        nbPrenoms={nbPrenoms}
        pasDePrenomConnu
      />
      <div className="Titre">{"Analyse marginale"}</div>
      <InputField
        name={withNamespace(analyseMarginale, NOM)}
        label={"Nom"}
        maxLength={NB_CARACT_MAX_SAISIE}
      />
      <PrenomsForm
        nom={withNamespace(analyseMarginale, PRENOMS)}
        nbPrenoms={nbPrenomAnalyseMarginale}
        nbPrenomsAffiche={nbPrenomAnalyseMarginale}
      />
      <InputField
        name={withNamespace(props.nom, IDENTITE)}
        label={"Identité avant décret"}
        maxLength={NB_CARACT_MAX_SAISIE}
      />
      <div className="AvertissementConteneur">
        <RadioField
          name={withNamespace(props.nom, SEXE)}
          label={"Sexe"}
          values={Sexe.getAllEnumsAsOptionsSansInconnu()}
        />
        <MessageAvertissement afficherMessage={afficherMessageSexe}>{"Attention, sexe indéterminé"}</MessageAvertissement>
      </div>
      <div className="AvertissementConteneur">
        <div className={"ConteneurDateCompose" + (afficherMessageNaissance ? " AvertissementDateCompose" : "")}>
          <DateComposeForm
            nomDate={withNamespace(props.nom, DATE_NAISSANCE)}
            labelDate={"Date de naissance"}
            anneeObligatoire={true}
            anneeMax={new Date().getFullYear()}
            showCroixSuppression={false}
            onChange={onChangeDateNaissance}
          />
        </div>
        <MessageAvertissement afficherMessage={afficherMessageNaissance}>{"Jour et mois valorisés par défaut"}</MessageAvertissement>
      </div>
      <div className="Titre">{"Lieu de naissance"}</div>
      <InputField
        name={withNamespace(lieuNaissance, VILLE_NAISSANCE)}
        label={"Ville"}
        maxLength={NB_CARACT_MAX_SAISIE}
      />
      <InputField
        name={withNamespace(lieuNaissance, ETAT_CANTON_PROVINCE)}
        label={"Etat, canton, province"}
        maxLength={NB_CARACT_MAX_SAISIE}
      />
      <InputField
        name={withNamespace(lieuNaissance, PAYS_NAISSANCE)}
        label={"Pays"}
        maxLength={NB_CARACT_MAX_SAISIE}
      />
      <RadioField
        name={withNamespace(lieuNaissance, NE_DANS_MARIAGE)}
        label={"Né dans le mariage"}
        values={OuiNon.getAllEnumsAsOptions()}
      />
      <CheckboxField
        name={withNamespace(props.nom, ADOPTE_PAR)}
        label={"Adopté par"}
        values={[{ libelle: "", cle: "true" }]}
      />
    </Item>
  );
};

export default connect<IPostulantFormProps>(PostulantForm);
