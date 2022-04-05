import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Validation } from "../../../../model/requete/enum/Validation";
import { IDocumentReponse } from "../../../../model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "../../../../model/requete/IRequeteDelivrance";
import { IUuidRequeteParams } from "../../../../model/requete/IUuidRequeteParams";
import {
  IActeApiHookParams,
  useInformationsActeApiHook
} from "../../../common/hook/repertoires/ActeApiHook";
import { getLibelle } from "../../../common/util/Utils";
import { BoutonOperationEnCours } from "../../../common/widget/attente/BoutonOperationEnCours";
import { receUrl } from "../../../router/ReceUrls";
import { BoutonsTerminer } from "../apercuRequete/apercuRequeteEnTraitement/contenu/BoutonsTerminer";
import { useDetailRequeteApiHook } from "../detailRequete/hook/DetailRequeteHook";
import { OngletDocumentsEdites } from "./contenu/OngletsDocumentsEdites";
import { VoletAvecOnglet } from "./contenu/VoletAvecOnglet";
import {
  boutonModifierCopiePresent,
  checkDirty,
  getOngletsEdition,
  getOngletsVisu
} from "./EditionExtraitCopieUtils";
import "./scss/EditionExtraitCopie.scss";

export const EditionExtraitCopiePage: React.FC = () => {
  const history = useHistory();
  const { idRequeteParam } = useParams<IUuidRequeteParams>();
  const [requete, setRequete] = useState<IRequeteDelivrance>();
  const [documentEdite, setDocumentEdite] = useState<IDocumentReponse>();
  const [documents, setDocuments] = useState<IDocumentReponse[]>();
  const [hookParams, setHookParams] = useState<IActeApiHookParams>();
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const dataHistory = history.location.state;

  const { detailRequeteState } = useDetailRequeteApiHook(idRequeteParam);

  const acte = useInformationsActeApiHook(hookParams);

  const ajouteDocument = (typeDocument: any) => {
    if (checkDirty(isDirty, setIsDirty)) {
      return 0;
    }
  };

  useEffect(() => {
    if (detailRequeteState) {
      setRequete(detailRequeteState as IRequeteDelivrance);
      setDocuments(requete?.documentsReponses);
    }
  }, [detailRequeteState, documents, requete]);

  useEffect(() => {
    if (dataHistory) {
      setDocumentEdite(documents?.find(doc => doc.id === dataHistory));
    }
  }, [documents, dataHistory]);

  useEffect(() => {
    if (documentEdite && documentEdite.idActe) {
      setHookParams({ idActe: documentEdite.idActe });
    }
  }, [documentEdite]);

  const changementDocEdite = (id: string) => {
    setDocumentEdite(
      documents?.find(doc => {
        return doc.id === id;
      })
    );
  };

  const goBack = () => {
    if (checkDirty(isDirty, setIsDirty)) {
      receUrl.goBack(history);
    }
  };

  function passerDocumentValider(idDocument: string) {
    if (requete) {
      const temp = { ...requete };
      if (temp.documentsReponses) {
        const index = temp.documentsReponses.findIndex(
          el => el.id === idDocument
        );
        temp.documentsReponses[index].validation = Validation.O;
      }
      setRequete(temp);
    }
  }

  return (
    <div className="EditionExtraitCopie">
      <title>{getLibelle("Édition extrait copie")}</title>
      {requete && (
        <>
          <OngletDocumentsEdites
            setIsDirty={setIsDirty}
            documents={documents}
            idDocumentEdite={documentEdite?.id}
            ajouterDocument={ajouteDocument}
            setDocumentEdite={changementDocEdite}
            isDirty={isDirty}
          />
          <div className="contenu-edition">
            <div className="side Visualisation">
              <VoletAvecOnglet
                onglets={getOngletsVisu(requete, documentEdite, acte?.acte)}
                titre="Visualisation"
              ></VoletAvecOnglet>
            </div>
            <div className="Separateur"></div>
            <div className="side Edition">
              <VoletAvecOnglet
                onglets={getOngletsEdition(
                  setIsDirty,
                  passerDocumentValider,
                  documentEdite,
                  acte?.acte
                )}
                titre="Édition"
                isDirty={isDirty}
                setIsDirty={setIsDirty}
              />
            </div>
          </div>
          <div className="BoutonsEdition">
            <div className="Gauche">
              <BoutonOperationEnCours
                title={getLibelle("Retour aperçu traitement")}
                onClick={goBack}
              >
                {getLibelle("Retour aperçu traitement")}
              </BoutonOperationEnCours>
            </div>
            <div className="Droite">
              {boutonModifierCopiePresent(acte?.acte, documentEdite) && (
                <BoutonOperationEnCours
                  title={getLibelle("Modifier la copie à délivrer")}
                  onClick={goBack}
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
