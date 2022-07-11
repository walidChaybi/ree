import React from "react";
import {
  FicheActe,
  IFicheActe
} from "../../../../model/etatcivil/acte/IFicheActe";
import { NatureActe } from "../../../../model/etatcivil/enum/NatureActe";
import { TypeActe } from "../../../../model/etatcivil/enum/TypeActe";
import { ChoixDelivrance } from "../../../../model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance } from "../../../../model/requete/enum/DocumentDelivrance";
import {
  CODE_COPIE_INTEGRALE,
  CODE_COPIE_NON_SIGNEE,
  CODE_EXTRAIT_AVEC_FILIATION,
  CODE_EXTRAIT_PLURILINGUE,
  CODE_EXTRAIT_SANS_FILIATION
} from "../../../../model/requete/enum/DocumentDelivranceConstante";
import { SousTypeDelivrance } from "../../../../model/requete/enum/SousTypeDelivrance";
import { Validation } from "../../../../model/requete/enum/Validation";
import { IDocumentReponse } from "../../../../model/requete/IDocumentReponse";
import {
  IRequeteDelivrance,
  RequeteDelivrance
} from "../../../../model/requete/IRequeteDelivrance";
import { Bouton } from "../../../common/composant/boutonAntiDoubleSubmit/Bouton";
import { SuiviActionsRequete } from "../../../common/composant/suivis/SuiviActionsRequete";
import { SuiviObservationsRequete } from "../../../common/composant/suivis/SuiviObservationRequete";
import { IActeApiHookResultat } from "../../../common/hook/acte/ActeApiHook";
import { IGetImagesDeLActeParams } from "../../../common/hook/acte/GetImagesDeLActeApiHook";
import { IGenerationECParams } from "../../../common/hook/generation/generationECHook/generationECHook";
import {
  DEUX,
  estTableauNonVide,
  getLibelle,
  TROIS,
  UN,
  ZERO
} from "../../../common/util/Utils";
import { AccordionRece } from "../../../common/widget/accordion/AccordionRece";
import { Courrier } from "../apercuRequete/apercuCourrier/contenu/Courrier";
import { sousTypeCreationCourrierAutomatique } from "../apercuRequete/apercuRequeteEnpriseEnCharge/contenu/actions/MenuDelivrerUtil";
import { BoutonModifierTraitement } from "../apercuRequete/apercuRequeteEnTraitement/contenu/BoutonModifierTraitement";
import { BoutonsTerminer } from "../apercuRequete/apercuRequeteEnTraitement/contenu/BoutonsTerminer";
import { DetailRequetePage } from "../detailRequete/DetailRequetePage";
import { GestionMentions } from "./contenu/onglets/mentions/GestionMentions";
import { ModifierCorpsExtrait } from "./contenu/onglets/modifierCorpsExtrait/ModifierCorpsExtrait";
import { SaisirExtraitForm } from "./contenu/onglets/saisirExtrait/SaisirExtraitForm";
import { VisionneuseActeEdition } from "./contenu/onglets/VisionneuseActeEdition";
import { VisionneuseEdition } from "./contenu/onglets/VisionneuseDocumentEdite";
import { OngletProps } from "./contenu/VoletAvecOnglet";
import { DocumentEC } from "./enum/DocumentEC";

