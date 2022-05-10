import React, { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { ChoixDelivrance } from "../../../../../../model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance } from "../../../../../../model/requete/enum/DocumentDelivrance";
import { SousTypeDelivrance } from "../../../../../../model/requete/enum/SousTypeDelivrance";
import { Validation } from "../../../../../../model/requete/enum/Validation";
import {
  OptionCourrier,
  OptionsCourrier
} from "../../../../../../model/requete/IOptionCourrier";
import { IRequeteDelivrance } from "../../../../../../model/requete/IRequeteDelivrance";
import { ReinitialiserValiderFormBoutons } from "../../../../../common/composant/formulaire/boutons/ReinitialiserValiderBoutons";
import {
  IGenerationECParams,
  useGenerationEC
} from "../../../../../common/hook/generation/generationECHook/generationECHook";
import { useReinitialisationComposant } from "../../../../../common/util/form/useReinitialisation";
import { DEUX, getLibelle } from "../../../../../common/util/Utils";
import { OperationEnCours } from "../../../../../common/widget/attente/OperationEnCours";
import {
  AdresseFormValidationSchema,
  AdresseFormValidationSchemaRequired
} from "../../../../../common/widget/formulaire/adresse/AdresseForm";
import { Formulaire } from "../../../../../common/widget/formulaire/Formulaire";
import { ConfirmationPopin } from "../../../../../common/widget/popin/ConfirmationPopin";
import {
  controleFormulaire,
  courrierExiste,
  getDefaultValuesCourrier,
  getDocumentReponseAModifier,
  getTypesCourrier
} from "./contenuForm/CourrierFonctions";
import {
  getAdresseCourrierForm,
  getChoixCourrier,
  getOptionsCourrier,
  getRequerantCourrierForm,
  getRequeteCourrierForm,
  getTexteLibre
} from "./contenuForm/CourrierForms";
import { ValidationSchemaChoixCourrier } from "./contenuForm/sousFormulaires/ChoixCourrierForm";
import { ValidationSchemaOptionCourrier } from "./contenuForm/sousFormulaires/OptionsCourrierForm";
import {
  IGenerationCourrierParams,
  useGenerationCourrierHook
} from "./hook/GenerationCourrierHook";
import {
  ADRESSE,
  CHOIX_COURRIER,
  OPTION,
  SaisieCourrier
} from "./modelForm/ISaisiePageModel";
import "./scss/Courrier.scss";

interface ModificationCourrierProps {
  requete: IRequeteDelivrance;
  idActe?: string;
  handleCourrierEnregistre: () => void;
}

export const Courrier: React.FC<ModificationCourrierProps> = props => {
  const typesCourrier = getTypesCourrier(props.requete);
  const titre = courrierExiste(props.requete)
    ? getLibelle("Modification du courrier")
    : getLibelle("Création du courrier");

  const [saisieCourrier, setSaisieCourrier] = useState<SaisieCourrier>();
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [idTypeCourrier, setIdTypeCourrier] = useState<string>();
  const [messagesBloquant, setMessagesBloquant] = useState<string>();
  const [optionsChoisies, setOptionsChoisies] = useState<OptionsCourrier>([]);
  const [optionsChoisiesFinales, setOptionsChoisiesFinales] =
    useState<OptionsCourrier>([]);
  const [generationDocumentECParams, setGenerationDocumentECParams] =
    useState<IGenerationECParams>();
  const [documentDelivranceChoisi, setDocumentDelivranceChoisi] =
    useState<DocumentDelivrance>();
  const [generationCourrierHookParams, setGenerationCourrierHookParams] =
    useState<IGenerationCourrierParams>();
  const { cleReinitialisation, reinitialisation } =
    useReinitialisationComposant();

  // Schéma de validation en sortie de champs
  const ValidationSchemaCourrier = Yup.object({
    [CHOIX_COURRIER]: ValidationSchemaChoixCourrier,
    [OPTION]: ValidationSchemaOptionCourrier,
    [ADRESSE]:
      props.requete.sousType === SousTypeDelivrance.RDC
        ? AdresseFormValidationSchemaRequired
        : AdresseFormValidationSchema
  });

  const onChangeTypeCourrier = (idTypeCourrierSelectionne: string) => {
    setIdTypeCourrier(idTypeCourrierSelectionne);
  };

  const checkOptionsToutesValides = useCallback(() => {
    return optionsChoisies.every((opt: OptionCourrier) => {
      if (opt.presenceVariables || opt.optionLibre) {
        return opt.texteOptionCourrierModifier !== opt.texteOptionCourrier;
      } else return true;
    });
  }, [optionsChoisies]);

  const [optionsToutesValides, setOptionsToutesValides] = useState<boolean>(
    checkOptionsToutesValides()
  );

  const setCheckOptions = () => {
    setOptionsToutesValides(checkOptionsToutesValides());
  };

  const onSubmit = (values: SaisieCourrier) => {
    if (controleFormulaire(values, optionsChoisies, setMessagesBloquant)) {
      setOperationEnCours(true);
      setOptionsChoisiesFinales(optionsChoisies);
      setSaisieCourrier({ ...values });
    }
  };

  useEffect(() => {
    if (idTypeCourrier) {
      setDocumentDelivranceChoisi(
        DocumentDelivrance.getDocumentDelivrance(idTypeCourrier)
      );
    }
  }, [idTypeCourrier]);

  useEffect(() => {
    if (props.requete) {
      const documentReponse = getDocumentReponseAModifier(props.requete);
      if (documentReponse) {
        setIdTypeCourrier(documentReponse.typeDocument);
      } else {
        setIdTypeCourrier(typesCourrier[0].value);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.requete]);

  const isSousTypeRDC = props.requete.sousType === SousTypeDelivrance.RDC;

  const blocsForm: JSX.Element[] = [
    getChoixCourrier(typesCourrier, onChangeTypeCourrier),
    getOptionsCourrier(
      props.requete,
      optionsChoisies,
      setOptionsChoisies,
      setCheckOptions,
      documentDelivranceChoisi
    ),
    getTexteLibre(props.requete, documentDelivranceChoisi),
    getRequerantCourrierForm(isSousTypeRDC),
    getAdresseCourrierForm(isSousTypeRDC),
    getRequeteCourrierForm(isSousTypeRDC)
  ];

  const finOperationEnCours = () => {
    setOperationEnCours(false);
  };

  useEffect(() => {
    if (
      saisieCourrier &&
      props.requete.choixDelivrance &&
      optionsChoisiesFinales
    ) {
      setGenerationCourrierHookParams({
        saisieCourrier,
        optionsChoisies,
        requete: props.requete,
        idActe: props.idActe,
        // On ne change le statut que lorsqu'on a aucun documents
        mettreAJourStatut: props.requete.documentsReponses.length === 0
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saisieCourrier, optionsChoisiesFinales]);

  const generationCourrier = useGenerationCourrierHook(
    generationCourrierHookParams
  );

  // 2 - Création des paramètre pour la génération du document demandé
  useEffect(() => {
    if (
      props.idActe &&
      generationCourrier &&
      ChoixDelivrance.estReponseAvecDelivrance(props.requete.choixDelivrance) &&
      props.requete.documentsReponses.length < DEUX
    ) {
      setGenerationDocumentECParams({
        idActe: props.idActe,
        requete: props.requete,
        validation: Validation.N,
        mentionsRetirees: []
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generationCourrier]);

  // Génération du document demandé
  const resultatGenerationEC = useGenerationEC(generationDocumentECParams);

  useEffect(() => {
    if (
      resultatGenerationEC ||
      (generationCourrier &&
        ChoixDelivrance.estReponseSansDelivrance(props.requete.choixDelivrance))
    ) {
      setOperationEnCours(false);
      props.handleCourrierEnregistre();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatGenerationEC, generationCourrier]);

  return (
    <>
      <OperationEnCours
        visible={operationEnCours}
        onTimeoutEnd={finOperationEnCours}
        onClick={finOperationEnCours}
      />
      <title>{titre}</title>
      <Formulaire
        key={cleReinitialisation}
        titre={titre}
        formDefaultValues={getDefaultValuesCourrier(props.requete)}
        formValidationSchema={ValidationSchemaCourrier}
        onSubmit={onSubmit}
        className="FormulaireCourrier"
      >
        <div>{blocsForm}</div>
        <ReinitialiserValiderFormBoutons
          onClickReInitialiser={reinitialisation}
          validerDisabled={!optionsToutesValides}
        />
      </Formulaire>
      {messagesBloquant && (
        <ConfirmationPopin
          isOpen={true}
          messages={[messagesBloquant]}
          boutons={[
            {
              label: getLibelle("OK"),
              action: () => {
                setMessagesBloquant(undefined);
              }
            }
          ]}
        />
      )}
    </>
  );
};
