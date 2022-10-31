import { ReinitialiserValiderFormBoutons } from "@composant/formulaire/boutons/ReinitialiserValiderBoutons";
import {
  EVENEMENT,
  PARENT_ADOPTANT_NAISS1,
  PARENT_ADOPTANT_NAISS2,
  TITULAIRE_EVT_1,
  TITULAIRE_EVT_2
} from "@composant/formulaire/ConstantesNomsForm";
import { RECEContext } from "@core/body/RECEContext";
import { IExtraitSaisiAEnvoyer } from "@hook/acte/MajEtatCivilSuiteSaisieExtraitApiHook";
import {
  ISauvegardeValidationSaisieExtraitParams,
  useSauvegardeValidationSaisieExtrait
} from "@hook/requete/ValidationSaisieExtraitHook";
import { FicheActe, IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IFiliation } from "@model/etatcivil/acte/IFiliation";
import { TitulaireActe } from "@model/etatcivil/acte/ITitulaireActe";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import {
  IRequeteDelivrance,
  RequeteDelivrance
} from "@model/requete/IRequeteDelivrance";
import { useReinitialisationComposant } from "@util/form/useReinitialisation";
import { getLibelle } from "@util/Utils";
import { StaticField } from "@widget/formulaire/champFixe/StaticField";
import { Formulaire } from "@widget/formulaire/Formulaire";
import FormikEffect from "@widget/formulaire/utils/FormikEffect";
import { withNamespace } from "@widget/formulaire/utils/FormUtil";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import { FormikProps, FormikValues } from "formik";
import React, { useCallback, useContext, useState } from "react";
import * as Yup from "yup";
import { EvenementValidationSchema } from "../../../../../../common/composant/formulaire/validation/EvenementValidationSchema";
import { EditionExtraitCopiePageContext } from "../../../EditionExtraitCopiePage";
import {
  TitulaireEvtSansDateAgeDePourLesParentsValidationSchema,
  TitulaireEvtSansSexeDateAgeDePourLesParentsValidationSchema,
  TitulaireEvtValidationSchema
} from "./contenu/sousFormulaires/validation/TitulaireEvenementFormValidation";
import {
  ISaisieExtraitForm,
  mappingActeVerFormulaireSaisirExtrait
} from "./mapping/mappingActeVerFormulaireSaisirExtrait";
import { mappingFormulaireSaisirExtraitVersExtraitAEnvoyer } from "./mapping/mappingFormulaireSaisirExtraitVersExtraitAEnvoyer";
import {
  getTitulairesEvenementsEtParentsForm,
  parentMemeSexeOuIndeterminCasPlurilingue
} from "./SaisirExtraitFormUtil";
import "./scss/FormulaireSaisirExtrait.scss";

// Schéma de validation en sortie de champs
// Validation formulaire naissance
const ExtraitValidationNaissanceTitulaireSchema = Yup.object({
  [TITULAIRE_EVT_1]: TitulaireEvtValidationSchema
});

// Validation formulaire décès
const ExtraitValidationDecesTitulaireSchema = Yup.object({
  [EVENEMENT]: EvenementValidationSchema,
  [TITULAIRE_EVT_1]: TitulaireEvtSansDateAgeDePourLesParentsValidationSchema
});

// Validation formulaire mariage
const ExtraitValidationMariageTitulairesSchema = Yup.object({
  [EVENEMENT]: EvenementValidationSchema,
  [TITULAIRE_EVT_1]:
    TitulaireEvtSansSexeDateAgeDePourLesParentsValidationSchema,
  [TITULAIRE_EVT_2]: TitulaireEvtSansSexeDateAgeDePourLesParentsValidationSchema
});

interface ComponentFormProps {
  acte: IFicheActe;
  requete: IRequeteDelivrance;
  handleDocumentEnregistre: () => void;
}

type SaisirExtraitFormProps = ComponentFormProps;