export const getOngletsEdition = (
  handleDocumentEnregistre: (index: DocumentEC) => void,
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
        case CODE_COPIE_NON_SIGNEE:
          ajoutOngletsCopie(
            res,
            document,
            handleDocumentEnregistre,
            acte,
            requete
          );
          break;
        case CODE_EXTRAIT_AVEC_FILIATION:
        case CODE_EXTRAIT_SANS_FILIATION:
          ajoutOngletsExtraitFilliation(
            res,
            document,
            handleDocumentEnregistre,
            acte,
            requete
          );
          break;
        case CODE_EXTRAIT_PLURILINGUE:
          ajoutOngletsExtraitPlurilingue(
            res,
            document,
            handleDocumentEnregistre,
            acte,
            requete
          );
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
            handleDocumentEnregistre={handleDocumentEnregistre}
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
  handleDocumentEnregistre: (index: DocumentEC) => void,
  acte: IFicheActe,
  requete: IRequeteDelivrance
) {
  if (acte.type === TypeActe.TEXTE) {
    res.liste.push(
      ongletMentions(acte, document, handleDocumentEnregistre, requete)
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
  handleDocumentEnregistre: (index: DocumentEC) => void,
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

  // Sous-onglet 0
  res.liste.push(ongletSaisirExtrait(acte, requete, handleDocumentEnregistre));
  // Sous-onglet 1
  res.liste.push(
    ongletMentions(acte, document, handleDocumentEnregistre, requete)
  );
  if (document.validation !== "E") {
    // Sous-onglet 2
    res.liste.push({
      titre: getLibelle("Modifier le corps de l'extrait"),
      component: (
        <ModifierCorpsExtrait
          acte={acte}
          requete={requete}
          document={document}
          handleDocumentEnregistre={handleDocumentEnregistre}
        />
      )
    });
  }
};

export const ajoutOngletsExtraitPlurilingue = (
  res: OngletProps,
  document: IDocumentReponse,
  handleDocumentEnregistre: (index: DocumentEC) => void,
  acte: IFicheActe,
  requete: IRequeteDelivrance
) => {
  res.liste.push(ongletSaisirExtrait(acte, requete, handleDocumentEnregistre));
  if (
    acte.nature === NatureActe.NAISSANCE ||
    acte.nature === NatureActe.MARIAGE
  ) {
    res.liste.push(
      ongletMentions(acte, document, handleDocumentEnregistre, requete)
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
    return codeDoc === CODE_COPIE_INTEGRALE && FicheActe.estActeImage(acte);
  }
  return false;
};

export const ongletMentions = (
  acte: IFicheActe,
  doc: IDocumentReponse,
  handleDocumentEnregistre: (index: DocumentEC) => void,
  requete: IRequeteDelivrance
) => {
  return {
    titre: getLibelle("Gérer les mentions"),
    component: (
      <GestionMentions
        acte={acte}
        document={doc}
        handleDocumentEnregistre={handleDocumentEnregistre}
        requete={requete}
      ></GestionMentions>
    )
  };
};

const ongletSaisirExtrait = (
  acte: IFicheActe,
  requete: IRequeteDelivrance,
  handleDocumentEnregistre: (index: DocumentEC) => void
) => {
  return {
    titre: getLibelle("Saisir l'extrait"),
    component: (
      <SaisirExtraitForm
        acte={acte}
        requete={requete}
        handleDocumentEnregistre={handleDocumentEnregistre}
      ></SaisirExtraitForm>
    )
  };
};

export function getOngletSelectVenantDePriseEnCharge(
  sousType: SousTypeDelivrance,
  choixDelivrance?: ChoixDelivrance
) {
  if (
    choixDelivrance &&
    ChoixDelivrance.estReponseAvecDelivrance(choixDelivrance) &&
    sousTypeCreationCourrierAutomatique(sousType)
  ) {
    return DocumentEC.Principal;
  } else return DocumentEC.Courrier;
}

export function choisirDocumentEdite(
  indexDocEditeDemande: DocumentEC | undefined,
  setIndexDocEdite: React.Dispatch<React.SetStateAction<DocumentEC>>,
  requete: IRequeteDelivrance | undefined
) {
  if (indexDocEditeDemande !== undefined) {
    setIndexDocEdite(indexDocEditeDemande);
  } else if (
    requete?.documentsReponses &&
    requete.documentsReponses.length >= DEUX
  ) {
    setIndexDocEdite(DocumentEC.Principal);
  }
}

export function retoucheImage(
  imagesModifieesBase64: string[] | undefined,
  requete: IRequeteDelivrance | undefined,
  resultatInformationsActeApiHook: IActeApiHookResultat | undefined,
  documentEdite: IDocumentReponse | undefined,
  setImagesDeLActeModifiees: React.Dispatch<React.SetStateAction<string[]>>,
  setGenerationEcParams: React.Dispatch<
    React.SetStateAction<IGenerationECParams | undefined>
  >,
  setOperationEnCours: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (
    estTableauNonVide(imagesModifieesBase64) &&
    requete &&
    requete.choixDelivrance &&
    resultatInformationsActeApiHook?.acte &&
    documentEdite
  ) {
    // Maj images de l'acte avec les images modifiées
    FicheActe.setImages(
      resultatInformationsActeApiHook.acte,
      // @ts-ignore imagesModifieesBase64 non null
      imagesModifieesBase64
    );

    // @ts-ignore imagesModifieesBase64 non null
    setImagesDeLActeModifiees(imagesModifieesBase64);

    // Regénération du document copie intégrale
    const documentReponseCopieIntegrale =
      RequeteDelivrance.getDocumentReponseCopieIntegrale(requete);

    setGenerationEcParams({
      acte: { ...resultatInformationsActeApiHook?.acte },
      requete,
      validation: documentReponseCopieIntegrale?.validation || Validation.O,
      mentionsRetirees: [],
      choixDelivrance: requete.choixDelivrance
    });
  } else {
    setOperationEnCours(false);
  }
}

export function getBoutonsEdition(
  requete: IRequeteDelivrance,
  resultatInformationsActeApiHook: IActeApiHookResultat | undefined,
  documentEdite: IDocumentReponse | undefined,
  setOperationEnCours: React.Dispatch<React.SetStateAction<boolean>>,
  imagesDeLActeModifiees: string[],
  setImagesDeLActe: React.Dispatch<React.SetStateAction<string[]>>,
  setRecuperationImagesDeLActeParams: React.Dispatch<
    React.SetStateAction<IGetImagesDeLActeParams | undefined>
  >
) {
  return (
    <div className="BoutonsEdition">
      <div className="Gauche">
        <BoutonModifierTraitement requete={requete} />
      </div>
      <div className="Droite">
        {boutonModifierCopiePresent(
          resultatInformationsActeApiHook?.acte,
          documentEdite
        ) && (
          <Bouton
            title={getLibelle("Modifier la copie à délivrer")}
            onClick={() => {
              setOperationEnCours(true);
              if (estTableauNonVide(imagesDeLActeModifiees)) {
                setImagesDeLActe([...imagesDeLActeModifiees]);
              } else {
                setRecuperationImagesDeLActeParams({
                  idActe: resultatInformationsActeApiHook?.acte?.id
                });
              }
            }}
          >
            Modifier la copie à délivrer
          </Bouton>
        )}
        <BoutonsTerminer requete={requete} />
      </div>
    </div>
  );
}
