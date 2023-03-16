import { EtrangerFrance } from "@model/etatcivil/enum/EtrangerFrance";
import { OuiNon } from "@model/etatcivil/enum/OuiNon";
import { getLibelle } from "@util/Utils";
import DateComposeForm, {
  DateComposeFormProps,
  DateDefaultValues
} from "@widget/formulaire/champsDate/DateComposeForm";
import { DateValidationSchemaSansTestFormat } from "@widget/formulaire/champsDate/DateComposeFormValidation";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { RadioField } from "@widget/formulaire/champsSaisie/RadioField";
import { CARATERES_AUTORISES_MESSAGE } from "@widget/formulaire/FormulaireMessages";
import { sortieChampPremiereLettreEnMajuscule } from "@widget/formulaire/utils/ControlesUtil";
import {
  INomForm,
  SubFormProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { CarateresAutorise } from "../../../../../../ressources/Regex";
import {
  DATE_RECONNAISSANCE,
  DEPARTEMENT_RECONNAISSANCE,
  LIEU_ACTE_RECONNAISSANCE,
  PAYS_RECONNAISSANCE,
  REGION_ETAT_RECONNAISSANCE,
  TITULAIRE_RECONNU,
  VILLE_RECONNAISSANCE
} from "../../../../../common/composant/formulaire/ConstantesNomsForm";

export const EvenementReconnaissanceTitulaireFormDefaultValues = {
  [TITULAIRE_RECONNU]: "NON",
  [DATE_RECONNAISSANCE]: DateDefaultValues,
  [LIEU_ACTE_RECONNAISSANCE]: "INCONNU",
  [VILLE_RECONNAISSANCE]: "",
  [REGION_ETAT_RECONNAISSANCE]: "",
  [DEPARTEMENT_RECONNAISSANCE]: "",
  [PAYS_RECONNAISSANCE]: ""
};

export const EvenementReconnaissanceTitulaireFormValidationSchema = Yup.object().shape(
  {
    [TITULAIRE_RECONNU]: Yup.string(),
    [DATE_RECONNAISSANCE]: DateValidationSchemaSansTestFormat,
    [VILLE_RECONNAISSANCE]: Yup.string().matches(
      CarateresAutorise,
      CARATERES_AUTORISES_MESSAGE
    ),
    [REGION_ETAT_RECONNAISSANCE]: Yup.string().matches(
      CarateresAutorise,
      CARATERES_AUTORISES_MESSAGE
    ),
    [DEPARTEMENT_RECONNAISSANCE]: Yup.string().matches(
      CarateresAutorise,
      CARATERES_AUTORISES_MESSAGE
    ),
    [PAYS_RECONNAISSANCE]: Yup.string().matches(
      CarateresAutorise,
      CARATERES_AUTORISES_MESSAGE
    )
  }
);

export type EvenementReconnaissanceTitulaireSubFormProps = SubFormProps;
const EvenementReconnaissanceTitulaireForm: React.FC<
  EvenementReconnaissanceTitulaireSubFormProps
> = props => {
  const villeReconnaissanceWithNamespace = withNamespace(
    props.nom,
    VILLE_RECONNAISSANCE
  );
  const regionReconnaissanceWithNamespace = withNamespace(
    props.nom,
    REGION_ETAT_RECONNAISSANCE
  );
  const paysReconnaissanceWithNamespace = withNamespace(
    props.nom,
    PAYS_RECONNAISSANCE
  );
  const departementReconnaissanceWithNamespace = withNamespace(
    props.nom,
    DEPARTEMENT_RECONNAISSANCE
  );

  const [lieuReconnaissance, setLieuReconnaissance] = useState<EtrangerFrance>(
    EtrangerFrance.INCONNU
  );
  const [titulaireReconnu, setTitulaireReconnu] = useState(false);

  const dateEvenementReconnaissanceComposeFormProps = {
    labelDate: getLibelle(`Date de reconnaissance`),
    nomDate: withNamespace(props.nom, DATE_RECONNAISSANCE),
    anneeMax: new Date().getFullYear()
  } as DateComposeFormProps;

  function rendreComposantEnFonctionDuLieuDeReconnaissance(
    nationaliteSelectionne: EtrangerFrance
  ): JSX.Element {
    let composantLieuReconnaissance: JSX.Element = <></>;
    switch (nationaliteSelectionne) {
      case EtrangerFrance.ETRANGER:
        composantLieuReconnaissance = getFormulaireReconnaissanceEtrangere();
        break;
      case EtrangerFrance.FRANCE:
        composantLieuReconnaissance = getFormulaireReconnaissanceFrancaise();
        break;
      default:
        break;
    }

    return composantLieuReconnaissance;
  }

  function getFormulaireReconnaissanceEtrangere(): JSX.Element {
    return (
      <>
        <InputField
          name={villeReconnaissanceWithNamespace}
          label={getLibelle("Ville de la reconnaissance")}
          onBlur={e =>
            sortieChampPremiereLettreEnMajuscule(
              e,
              props.formik,
              villeReconnaissanceWithNamespace
            )
          }
        />

        <InputField
          name={regionReconnaissanceWithNamespace}
          label={getLibelle("Région/état de la reconnaissance")}
          onBlur={e =>
            sortieChampPremiereLettreEnMajuscule(
              e,
              props.formik,
              regionReconnaissanceWithNamespace
            )
          }
        />

        <InputField
          name={paysReconnaissanceWithNamespace}
          label={getLibelle("Pays de la reconnaissance")}
          onBlur={e =>
            sortieChampPremiereLettreEnMajuscule(
              e,
              props.formik,
              paysReconnaissanceWithNamespace
            )
          }
        />
      </>
    );
  }

  function getFormulaireReconnaissanceFrancaise(): JSX.Element {
    return (
      <>
        <InputField
          name={withNamespace(props.nom, VILLE_RECONNAISSANCE)}
          label={getLibelle("Ville de la reconnaissance")}
          onBlur={e =>
            sortieChampPremiereLettreEnMajuscule(
              e,
              props.formik,
              villeReconnaissanceWithNamespace
            )
          }
        />

        <InputField
          name={departementReconnaissanceWithNamespace}
          label={getLibelle("Département de la reconnaissance")}
          onBlur={e =>
            sortieChampPremiereLettreEnMajuscule(
              e,
              props.formik,
              departementReconnaissanceWithNamespace
            )
          }
        />
      </>
    );
  }

  function onChangeLieuReconnaissance(e: React.ChangeEvent<HTMLInputElement>) {
    setLieuReconnaissance(EtrangerFrance.getEnumFor(e.target.value));
    props.formik.handleChange(e);
  }

  function handleChangeTitulaireReconnu(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (e.target.value === "OUI") {
      setTitulaireReconnu(true);
    } else {
      setTitulaireReconnu(false);
    }
    props.formik.handleChange(e);
  }

  return (
    <>
      <div className="EvenementReconnaissanceTitulaireForm">
        <RadioField
          name={withNamespace(props.nom, TITULAIRE_RECONNU)}
          label={getLibelle("Le titulaire a t-il été reconnu ?")}
          values={OuiNon.getAllEnumsAsOptions()}
          onChange={handleChangeTitulaireReconnu}
        />

        {titulaireReconnu && (
          <>
            <div className="Date">
              <div className="DateEvenement">
                <DateComposeForm
                  {...dateEvenementReconnaissanceComposeFormProps}
                ></DateComposeForm>
              </div>
            </div>

            <RadioField
              name={withNamespace(props.nom, LIEU_ACTE_RECONNAISSANCE)}
              label={getLibelle("Lieu de l'acte de reconnaissance")}
              values={EtrangerFrance.getAllEnumsAsOptions()}
              onChange={onChangeLieuReconnaissance}
            />

            {rendreComposantEnFonctionDuLieuDeReconnaissance(
              lieuReconnaissance
            )}
          </>
        )}
      </div>
    </>
  );
};

export default connect<INomForm>(EvenementReconnaissanceTitulaireForm);
