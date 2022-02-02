import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChoixDelivrance } from "../../../../../../../model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance } from "../../../../../../../model/requete/enum/DocumentDelivrance";
import { NatureActeRequete } from "../../../../../../../model/requete/enum/NatureActeRequete";
import { SousTypeDelivrance } from "../../../../../../../model/requete/enum/SousTypeDelivrance";
import { Validation } from "../../../../../../../model/requete/enum/Validation";
import { IActionOption } from "../../../../../../../model/requete/IActionOption";
import { IResultatRMCActe } from "../../../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import {
  IGenerationECParams,
  useGenerationEC
} from "../../../../../../common/hook/generation/generationECHook/generationECHook";
import { DoubleSubmitUtil } from "../../../../../../common/util/DoubleSubmitUtil";
import { filtrerListeActions } from "../../../../../../common/util/RequetesUtils";
import { getUrlPrecedente } from "../../../../../../common/util/route/routeUtil";
import {
  getLibelle,
  supprimerNullEtUndefinedDuTableau
} from "../../../../../../common/util/Utils";
import { OperationEnCours } from "../../../../../../common/widget/attente/OperationEnCours";
import { GroupeBouton } from "../../../../../../common/widget/menu/GroupeBouton";
import {
  ConfirmationPopin,
  IBoutonPopin
} from "../../../../../../common/widget/popin/ConfirmationPopin";
import {
  PATH_APERCU_COURRIER,
  receUrl
} from "../../../../../../router/ReceUrls";
import {
  IGenerationCourrierParams,
  useGenerationCourrierHook
} from "../../../apercuCourrier/contenu/hook/GenerationCourrierHook";
import { useOptionsCourriersApiHook } from "../../../apercuCourrier/contenu/hook/OptionsCourriersHook";
import { IChoixActionDelivranceProps } from "./ChoixAction";
import {
  UpdateChoixDelivranceProps,
  useUpdateChoixDelivrance
} from "./hook/UpdateChoixDelivranceHook";
import {
  compositionCourrierAutomatique,
  estChoixExtraitAvecOuSansFiliation,
  getBoutonOK,
  getBoutonsOuiNon,
  getIdCourrierAuto,
  getOptionsMenuDelivrer,
  nonVide,
  sousTypeCreationCourrierAutomatique,
  unActeEtUnSeulSelectionne
} from "./MenuDelivrerUtil";

