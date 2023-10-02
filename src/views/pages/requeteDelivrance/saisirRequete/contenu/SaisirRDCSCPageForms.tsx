import {
  ADRESSE,
  DOCUMENT,
  PIECES_JOINTES,
  REQUERANT,
  TITULAIRES
} from "@composant/formulaire/ConstantesNomsForm";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { TypeRequerant } from "@model/requete/enum/TypeRequerant";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { TRequete } from "@model/requete/IRequete";
import { getLibelle } from "@util/Utils";
import AdresseForm from "@widget/formulaire/adresse/AdresseForm";
import { SelectField } from "@widget/formulaire/champsSaisie/SelectField";
import PiecesJointesForm from "@widget/formulaire/piecesJointes/PiecesJointesForm";
import { SubFormProps } from "@widget/formulaire/utils/FormUtil";
import { FormikProps, FormikValues } from "formik";
import React from "react";
import { limitesTitulaires, TitulairesStateType } from "../SaisirRDCSCPage";
import IdentitesForm from "../sousFormulaires/identite/IdentitesForm";
import RequerantForm from "../sousFormulaires/requerant/RequerantForm";

export function getDocumentDemandeForm(
  onChangeMaxTitulaires: (nb: number, formik: FormikProps<FormikValues>) => void
): JSX.Element {
  return (
    <div className="DocumentInput" key={DOCUMENT}>
      <SelectField
        name={DOCUMENT}
        label={getLibelle("Document demandé")}
        options={DocumentDelivrance.getAllCertificatSituationDemandeEtAttestationAsOptions()}
        onChange={(e: any, formik?: FormikProps<FormikValues>) => {
          if (formik) {
            DocumentDelivrance.estAttestationPacs(e.target.value)
              ? onChangeMaxTitulaires(limitesTitulaires.MAX, formik)
              : onChangeMaxTitulaires(limitesTitulaires.MIN, formik);
          }
        }}
      />
    </div>
  );
}

export const getTitulairesForm = (
  titulairesState: TitulairesStateType,
  onAjoutTitulaire: (formik: FormikProps<FormikValues>) => void,
  onRetraitTitulaire: (formik: FormikProps<FormikValues>) => void,
  requeteState?: TRequete
): JSX.Element => {
  return (
    <IdentitesForm
      key={TITULAIRES}
      requete={requeteState}
      titulaires={titulairesState.titulaires}
      maxTitulaires={titulairesState.maxTitulaires}
      onAjoutTitulaire={onAjoutTitulaire}
      onRetraitTitulaire={onRetraitTitulaire}
    />
  );
};

export function getRequerantForm(
  nbTitulaires: number,
  requete?: TRequete
): JSX.Element {
  const requerantFromProps = {
    nom: REQUERANT,
    titre: getLibelle("Identité du requérant"),
    options: TypeRequerant.getAllEnumsAsOptions({
      exclusions:
        nbTitulaires < limitesTitulaires.MAX
          ? [TypeRequerant.TITULAIRE2]
          : undefined
    }),
    requete
  } as SubFormProps;
  return <RequerantForm key={REQUERANT} {...requerantFromProps} />;
}

export function getAdresseForm(): JSX.Element {
  const adresseFormProps = {
    nom: ADRESSE,
    titre: getLibelle("Adresse postale du requérant")
  } as SubFormProps;
  return <AdresseForm key={ADRESSE} {...adresseFormProps} />;
}

export function getPiecesJointesForm(): JSX.Element {
  return (
    <PiecesJointesForm
      key={PIECES_JOINTES}
      nom={PIECES_JOINTES}
      typeRequete={TypeRequete.DELIVRANCE}
      titre={getLibelle("Pièces justificatives")}
    />
  );
}

export function getBoutonsPopin(
  prendreEnCharge: (refus: boolean) => void,
  setDonneesNaissanceIncomplete: React.Dispatch<React.SetStateAction<boolean>>
) {
  return [
    {
      label: getLibelle("oui"),
      action: () => {
        prendreEnCharge(true);
        setDonneesNaissanceIncomplete(false);
      }
    },
    {
      label: getLibelle("non"),
      action: () => {
        prendreEnCharge(false);
        setDonneesNaissanceIncomplete(false);
      }
    },
    {
      label: getLibelle("annuler"),
      action: () => {
        setDonneesNaissanceIncomplete(false);
      }
    }
  ];
}
