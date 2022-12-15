import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { sortieChampPremiereLettreEnMajuscule } from "@widget/formulaire/utils/ControlesUtil";
import { NB_CARACT_MAX_SAISIE } from "@widget/formulaire/utils/FormUtil";
import React from "react";
import InputFieldAvecBoutonMajuscule from "../../../../../common/widget/formulaire/champsSaisie/InputFieldAvecBoutonMajuscule";
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
      <InputFieldAvecBoutonMajuscule
        name={nomWithNamespace}
        label={libelleChampNom}
        maxLength={NB_CARACT_MAX_SAISIE}
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
