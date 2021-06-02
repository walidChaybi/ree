import React, { useState } from "react";
import * as Yup from "yup";
import { SousTypeDelivrance } from "../../../model/requete/v2/enum/SousTypeDelivrance";
import { TypeLienMandant } from "../../../model/requete/v2/enum/TypeLienMandant";
import {
  TypeLienRequerant,
  TYPE_LIEN_REQUERANT_POUR_TITULAIRE
} from "../../../model/requete/v2/enum/TypeLienRequerant";
import { TypeNatureActe } from "../../../model/requete/v2/enum/TypeNatureActe";
import {
  TypeRequerantRDC,
  UN_TITULAIRE
} from "../../../model/requete/v2/enum/TypeRequerantRDC";
import { Options } from "../../common/util/Type";
import { Formulaire } from "../../common/widget/formulaire/Formulaire";
import { SousFormulaire } from "../../common/widget/formulaire/SousFormulaire";
import { SubFormProps } from "../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../common/widget/Text";
import SaisirRequeteBoutons, {
  SaisirRequeteBoutonsProps
} from "./boutons/SaisirRequeteBoutons";
import {
  ADRESSE,
  EVENEMENT,
  LIEN_TITULAIRE,
  MANDANT,
  REQUERANT,
  REQUETE,
  TITULAIRE1,
  TITULAIRE2
} from "./modelForm/ISaisirRDCPageModel";
import "./scss/SaisirRequetePage.scss";
import AdresseForm, {
  AdresseFormDefaultValues,
  AdresseFormValidationSchema
} from "./sousFormulaires/adresse/AdresseForm";
import EvenementForm, {
  EvenementFormDefaultValues,
  EvenementFormValidationSchema,
  EvenementSubFormProps
} from "./sousFormulaires/evenement/EvenementForm";
import IdentiteForm, {
  IdentiteFormDefaultValues,
  IdentiteFormValidationSchema,
  IdentiteSubFormProps
} from "./sousFormulaires/identite/IdentiteForm";
import LienTitulaireForm, {
  LienTitulaireFormDefaultValues,
  LienTitulaireFormValidationSchema
} from "./sousFormulaires/lienTitulaire/LienTitulaireForm";
import MandantForm, {
  MandantFormDefaultValues,
  MandantFormValidationSchema
} from "./sousFormulaires/mandant/MandantForm";
import RequerantForm, {
  RequerantFormValidationSchema,
  TitulairesFormDefaultValues
} from "./sousFormulaires/requerant/RequerantForm";
import RequeteForm, {
  RequeteFormDefaultValues,
  RequeteFormValidationSchema
} from "./sousFormulaires/requete/RequeteForm";

// Valeurs par défaut des champs
const DefaultValuesRDCRequete = {
  [REQUETE]: RequeteFormDefaultValues,
  [EVENEMENT]: EvenementFormDefaultValues,
  [TITULAIRE1]: IdentiteFormDefaultValues,
  [TITULAIRE2]: IdentiteFormDefaultValues,
  [REQUERANT]: TitulairesFormDefaultValues,
  [MANDANT]: MandantFormDefaultValues,
  [LIEN_TITULAIRE]: LienTitulaireFormDefaultValues,
  [ADRESSE]: AdresseFormDefaultValues
};

// Schéma de validation en sortie de champs
const ValidationSchemaRDCRequete = Yup.object({
  [REQUETE]: RequeteFormValidationSchema,
  [EVENEMENT]: EvenementFormValidationSchema,
  [TITULAIRE1]: IdentiteFormValidationSchema,
  [TITULAIRE2]: IdentiteFormValidationSchema,
  [REQUERANT]: RequerantFormValidationSchema,
  [MANDANT]: MandantFormValidationSchema,
  [LIEN_TITULAIRE]: LienTitulaireFormValidationSchema,
  [ADRESSE]: AdresseFormValidationSchema
});

export const titreForm = SousTypeDelivrance.getEnumFor("RDC").libelle;

