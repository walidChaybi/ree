import { IEvenement } from "@model/etatcivil/acte/IEvenement";
import { ILieuEvenement } from "@model/etatcivil/commun/ILieuEvenement";
import { EtrangerFrance } from "@model/etatcivil/enum/EtrangerFrance";
import { estRenseigne, getLibelle } from "@util/Utils";
import { FRANCE, LieuxUtils } from "@utilMetier/LieuxUtils";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { RadioField } from "@widget/formulaire/champsSaisie/RadioField";
import { SelectField } from "@widget/formulaire/champsSaisie/SelectField";
import {
  FormikComponentProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useCallback, useState } from "react";
import {
  ARRONDISSEMENT,
  ETRANGER_FRANCE,
  LIEU_COMPLET,
  PAYS,
  REGION_DEPARTEMENT,
  VILLE
} from "./ConstantesNomsForm";
import {
  estModeSaisieFrance as getEstModeSaisieFrance,
  getLabelOuDepartement
} from "./LieuEvenementFormUtil";
import "./scss/LieuEvenementForm.scss";
import { valideLieu } from "./validation/LieuEvenementFormValidation";

interface ComponentFormProps {
  nom: string;
  label: string;
  evenement?: IEvenement;
  gestionEtrangerFrance: boolean;
  validation?: boolean;
  etrangerParDefaut: boolean; // on considère que c'est true par défaut via la fonction 'estModeSaisieFrance'
  //  (par défaut le pays des parents est FRANCE et celui du titulaire est ETRANGER)
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
  const [estModeSaisieFrance, setEstModeSaisieFrance] = useState<boolean>(
    getEstModeSaisieFrance(
      props.evenement?.ville,
      props.evenement?.pays,
      props.etrangerParDefaut
    )
  );

  const lieuCompletRenseigne = estRenseigne(props.evenement?.lieuReprise);

  const nomVille = withNamespace(props.nom, VILLE);
  const nomRegionDepartement = withNamespace(props.nom, REGION_DEPARTEMENT);
  const nomPays = withNamespace(props.nom, PAYS);
  const nomArrondissement = withNamespace(props.nom, ARRONDISSEMENT);
  const nomLieuComplet = withNamespace(props.nom, LIEU_COMPLET);
  const nomEtrangerFrance = withNamespace(props.nom, ETRANGER_FRANCE);

  const majLieuComplet = useCallback(
    (lieu: ILieuEvenement, modeFrance: boolean) => {
      const lieuPourMaj = { ...lieu };
      // Si le pays n'est pas renseigné ont détermine si le pays par défaut est FRANCE (cas des parents) (pour le titulaire par défaut la localisation est étrangère)
      if (modeFrance) {
        lieuPourMaj.pays = FRANCE;
      }

      props.formik.setFieldValue(
        nomLieuComplet,
        LieuxUtils.getLocalisationEtrangerOuFrance(
          lieuPourMaj.ville,
          lieuPourMaj.region,
          lieuPourMaj.pays,
          lieuPourMaj.arrondissement
        )
      );
    },
    [nomLieuComplet, props.formik]
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
      majLieuComplet(evt, estModeSaisieFrance);
    } else {
      props.formik.setFieldValue(nomLieuComplet, "");
    }

    props.formik.setFieldValue(
      nomEtrangerFrance,
      LieuxUtils.getEtrangerOuFranceOuInconnuEnMajuscule(
        evt,
        props.etrangerParDefaut
      )
    );
  }, [
    creerEvenementAPartirDeLaSaisie,
    majLieuComplet,
    estModeSaisieFrance,
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
      majLieuComplet(lieuEvt, estModeSaisieFrance);
      props.formik.handleChange(e);
    },
    [
      creerEvenementAPartirDeLaSaisie,
      majLieuComplet,
      estModeSaisieFrance,
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
      majLieuComplet(lieuEvt, estModeSaisieFrance);
      props.formik.handleChange(e);
    },
    [
      creerEvenementAPartirDeLaSaisie,
      majLieuComplet,
      estModeSaisieFrance,
      props.formik
    ]
  );

  const onChangeRadioEtrangerFranceInconnu = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const evt = creerEvenementAPartirDeLaSaisie();
      const estModeFrance =
        e.target.value === EtrangerFrance.getKey(EtrangerFrance.FRANCE);

      const estModeInconnu =
        e.target.value === EtrangerFrance.getKey(EtrangerFrance.INCONNU);

      setEstModeSaisieFrance(estModeFrance);
      if (estModeFrance) {
        majLieuComplet(evt, estModeFrance);
      } else if (estModeInconnu) {
        props.formik.setFieldValue(nomLieuComplet, "");
      } else {
        majLieuComplet(evt, estModeFrance);
      }
      props.formik.setFieldValue(nomPays, evt.pays);

      props.formik.handleChange(e);
    },
    [
      creerEvenementAPartirDeLaSaisie,
      majLieuComplet,
      nomLieuComplet,
      nomPays,
      props.formik
    ]
  );

  return (
    <div className="LieuEvenementForm">
      <div className="LieuComplet">
        <InputField
          label={props.label}
          name={nomLieuComplet}
          disabled={decomposerLieuActifOuPasDeLieuRepriseRenseigne()}
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
            aria-label="décomposer le lieu"
          >
            {getLibelle("Décomposer")}
          </button>
        )}
      </div>

      {props.gestionEtrangerFrance &&
        decomposerLieuActifOuPasDeLieuRepriseRenseigne() && (
          <RadioField
            name={nomEtrangerFrance}
            label={getLibelle("")}
            values={EtrangerFrance.getAllEnumsAsOptions()}
            onChange={onChangeRadioEtrangerFranceInconnu}
          />
        )}

      {affichageVilleRegionPays() && (
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
          {estModeSaisieFrance &&
            LieuxUtils.isVilleAvecArrondissement(
              props.formik.getFieldProps(nomVille).value
            ) && (
              <SelectField
                name={nomArrondissement}
                label={getLibelle("Arrondissement")}
                options={LieuxUtils.getOptionsArrondissement(
                  props.formik.getFieldProps(nomVille).value
                )}
                pasPremiereOptionVide={true}
                onChange={onChangeArrondissement}
              />
            )}
          <InputField
            name={nomRegionDepartement}
            label={getLabelOuDepartement(estModeSaisieFrance)}
            onChange={onChangeVilleRegionPays}
            validate={(value: string) =>
              props.validation
                ? valideLieu(props.formik, REGION_DEPARTEMENT, value, props.nom)
                : undefined
            }
          />
          {!estModeSaisieFrance && (
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

  function decomposerLieuActifOuPasDeLieuRepriseRenseigne(): boolean {
    return decomposerLieu || !lieuCompletRenseigne;
  }

  function affichageVilleRegionPays(): boolean {
    return (
      (props.formik.getFieldProps(nomEtrangerFrance).value !==
        EtrangerFrance.getKey(EtrangerFrance.INCONNU) &&
        !lieuCompletRenseigne) ||
      (!lieuCompletRenseigne && props.gestionEtrangerFrance === false) ||
      decomposerLieu
    );
  }
};

export default connect<ComponentFormProps>(LieuEvenementForm);
