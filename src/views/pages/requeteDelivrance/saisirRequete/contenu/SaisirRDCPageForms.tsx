import React from "react";
import { Options } from "../../../../common/util/Type";
import { getLibelle } from "../../../../common/util/Utils";
import AdresseForm from "../../../../common/widget/formulaire/adresse/AdresseForm";
import RequeteForm from "../../../../common/widget/formulaire/requete/RequeteForm";
import { SousFormulaire } from "../../../../common/widget/formulaire/SousFormulaire";
import { SubFormProps } from "../../../../common/widget/formulaire/utils/FormUtil";
import {
  ADRESSE,
  EVENEMENT,
  LIEN_TITULAIRE,
  MANDANT,
  REQUERANT,
  REQUETE,
  TITULAIRE1,
  TITULAIRE2
} from "../modelForm/ISaisirRDCPageModel";
import EvenementForm, {
  EvenementSubFormProps
} from "../sousFormulaires/evenement/EvenementForm";
import IdentiteForm, {
  IdentiteSubFormProps
} from "../sousFormulaires/identite/IdentiteForm";
import LienTitulaireForm from "../sousFormulaires/lienTitulaire/LienTitulaireForm";
import MandantForm from "../sousFormulaires/mandant/MandantForm";
import RequerantForm from "../sousFormulaires/requerant/RequerantForm";

export function getRequeteForm(
  onChangeNature: (nature: string) => void
): JSX.Element {
  const requeteFormProps = {
    nom: REQUETE,
    titre: getLibelle("Requête"),
    onChange: onChangeNature
  } as SubFormProps;
  return <RequeteForm key={REQUETE} {...requeteFormProps} />;
}

export function getEvenementForm(visible: boolean): JSX.Element {
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

export function getTitulaire1Form(): JSX.Element {
  const interesseFormProps = {
    nom: TITULAIRE1,
    titre: getLibelle("Titulaire 1"),
    filiation: true
  } as IdentiteSubFormProps;
  return <IdentiteForm key={TITULAIRE1} {...interesseFormProps} />;
}

export function getTitulaire2Form(visible: boolean): JSX.Element {
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

export function getRequerantForm(
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

export function getMandantForm(visible: boolean): JSX.Element {
  const mandantFromProps = {
    nom: MANDANT,
    titre: getLibelle("Mandant"),
    reset: visible
  } as SubFormProps;
  return (
    <div key={MANDANT}>{visible && <MandantForm {...mandantFromProps} />}</div>
  );
}

export function getLienTitulaireForm(
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

export function getAdresseForm(): JSX.Element {
  const adresseFormProps = {
    nom: ADRESSE,
    titre: getLibelle("Adresse postale du requérant")
  } as SubFormProps;
  return <AdresseForm key={ADRESSE} {...adresseFormProps} />;
}

export function getBoutonsPopin(
  prendreEnCharge: () => void,
  setDonneesIncompletes: React.Dispatch<React.SetStateAction<boolean>>
) {
  return [
    {
      label: getLibelle("oui"),
      action: () => {
        prendreEnCharge();
        setDonneesIncompletes(false);
      }
    },
    {
      label: getLibelle("non"),
      action: () => {
        setDonneesIncompletes(false);
      }
    }
  ];
}
