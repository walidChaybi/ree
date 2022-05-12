import React from "react";
import {
  FicheActe,
  IFicheActe
} from "../../../../model/etatcivil/acte/IFicheActe";
import { NatureActe } from "../../../../model/etatcivil/enum/NatureActe";
import { TypeActe } from "../../../../model/etatcivil/enum/TypeActe";
import { DocumentDelivrance } from "../../../../model/requete/enum/DocumentDelivrance";
import {
  CODE_COPIE_INTEGRALE,
  CODE_COPIE_NON_SIGNEE,
  CODE_EXTRAIT_AVEC_FILIATION,
  CODE_EXTRAIT_PLURILINGUE,
  CODE_EXTRAIT_SANS_FILIATION
} from "../../../../model/requete/enum/DocumentDelivranceConstante";
import { Validation } from "../../../../model/requete/enum/Validation";
import { IDocumentReponse } from "../../../../model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "../../../../model/requete/IRequeteDelivrance";
import { SuiviActionsRequete } from "../../../common/composant/suivis/SuiviActionsRequete";
import { SuiviObservationsRequete } from "../../../common/composant/suivis/SuiviObservationRequete";
import { IResultatSauvegarderMentions } from "../../../common/hook/acte/mentions/SauvegarderMentionsHook";
import { getLibelle, TROIS, UN, ZERO } from "../../../common/util/Utils";
import { AccordionRece } from "../../../common/widget/accordion/AccordionRece";
import { Courrier } from "../apercuRequete/apercuCourrier/contenu/Courrier";
import { DetailRequetePage } from "../detailRequete/DetailRequetePage";
import { GestionMentions } from "./contenu/onglets/mentions/GestionMentions";
import { SaisirExtraitForm } from "./contenu/onglets/saisirExtrait/SaisirExtraitForm";
import { VisionneuseActeEdition } from "./contenu/onglets/VisionneuseActeEdition";
import { VisionneuseEdition } from "./contenu/onglets/VisionneuseDocumentEdite";
import { OngletProps } from "./contenu/VoletAvecOnglet";

export const getOngletsEdition = (
  passerDocumentValider: (resultat: IResultatSauvegarderMentions) => void,
  handleCourrierEnregistre: () => void,
  requete: IRequeteDelivrance,
  document?: IDocumentReponse,
  acte?: IFicheActe
) => {
  const res: OngletProps = {
    liste: [],
    ongletSelectionne: -1
  };
  if (document) {
    if (acte) {
      switch (
        DocumentDelivrance.getDocumentDelivrance(document.typeDocument).code
      ) {
        case CODE_COPIE_INTEGRALE:
          ajoutOngletsCopie(
            res,
            document,
            passerDocumentValider,
            acte,
            requete
          );
          break;
        case CODE_EXTRAIT_AVEC_FILIATION:
        case CODE_EXTRAIT_SANS_FILIATION:
          ajoutOngletsExtraitFilliation(
            res,
            document,
            passerDocumentValider,
            acte,
            requete
          );
          break;
        case CODE_EXTRAIT_PLURILINGUE:
          ajoutOngletsExtraitPlurilingue(
            res,
            document,
            passerDocumentValider,
            acte,
            requete
          );
          break;
        case CODE_COPIE_NON_SIGNEE:
          break;
      }
    }
    if (DocumentDelivrance.estCourrierDelivranceEC(document.typeDocument)) {
      res.liste.push({
        titre: "Modifier le courrier",
        component: (
          <Courrier
            requete={requete}
            idActe={acte?.id}
            handleCourrierEnregistre={handleCourrierEnregistre}
          ></Courrier>
        )
      });
      res.ongletSelectionne = 0;
    } else {
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
  }
  return res;
};

export const getOngletsVisu = (
  requete: IRequeteDelivrance,
  document?: IDocumentReponse,
  acte?: IFicheActe
) => {
  const res: OngletProps = { liste: [], ongletSelectionne: -1 };
  if (document) {
    if (acte) {
      res.liste.push({
        titre: getLibelle("Acte registre"),
        component: (
          <VisionneuseActeEdition acte={acte} detailRequete={requete} />
        )
      });
    }
    res.liste.push({
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
          <SuiviObservationsRequete idRequete={requete.id} />
          <SuiviActionsRequete actions={requete.actions} />
        </>
      )
    });
    res.ongletSelectionne = 0;
    if (
      DocumentDelivrance.estCourrierDelivranceEC(document.typeDocument) &&
      document.nbPages !== 0
    ) {
      res.liste.push({
        titre: getLibelle("Courrier édité"),
        component: <VisionneuseEdition idDocumentAAfficher={document?.id} />
      });
      res.ongletSelectionne = res.liste.length - 1;
    }
  }

  return res;
};