export const SaisirExtraitFormContext = React.createContext({
  setAfficheParentsAdoptantsTitulaire: (
    formik: FormikProps<FormikValues>,
    nomComposantTitulaire: string,
    afficheParentsAdoptants: boolean
  ) => {}
});

export const SaisirExtraitForm: React.FC<SaisirExtraitFormProps> = props => {
  const { setOperationEnCours } = useContext(EditionExtraitCopiePageContext);
  const { setIsDirty } = useContext(RECEContext);

  const [popinOuverte, setPopinOuverte] = useState<boolean>(false);
  const [sauvegarderSaisieParams, setSauvegarderSaisieParams] =
    useState<ISauvegardeValidationSaisieExtraitParams>();
  const { cleReinitialisation, reinitialisation } =
    useReinitialisationComposant();
  const [extraitSaisiAEnvoyer, setExtraitSaisiAEnvoyer] =
    useState<IExtraitSaisiAEnvoyer>();

  const [titulaire1ParentsAdoptants, setTitulaire1ParentsAdoptants] = useState<
    IFiliation[]
  >(
    TitulaireActe.getDeuxParentsAdoptantsOuVide(
      FicheActe.getTitulairesActeTabDansLOrdre(props.acte)[0]
    )
  );
  const [titulaire2ParentsAdoptants, setTitulaire2ParentsAdoptants] = useState<
    IFiliation[]
  >(
    TitulaireActe.getDeuxParentsAdoptantsOuVide(
      FicheActe.getTitulairesActeTabDansLOrdre(props.acte)[1]
    )
  );

  useSauvegardeValidationSaisieExtrait(sauvegarderSaisieParams);

  const onSubmitValiderExtraitSaisi = (extraitSaisi: ISaisieExtraitForm) => {
    const extraitAEnvoyer = mappingFormulaireSaisirExtraitVersExtraitAEnvoyer(
      extraitSaisi,
      props.acte
    );
    setExtraitSaisiAEnvoyer(extraitAEnvoyer);
    const problemePlurilingue = parentMemeSexeOuIndeterminCasPlurilingue(
      [extraitAEnvoyer.titulaire1, extraitAEnvoyer.titulaire2],
      props.requete.documentsReponses
    );
    if (problemePlurilingue) {
      setPopinOuverte(true);
    } else {
      setOperationEnCours(true);
      setSauvegarderSaisieParams({
        requete: props.requete,
        acte: props.acte,
        extraitSaisiAEnvoyer: extraitAEnvoyer,
        callBack: props.handleDocumentEnregistre,
        problemePlurilingue
      });
    }
  };

  const handlePopinOui = useCallback(() => {
    if (extraitSaisiAEnvoyer) {
      const problemePlurilingue = parentMemeSexeOuIndeterminCasPlurilingue(
        [extraitSaisiAEnvoyer.titulaire1, extraitSaisiAEnvoyer.titulaire2],
        props.requete.documentsReponses
      );
      setSauvegarderSaisieParams({
        requete: props.requete,
        acte: props.acte,
        extraitSaisiAEnvoyer,
        callBack: props.handleDocumentEnregistre,
        problemePlurilingue
      });
    }
  }, [extraitSaisiAEnvoyer, props]);

  const titulairesAMs =
    FicheActe.getTitulairesAMDansLOrdreAvecMajDeclConjEtMajPartiesNomSexeEtFiliation(
      props.acte
    );
  const evenement = props.acte.evenement;

  const titulairesActe = FicheActe.getTitulairesActeTabDansLOrdre(props.acte);
  const titulaireActe1 = titulairesActe[0];
  const titulaireActe2 = titulairesActe[1];

  const titulaire1Parents =
    TitulaireActe.getAuMoinsDeuxParentsDirects(titulaireActe1);
  const titulaire2Parents =
    TitulaireActe.getAuMoinsDeuxParentsDirects(titulaireActe2);

  const natureActe = props.acte.nature;

  const formDefaultValues = mappingActeVerFormulaireSaisirExtrait(
    props.acte,
    titulairesAMs
  );
  return (
    <>
      <Formulaire
        key={cleReinitialisation}
        className="FormulaireSaisirExtrait"
        formDefaultValues={formDefaultValues}
        formValidationSchema={getValidationSchema(natureActe)}
        onSubmit={onSubmitValiderExtraitSaisi}
      >
        <FormikEffect
          onChange={dirty => {
            setIsDirty(dirty);
          }}
        />
        <div className="DeuxColonnes">
          <StaticField
            libelle={getLibelle("Nature")}
            valeur={props.acte.nature.libelle}
          ></StaticField>
          <StaticField
            libelle={getLibelle("Référence")}
            valeur={FicheActe.getReference(props.acte)}
          ></StaticField>
        </div>

        <SaisirExtraitFormContext.Provider
          value={{ setAfficheParentsAdoptantsTitulaire }}
        >
          {getTitulairesEvenementsEtParentsForm({
            titulairesAMs,
            natureActe,
            titulaire1Parents,
            titulaire2Parents,
            titulaire1ParentsAdoptants,
            titulaire2ParentsAdoptants,
            donneesComplementairesPlurilingue:
              RequeteDelivrance.possedeUnDocumentPlurilingue(props.requete),
            evenement,
            naissanceTitulaire1: titulaireActe1?.naissance,
            naissanceTitulaire2: titulaireActe2?.naissance
          })}
        </SaisirExtraitFormContext.Provider>

        <ReinitialiserValiderFormBoutons
          onClickReInitialiser={reinitialisation}
          validerDisabled={false}
        />
      </Formulaire>
      <ConfirmationPopin
        isOpen={popinOuverte}
        messages={[
          getLibelle(
            "Au moins une personne (le titulaire ou les parents) est de genre indéterminé ou les parents sont de même sexe."
          ),
          getLibelle(
            "Si vous continuez, l'extrait plurilingue généré sera en erreur."
          ),
          getLibelle("Voulez-vous continuer ?")
        ]}
        boutons={[
          {
            label: getLibelle("Oui"),
            action: () => {
              handlePopinOui();
              setPopinOuverte(false);
            }
          },
          {
            label: getLibelle("Non"),
            action: () => {
              setPopinOuverte(false);
            }
          }
        ]}
      />
    </>
  );

  function setAfficheParentsAdoptantsTitulaire(
    formik: FormikProps<FormikValues>,
    nomComposantTitulaire: string,
    afficheParentsAdoptants: boolean
  ) {
    if (afficheParentsAdoptants) {
      if (nomComposantTitulaire === TITULAIRE_EVT_1) {
        setTitulaire1ParentsAdoptants(
          TitulaireActe.getDeuxParentsAdoptantsVides()
        );
      } else {
        setTitulaire2ParentsAdoptants(
          TitulaireActe.getDeuxParentsAdoptantsVides()
        );
      }
    } else {
      if (nomComposantTitulaire === TITULAIRE_EVT_1) {
        setTitulaire1ParentsAdoptants([]);
      } else {
        setTitulaire2ParentsAdoptants([]);
      }
      formik.setFieldValue(
        withNamespace(nomComposantTitulaire, PARENT_ADOPTANT_NAISS1),
        undefined
      );
      formik.setFieldValue(
        withNamespace(nomComposantTitulaire, PARENT_ADOPTANT_NAISS2),
        undefined
      );
    }
  }
};

function getValidationSchema(natureActe: NatureActe) {
  let validationSchema;
  switch (natureActe) {
    case NatureActe.NAISSANCE:
      validationSchema = ExtraitValidationNaissanceTitulaireSchema;
      break;

    case NatureActe.MARIAGE:
      validationSchema = ExtraitValidationMariageTitulairesSchema;
      break;

    case NatureActe.DECES:
      validationSchema = ExtraitValidationDecesTitulaireSchema;
      break;

    default:
      validationSchema = ExtraitValidationNaissanceTitulaireSchema;
      break;
  }

  return validationSchema;
}
