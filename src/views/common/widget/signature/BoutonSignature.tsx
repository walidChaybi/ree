import { RECEContext } from "@core/contexts/RECEContext";
import {
  IActeApiHookParams,
  useInformationsActeApiHook
} from "@hook/acte/ActeApiHook";
import { IOfficier } from "@model/agent/IOfficier";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import {
  DocumentReponse,
  IDocumentReponse
} from "@model/requete/IDocumentReponse";
import {
  IRequeteDelivrance,
  RequeteDelivrance
} from "@model/requete/IRequeteDelivrance";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { checkDirty, getLibelle, getValeurOuVide } from "@util/Utils";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import messageManager from "@util/messageManager";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { PopinSignatureDelivrance } from "./PopinSignatureDelivrance";
import {
  DocumentsATraiter,
  DocumentsByRequete
} from "./hook/SignatureDocumentHookUtilDelivrance";

interface BoutonSignatureProps {
  libelle: string;
  uniqueSignature?: boolean;
  connectedUser?: IOfficier;
  checkDirtyActive: boolean;
  validerMentionsPlusieursDocuments: (
    callback: () => void,
    acte?: IFicheActe,
    documents?: IDocumentReponse[]
  ) => void;
}

interface RequeteASigner {
  requete: IRequeteTableauDelivrance;
  acte?: IFicheActe;
}

export interface TableauDataToUse {
  requetesASigner: RequeteASigner[];
  reloadData?: (allRequestSigned: boolean) => void;
}

export const BoutonSignature: React.FC<
  BoutonSignatureProps & TableauDataToUse
