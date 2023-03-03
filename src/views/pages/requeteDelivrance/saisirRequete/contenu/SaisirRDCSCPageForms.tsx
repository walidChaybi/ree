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
import { Options } from "@util/Type";
import { getLibelle } from "@util/Utils";
import AdresseForm from "@widget/formulaire/adresse/AdresseForm";
import { SelectField } from "@widget/formulaire/champsSaisie/SelectField";
import PiecesJointesForm from "@widget/formulaire/piecesJointes/PiecesJointesForm";
import { SubFormProps } from "@widget/formulaire/utils/FormUtil";
import { FormikProps, FormikValues } from "formik";
import React from "react";
import { limitesTitulaires } from "../SaisirRDCSCPage";
import { IdentiteSubFormProps } from "../sousFormulaires/identite/IdentiteForm";
import IdentitesForm from "../sousFormulaires/identite/IdentitesForm";
import RequerantForm from "../sousFormulaires/requerant/RequerantForm";

type TitulaireFormType = {
  requete?: TRequete;
  titulaires: IdentiteSubFormProps[];
  maxTitulaires: number;
  onAjoutTitulaire: (formik: FormikProps<FormikValues>) => void;
  onRetraitTitulaire: (formik: FormikProps<FormikValues>) => void;
};

type RequerantFormType = {
  requete?: TRequete;
  nbTitulaires: number;
};

export function getDocumentDemandeForm(
  documentDemandeOptions: Options,
  onChangeMaxTitulaires: (nb: number, formik: FormikProps<FormikValues>) => void
): JSX.Element {
  return (
    <div className="DocumentInput" key={DOCUMENT}>
      <SelectField
        name={DOCUMENT}
        label={getLibelle("Document demandé")}
        options={documentDemandeOptions}
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

export const getTitulairesForm = (props: TitulaireFormType): JSX.Element => (
  <IdentitesForm key={TITULAIRES} {...props} />
);

export function getRequerantForm(props: RequerantFormType): JSX.Element {
  const requerantFromProps = {
    nom: REQUERANT,
    titre: getLibelle("Identité du requérant"),
    options: TypeRequerant.getAllEnumsAsOptions({
      exclusions:
        props.nbTitulaires < limitesTitulaires.MAX
          ? [TypeRequerant.TITULAIRE2]
          : undefined
    }),
    requete: props.requete
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
