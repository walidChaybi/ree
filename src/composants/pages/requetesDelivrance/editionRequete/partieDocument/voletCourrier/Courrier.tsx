import { ADRESSE, CHOIX_COURRIER, OPTION, REQUERANT } from "@composant/formulaire/ConstantesNomsForm";
import { ICreerCourrierECParams, useCreerCourrierEC } from "@hook/requete/creerCourrierECHook";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { SaisieCourrier } from "@model/form/delivrance/ISaisieCourrierForm";
import { OptionCourrier, OptionsCourrier } from "@model/requete/IOptionCourrier";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { RequerantCourrierFormValidationSchema } from "@pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/contenuForm/sousFormulaires/RequerantCourrierForm";
import { useReinitialisationComposant } from "@util/form/useReinitialisation";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { Formulaire } from "@widget/formulaire/Formulaire";
import { AdresseFormValidationSchema, AdresseFormValidationSchemaRequired } from "@widget/formulaire/adresse/AdresseForm";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import React, { useCallback, useContext, useEffect, useState } from "react";
import * as Yup from "yup";

import { ReinitialiserValiderFormBoutons } from "@composant/formulaire/boutons/ReinitialiserValiderBoutons";
import {
  controleFormulaire,
  getDefaultValuesCourrier,
  getDocumentReponseAModifier,
  getTypesCourrier
} from "@pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/contenuForm/CourrierFonctions";
import {
  getAdresseCourrierForm,
  getChoixCourrier,
  getOptionsCourrier,
  getRequerantCourrierForm,
  getRequeteCourrierForm,
  getTexteLibre
} from "@pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/contenuForm/CourrierForms";
import { ValidationSchemaChoixCourrier } from "@pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/contenuForm/sousFormulaires/ChoixCourrierForm";
import { texteOptionCourrierModifie } from "@pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/contenuForm/sousFormulaires/GestionOptionsCourrier";
import { ValidationSchemaOptionCourrier } from "@pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/contenuForm/sousFormulaires/OptionsCourrierForm";
import { EditionExtraitCopiePageContext } from "@pages/requeteDelivrance/editionExtraitCopie/EditionExtraitCopiePage";
import { EditionDelivranceContext } from "../../../../../../contexts/EditionDelivranceContextProvider";
import BoutonsValiderEtReinitialiser from "../../boutons/BoutonsValiderEtReinitialiser";
import { ECleOngletRequete } from "../../partieActeRequete/PartieActeRequete";

interface ModificationCourrierProps {
  requete: IRequeteDelivrance;
  idActe?: string;
  natureActe?: NatureActe;
  estNouvelEcranCourrier?: boolean;
}

export const Courrier: React.FC<ModificationCourrierProps> = ({ requete, idActe, natureActe, estNouvelEcranCourrier }) => {
  const typesCourrier = getTypesCourrier(requete);
  const { rechargerRequete } = useContext(EditionDelivranceContext);

  // TOREFACTO : retirer lorsque l'ancien écran de délivrance sera remplacé par le nouveau
  const { rafraichirRequete } = useContext(EditionExtraitCopiePageContext);

  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [idTypeCourrier, setIdTypeCourrier] = useState<string>();
  const [messagesBloquant, setMessagesBloquant] = useState<string>();
  const [optionsChoisies, setOptionsChoisies] = useState<OptionsCourrier>([]);
  const [courrierEcParams, setCourrierEcParams] = useState<ICreerCourrierECParams>();
  const [documentDelivranceChoisi, setDocumentDelivranceChoisi] = useState<DocumentDelivrance>();
  const { cleReinitialisation, reinitialisation } = useReinitialisationComposant();

  const ValidationSchemaCourrier = Yup.object({
    [CHOIX_COURRIER]: ValidationSchemaChoixCourrier,
    [OPTION]: ValidationSchemaOptionCourrier,
    [ADRESSE]: requete.sousType === SousTypeDelivrance.RDC ? AdresseFormValidationSchemaRequired : AdresseFormValidationSchema,
    [REQUERANT]: RequerantCourrierFormValidationSchema
  });

  const onChangeTypeCourrier = (idTypeCourrierSelectionne: string) => {
    setIdTypeCourrier(idTypeCourrierSelectionne);
  };

  const checkOptionsToutesValides = useCallback(() => {
    return optionsChoisies.every((opt: OptionCourrier) => {
      if (opt.presenceVariables || opt.optionLibre) {
        return texteOptionCourrierModifie(opt);
      } else {
        return true;
      }
    });
  }, [optionsChoisies]);

  const [optionsToutesValides, setOptionsToutesValides] = useState<boolean>(checkOptionsToutesValides());

  const setCheckOptions = () => {
    setOptionsToutesValides(checkOptionsToutesValides());
  };

  const onSubmit = (values: SaisieCourrier) => {
    if (controleFormulaire(values, optionsChoisies, setMessagesBloquant)) {
      setOperationEnCours(true);
      setCourrierEcParams({
        optionsChoisies,
        requete: requete,
        idActe: idActe,
        natureActe: natureActe,
        handleDocumentEnregistre: estNouvelEcranCourrier
          ? () => {
              rechargerRequete(() =>
                document.dispatchEvent(
                  new CustomEvent("changerOngletActifPartieActeRequete", {
                    detail: ECleOngletRequete.COURRIER_EDITE
                  })
                )
              );
            }
          : rafraichirRequete,
        saisieCourrier: { ...values },
        setOperationEnCours
      });
    }
  };

  useEffect(() => {
    if (idTypeCourrier) {
      setDocumentDelivranceChoisi(DocumentDelivrance.getDocumentDelivrance(idTypeCourrier));
    }
  }, [idTypeCourrier]);

  useEffect(() => {
    if (requete) {
      const documentReponse = getDocumentReponseAModifier(requete);
      if (documentReponse) {
        setIdTypeCourrier(documentReponse.typeDocument);
      } else {
        setIdTypeCourrier(typesCourrier[0].cle);
      }
    }
  }, [requete]);

  const isSousTypeRDC = requete.sousType === SousTypeDelivrance.RDC;

  const blocsForm: JSX.Element[] = [
    getChoixCourrier(typesCourrier, onChangeTypeCourrier),
    getOptionsCourrier(requete, optionsChoisies, setOptionsChoisies, setCheckOptions, documentDelivranceChoisi),
    getTexteLibre(requete, documentDelivranceChoisi),
    getRequerantCourrierForm(isSousTypeRDC, requete.requerant),
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
      <Formulaire
        key={cleReinitialisation}
        formDefaultValues={getDefaultValuesCourrier(requete)}
        formValidationSchema={ValidationSchemaCourrier}
        onSubmit={onSubmit}
        className="FormulaireCourrier"
      >
        {blocsForm}
        {estNouvelEcranCourrier ? (
          requete.statutCourant.statut !== StatutRequete.TRANSMISE_A_VALIDEUR && (
            <div className="fixed bottom-24 right-16">
              <BoutonsValiderEtReinitialiser
                onReinitialiser={reinitialisation}
                desactiverBoutonValider={!optionsToutesValides}
                styleBoutonValider={"principal"}
              />
            </div>
          )
        ) : (
          <ReinitialiserValiderFormBoutons
            onClickReInitialiser={reinitialisation}
            validerDisabled={!optionsToutesValides}
            afficherBouton={!StatutRequete.estTransmiseAValideur(requete.statutCourant.statut)}
          />
        )}
      </Formulaire>
      {messagesBloquant && (
        <ConfirmationPopin
          estOuvert={true}
          messages={[messagesBloquant]}
          boutons={[
            {
              label: "OK",
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
