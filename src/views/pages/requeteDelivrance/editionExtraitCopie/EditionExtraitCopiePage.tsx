import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IFicheActe } from "../../../../model/etatcivil/acte/IFicheActe";
import { NatureActe } from "../../../../model/etatcivil/enum/NatureActe";
import { TypeActe } from "../../../../model/etatcivil/enum/TypeActe";
import {
  CODE_COPIE_INTEGRALE,
  CODE_COPIE_NON_SIGNEE,
  CODE_EXTRAIT_AVEC_FILIATION,
  CODE_EXTRAIT_PLURILINGUE,
  CODE_EXTRAIT_SANS_FILIATION,
  DocumentDelivrance
} from "../../../../model/requete/enum/DocumentDelivrance";
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
import { VisionneuseDocument } from "../../../common/widget/document/VisionneuseDocument";
import { receUrl } from "../../../router/ReceUrls";
import { useDetailRequeteApiHook } from "../detailRequete/hook/DetailRequeteHook";
import { Onglet } from "./contenu/Onglet";
import { OngletDocumentsEdites } from "./contenu/OngletsDocumentsEdites";
import { VoletAvecOnglet } from "./contenu/VoletAvecOnglet";
import "./scss/EditionExtraitCopie.scss";

interface EditionExtraitCopieProps {
  documentPageTraitement: IDocumentReponse;
}

export const EditionExtraitCopiePage: React.FC<EditionExtraitCopieProps> = ({
  documentPageTraitement
}) => {
  const history = useHistory();
  const { idRequeteParam } = useParams<IUuidRequeteParams>();
  const { detailRequeteState } = useDetailRequeteApiHook(idRequeteParam);
  const [requete, setRequete] = useState<IRequeteDelivrance>();
  const [documentEdite, setDocumentEdite] = useState<IDocumentReponse>();
  const [documents, setDocuments] = useState<IDocumentReponse[]>();
  const [hookParams, setHookParams] = useState<IActeApiHookParams>();
  const dataHistory = history.location.state;

  const acte = useInformationsActeApiHook(hookParams);

  const ajouteDocument = (typeDocument: any) => {};

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
    if (documentEdite) {
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
    receUrl.goBack(history);
  };

  return (
    <div className="EditionExtraitCopie">
      <title>{getLibelle("Édition extrait copie")}</title>
      {requete && (
        <>
          <OngletDocumentsEdites
            documents={documents}
            idDocumentEdite={documentEdite?.id}
            ajouterDocument={ajouteDocument}
            setDocumentEdite={changementDocEdite}
          />
          <div className="contenu-edition">
            <div className="side Visualisation">
              <VoletAvecOnglet
                onglets={[
                  {
                    titre: "Acte registre",
                    component: (
                      <VisionneuseDocument titre="Acte registre" contenu="" />
                    ),
                    data: acte
                  },
                  {
                    titre: "Requête",
                    component: <> </>
                  }
                ]}
                titre="Visualisation"
              >
                <BoutonOperationEnCours
                  title="Retour aperçu traitement"
                  onClick={goBack}
                >
                  Retour aperçu traitement
                </BoutonOperationEnCours>
              </VoletAvecOnglet>
            </div>
            <div className="Separateur"></div>
            <div className="side Edition">
              <VoletAvecOnglet
                onglets={getOngletsEdition(documentEdite, acte?.acte)}
                titre="Édition"
              >
                {boutonModifierCopiePresent(acte?.acte, documentEdite) && (
                  <BoutonOperationEnCours
                    title="Modifier la copie à délivrer"
                    onClick={goBack}
                  >
                    Modifier la copie à délivrer
                  </BoutonOperationEnCours>
                )}
                <BoutonOperationEnCours
                  title="Terminer et signer"
                  onClick={goBack}
                >
                  Terminer et signer
                </BoutonOperationEnCours>
                <BoutonOperationEnCours title="Terminer" onClick={goBack}>
                  Terminer
                </BoutonOperationEnCours>
              </VoletAvecOnglet>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const getOngletsEdition = (document?: IDocumentReponse, acte?: IFicheActe) => {
  const res: Onglet[] = [
    {
      titre: "Document édité",
      component: <VisionneuseDocument titre="Document édité" contenu="" />
    }
  ];
  if (document && acte) {
    switch (
      DocumentDelivrance.getDocumentDelivrance(document.typeDocument).code
    ) {
      case CODE_COPIE_INTEGRALE:
        if (acte.type === TypeActe.TEXTE) {
          res.push(ongletMentions);
        }
        break;
      case CODE_EXTRAIT_AVEC_FILIATION:
      case CODE_EXTRAIT_SANS_FILIATION:
        caseExtraitFilliation(res, document);
        break;
      case CODE_EXTRAIT_PLURILINGUE:
        caseExtraitPlurilingue(res, acte);
        break;
      case CODE_COPIE_NON_SIGNEE:
        break;
    }
  }
  return res;
};

const caseExtraitFilliation = (res: Onglet[], document: IDocumentReponse) => {
  res.push(ongletSaisirExtrait);
  res.push(ongletMentions);
  if (document.validation !== Validation.E) {
    res.push({
      titre: "Modifier le corps de l'extrait",
      component: <></>
    });
  }
};

const caseExtraitPlurilingue = (res: Onglet[], acte: IFicheActe) => {
  res.push(ongletSaisirExtrait);
  if (
    acte.nature === NatureActe.NAISSANCE ||
    acte.nature === NatureActe.MARIAGE
  ) {
    res.push(ongletMentions);
  }
};

const boutonModifierCopiePresent = (
  acte?: IFicheActe,
  documentEdite?: IDocumentReponse
) => {
  if (acte && documentEdite) {
    const codeDoc = DocumentDelivrance.getDocumentDelivrance(
      documentEdite.typeDocument
    ).code;
    return codeDoc === CODE_COPIE_INTEGRALE && acte.type === TypeActe.IMAGE;
  }
  return false;
};

const ongletMentions = { titre: "Gérer les mentions", component: <></> };
const ongletSaisirExtrait = { titre: "Saisir l'extrait", component: <></> };