> = props => {
  const { isDirty, setIsDirty } = useContext(RECEContext);

  const [showWaitState, setShowWaitState] = useState<boolean>(false);
  const [requetesASigner, setRequetesASigner] = useState<RequeteASigner[]>([]);
  const [requetesASignerSansActes, setRequetesASignerSansActes] =
    useState<RequeteASigner[]>();
  const [documentsByRequeteToSign, setDocumentsByRequeteToSign] =
    useState<DocumentsByRequete>({});
  const [acteApiHookParams, setActeApiHookParams] =
    useState<IActeApiHookParams>();
  const acteApiHookResultat = useInformationsActeApiHook(acteApiHookParams);

  const closePopin = useCallback(
    (showPopin: boolean, canReload: boolean) => {
      if (showWaitState && showPopin === false) {
        setShowWaitState(showPopin);
        if (
          props.reloadData &&
          (canReload === true || props.uniqueSignature !== true)
        ) {
          props.reloadData(
            Object.keys(documentsByRequeteToSign).length ===
              props.requetesASigner.length
          );
        }
      }
    },
    [props, documentsByRequeteToSign, showWaitState]
  );

  const genererDocuments = (requetes: RequeteASigner[]) => {
    let newDocumentsByRequeteToSign: DocumentsByRequete | undefined;
    requetes.forEach(requeteASigner => {
      if (
        requeteASigner.requete.documentsReponses &&
        requeteASigner.requete.documentsReponses.length > 0 &&
        requeteASigner.requete.statut === StatutRequete.A_SIGNER.libelle &&
        DocumentReponse.verifierDocumentsValides(
          requeteASigner.requete.documentsReponses
        )
      ) {
        const documentsATraiter: DocumentsATraiter = {
          documentsToSign: [],
          documentsToSave: [],
          sousTypeRequete: SousTypeDelivrance.getEnumFromLibelleCourt(
            requeteASigner.requete.sousType
          ),
          canal: requeteASigner.requete.canal,
          acte: requeteASigner.acte
            ? requeteASigner.acte
            : // Pour la gestion de la période où les requête viennent encore de SAGA
              // À supprimer avec le featureFlag FF_DELIVRANCE_EXTRAITS_COPIES
              ({ idActe: undefined } as unknown as IFicheActe)
        };

        requeteASigner.requete.documentsReponses.forEach(
          (document: IDocumentReponse) => {
            if (estUnDocumentASigner(document)) {
              documentsATraiter.documentsToSign.push({
                id: document.id,
                mimeType: document.mimeType,
                infos: [{ cle: "idRequete", valeur: document.id }],
                nomDocument: document.nom,
                conteneurSwift: document.conteneurSwift,
                idRequete: requeteASigner.requete.idRequete,
                numeroRequete: getValeurOuVide(requeteASigner.requete.numero)
              });
            }
          }
        );
        if (documentsATraiter.documentsToSign.length > 0) {
          newDocumentsByRequeteToSign = newDocumentsByRequeteToSign || {};
          newDocumentsByRequeteToSign[requeteASigner.requete.idRequete] =
            documentsATraiter;
        }
      }
    });

    if (newDocumentsByRequeteToSign) {
      setShowWaitState(true);
      setDocumentsByRequeteToSign(newDocumentsByRequeteToSign);
    } else {
      messageManager.showWarningAndClose(
        getLibelle(
          "Aucun document à signer, vérifiez que les documents possèdent un CTV"
        )
      );
    }
  };

  useEffect(() => {
    if (requetesASignerSansActes) {
      if (requetesASignerSansActes.length !== 0) {
        const documentsASigner = RequeteDelivrance.getDocumentsASigner(
          requetesASignerSansActes[0].requete as unknown as IRequeteDelivrance
        );
        if (documentsASigner) {
          setActeApiHookParams({
            idActe: documentsASigner[0].idActe
          });
        }
      } else if (requetesASignerSansActes.length === 0) {
        genererDocuments(requetesASigner);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requetesASignerSansActes]);

  useEffect(() => {
    if (acteApiHookResultat?.acte && requetesASignerSansActes) {
      const nouvellesRequetesASignerSansActes = [...requetesASignerSansActes];
      const requeteASignerSansActe = nouvellesRequetesASignerSansActes.shift();
      if (requeteASignerSansActe) {
        setRequetesASigner([
          ...requetesASigner,
          { ...requeteASignerSansActe, acte: acteApiHookResultat.acte }
        ]);
        setRequetesASignerSansActes(nouvellesRequetesASignerSansActes);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acteApiHookResultat]);

  const handleClickSignature = () => {
    if (
      gestionnaireFeatureFlag.estActif(
        FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES
      )
    ) {
      // on considère que si la première requête n'a pas d'acte alors aucune
      // des requêtes suivantes n'a d'acte (cas de la signature par lot)
      if (!props.requetesASigner[0].acte) {
        setRequetesASignerSansActes(
          props.requetesASigner.filter(
            requeteASigner =>
              requeteASigner.requete.statut === StatutRequete.A_SIGNER.libelle
          )
        );
      } else {
        if (props.requetesASigner.length === 1) {
          props.validerMentionsPlusieursDocuments(
            () => genererDocuments(props.requetesASigner),
            props.requetesASigner[0].acte,
            props.requetesASigner[0].requete.documentsReponses
          );
        } else {
          genererDocuments(props.requetesASigner);
        }
      }
    } else {
      if (props.requetesASigner.length === 1) {
        props.validerMentionsPlusieursDocuments(
          () => genererDocuments(props.requetesASigner),
          props.requetesASigner[0].acte,
          props.requetesASigner[0].requete.documentsReponses
        );
      } else {
        genererDocuments(props.requetesASigner);
      }
    }
  };

  return (
    <>
      <BoutonDoubleSubmit
        disabled={
          !signaturePossible(
            props.uniqueSignature,
            props.requetesASigner,
            props.connectedUser
          )
        }
        onClick={() => {
          if (
            !props.checkDirtyActive ||
            (props.checkDirtyActive && checkDirty(isDirty, setIsDirty))
          ) {
            handleClickSignature();
          }
        }}
      >
        {props.libelle}
      </BoutonDoubleSubmit>

      <PopinSignatureDelivrance
        documentsByRequete={documentsByRequeteToSign}
        open={showWaitState}
        onClose={closePopin}
      />
    </>
  );
};

const signaturePossible = (
  uniqueSignature = false,
  requetesASigner?: RequeteASigner[],
  connectedUser?: IOfficier
): boolean => {
  let estSignaturePossible = false;
  if (requetesASigner) {
    if (uniqueSignature === true) {
      const requete = requetesASigner[0].requete;
      estSignaturePossible =
        requete.statut === StatutRequete.A_SIGNER.libelle &&
        connectedUser !== undefined &&
        connectedUser.idUtilisateur === requete.idUtilisateur &&
        DocumentReponse.verifierDocumentsValides(requete.documentsReponses);
    } else {
      estSignaturePossible = requetesASigner.some(
        req => req.requete.statut === StatutRequete.A_SIGNER.libelle
      );
    }
  }
  return estSignaturePossible;
};
function estUnDocumentASigner(document: IDocumentReponse) {
  return gestionnaireFeatureFlag.estActif(
    FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES
  )
    ? DocumentDelivrance.estExtraitCopieAsigner(document.typeDocument) &&
        document.avecCtv === true
    : /*Etape 1*/ document.avecCtv === true;
}
