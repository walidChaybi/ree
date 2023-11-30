import { SuiviActionsRequete } from "@composant/suivis/SuiviActionsRequete";
import { SuiviObservationsRequete } from "@composant/suivis/SuiviObservationsRequete";
import { IActeApiHookResultat } from "@hook/acte/ActeApiHook";
import { IGetImagesDeLActeParams } from "@hook/acte/GetImagesDeLActeApiHook";
import { IGenerationECParams } from "@hook/generation/generationECHook/generationECHook";
import { FicheActe, IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { Mention } from "@model/etatcivil/acte/mention/IMention";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { TypeActe } from "@model/etatcivil/enum/TypeActe";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import {
  IRequeteDelivrance,
  RequeteDelivrance
} from "@model/requete/IRequeteDelivrance";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import {
  ACTE_NON_TROUVE,
  CODE_COPIE_INTEGRALE,
  CODE_COPIE_NON_SIGNEE,
  CODE_EXTRAIT_AVEC_FILIATION,
  CODE_EXTRAIT_PLURILINGUE,
  CODE_EXTRAIT_SANS_FILIATION
} from "@model/requete/enum/DocumentDelivranceConstante";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { Validation } from "@model/requete/enum/Validation";
import {
  DEUX,
  TROIS,
  UN,
  ZERO,
  estTableauNonVide,
  getLibelle
} from "@util/Utils";
import { gestionnaireMentionsRetireesAuto } from "@utilMetier/mention/GestionnaireMentionsRetireesAuto";
import { AccordionRece } from "@widget/accordion/AccordionRece";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { OngletProps } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React from "react";
import { DocumentEC } from "../../../../model/requete/enum/DocumentEC";
import { Courrier } from "../apercuRequete/apercuCourrier/contenu/Courrier";
import { BoutonModifierTraitement } from "../apercuRequete/apercuRequeteEnTraitement/contenu/BoutonModifierTraitement";
import { BoutonsTerminerOuRelecture } from "../apercuRequete/apercuRequeteEnTraitement/contenu/BoutonsTerminerOuRelecture";
import { ResumeRequetePartieHaute } from "../apercuRequete/apercuRequetePartieGauche/contenu/resume/ResumeRequetePartieHaute";
import { ResumeRequeteType } from "../apercuRequete/apercuRequetePartieGauche/contenu/resume/ResumeRequeteType";
import { OngletsDocumentsEdites } from "./contenu/OngletsDocumentsEdites";
import { VisionneuseActeEdition } from "./contenu/onglets/VisionneuseActeEdition";
import { VisionneuseEdition } from "./contenu/onglets/VisionneuseDocumentEdite";
import { VoletEdition } from "./contenu/onglets/VoletEdition";
import { VoletVisualisation } from "./contenu/onglets/VoletVisualisation";
import { GestionMentions } from "./contenu/onglets/mentions/GestionMentions";
import { ModifierCorpsExtrait } from "./contenu/onglets/modifierCorpsExtrait/ModifierCorpsExtrait";
import { SaisirExtraitForm } from "./contenu/onglets/saisirExtrait/SaisirExtraitForm";

const DOCUMENT_EDITE = "Document édité";
const REQUETE = "Requête";

export const getOngletsEdition = (
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
          ajoutOngletsCopie(res, document, acte, requete);
          break;
        case CODE_EXTRAIT_AVEC_FILIATION:
        case CODE_EXTRAIT_SANS_FILIATION:
          ajoutOngletsExtraitFilliation(res, document, acte, requete);
          break;
        case CODE_EXTRAIT_PLURILINGUE:
          ajoutOngletsExtraitPlurilingue(res, document, acte, requete);
          break;
      }
    }
    ajoutDocumentEditeeOuModifierCourrier(res, requete, acte, document);
    if (res.ongletSelectionne === -1) {
      res.ongletSelectionne = res.liste.findIndex(
        onglet => onglet.titre === DOCUMENT_EDITE
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
    ajouterOngletRequete(res, requete);
    if (
      DocumentDelivrance.estCourrierDelivranceEC(document.typeDocument) &&
      document.nbPages !== 0
    ) {
      res.liste.push({
        titre: getLibelle("Courrier édité"),
        component: <VisionneuseEdition idDocumentAAfficher={document?.id} />
      });
      res.ongletSelectionne = res.liste.length - 1;
    } else if (RequeteDelivrance.estARevoir(requete)) {
      // Affichage de l'onglet requête si elle était à revoir avant de passer à signer
      res.ongletSelectionne = res.liste.length - 1;
    }
  }

  return res;
};

