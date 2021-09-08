import React from "react";
import { TypeRequerant } from "../../../../model/requete/v2/enum/TypeRequerant";
import { TRequete } from "../../../../model/requete/v2/IRequete";
import { Options } from "../../../common/util/Type";
import AdresseForm from "../../../common/widget/formulaire/adresse/AdresseForm";
import { SelectField } from "../../../common/widget/formulaire/champsSaisie/SelectField";
import PiecesJointesForm from "../../../common/widget/formulaire/piecesJointes/PiecesJointesForm";
import { SubFormProps } from "../../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../../common/widget/Text";
import {
  ADRESSE,
  DOCUMENT,
  INTERESSE,
  PIECES_JOINTES,
  REQUERANT
} from "../modelForm/ISaisirRDCSCPageModel";
import IdentiteForm, {
  IdentiteSubFormProps
} from "../sousFormulaires/identite/IdentiteForm";
import RequerantForm from "../sousFormulaires/requerant/RequerantForm";

export const getBlocsForm = (
  documentDemandeOptions: any,
  detailRequeteState: TRequete | undefined
): JSX.Element[] => [
  getDocumentDemande(documentDemandeOptions),
  getInteresseForm(detailRequeteState),
  getRequerantForm(detailRequeteState),
  getAdresseForm(),
  getPiecesJointesForm()
];

export function getDocumentDemande(
  documentDemandeOptions: Options
): JSX.Element {
  return (
    <div className="DocumentInput" key={DOCUMENT}>
      <SelectField
        name={DOCUMENT}
        label={getLibelle("Document demandé")}
        options={documentDemandeOptions}
      />
    </div>
  );
}

export function getInteresseForm(
  detailRequeteState: TRequete | undefined
): JSX.Element {
  const interesseFormProps = {
    nom: INTERESSE,
    titre: getLibelle("Intéressé"),
    requete: detailRequeteState
  } as IdentiteSubFormProps;
  return <IdentiteForm key={INTERESSE} {...interesseFormProps} />;
}

export function getRequerantForm(
  detailRequeteState: TRequete | undefined
): JSX.Element {
  const requerantFromProps = {
    nom: REQUERANT,
    titre: getLibelle("Identité du requérant"),
    options: TypeRequerant.getAllEnumsAsOptions(),
    requete: detailRequeteState
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
  const piecesJointesFormProps = {
    nom: PIECES_JOINTES,
    titre: getLibelle("Pièces justificatives")
  } as SubFormProps;
  return <PiecesJointesForm key={PIECES_JOINTES} {...piecesJointesFormProps} />;
}

export function getBoutonsPopin(
  enregistrerValider: (refus: boolean) => void,
  setDonneesNaissanceIncomplete: React.Dispatch<React.SetStateAction<boolean>>
) {
  return [
    {
      label: getLibelle("oui"),
      action: () => {
        enregistrerValider(true);
        setDonneesNaissanceIncomplete(false);
      }
    },
    {
      label: getLibelle("non"),
      action: () => {
        enregistrerValider(false);
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
