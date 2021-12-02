import React from "react";
import { InputField } from "../../../../../common/widget/formulaire/champsSaisie/InputField";
import {
  sortieChampEnMajuscule,
  sortieChampPremiereLettreEnMajuscule
} from "../../../../../common/widget/formulaire/utils/ControlesUtil";
import { NB_CARACT_MAX_SAISIE } from "../../../../../common/widget/formulaire/utils/FormUtil";
export function getBlockRaisonSocialeNomPrenom(
  raisonSocialeWithNamespace: string,
  libelleChampRaisonSociale: string,
  nomWithNamespace: string,
  libelleChampNom: string,
  prenomWithNamespace: string,
  libelleChampPrenom: string,
  formik: any
) {
  return (
    <>
      <InputField
        name={raisonSocialeWithNamespace}
        label={libelleChampRaisonSociale}
        maxLength={NB_CARACT_MAX_SAISIE}
      />
      <InputField
        name={nomWithNamespace}
        label={libelleChampNom}
        maxLength={NB_CARACT_MAX_SAISIE}
        onBlur={e => sortieChampEnMajuscule(e, formik, nomWithNamespace)}
      />
      <InputField
        name={prenomWithNamespace}
        label={libelleChampPrenom}
        maxLength={NB_CARACT_MAX_SAISIE}
        onBlur={e =>
          sortieChampPremiereLettreEnMajuscule(e, formik, prenomWithNamespace)
        }
      />
    </>
  );
}
