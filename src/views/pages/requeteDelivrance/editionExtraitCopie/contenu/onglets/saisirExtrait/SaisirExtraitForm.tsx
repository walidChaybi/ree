import { ReinitialiserValiderFormBoutons } from "@composant/formulaire/boutons/ReinitialiserValiderBoutons";
import {
  EVENEMENT,
  TITULAIRE_EVT_1,
  TITULAIRE_EVT_2
} from "@composant/formulaire/ConstantesNomsForm";
import { RECEContext } from "@core/body/Body";
import { IExtraitSaisiAEnvoyer } from "@hook/acte/MajEtatCivilSuiteSaisieExtraitApiHook";
import { mapActe } from "@hook/repertoires/MappingRepertoires";
import {
  ISauvegardeValidationSaisieExtraitParams,
  useSauvegardeValidationSaisieExtrait
} from "@hook/requete/ValidationSaisieExtraitHook";
import { FicheActe, IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { TitulaireActe } from "@model/etatcivil/acte/ITitulaireActe";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { useReinitialisationComposant } from "@util/form/useReinitialisation";
import { getLibelle } from "@util/Utils";
import { StaticField } from "@widget/formulaire/champFixe/StaticField";
import { Formulaire } from "@widget/formulaire/Formulaire";
import FormikEffect from "@widget/formulaire/utils/FormikEffect";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import React, { useCallback, useContext, useState } from "react";
import * as Yup from "yup";
import { ficheActeDeces2 } from "../../../../../../../mock/data/ficheActe";
import { EvenementValidationSchema } from "../../../../../../common/composant/formulaire/validation/EvenementValidationSchema";
import { EditionExtraitCopiePageContext } from "../../../EditionExtraitCopiePage";
import { TitulaireEvtValidationSchema } from "./contenu/sousFormulaires/validation/TitulaireEvenementFormValidation";
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
  [TITULAIRE_EVT_1]: TitulaireEvtValidationSchema
});

// Validation formulaire mariage
const ExtraitValidationMariageTitulairesSchema = Yup.object({
  [EVENEMENT]: EvenementValidationSchema,
  [TITULAIRE_EVT_1]: TitulaireEvtValidationSchema,
  [TITULAIRE_EVT_2]: TitulaireEvtValidationSchema
});

interface ComponentFormProps {
  acte: IFicheActe;
  requete: IRequeteDelivrance;
  handleDocumentEnregistre: () => void;
}

type SaisirExtraitFormProps = ComponentFormProps;

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

  // const titulairesAMs =
  //   FicheActe.getTitulairesAMDansLOrdreAvecMajDeclConjEtMajPartiesNom(
  //     props.acte
  //   );
  // const evenement = props.acte.evenement;

  // const titulaire1Parents = TitulaireActe.getAuMoinsDeuxParentsDirects(
  //   props.acte.titulaires[0]
  // );
  // const titulaire2Parents = TitulaireActe.getAuMoinsDeuxParentsDirects(
  //   props.acte.titulaires[1]
  // );
  // const natureActe = props.acte.nature;

  // const formDefaultValues = mappingActeVerFormulaireSaisirExtrait(
  //   props.acte,
  //   titulairesAMs
  // );

  const acteTmp = mapActe(ficheActeDeces2.data);
  console.log("acteTmp", acteTmp);

  const titulairesAMs =
    FicheActe.getTitulairesAMDansLOrdreAvecMajDeclConjEtMajPartiesNom(acteTmp);

  const evenement = acteTmp.evenement;

  const titulaire1Parents = TitulaireActe.getAuMoinsDeuxParentsDirects(
    acteTmp.titulaires[0]
  );
  const titulaire2Parents = TitulaireActe.getAuMoinsDeuxParentsDirects(
    acteTmp.titulaires[1]
  );

  const natureActe = acteTmp.nature;

  // acteTmp.evenement!.lieuReprise = "en mer";
  // acteTmp.evenement!.ville = "en mer";
  // acteTmp.evenement!.region = "";
  // acteTmp.evenement!.pays = "";

  const formDefaultValues = mappingActeVerFormulaireSaisirExtrait(
    acteTmp,
    titulairesAMs
  );
  console.log("formDefaultValues", formDefaultValues);

  // TODO A GARDER
  const titulairesActe = FicheActe.getTitulairesActeTabDansLOrdre(acteTmp);

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

        {getTitulairesEvenementsEtParentsForm(
          titulairesAMs,
          natureActe,
          titulaire1Parents,
          titulaire2Parents,
          evenement,
          titulairesActe[0]?.naissance,
          titulairesActe[1]?.naissance
        )}

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