function ajoutOngletsCopie(
  res: OngletProps,
  document: IDocumentReponse,
  passerDocumentValider: (resultat: IResultatSauvegarderMentions) => void,
  acte: IFicheActe,
  requete: IRequeteDelivrance
) {
  if (acte.type === TypeActe.TEXTE) {
    res.liste.push(
      ongletMentions(acte, document, passerDocumentValider, requete)
    );
    res.ongletSelectionne = document.validation === Validation.O ? 1 : 0;
  } else {
    res.ongletSelectionne = 0;
  }
}

/** Création des sous onglets à l'intérieur de l'onglet principal extrait (avec ou sans filiation) */
export const ajoutOngletsExtraitFilliation = (
  res: OngletProps,
  document: IDocumentReponse,
  passerDocumentValider: (resultat: IResultatSauvegarderMentions) => void,
  acte: IFicheActe,
  requete: IRequeteDelivrance
) => {
  switch (document.validation) {
    case Validation.N:
      res.ongletSelectionne = UN;
      break;
    case Validation.O:
      res.ongletSelectionne = TROIS;
      break;
    case Validation.E:
      res.ongletSelectionne = ZERO;
      break;
  }

  // Si l'extrait n'est pas en erreur (DOCUMENT REPONSE.validation différent de "E")
  //  et si l'acte est de type image (Acte.type = "image"),
  //  et si Acte.date dernière délivrance non renseignée ou renseignée et antérieure à la date de mise en service de la délivrance RECE Et2R3
  // Alors afficher le sous onglet 0 "saisir l'extrait"
  if (
    document.validation !== Validation.E &&
    FicheActe.estActeImage(acte) &&
    FicheActe.estPremiereDelivrance(acte)
  ) {
    res.ongletSelectionne = ZERO;
  }

  // Sous-onglet 0
  res.liste.push(ongletSaisirExtrait(acte));
  // Sous-onglet 1
  res.liste.push(
    ongletMentions(acte, document, passerDocumentValider, requete)
  );
  if (document.validation !== "E") {
    // Sous-onglet 2
    res.liste.push({
      titre: getLibelle("Modifier le corps de l'extrait"),
      component: <></>
    });
  }
};

export const ajoutOngletsExtraitPlurilingue = (
  res: OngletProps,
  document: IDocumentReponse,
  passerDocumentValider: (resultat: IResultatSauvegarderMentions) => void,
  acte: IFicheActe,
  requete: IRequeteDelivrance
) => {
  res.liste.push(ongletSaisirExtrait(acte));
  if (
    acte.nature === NatureActe.NAISSANCE ||
    acte.nature === NatureActe.MARIAGE
  ) {
    res.liste.push(
      ongletMentions(acte, document, passerDocumentValider, requete)
    );
  }
};

export const boutonModifierCopiePresent = (
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

export const ongletMentions = (
  acte: IFicheActe,
  doc: IDocumentReponse,
  passerDocumentValider: (resultat: IResultatSauvegarderMentions) => void,
  requete: IRequeteDelivrance
) => {
  return {
    titre: getLibelle("Gérer les mentions"),
    component: (
      <GestionMentions
        acte={acte}
        document={doc}
        passerDocumentValider={passerDocumentValider}
        requete={requete}
      ></GestionMentions>
    )
  };
};

const ongletSaisirExtrait = (acte: IFicheActe) => {
  return {
    titre: getLibelle("Saisir l'extrait"),
    component: <SaisirExtraitForm acte={acte}></SaisirExtraitForm>
  };
};


