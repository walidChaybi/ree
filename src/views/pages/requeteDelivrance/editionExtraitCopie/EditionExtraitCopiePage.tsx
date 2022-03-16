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
import { IDocumentReponse } from "../../../../model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "../../../../model/requete/IRequeteDelivrance";
import { IUuidRequeteParams } from "../../../../model/requete/IUuidRequeteParams";
import { SuiviActionsRequete } from "../../../common/composant/suivis/SuiviActionsRequete";
import { SuiviObservationsRequete } from "../../../common/composant/suivis/SuiviObservationRequete";
import {
  IActeApiHookParams,
  useInformationsActeApiHook
} from "../../../common/hook/repertoires/ActeApiHook";
import { getLibelle } from "../../../common/util/Utils";
import { BoutonOperationEnCours } from "../../../common/widget/attente/BoutonOperationEnCours";
import { receUrl } from "../../../router/ReceUrls";
import { Courrier } from "../apercuRequete/apercuCourrier/contenu/Courrier";
import { DetailRequetePage } from "../detailRequete/DetailRequetePage";
import { useDetailRequeteApiHook } from "../detailRequete/hook/DetailRequeteHook";
import { AccordionRece } from "./../../../common/widget/accordion/AccordionRece";
import { GestionMentions } from "./contenu/onglets/Mentions/GestionMentions";
import { VisionneuseActeEdition } from "./contenu/onglets/VisionneuseActeEdition";
import { VisionneuseEdition } from "./contenu/onglets/VisionneuseDocumentEdite";
import { OngletDocumentsEdites } from "./contenu/OngletsDocumentsEdites";
import { OngletProps, VoletAvecOnglet } from "./contenu/VoletAvecOnglet";
import "./scss/EditionExtraitCopie.scss";

export const EditionExtraitCopiePage: React.FC = () => {
  const history = useHistory();
  const { idRequeteParam } = useParams<IUuidRequeteParams>();
  const [requete, setRequete] = useState<IRequeteDelivrance>();
  const [documentEdite, setDocumentEdite] = useState<IDocumentReponse>();
  const [documents, setDocuments] = useState<IDocumentReponse[]>();
  const [hookParams, setHookParams] = useState<IActeApiHookParams>();
  const dataHistory = history.location.state;

  const { detailRequeteState } = useDetailRequeteApiHook(idRequeteParam);

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
                onglets={getOngletsVisu(requete, documentEdite, acte?.acte)}
                titre="Visualisation"
              ></VoletAvecOnglet>
            </div>
            <div className="Separateur"></div>
            <div className="side Edition">
              <VoletAvecOnglet
                onglets={getOngletsEdition(documentEdite, acte?.acte)}
                titre="Édition"
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
              <BoutonOperationEnCours
                title={getLibelle("Terminer et signer")}
                onClick={goBack}
              >
                Terminer et signer
              </BoutonOperationEnCours>
              <BoutonOperationEnCours
                title={getLibelle("Terminer")}
                onClick={goBack}
              >
                Terminer
              </BoutonOperationEnCours>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const getOngletsEdition = (document?: IDocumentReponse, acte?: IFicheActe) => {
  const res: OngletProps = {
    liste: [],
    ongletSelectionne: -1
  };
  if (document && acte) {
    switch (
      DocumentDelivrance.getDocumentDelivrance(document.typeDocument).code
    ) {
      case CODE_COPIE_INTEGRALE:
        if (acte.type === TypeActe.TEXTE) {
          res.liste.push(ongletMentions(acte, document));
        }
        break;
      case CODE_EXTRAIT_AVEC_FILIATION:
      case CODE_EXTRAIT_SANS_FILIATION:
        ajoutOngletsExtraitFilliation(res, document, acte);
        break;
      case CODE_EXTRAIT_PLURILINGUE:
        ajoutOngletsExtraitPlurilingue(res, document, acte);
        break;
      case CODE_COPIE_NON_SIGNEE:
        break;
    }
    res.liste.push({
      titre: getLibelle("Document édité"),
      component: <VisionneuseEdition idDocumentAAfficher={document?.id} />
    });
  }
  if (res.ongletSelectionne === -1) {
    res.ongletSelectionne = res.liste.findIndex(
      el => el.titre === "Document édité"
    );
  }
  return res;
};

const getOngletsVisu = (
  requete: IRequeteDelivrance,
  document?: IDocumentReponse,
  acte?: IFicheActe
) => {
  const res: OngletProps = { liste: [], ongletSelectionne: -1 };
  if (document) {
    if (DocumentDelivrance.estCourrierDelivranceEC(document.typeDocument)) {
      res.liste = [
        {
          titre: "Édition courrier",
          component: <Courrier requete={requete} idActe={acte?.id}></Courrier>
        }
      ];
      res.ongletSelectionne = 0;
    } else {
      res.liste = [
        {
          titre: getLibelle("Acte registre"),
          component: (
            <VisionneuseActeEdition acte={acte} detailRequete={requete} />
          )
        },
        {
          titre: getLibelle("Requête"),
          component: (
            <>
              <AccordionRece
                titre={getLibelle(`Requête ${requete.numero}`)}
                disabled={false}
                expanded={true}
              >
                <DetailRequetePage requete={requete} />
              </AccordionRece>
              <SuiviActionsRequete actions={requete.actions} />
              <SuiviObservationsRequete idRequete={requete.id} />
            </>
          )
        }
      ];
      res.ongletSelectionne = 0;
    }
  }
  return res;
};

const ajoutOngletsExtraitFilliation = (
  res: OngletProps,
  document: IDocumentReponse,
  acte: IFicheActe
) => {
  res.ongletSelectionne = 1;
  res.liste.push(ongletSaisirExtrait);
  res.liste.push(ongletMentions(acte, document));
  if (document.validation !== "E") {
    res.liste.push({
      titre: getLibelle("Modifier le corps de l'extrait"),
      component: <></>
    });
  }
};

const ajoutOngletsExtraitPlurilingue = (
  res: OngletProps,
  document: IDocumentReponse,
  acte: IFicheActe
) => {
  res.liste.push(ongletSaisirExtrait);
  if (
    acte.nature === NatureActe.NAISSANCE ||
    acte.nature === NatureActe.MARIAGE
  ) {
    res.liste.push(ongletMentions(acte, document));
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

const ongletMentions = (acte: IFicheActe, doc: IDocumentReponse) => {
  return {
    titre: getLibelle("Gérer les mentions"),
    component: <GestionMentions acte={acte} document={doc}></GestionMentions>
  };
};
const ongletSaisirExtrait = {
  titre: getLibelle("Saisir l'extrait"),
  component: <></>
};