export const SaisirRDCPage: React.FC = () => {
  const [evenementVisible, setEvenementVisible] = useState<boolean>(false);
  const [titulaire2Visible, setTitulaire2Visible] = useState<boolean>(false);
  const [mandantVisible, setMandantVisible] = useState<boolean>(false);
  const [lienTitulaireVisible, setLienTitulaireVisible] = useState<boolean>(
    true
  );

  const [optionsRequerant, setOptionsRequerant] = useState<Options>(
    TypeRequerantRDC.getListEnumsAsOptions(UN_TITULAIRE)
  );

  const [optionsLienTitulaire, setOptionsLienTitulaire] = useState<Options>(
    TypeLienRequerant.getListEnumsAsOptions(TYPE_LIEN_REQUERANT_POUR_TITULAIRE)
  );

  const onChangeNature = (nature: string) => {
    setEvenementVisible(
      TypeNatureActe.getEnumFor(nature) !== TypeNatureActe.NAISSANCE
    );
    setTitulaire2Visible(
      TypeNatureActe.getEnumFor(nature) === TypeNatureActe.MARIAGE
    );

    if (TypeNatureActe.getEnumFor(nature) === TypeNatureActe.MARIAGE) {
      setOptionsRequerant(TypeRequerantRDC.getAllEnumsAsOptions());
    } else {
      setOptionsRequerant(TypeRequerantRDC.getListEnumsAsOptions(UN_TITULAIRE));
    }
  };

  const onChangeRequerant = (typeRequerant: string) => {
    setMandantVisible(
      TypeRequerantRDC.getEnumFor(typeRequerant) === TypeRequerantRDC.MANDATAIRE
    );

    setLienTitulaireVisible(
      !(
        TypeRequerantRDC.getEnumFor(typeRequerant) ===
          TypeRequerantRDC.INSTITUTIONNEL ||
        TypeRequerantRDC.getEnumFor(typeRequerant) ===
          TypeRequerantRDC.AUTRE_PROFESSIONNEL
      )
    );

    if (
      TypeRequerantRDC.getEnumFor(typeRequerant) ===
        TypeRequerantRDC.TITULAIRE1 ||
      TypeRequerantRDC.getEnumFor(typeRequerant) === TypeRequerantRDC.TITULAIRE2
    ) {
      setOptionsLienTitulaire(
        TypeLienRequerant.getListEnumsAsOptions(
          TYPE_LIEN_REQUERANT_POUR_TITULAIRE
        )
      );
    } else if (
      TypeRequerantRDC.getEnumFor(typeRequerant) ===
      TypeRequerantRDC.PARTICULIER
    ) {
      setOptionsLienTitulaire(TypeLienRequerant.getAllEnumsAsOptions());
    } else if (
      TypeRequerantRDC.getEnumFor(typeRequerant) === TypeRequerantRDC.MANDATAIRE
    ) {
      setOptionsLienTitulaire(TypeLienMandant.getAllEnumsAsOptions());
    }
  };

  const blocsForm: JSX.Element[] = [
    getRequeteForm(onChangeNature),
    getEvenementForm(evenementVisible),
    getTitulaire1Form(),
    getTitulaire2Form(titulaire2Visible),
    getRequerantForm(optionsRequerant, onChangeRequerant),
    getMandantForm(mandantVisible),
    getLienTitulaireForm(lienTitulaireVisible, optionsLienTitulaire),
    getAdresseForm()
  ];

  const onSubmitSaisirRequete = (values: any, errors: any) => {};

  const boutonsProps = {} as SaisirRequeteBoutonsProps;

  return (
    <>
      <title>{titreForm}</title>
      <Formulaire
        titre={titreForm}
        formDefaultValues={DefaultValuesRDCRequete}
        formValidationSchema={ValidationSchemaRDCRequete}
        onSubmit={onSubmitSaisirRequete}
        className="FormulaireSaisirRDC"
      >
        <div>{blocsForm}</div>
        <SaisirRequeteBoutons {...boutonsProps} />
      </Formulaire>
    </>
  );
};

function getRequeteForm(onChangeNature: (nature: string) => void): JSX.Element {
  const requeteFormProps = {
    nom: REQUETE,
    titre: getLibelle("Requête"),
    onChange: onChangeNature
  } as SubFormProps;
  return <RequeteForm key={REQUETE} {...requeteFormProps} />;
}

function getEvenementForm(visible: boolean): JSX.Element {
  const evenementFormProps = {
    nom: EVENEMENT,
    libelle: getLibelle("l'évènement"),
    reset: visible
  } as EvenementSubFormProps;
  return (
    <div key={EVENEMENT}>
      {visible && (
        <SousFormulaire titre={getLibelle("Évènement")}>
          <div className="EvenementForm">
            <EvenementForm {...evenementFormProps} />
          </div>
        </SousFormulaire>
      )}
    </div>
  );
}

function getTitulaire1Form(): JSX.Element {
  const interesseFormProps = {
    nom: TITULAIRE1,
    titre: getLibelle("Titulaire 1"),
    filiation: true
  } as IdentiteSubFormProps;
  return <IdentiteForm key={TITULAIRE1} {...interesseFormProps} />;
}

function getTitulaire2Form(visible: boolean): JSX.Element {
  const interesseFormProps = {
    nom: TITULAIRE2,
    titre: getLibelle("Titulaire 2"),
    reset: visible,
    filiation: true
  } as IdentiteSubFormProps;
  return (
    <div key={TITULAIRE2}>
      {visible && <IdentiteForm {...interesseFormProps} />}
    </div>
  );
}

function getRequerantForm(
  optionsRequerant: Options,
  onChangeRequerant: (requerant: string) => void
): JSX.Element {
  const requerantFromProps = {
    nom: REQUERANT,
    titre: getLibelle("Identité du requérant"),
    options: optionsRequerant,
    onChange: onChangeRequerant
  } as SubFormProps;
  return <RequerantForm key={REQUERANT} {...requerantFromProps} />;
}

function getMandantForm(visible: boolean): JSX.Element {
  const mandantFromProps = {
    nom: MANDANT,
    titre: getLibelle("Mandant"),
    reset: visible
  } as SubFormProps;
  return (
    <div key={MANDANT}>{visible && <MandantForm {...mandantFromProps} />}</div>
  );
}

function getLienTitulaireForm(
  visible: boolean,
  optionsLienTitulaire: Options
): JSX.Element {
  const titulaireFromProps = {
    nom: LIEN_TITULAIRE,
    titre: getLibelle("Lien avec le titulaire"),
    reset: visible,
    options: optionsLienTitulaire
  } as SubFormProps;
  return (
    <div key={LIEN_TITULAIRE}>
      {visible && <LienTitulaireForm {...titulaireFromProps} />}
    </div>
  );
}

function getAdresseForm(): JSX.Element {
  const adresseFormProps = {
    nom: ADRESSE,
    titre: getLibelle("Adresse postale du requérant")
  } as SubFormProps;
  return <AdresseForm key={ADRESSE} {...adresseFormProps} />;
}
