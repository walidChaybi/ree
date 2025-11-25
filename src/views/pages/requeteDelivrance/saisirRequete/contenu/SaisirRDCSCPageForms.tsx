import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { TypeRequerant } from "@model/requete/enum/TypeRequerant";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { TRequete } from "@model/requete/IRequete";
import { ADRESSE, DOCUMENT, PIECES_JOINTES, REQUERANT, TITULAIRES } from "@views/common/composant/formulaire/ConstantesNomsForm";
import AdresseForm from "@widget/formulaire/adresse/AdresseForm";
import { SelectField } from "@widget/formulaire/champsSaisie/SelectField";
import PiecesJointesForm from "@widget/formulaire/piecesJointes/PiecesJointesForm";
import { SubFormProps } from "@widget/formulaire/utils/FormUtil";
import { FormikProps, FormikValues } from "formik";
import React from "react";
import { ITitulairesState, limitesTitulaires } from "../SaisirRDCSCPage";
import IdentitesForm from "../sousFormulaires/identite/IdentitesForm";
import RequerantForm from "../sousFormulaires/requerant/RequerantForm";

export const getDocumentDemandeForm = (onChangeMaxTitulaires: (nb: number, formik: FormikProps<FormikValues>) => void): JSX.Element => {
  return (
    <div
      className="DocumentInput"
      key={DOCUMENT}
    >
      <SelectField
        name={DOCUMENT}
        label={"Document demandé"}
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
};

export const getTitulairesForm = (
  titulairesState: ITitulairesState,
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

export const getRequerantForm = (nbTitulaires: number, requete?: TRequete): JSX.Element => {
  const requerantFromProps = {
    nom: REQUERANT,
    titre: "Identité du requérant",
    options: TypeRequerant.getAllEnumsAsOptions({
      exclusions: nbTitulaires < limitesTitulaires.MAX ? [TypeRequerant.TITULAIRE2] : undefined
    }),
    requete
  } as SubFormProps;
  return (
    <RequerantForm
      key={REQUERANT}
      {...requerantFromProps}
    />
  );
};

export const getAdresseForm = (): JSX.Element => {
  const adresseFormProps = {
    nom: ADRESSE,
    titre: "Adresse postale du requérant"
  } as SubFormProps;
  return (
    <AdresseForm
      key={ADRESSE}
      {...adresseFormProps}
    />
  );
};

export const getPiecesJointesForm = (): JSX.Element => {
  return (
    <PiecesJointesForm
      key={PIECES_JOINTES}
      nom={PIECES_JOINTES}
      typeRequete={TypeRequete.DELIVRANCE}
      titre={"Pièces justificatives"}
    />
  );
};

export const getBoutonsPopin = (
  prendreEnCharge: (refus: boolean) => void,
  setDonneesNaissanceIncomplete: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return [
    {
      label: "oui",
      action: () => {
        prendreEnCharge(true);
        setDonneesNaissanceIncomplete(false);
      }
    },
    {
      label: "non",
      action: () => {
        prendreEnCharge(false);
        setDonneesNaissanceIncomplete(false);
      }
    },
    {
      label: "annuler",
      action: () => {
        setDonneesNaissanceIncomplete(false);
      }
    }
  ];
};
