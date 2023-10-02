import { IMiseAJourDocumentParams } from "@api/appels/requeteApi";
import {
  IDerniereDelivranceActeParams,
  useDerniereDelivranceActeApiHook
} from "@hook/acte/DerniereDelivranceActeApiHook";
import { usePatchDocumentsReponseAvecSignatureApi } from "@hook/DocumentReponseHook";
import {
  IStockerDocumentsTeleverifParams,
  useStockerDocumentTeleverif
} from "@hook/generation/generationECHook/televerification/stockerDocumentTeleverifApiHook";
import {
  ICreationActionEtMiseAjourStatutParams,
  usePostCreationActionEtMiseAjourStatutApi
} from "@hook/requete/ActionHook";
import { FormatDate } from "@util/DateUtils";
import messageManager from "@util/messageManager";
import { getLibelle, getValeurOuVide } from "@util/Utils";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { SignatureErrors } from "../messages/ErrorsSignature";
import { SuccessSignatureType } from "../messages/SuccessSignature";
import {
  DocumentsByRequete,
  DocumentToSave,
  getDocumentAndSendToSignature,
  getNewStatusRequete,
  handleBackFromWebExtension,
  handleResultatPatch
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
  ] = useState<ICreationActionEtMiseAjourStatutParams>();
  const [
    dateDerniereDelivranceActeParams,
    setDateDerniereDelivranceActeParams
  ] = useState<IDerniereDelivranceActeParams>();
  const [stockerTeleverificationParams, setStockerTeleverificationParams] =
    useState<IStockerDocumentsTeleverifParams>();

  // Custom Hooks
  const resultatCreationActionEtMajStatut =
    usePostCreationActionEtMiseAjourStatutApi(
      creationActionEtMiseAjourStatutParams
    );
  const resultatMajDateDerniereDelivranceActe =
    useDerniereDelivranceActeApiHook(dateDerniereDelivranceActeParams);
  const resultatPatchDocumentReponse = usePatchDocumentsReponseAvecSignatureApi(
    miseAJourDocumentParams
  );
  const resultatStockageTeleverif = useStockerDocumentTeleverif(
    stockerTeleverificationParams
  );

  const getDocumentEnAttenteDeSignature = useCallback(() => {
    return documentsToSignWating[idRequetesToSign[0]];
  }, [documentsToSignWating, idRequetesToSign]);

  // Etape 4
  const majStatusRequete = useCallback(() => {
    setMiseAJourDocumentParams([]);
    const documentsEnAttenteDeSignature = getDocumentEnAttenteDeSignature();
    const nouveauStatut = getNewStatusRequete(
      documentsEnAttenteDeSignature?.sousTypeRequete,
      documentsEnAttenteDeSignature?.canal
    );
    setCreationActionEtMiseAjourStatutParams({
      requeteId: idRequetesToSign[0],
      statutRequete: nouveauStatut,
      libelleAction: nouveauStatut?.libelle
    });
  }, [idRequetesToSign, getDocumentEnAttenteDeSignature]);

  // Etape 4.1
  const majDateDerniereDelivrance = useCallback(() => {
    setDateDerniereDelivranceActeParams({
      idActe: getValeurOuVide(getDocumentEnAttenteDeSignature()?.acte?.id)
    });
  }, [getDocumentEnAttenteDeSignature]);

  // Etape 4.2
  const envoiATeleverification = useCallback(() => {
    const documentsEnAttenteDeSignature = getDocumentEnAttenteDeSignature();
    setStockerTeleverificationParams({
      documents: documentsEnAttenteDeSignature?.documentsToSave.map(
        document => ({
          id: document.id,
          contenu: document.contenu
        })
      ),
      idRequete: idRequetesToSign[0],
      acte: documentsEnAttenteDeSignature?.acte
    });
  }, [idRequetesToSign, getDocumentEnAttenteDeSignature]);

  // Etape 4.3 (la maj du tableau des requêtes signées (idRequetesToSign) ne se fait qu'après la maj du statut et la maj de la date de délivrance,
  //   ceci empêche de recharger la page avant que les maj statut et date délivrance ne soit effectuées)
  const majRequetesSignees = useCallback(() => {
    const newSuccesses: SuccessSignatureType[] = [
      ...successSignature,
      {
        date: moment().format(FormatDate.DDMMYYYYHHmm),
        numeroRequete: `${
          getDocumentEnAttenteDeSignature()?.documentsToSave[0]?.numeroRequete
        }`
      }
    ];

    const newRequetesId = [...idRequetesToSign];
    newRequetesId.shift();
    setIdRequetesToSign(newRequetesId);
    newRequetesId.length === 0 &&
      messageManager.showSuccessAndClose(
        getLibelle("Signature des documents effectuée avec succès")
      );

    setSuccessSignature(newSuccesses);
  }, [idRequetesToSign, successSignature, getDocumentEnAttenteDeSignature]);

  useEffect(() => {
    if (resultatCreationActionEtMajStatut) {
      getDocumentEnAttenteDeSignature()?.acte?.id
        ? majDateDerniereDelivrance()
        : majRequetesSignees();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatCreationActionEtMajStatut]);

  useEffect(() => {
    resultatMajDateDerniereDelivranceActe?.resultat && envoiATeleverification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatMajDateDerniereDelivranceActe]);

  useEffect(() => {
    resultatStockageTeleverif?.resultat && majRequetesSignees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatStockageTeleverif]);

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
  const handleBackFromWebExtensionCallback = useCallback(
    (event: Event): void => {
      handleBackFromWebExtension(
        (event as CustomEvent).detail,
        documentsToSignWating,
        idRequetesToSign,
        setErrorsSignature,
        setDocumentsToSignWating,
        setDocumentsToSave
      );
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
      handleBackFromWebExtensionCallback,
      setDocumentsToSave,
      pinCode
    );
  }, [
    pinCode,
    idRequetesToSign,
    documentsToSignWating,
    handleBackFromWebExtensionCallback
  ]);

  useEffect(() => {
    // Ajout du listener pour communiquer avec la webextension
    window.top &&
      window.top.addEventListener(
        "signWebextResponse",
        handleBackFromWebExtensionCallback
      );

    return () => {
      window.top &&
        window.top.removeEventListener(
          "signWebextResponse",
          handleBackFromWebExtensionCallback
        );
    };
  }, [handleBackFromWebExtensionCallback]);

  return {
    successSignature,
    errorsSignature,
    idRequetesToSign
  };
}