function ajouterOngletRequete(res: OngletProps, requete: IRequeteDelivrance) {
  res.liste.push({
    titre: getLibelle(REQUETE),
    component: (
      <>
        <AccordionRece
          titre={getLibelle(`Description requête ${requete.numero}`)}
          disabled={false}
          expanded={true}
        >
          <ResumeRequetePartieHaute requete={requete} />
        </AccordionRece>
        <ResumeRequeteType
          provenanceRequete={requete.provenanceRequete}
          sousType={requete.sousType}
          statut={requete.statutCourant.statut}
        />
        <SuiviObservationsRequete
          idRequete={requete.id}
          observations={requete.observations}
        />
        <SuiviActionsRequete actions={requete.actions} />
      </>
    )
  });
  res.ongletSelectionne = 0;
}

function ajoutDocumentEditeeOuModifierCourrier(
  res: OngletProps,
  requete: IRequeteDelivrance,
  acte: IFicheActe | undefined,
  document?: IDocumentReponse
) {
  if (
    document &&
    DocumentDelivrance.estCourrierDelivranceEC(document.typeDocument)
  ) {
    res.liste.push({
      titre: "Modifier le courrier",
      component: (
        <Courrier
          requete={requete}
          idActe={acte?.id}
          natureActe={acte?.nature}
        />
      )
    });
    res.ongletSelectionne = 0;
  } else {
    res.liste.push({
      titre: getLibelle(DOCUMENT_EDITE),
      component: <VisionneuseEdition idDocumentAAfficher={document?.id} />
    });
  }
}

function ajoutOngletsCopie(
  res: OngletProps,
  document: IDocumentReponse,
  acte: IFicheActe,
  requete: IRequeteDelivrance
) {
  if (
    acte.type === TypeActe.TEXTE &&
    requete.choixDelivrance !== ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE // Pas d'onglet mention pour les copies d'archives
  ) {
    res.liste.push(ongletMentions(acte, document, requete));
    res.ongletSelectionne = document.validation === Validation.O ? 1 : 0;
  } else {
    res.ongletSelectionne = 0;
  }
}

/** Création des sous onglets à l'intérieur de l'onglet principal extrait (avec ou sans filiation) */
export const ajoutOngletsExtraitFilliation = (
  res: OngletProps,
  document: IDocumentReponse,
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
  res.liste.push(ongletSaisirExtrait(acte, requete, document));
  // Sous-onglet 1
  res.liste.push(ongletMentions(acte, document, requete));
  if (document.validation !== "E") {
    // Sous-onglet 2
    res.liste.push({
      titre: getLibelle("Modifier le corps de l'extrait"),
      component: (
        <ModifierCorpsExtrait
          acte={acte}
          requete={requete}
          document={document}
        />
      )
    });
  }
};

export const ajoutOngletsExtraitPlurilingue = (
  res: OngletProps,
  document: IDocumentReponse,
  acte: IFicheActe,
  requete: IRequeteDelivrance
) => {
  res.liste.push(ongletSaisirExtrait(acte, requete, document));
  if (
    acte.nature === NatureActe.NAISSANCE ||
    acte.nature === NatureActe.MARIAGE
  ) {
    res.liste.push(ongletMentions(acte, document, requete));
    switch (document.validation) {
      case Validation.N:
        res.ongletSelectionne = UN;
        break;
      case Validation.O:
        res.ongletSelectionne = DEUX;
        break;
      case Validation.E:
        res.ongletSelectionne = ZERO;
        break;
    }
  }
};

export const boutonModifierCopiePresent = (
  statut: StatutRequete,
  acte?: IFicheActe,
  documentEdite?: IDocumentReponse
) => {
  if (acte && documentEdite) {
    const codeDoc = DocumentDelivrance.getDocumentDelivrance(
      documentEdite.typeDocument
    ).code;
    return (
      codeDoc === CODE_COPIE_INTEGRALE &&
      FicheActe.estActeImage(acte) &&
      statut !== StatutRequete.TRANSMISE_A_VALIDEUR
    );
  }
  return false;
};

export const ongletMentions = (
  acte: IFicheActe,
  doc: IDocumentReponse,
  requete: IRequeteDelivrance
) => {
  return {
    titre: getLibelle("Gérer les mentions"),
    iconeWarning: doc.validation === Validation.N,
    component: (
      <GestionMentions
        acte={acte}
        document={doc}
        requete={requete}
      ></GestionMentions>
    )
  };
};

