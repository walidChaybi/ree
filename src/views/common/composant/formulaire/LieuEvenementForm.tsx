import { connect } from "formik";
import React, { useCallback, useState } from "react";
import { IEvenement } from "../../../../model/etatcivil/acte/IEvenement";
import { ILieuEvenement } from "../../../../model/etatcivil/commun/ILieuEvenement";
import { EtrangerFrance } from "../../../../model/etatcivil/enum/EtrangerFrance";
import { estRenseigne, getLibelle } from "../../util/Utils";
import { FRANCE, LieuxUtils } from "../../utilMetier/LieuxUtils";
import { InputField } from "../../widget/formulaire/champsSaisie/InputField";
import { RadioField } from "../../widget/formulaire/champsSaisie/RadioField";
import { SelectField } from "../../widget/formulaire/champsSaisie/SelectField";
import {
  FormikComponentProps,
  withNamespace
} from "../../widget/formulaire/utils/FormUtil";
import {
  ARRONDISSEMENT,
  ETRANGER_FRANCE,
  LIEU_COMPLET,
  PAYS,
  REGION_DEPARTEMENT,
  VILLE
} from "./ConstantesNomsForm";
import "./scss/LieuEvenementForm.scss";
import { valideLieu } from "./validation/LieuEvenementFormValidation";

interface ComponentFormProps {
  nom: string;
  label: string;
  evenement?: IEvenement;
  gestionEtrangerFrance?: boolean;
  validation?: boolean;
  etrangerParDefaut?: boolean; // true par défaut (par défaut le pays des parents est FRANCE et celui du titulaire est ETRANGER)
}

type LieuEvenementFormProps = ComponentFormProps & FormikComponentProps;
/**
 * - Un événement à l'étranger: affichage ville/région/pays
 * - Un événement en France: affichage ville/arrondissement/département
 * - Radios boutons Etranger/France pour basculer d'un affichage à l'autre si props.gestionEtrangerFrance = true
 *
 */
