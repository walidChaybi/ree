import { IMiseAJourDocumentParams } from "@api/appels/requeteApi";
import {
  IDerniereDelivranceActeParams,
  useDerniereDelivranceActeApiHook
} from "@hook/acte/DerniereDelivranceActeApiHook";
import { usePatchDocumentsReponseAvecSignatureApi } from "@hook/DocumentReponseHook";
import {
  CreationActionEtMiseAjourStatutParams,
  usePostCreationActionEtMiseAjourStatutApi
} from "@hook/requete/ActionHook";
import { FormatDate } from "@util/DateUtils";
import messageManager from "@util/messageManager";
import gestionnaireTimer from "@util/timer/GestionnaireTimer";
import { getLibelle, getValeurOuVide } from "@util/Utils";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { SignatureErrors } from "../messages/ErrorsSignature";
import { SuccessSignatureType } from "../messages/SuccessSignature";
import {
  changeDocumentToSign,
  desErreursOntEteRecues,
  DocumentsByRequete,
  DocumentToSave,
  getDocumentAndSendToSignature,
  getNewStatusRequete,
  handleResultatPatch,
  laDirectionEstVersLAppliRece,
  processResultWebExtension,
  TIMER_SIGNATURE
} from "./SignatureDocumentHookUtil";

export function useSignatureDocumentHook(
  documentsByRequete: DocumentsByRequete,
  pinCode?: string
) {
  const [documentsToSignWating, setDocumentsToSignWating] =
    useState<DocumentsByRequete>(documentsByRequete);

  const [idRequetesToSign, setIdRequetesToSign] = useState<string[]>(
    documentsByRequete !== undefined ? Object.keys(documentsByRequete) : []
  );

  const [documentsToSave, setDocumentsToSave] = useState<DocumentToSave[]>([]);
  const [successSignature, setSuccessSignature] = useState<
    SuccessSignatureType[]
  >([]);
  const [errorsSignature, setErrorsSignature] = useState<SignatureErrors>();

  const [miseAJourDocumentParams, setMiseAJourDocumentParams] = useState<
    IMiseAJourDocumentParams[]
  >([]);

  const [
    creationActionEtMiseAjourStatutParams,
    setCreationActionEtMiseAjourStatutParams
  ] = useState<CreationActionEtMiseAjourStatutParams>();
  const [
    dateDerniereDelivranceActeParams,
    setDateDerniereDelivranceActeParams
  ] = useState<IDerniereDelivranceActeParams>();

  // ========================================== Hooks ====================================================
  const resultatCreationActionEtMajStatut =
    usePostCreationActionEtMiseAjourStatutApi(
      creationActionEtMiseAjourStatutParams
    );
  const resultatMajDateDerniereDelivranceActe =
    useDerniereDelivranceActeApiHook(dateDerniereDelivranceActeParams);

  const resultatPatchDocumentReponse = usePatchDocumentsReponseAvecSignatureApi(
    miseAJourDocumentParams
  );
  // =====================================================================================================

  // Etape 4
  const majStatusRequete = useCallback(() => {
    setMiseAJourDocumentParams([]);

    const currentRequeteProcessing = documentsToSignWating[idRequetesToSign[0]];
    const nouveauStatut = getNewStatusRequete(
      currentRequeteProcessing.sousTypeRequete,
      currentRequeteProcessing.canal
    );
    setCreationActionEtMiseAjourStatutParams({
      requeteId: idRequetesToSign[0],
      statutRequete: nouveauStatut,
      libelleAction: nouveauStatut?.libelle
    });
  }, [documentsToSignWating, idRequetesToSign]);

  // Etape 4.1
  const majDateDerniereDelivrance = useCallback(() => {
    const currentRequeteProcessing = documentsToSignWating[idRequetesToSign[0]];
    setDateDerniereDelivranceActeParams({
      idActe: getValeurOuVide(currentRequeteProcessing.idActe)
    });
  }, [documentsToSignWating, idRequetesToSign]);

  // Etape 4.2 (la maj du tableau des requêtes signées (idRequetesToSign) ne se fait qu'après la maj du statut et la maj de la date de délivrance,
  //   ceci empêche de recharger la page avant que les maj statut et date délivrance ne soit effectuées)
  const majRequetesSignees = useCallback(() => {
    const currentRequeteProcessing = documentsToSignWating[idRequetesToSign[0]];
    const newSuccesses: SuccessSignatureType[] = [
      ...successSignature,
      {
        date: moment().format(FormatDate.DDMMYYYYHHmm),
        numeroRequete: `${currentRequeteProcessing.documentsToSave[0].numeroRequete}`
      }
    ];

    const newRequetesId = [...idRequetesToSign];
    newRequetesId.shift();
    setIdRequetesToSign(newRequetesId);
    if (newRequetesId.length === 0) {
      messageManager.showSuccessAndClose(
        getLibelle("Signature des documents effectuée avec succès")
      );
    }

    setSuccessSignature(newSuccesses);
  }, [documentsToSignWating, idRequetesToSign, successSignature]);

  useEffect(() => {
    if (resultatCreationActionEtMajStatut) {
      const currentRequeteProcessing =
        documentsToSignWating[idRequetesToSign[0]];
      const idActe = currentRequeteProcessing.idActe;
      if (idActe) {
        // En étape 1 les traitements sont effectués par Saga et donc il n'y a pas d'id_acte de renseigné dans la table document_reponse
        majDateDerniereDelivrance();
      } else {
        majRequetesSignees();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatCreationActionEtMajStatut]);

  useEffect(() => {
    if (resultatMajDateDerniereDelivranceActe?.resultat) {
      majRequetesSignees();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatMajDateDerniereDelivranceActe]);

  useEffect(() => {
    handleResultatPatch(
      resultatPatchDocumentReponse,
      setErrorsSignature,
      documentsByRequete,
      idRequetesToSign,
      majStatusRequete
    );
    // Attention ne pas dépendre de "documentsByRequete" ni de "idRequetesToSign" car si une erreur ce produit (plantage API maj)
    //   alors "documentsByRequete" et "idRequetesToSign" sont remis à jour donc on repasse dans ce code
    //   alors que updateDocumentQueryParamState et errorUpdateDocument n'ont pas bougés et documentsByRequete[idRequetesToSign[0]].documentsToSave = [].
    //   => ceci provoque un plantage car documentsByRequete[idRequetesToSign[0]].documentsToSave[0] = undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatPatchDocumentReponse]);

  useEffect(() => {
    setMiseAJourDocumentParams(
      documentsToSave.map(document => {
        return {
          id: document.id,
          contenu: document.contenu,
          conteneurSwift: document.conteneurSwift,
          nom: document.nomDocument
        };
      })
    );
  }, [documentsToSave]);

  // Etape 1
  useEffect(() => {
    setDocumentsToSignWating(documentsByRequete);
    setIdRequetesToSign(Object.keys(documentsByRequete));
    setSuccessSignature([]);
    setErrorsSignature(undefined);
  }, [documentsByRequete]);

  /**
   * @description Handler concernant les communications avec la webextension
   *
   * @event l'événement de retour de la webext
   */
  // Etape 3
  const handleBackFromWebExtension = useCallback(
    (event: Event): void => {
      const customEvent = event as CustomEvent;
      const result = customEvent.detail;

      gestionnaireTimer.annuleTimer(TIMER_SIGNATURE);

      if (laDirectionEstVersLAppliRece(result)) {
        if (desErreursOntEteRecues(result)) {
          setErrorsSignature({
            numeroRequete:
              documentsToSignWating[idRequetesToSign[0]].documentsToSign[0]
                .numeroRequete,
            erreurs: result.erreurs
          });
        } else {
          changeDocumentToSign(
            documentsToSignWating,
            idRequetesToSign,
            result.document,
            setDocumentsToSignWating
          );

          const currentRequeteProcessing =
            documentsToSignWating[idRequetesToSign[0]];
          processResultWebExtension(
            currentRequeteProcessing,
            setDocumentsToSave
          );
        }
      }
    },
    [documentsToSignWating, idRequetesToSign]
  );

  // Etape 2
  useEffect(() => {
    getDocumentAndSendToSignature(
      idRequetesToSign,
      documentsToSignWating,
      setErrorsSignature,
      setDocumentsToSignWating,
      handleBackFromWebExtension,
      setDocumentsToSave,
      pinCode
    );
  }, [
    pinCode,
    idRequetesToSign,
    documentsToSignWating,
    handleBackFromWebExtension
  ]);

  useEffect(() => {
    // Ajout du listener pour communiquer avec la webextension
    if (window.top) {
      window.top.addEventListener(
        "signWebextResponse",
        handleBackFromWebExtension
      );
    }

    return () => {
      if (window.top) {
        window.top.removeEventListener(
          "signWebextResponse",
          handleBackFromWebExtension
        );
      }
    };
  }, [handleBackFromWebExtension]);

  return {
    successSignature,
    errorsSignature,
    idRequetesToSign
  };
}