const ongletSaisirExtrait = (
  acte: IFicheActe,
  requete: IRequeteDelivrance,
  doc: IDocumentReponse
) => {
  return {
    titre: getLibelle("Saisir l'extrait"),
    iconeWarning: doc.validation === Validation.E,
    component: (
      <SaisirExtraitForm acte={acte} requete={requete}></SaisirExtraitForm>
    )
  };
};

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
        {requete.statutCourant.statut !==
          StatutRequete.TRANSMISE_A_VALIDEUR && (
          <BoutonModifierTraitement requete={requete} />
        )}
      </div>
      <div className="Droite">
        {boutonModifierCopiePresent(
          requete.statutCourant.statut,
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
        <BoutonsTerminerOuRelecture
          requete={requete}
          acte={resultatInformationsActeApiHook?.acte}
        />
      </div>
    </div>
  );
}

export function filtrerDocumentComplementaireASupprimer(
  documents?: IDocumentReponse[]
): IDocumentReponse | undefined {
  return documents?.find(document => {
    return document.ordre === DocumentEC.Complementaire;
  });
}

export const getContenuEdition = (
  requete: IRequeteDelivrance,
  documentEdite?: IDocumentReponse,
  resultatInformationsActeApiHook?: IActeApiHookResultat
): JSX.Element | undefined => {
  return (
    <div className="contenu-edition">
      {documentEdite && (
        <>
          <VoletVisualisation
            requete={requete}
            document={documentEdite}
            acte={resultatInformationsActeApiHook?.acte}
          />
          <div className="Separateur"></div>
          <VoletEdition
            requete={requete}
            document={documentEdite}
            acte={resultatInformationsActeApiHook?.acte}
          />
        </>
      )}
    </div>
  );
};

export const getParamsCreationEC = (
  typeDocument: string,
  requete: IRequeteDelivrance,
  resultatInformationsActeApiHook?: IActeApiHookResultat
): IGenerationECParams => {
  const choixDelivrance =
    DocumentDelivrance.getChoixDelivranceFromUUID(typeDocument);
  const paramsCreationEC: IGenerationECParams = {
    requete,
    validation: Validation.O,
    pasDAction: true,
    choixDelivrance,
    mentionsRetirees: []
  };
  if (DocumentDelivrance.estCopieIntegrale(typeDocument)) {
    paramsCreationEC.idActe = resultatInformationsActeApiHook?.acte?.id;
  } else {
    let mentions = resultatInformationsActeApiHook?.acte?.mentions
      ? resultatInformationsActeApiHook?.acte?.mentions
      : [];
    if (ChoixDelivrance.estPlurilingue(choixDelivrance)) {
      mentions = Mention.filtrerFormaterEtTrierMentionsPlurilingues(
        resultatInformationsActeApiHook?.acte?.mentions
          ? resultatInformationsActeApiHook?.acte?.mentions
          : [],
        resultatInformationsActeApiHook?.acte?.nature
      );
    }
    paramsCreationEC.acte = resultatInformationsActeApiHook?.acte;
    paramsCreationEC.mentionsRetirees.push(
      ...gestionnaireMentionsRetireesAuto.getIdsMentionsRetirees(
        mentions,
        choixDelivrance,
        resultatInformationsActeApiHook?.acte?.nature
      )
    );
  }
  return paramsCreationEC;
};

export const getDocumentEditeDefaut = (idActe: string): IDocumentReponse => {
  return {
    id: "COURRIER",
    idActe,
    typeDocument: DocumentDelivrance.getUuidFromCode(ACTE_NON_TROUVE),
    nbPages: 0
  } as IDocumentReponse;
};

export const getOngletsDocumentsEdites = (
  requete: IRequeteDelivrance,
  ajouteDocument: (typeDocument: string) => void,
  retirerDocument: () => void,
  changementDocEdite: (id: string) => void,
  documents?: IDocumentReponse[],
  documentEdite?: IDocumentReponse,
  resultatInformationsActeApiHook?: IActeApiHookResultat
): JSX.Element => {
  return (
    <OngletsDocumentsEdites
      documents={documents}
      idDocumentEdite={documentEdite?.id}
      acte={resultatInformationsActeApiHook?.acte}
      ajouterDocument={ajouteDocument}
      retirerDocument={retirerDocument}
      setDocumentEdite={changementDocEdite}
      requete={requete}
    />
  );
};