const LieuEvenementForm: React.FC<LieuEvenementFormProps> = props => {
  const [decomposerLieu, setDecomposerLieu] = useState(false);
  const [modeSaisieFrance, setModeSaisieFrance] = useState<boolean>(
    getModeSaisieFrance(props.evenement, props.etrangerParDefaut)
  );

  const lieuCompletRenseigne = estRenseigne(props.evenement?.lieuReprise);

  const nomVille = withNamespace(props.nom, VILLE);
  const nomRegionDepartement = withNamespace(props.nom, REGION_DEPARTEMENT);
  const nomPays = withNamespace(props.nom, PAYS);
  const nomArrondissement = withNamespace(props.nom, ARRONDISSEMENT);
  const nomLieuComplet = withNamespace(props.nom, LIEU_COMPLET);
  const nomEtrangerFrance = withNamespace(props.nom, ETRANGER_FRANCE);

  const majLieuComplet = useCallback(
    (lieu: ILieuEvenement) => {
      // Si le pays n'est pas renseigné ont détermine si le pays par défaut est FRANCE (cas des parents) (pour le titulaire par défaut la localisation est étrangère)
      if (!lieu.pays && !props.etrangerParDefaut) {
        lieu.pays = FRANCE;
      }
      props.formik.setFieldValue(
        nomLieuComplet,
        LieuxUtils.getLocalisationEtrangerOuFrance(
          lieu.ville,
          lieu.region,
          lieu.pays,
          lieu.arrondissement
        )
      );
    },
    [nomLieuComplet, props.etrangerParDefaut, props.formik]
  );

  const creerEvenementAPartirDeLaSaisie = useCallback(() => {
    return {
      ville: props.formik.getFieldProps(nomVille).value,
      region: props.formik.getFieldProps(nomRegionDepartement).value,
      pays: props.formik.getFieldProps(nomPays).value,
      arrondissement: props.formik.getFieldProps(nomArrondissement).value
    } as ILieuEvenement;
  }, [
    nomArrondissement,
    nomPays,
    nomRegionDepartement,
    nomVille,
    props.formik
  ]);

  const onClickDecomposer = useCallback(() => {
    setDecomposerLieu(true);
    const evt = creerEvenementAPartirDeLaSaisie();
    if (props.evenement) {
      majLieuComplet(evt);
    } else {
      props.formik.setFieldValue(nomLieuComplet, "");
    }

    props.formik.setFieldValue(
      nomEtrangerFrance,
      LieuxUtils.getEtrangerOuFranceEnMajuscule(
        evt.pays,
        props.etrangerParDefaut
      )
    );
  }, [
    creerEvenementAPartirDeLaSaisie,
    majLieuComplet,
    nomEtrangerFrance,
    nomLieuComplet,
    props.etrangerParDefaut,
    props.evenement,
    props.formik
  ]);

  const onChangeVilleRegionPays = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const lieuEvt = creerEvenementAPartirDeLaSaisie();
      switch (e.target.name) {
        case nomVille:
          lieuEvt.ville = e.target.value;
          if (LieuxUtils.isVilleAvecArrondissement(lieuEvt.ville)) {
            props.formik.setFieldValue(nomArrondissement, "1");
            lieuEvt.arrondissement = "1";
          }
          break;
        case nomRegionDepartement:
          lieuEvt.region = e.target.value;
          break;
        case nomPays:
          lieuEvt.pays = e.target.value;
          break;

        default:
          break;
      }
      majLieuComplet(lieuEvt);
      props.formik.handleChange(e);
    },
    [
      creerEvenementAPartirDeLaSaisie,
      majLieuComplet,
      nomArrondissement,
      nomPays,
      nomRegionDepartement,
      nomVille,
      props.formik
    ]
  );
  const onChangeArrondissement = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const lieuEvt = creerEvenementAPartirDeLaSaisie();
      lieuEvt.arrondissement = e.target.value;
      majLieuComplet(lieuEvt);
      props.formik.handleChange(e);
    },
    [creerEvenementAPartirDeLaSaisie, majLieuComplet, props.formik]
  );

  const onChangeRadioEtrangerFrance = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const estModeFrance =
        e.target.value === EtrangerFrance.getKey(EtrangerFrance.FRANCE);
      setModeSaisieFrance(estModeFrance);
      if (estModeFrance) {
        props.formik.setFieldValue(nomPays, FRANCE);
      } else {
        props.formik.setFieldValue(nomPays, "");
      }
      props.formik.setFieldValue(nomLieuComplet, "");
      props.formik.setFieldValue(nomVille, "");
      props.formik.setFieldValue(nomRegionDepartement, "");

      props.formik.handleChange(e);
    },
    [nomLieuComplet, nomPays, nomRegionDepartement, nomVille, props.formik]
  );
  return (
    <div className="LieuEvenementForm">
      <div className="LieuComplet">
        <InputField
          label={props.label}
          name={nomLieuComplet}
          disabled={decomposerLieu || !lieuCompletRenseigne}
          validate={(value: string) =>
            props.validation
              ? valideLieu(props.formik, LIEU_COMPLET, value, props.nom)
              : undefined
          }
        />
        {lieuCompletRenseigne && (
          <button
            type="button"
            onClick={onClickDecomposer}
            disabled={decomposerLieu}
          >
            {getLibelle("Décomposer")}
          </button>
        )}
      </div>

      {props.gestionEtrangerFrance && (
        <RadioField
          name={nomEtrangerFrance}
          label={getLibelle("")}
          values={EtrangerFrance.getAllEnumsAsOptions()}
          onChange={onChangeRadioEtrangerFrance}
        />
      )}

      {(decomposerLieu || !lieuCompletRenseigne) && (
        <>
          <InputField
            name={nomVille}
            label="Ville"
            onChange={onChangeVilleRegionPays}
            validate={
              props.validation
                ? (value: string) =>
                    valideLieu(props.formik, VILLE, value, props.nom)
                : undefined
            }
          />
          {modeSaisieFrance &&
            LieuxUtils.isVilleAvecArrondissement(
              props.formik.getFieldProps(nomVille).value
            ) && (
              <SelectField
                name={nomArrondissement}
                label={getLibelle("Arrondissement")}
                options={LieuxUtils.getOptionsArrondissement(
                  props.formik.getFieldProps(nomVille).value
                )}
                formik={props.formik}
                pasPremiereOptionVide={true}
                onChange={onChangeArrondissement}
              />
            )}
          <InputField
            name={nomRegionDepartement}
            label={getLabelOuDepartement(modeSaisieFrance)}
            onChange={onChangeVilleRegionPays}
            validate={(value: string) =>
              props.validation
                ? valideLieu(props.formik, REGION_DEPARTEMENT, value, props.nom)
                : undefined
            }
          />
          {!modeSaisieFrance && (
            <InputField
              name={nomPays}
              label="Pays"
              onChange={onChangeVilleRegionPays}
              validate={(value: string) =>
                props.validation
                  ? valideLieu(props.formik, PAYS, value, props.nom)
                  : undefined
              }
            />
          )}
        </>
      )}
    </div>
  );
};

function getModeSaisieFrance(
  evenement?: IEvenement,
  etrangerParDefaut = true
): boolean {
  if (etrangerParDefaut) {
    return LieuxUtils.isPaysFrance(evenement?.pays);
  } else {
    return evenement?.pays == null || LieuxUtils.isPaysFrance(evenement?.pays);
  }
}

function getLabelOuDepartement(modeSaisieFrance: boolean) {
  let label = getLibelle("Région");
  if (modeSaisieFrance) {
    label = getLibelle("Département");
  }
  return label;
}

export default connect<ComponentFormProps>(LieuEvenementForm);
