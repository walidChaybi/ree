import React from "react";
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
import { SuiviActionsRequete } from "../../../common/composant/suivis/SuiviActionsRequete";
import { SuiviObservationsRequete } from "../../../common/composant/suivis/SuiviObservationRequete";
import { getLibelle } from "../../../common/util/Utils";
import { AccordionRece } from "../../../common/widget/accordion/AccordionRece";
import { Courrier } from "../apercuRequete/apercuCourrier/contenu/Courrier";
import { DetailRequetePage } from "../detailRequete/DetailRequetePage";
import { GestionMentions } from "./contenu/onglets/mentions/GestionMentions";
import { VisionneuseActeEdition } from "./contenu/onglets/VisionneuseActeEdition";
import { VisionneuseEdition } from "./contenu/onglets/VisionneuseDocumentEdite";
import { OngletProps } from "./contenu/VoletAvecOnglet";

export const getOngletsEdition = (
  setIsDirty: any,
  passerDocumentValider: (id: string) => void,
  document?: IDocumentReponse,
  acte?: IFicheActe
) => {
  const res: OngletProps = {
    liste: [],
    ongletSelectionne: -1
  };
  if (document && acte) {
    switch (
      DocumentDelivrance.getDocumentDelivrance(document.typeDocument).code
    ) {
      case CODE_COPIE_INTEGRALE:
        ajoutOngletsCopie(
          res,
          document,
          passerDocumentValider,
          acte,
          setIsDirty
        );
        break;
      case CODE_EXTRAIT_AVEC_FILIATION:
      case CODE_EXTRAIT_SANS_FILIATION:
        ajoutOngletsExtraitFilliation(
          res,
          document,
          passerDocumentValider,
          acte,
          setIsDirty
        );
        break;
      case CODE_EXTRAIT_PLURILINGUE:
        ajoutOngletsExtraitPlurilingue(
          res,
          document,
          passerDocumentValider,
          acte,
          setIsDirty
        );
        break;
      case CODE_COPIE_NON_SIGNEE:
        break;
    }
    res.liste.push({
      titre: getLibelle("Document édité"),
      component: <VisionneuseEdition idDocumentAAfficher={document?.id} />
    });
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
    if (DocumentDelivrance.estCourrierDelivranceEC(document.typeDocument)) {
      res.liste = [
        {
          titre: "Édition courrier",
          component: (
            <Courrier
              requete={requete}
              idActe={acte?.id}
              handleCourrierEnregistre={() => {}}
            ></Courrier>
          )
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
              <SuiviObservationsRequete idRequete={requete.id} />
              <SuiviActionsRequete actions={requete.actions} />
            </>
          )
        }
      ];
      res.ongletSelectionne = 0;
    }
  }
  return res;
};

function ajoutOngletsCopie(
  res: OngletProps,
  document: IDocumentReponse,
  passerDocumentValider: (id: string) => void,
  acte: IFicheActe,
  setIsDirty: any
) {
  if (acte.type === TypeActe.TEXTE) {
    res.liste.push(
      ongletMentions(acte, document, passerDocumentValider, setIsDirty)
    );
    res.ongletSelectionne = document.validation === Validation.N ? 0 : 1;
  } else {
    res.ongletSelectionne = 0;
  }
}

export const ajoutOngletsExtraitFilliation = (
  res: OngletProps,
  document: IDocumentReponse,
  passerDocumentValider: (id: string) => void,
  acte: IFicheActe,
  setIsDirty: any
) => {
  res.ongletSelectionne = document.validation === Validation.N ? 0 : 1;
  res.liste.push(ongletSaisirExtrait);
  res.liste.push(
    ongletMentions(acte, document, passerDocumentValider, setIsDirty)
  );
  if (document.validation !== "E") {
    res.liste.push({
      titre: getLibelle("Modifier le corps de l'extrait"),
      component: <></>
    });
  }
};

export const ajoutOngletsExtraitPlurilingue = (
  res: OngletProps,
  document: IDocumentReponse,
  passerDocumentValider: (document: string) => void,
  acte: IFicheActe,
  setIsDirty: any
) => {
  res.liste.push(ongletSaisirExtrait);
  if (
    acte.nature === NatureActe.NAISSANCE ||
    acte.nature === NatureActe.MARIAGE
  ) {
    res.liste.push(
      ongletMentions(acte, document, passerDocumentValider, setIsDirty)
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
  passerDocumentValider: (iddocument: string) => void,
  setIsDirty: any
) => {
  return {
    titre: getLibelle("Gérer les mentions"),
    component: (
      <GestionMentions
        acte={acte}
        document={doc}
        setIsDirty={setIsDirty}
        passerDocumentValider={passerDocumentValider}
      ></GestionMentions>
    )
  };
};

export const ongletSaisirExtrait = {
  titre: getLibelle("Saisir l'extrait"),
  component: <></>
};

export function checkDirty(isDirty: boolean, setIsDirty: any) {
  if (isDirty) {
    if (
      window.confirm(
        getLibelle(`Vous n'avez pas validé vos modifications !
  Si vous continuez, celles-ci seront perdues et les données réinitialisées. 
   Voulez-vous continuer ?`)
      )
    ) {
      setIsDirty(false);
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}