export const MenuDelivrer: React.FC<IChoixActionDelivranceProps> = props => {
  const history = useHistory();
  const refDelivrerOptions0 = useRef(null);

  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [actes, setActes] = useState<IResultatRMCActe[] | undefined>();
  const [inscriptions, setInscriptions] =
    useState<IResultatRMCInscription[] | undefined>();
  const [messagesBloquant, setMessagesBloquant] = useState<string[]>();
  const [boutonsPopin, setBoutonsPopin] = useState<IBoutonPopin[]>();
  const [choixDelivrance, setChoixDelivrance] = useState<ChoixDelivrance>();
  const [paramUpdateChoixDelivrance, setParamUpdateChoixDelivrance] = useState<
    UpdateChoixDelivranceProps
  >();
  const [creationCourrierParams, setCreationCourrierParams] =
    useState<IGenerationCourrierParams>();

  const [generationDocumentECParams, setGenerationDocumentECParams] =
    useState<IGenerationECParams>();
  useEffect(() => {
    setInscriptions(
      props.inscriptions
        ? supprimerNullEtUndefinedDuTableau(props.inscriptions)
        : undefined
    );
    setActes(
      props.actes ? supprimerNullEtUndefinedDuTableau(props.actes) : undefined
    );
  }, [props.actes, props.inscriptions]);

  // 1 - Mise à jour du choix delivrance
  const updateChoixDelivranceResultat = useUpdateChoixDelivrance(
    paramUpdateChoixDelivrance
  );

  const options = useOptionsCourriersApiHook(
    DocumentDelivrance.getDocumentDelivrance(
      getIdCourrierAuto(choixDelivrance)
    ),
    props.requete
  );

  // 2 - Création des paramètre pour la génération du document demandé
  useEffect(() => {
    if (
      actes &&
      updateChoixDelivranceResultat?.idRequete &&
      choixDelivrance &&
      (sousTypeCreationCourrierAutomatique(props.requete.sousType) ||
        props.requete.sousType === SousTypeDelivrance.RDC)
    ) {
      if (
        sousTypeCreationCourrierAutomatique(props.requete.sousType) &&
        options
      ) {
        setCreationCourrierParams({
          ...compositionCourrierAutomatique(
            choixDelivrance,
            options,
            props.requete,
            actes[0]
          ),
          mettreAJourStatut: false
        });
      }
      setGenerationDocumentECParams({
        idActe: actes[0].idActe,
        requete: props.requete,
        choixDelivrance,
        validation: Validation.N
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateChoixDelivranceResultat, options]);

  const generationCourrier = useGenerationCourrierHook(creationCourrierParams);

  // 3 - Génération du document demandé
  const resultatGenerationEC = useGenerationEC(generationDocumentECParams);

  // Gestion de l'erreur éventuelle après appel du hook
  useEffect(() => {
    if (resultatGenerationEC?.erreur) {
      setOperationEnCours(false);
    }
  }, [resultatGenerationEC]);

  const resetDoubleSubmit = () => {
    listeActions.forEach(el => {
      DoubleSubmitUtil.remetPossibiliteDoubleSubmit(el.ref?.current);
    });
  };

  const boutonOK: IBoutonPopin[] = getBoutonOK(
    setMessagesBloquant,
    resetDoubleSubmit
  );
  const boutonsOuiNon: IBoutonPopin[] = getBoutonsOuiNon(
    setMessagesBloquant,
    resetDoubleSubmit
  );

  const delivrerOptions: IActionOption[] = getOptionsMenuDelivrer(
    refDelivrerOptions0
  );

  const controleCoherenceEntreDocumentSelectionneEtActionDelivrer = (
    indexMenu: number,
    listeActes: IResultatRMCActe[] | undefined,
    listeInscriptions: IResultatRMCInscription[] | undefined
  ) => {
    const requeteDelivrance = props.requete;
    const sousType = props.requete?.sousType?.nom;
    let message: string[] = [];
    if (
      sousType === SousTypeDelivrance.RDC.nom ||
      sousType === SousTypeDelivrance.RDD.nom
    ) {
      if (unActeEtUnSeulSelectionne(listeActes, listeInscriptions)) {
        if (
          estChoixExtraitAvecOuSansFiliation(indexMenu) &&
          listeActes?.[0]?.nature === NatureActeRequete.DECES.libelle
        ) {
          message = [
            getLibelle(
              "Pas de délivrance d'extrait avec ou sans filiation pour un acte de décès."
            )
          ];
          setBoutonsPopin(boutonOK);
        } else if (
          listeActes?.[0]?.nature !==
          requeteDelivrance?.evenement?.natureActe?.libelle
        ) {
          message = [
            getLibelle(
              "La nature de l'acte sélectionné ne correspond pas à la nature de l'acte demandé. Voulez-vous continuer ?"
            )
          ];
          setBoutonsPopin(boutonsOuiNon);
        }
      } else {
        message = [
          getLibelle("Veuillez sélectionner un et un seul acte à délivrer.")
        ];
        setBoutonsPopin(boutonOK);
      }
    }
    setMessagesBloquant(message);
  };

  const handleDelivrerMenu = (indexMenu: number) => {
    setChoixDelivrance(delivrerOptions[indexMenu].choixDelivrance);
    controleCoherenceEntreDocumentSelectionneEtActionDelivrer(
      indexMenu,
      actes,
      inscriptions
    );
    // La redirection (cf. useEffect) s'effectue uniquement s'il n'y a pas de
    // message bloquant (cf. state) de la part de 'controleCoherenceEntreDocumentSelectionneEtActionDelivrer'
  };

  /////////////////////////////////////
  // DELIVRANCE CI,EC, Extraits (avec/sans fil., plurilingue), (Copie archive)
  /////////////////////////////////////

  // Le contrôle de cohérence a eu lieu
  useEffect(() => {
    if (choixDelivrance && messagesBloquant && messagesBloquant.length === 0) {
      // Le contrôle de cohérence a eu lieu et pas de message bloquant
      setOperationEnCours(true);
      // Déclanche le hook de mise à jour du choix de délivrance
      setParamUpdateChoixDelivrance({
        requete: props.requete,
        choixDelivrance
      });
    }
  }, [messagesBloquant, choixDelivrance, props.requete]);

  // La mise à jour du choix de délivrance et du statut ont été effectués (cf.)
  useEffect(() => {
    if (
      updateChoixDelivranceResultat?.idRequete &&
      resultatGenerationEC?.resultGenerationUnDocument
    ) {
      if (props.requete.sousType === SousTypeDelivrance.RDC) {
        receUrl.replaceUrl(
          history,
          `${getUrlPrecedente(
            history.location.pathname
          )}/${PATH_APERCU_COURRIER}/${props.requete.id}`,
          actes?.[0]
        );
      } else if (
        sousTypeCreationCourrierAutomatique(props.requete.sousType) &&
        generationCourrier
      ) {
        // Si la requete est une RDD et que l'action est enregistré
        const url = receUrl.getUrlApercuTraitementAPartirDe(
          history.location.pathname
        );
        receUrl.replaceUrl(history, url);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    updateChoixDelivranceResultat,
    resultatGenerationEC,
    generationCourrier,
    history,
    props.requete
  ]);

  const listeActions = filtrerListeActions(props.requete, delivrerOptions);

  return (
    <>
      <OperationEnCours
        visible={operationEnCours}
        onTimeoutEnd={() => setOperationEnCours(false)}
        onClick={() => setOperationEnCours(false)}
      />
      <GroupeBouton
        titre={getLibelle("Délivrer")}
        listeActions={listeActions}
        onSelect={handleDelivrerMenu}
      />
      {nonVide(messagesBloquant) && (
        <ConfirmationPopin
          isOpen={true}
          // @ts-ignore messagesBloquant est forcément !== undefined
          messages={messagesBloquant}
          boutons={boutonsPopin}
        />
      )}
    </>
  );
};
