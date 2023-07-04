import {
  ADRESSE,
  CHOIX_COURRIER,
  OPTION
} from "@composant/formulaire/ConstantesNomsForm";
import { ReinitialiserValiderFormBoutons } from "@composant/formulaire/boutons/ReinitialiserValiderBoutons";
import {
  ICreerCourrierECParams,
  useCreerCourrierEC
} from "@hook/requete/creerCourrierECHook";
import { SaisieCourrier } from "@model/form/delivrance/ISaisieCourrierForm";
import {
  OptionCourrier,
  OptionsCourrier
} from "@model/requete/IOptionCourrier";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { EditionExtraitCopiePageContext } from "@pages/requeteDelivrance/editionExtraitCopie/EditionExtraitCopiePage";
import { getLibelle } from "@util/Utils";
import { useReinitialisationComposant } from "@util/form/useReinitialisation";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { Formulaire } from "@widget/formulaire/Formulaire";
import {
  AdresseFormValidationSchema,
  AdresseFormValidationSchemaRequired
} from "@widget/formulaire/adresse/AdresseForm";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import React, { useCallback, useContext, useEffect, useState } from "react";
import * as Yup from "yup";
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
import { texteOptionCourrierModifie } from "./contenuForm/sousFormulaires/GestionOptionsCourrier";
import { ValidationSchemaOptionCourrier } from "./contenuForm/sousFormulaires/OptionsCourrierForm";
import "./scss/Courrier.scss";

interface ModificationCourrierProps {
  requete: IRequeteDelivrance;
  idActe?: string;
}

export const Courrier: React.FC<ModificationCourrierProps> = props => {
  const typesCourrier = getTypesCourrier(props.requete);
  const titre = courrierExiste(props.requete)
    ? getLibelle("Modification du courrier")
    : getLibelle("Création du courrier");

  const { rafraichirRequete } = useContext(EditionExtraitCopiePageContext);
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [idTypeCourrier, setIdTypeCourrier] = useState<string>();
  const [messagesBloquant, setMessagesBloquant] = useState<string>();
  const [optionsChoisies, setOptionsChoisies] = useState<OptionsCourrier>([]);
  const [courrierEcParams, setCourrierEcParams] =
    useState<ICreerCourrierECParams>();
  const [documentDelivranceChoisi, setDocumentDelivranceChoisi] =
    useState<DocumentDelivrance>();
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
        return texteOptionCourrierModifie(opt);
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
      setCourrierEcParams({
        optionsChoisies,
        requete: props.requete,
        idActe: props.idActe,
        handleDocumentEnregistre: rafraichirRequete,
        saisieCourrier: { ...values },
        setOperationEnCours
      });
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
        setIdTypeCourrier(typesCourrier[0].cle);
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

  useCreerCourrierEC(courrierEcParams);

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
          afficherBouton={
            !StatutRequete.estTransmiseAValideur(
              props.requete.statutCourant.statut
            )
          }
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
