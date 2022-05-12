import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IUuidEditionParams } from "../../../../model/params/IUuidEditionParams";
import { ChoixDelivrance } from "../../../../model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance } from "../../../../model/requete/enum/DocumentDelivrance";
import { ACTE_NON_TROUVE } from "../../../../model/requete/enum/DocumentDelivranceConstante";
import {
  DocumentReponse,
  IDocumentReponse
} from "../../../../model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "../../../../model/requete/IRequeteDelivrance";
import {
  IActeApiHookParams,
  useInformationsActeApiHook
} from "../../../common/hook/repertoires/ActeApiHook";
import { checkDirty, getLibelle } from "../../../common/util/Utils";
import { BoutonOperationEnCours } from "../../../common/widget/attente/BoutonOperationEnCours";
import { RECEContext } from "../../../core/body/Body";
import { BoutonModifierTraitement } from "../apercuRequete/apercuRequeteEnTraitement/contenu/BoutonModifierTraitement";
import { BoutonsTerminer } from "../apercuRequete/apercuRequeteEnTraitement/contenu/BoutonsTerminer";
import {
  IDetailRequeteParams,
  useAvecRejeuDetailRequeteApiHook
} from "../detailRequete/hook/DetailRequeteHook";
import { VoletEdition } from "./contenu/onglets/VoletEdition";
import { VoletVisualisation } from "./contenu/onglets/VoletVisualisation";
import { OngletDocumentsEdites } from "./contenu/OngletsDocumentsEdites";
import { boutonModifierCopiePresent } from "./EditionExtraitCopieUtils";
import "./scss/EditionExtraitCopie.scss";

export const EditionExtraitCopiePage: React.FC = () => {
  const { idRequeteParam, idActeParam } = useParams<IUuidEditionParams>();
  const [idRequete, setIdRequete] = useState<IDetailRequeteParams>();
  const [requete, setRequete] = useState<IRequeteDelivrance>();
  const [documents, setDocuments] = useState<IDocumentReponse[]>();
  const [documentEdite, setDocumentEdite] = useState<IDocumentReponse>();
  const [hookParams, setHookParams] = useState<IActeApiHookParams>();
  const { isDirty, setIsDirty, setOperationEnCours } = useContext(RECEContext);

  const { detailRequeteState } = useAvecRejeuDetailRequeteApiHook(idRequete);

  const acte = useInformationsActeApiHook(hookParams);

  const ajouteDocument = (typeDocument: string) => {
    if (checkDirty(isDirty, setIsDirty)) {
      // TODO ajout d'un document complémentaire
    }
  };

  function rafraichirRequete() {
    setIdRequete({ idRequete: idRequeteParam });
  }

  useEffect(() => {
    if (idRequeteParam) {
      setIdRequete({ idRequete: idRequeteParam });
    }
  }, [idRequeteParam]);

  useEffect(() => {
    if (detailRequeteState) {
      setRequete(detailRequeteState as IRequeteDelivrance);
    }
  }, [detailRequeteState]);

  useEffect(() => {
    if (requete && requete.choixDelivrance) {
      setDocuments(
        DocumentReponse.attribuerOrdreDocuments(
          requete.documentsReponses,
          requete.choixDelivrance
        ).sort((a, b) => (a.ordre ? a.ordre : 0) - (b.ordre ? b.ordre : 0))
      );
    }
  }, [requete]);

  useEffect(() => {
    if (documents && documents.length === 0) {
      setDocumentEdite({
        id: "COURRIER",
        idActe: idActeParam,
        typeDocument: DocumentDelivrance.getUuidFromCode(ACTE_NON_TROUVE),
        nbPages: 0
      } as IDocumentReponse);
    } else if (
      ChoixDelivrance.estReponseAvecDelivrance(requete?.choixDelivrance)
    ) {
      setDocumentEdite(documents?.[1]);
    } else {
      setDocumentEdite(documents?.[documents.length - 1]);
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documents, idActeParam]);

  useEffect(() => {
    if (documentEdite) {
      if (documentEdite.idActe) {
        setHookParams({ idActe: documentEdite.idActe });
      } else if (idActeParam) {
        setHookParams({ idActe: idActeParam });
      }
    }
  }, [documentEdite, idActeParam]);

  const changementDocEdite = (id: string) => {
    if (documents) {
      setDocumentEdite(
        documents.find(doc => {
          return doc.id === id;
        })
      );
    }
  };

  function sauvegarderDocument(document: IDocumentReponse) {
    if (requete && documentEdite) {
      const temp = { ...requete };
      const index = temp.documentsReponses.findIndex(
        el => el.id === documentEdite.id
      );
      temp.documentsReponses[index] = document;
      setRequete(temp);
      setDocumentEdite(document);
      setOperationEnCours(false);
    }
  }

  return (
    <div className="EditionExtraitCopie">
      <title>{getLibelle("Édition extrait copie")}</title>
      {requete && (
        <>
          <OngletDocumentsEdites
            documents={requete.documentsReponses}
            idDocumentEdite={documentEdite?.id}
            ajouterDocument={ajouteDocument}
            setDocumentEdite={changementDocEdite}
            requete={requete}
          />
          <div className="contenu-edition">
            {documentEdite && (
              <>
                <VoletVisualisation
                  requete={requete}
                  document={documentEdite}
                  acte={acte?.acte}
                ></VoletVisualisation>
                <div className="Separateur"></div>
                <VoletEdition
                  requete={requete}
                  document={documentEdite}
                  acte={acte?.acte}
                  sauvegarderDocument={sauvegarderDocument}
                  handleCourrierEnregistre={rafraichirRequete}
                />
              </>
            )}
          </div>
          <div className="BoutonsEdition">
            <div className="Gauche">
              <BoutonModifierTraitement requete={requete} />
            </div>
            <div className="Droite">
              {boutonModifierCopiePresent(acte?.acte, documentEdite) && (
                <BoutonOperationEnCours
                  title={getLibelle("Modifier la copie à délivrer")}
                  onClick={() => {}}
                >
                  Modifier la copie à délivrer
                </BoutonOperationEnCours>
              )}
              <BoutonsTerminer requete={requete} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
