import { RECEContext } from "@core/body/RECEContext";
import { FicheActe, IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import {
  ITitulaireActe,
  TitulaireActe
} from "@model/etatcivil/acte/ITitulaireActe";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { Validation } from "@model/requete/enum/Validation";
import {
  DocumentReponse,
  IDocumentReponse
} from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { checkDirty, getLibelle, TROIS } from "@util/Utils";
import { OngletsDynamique } from "@widget/ongletsDynamique/OngletsDynamique";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import React, { useContext, useEffect, useState } from "react";
import { DocumentEC } from "../../../../../model/requete/enum/DocumentEC";
import {
  genererListeAjoutComplementaire,
  getTypeDocument,
  INDEX_PLUS,
  ItemListe,
  listePlus
} from "./OngletsDocumentsEditesUtils";

interface OngletsDocumentsProps {
  documents?: IDocumentReponse[];
  requete: IRequeteDelivrance;
  idDocumentEdite?: string;
  setDocumentEdite: (document: string) => void;
  ajouterDocument: (document: any) => void;
  retirerDocument: () => void;
  acte?: IFicheActe;
}

const titulairesEstDeGenreIndetermineOuParentMemeSexe = (
  titulaires: ITitulaireActe[]
) => {
  const index = 0;
  let error;
  for (let i = index; i < titulaires.length; i++) {
    if (TitulaireActe.genreIndetermineOuParentDeMemeSexe(titulaires[i])) {
      error = true;
    }
  }
  return error;
};

const NB_DOCUMENT_MAX = 3;

export const OngletsDocumentsEdites: React.FC<OngletsDocumentsProps> = ({
  documents,
  idDocumentEdite,
  setDocumentEdite,
  ajouterDocument,
  requete,
  retirerDocument,
  acte
}) => {
  const boutons = [
    {
      label: getLibelle("Ok"),
      action: () => setOpenPopinErreur(false)
    }
  ];

  const messageErreurTitulaireMultiple =
    "Pas de délivrance d'extrait sur la base d'un acte à titulaires multiples.";
  const messageErreurGenreIndetermineMariage =
    "Pas de délivrance d'extrait plurilingue de mariage pour des personnes de même sexe ou de genre indéterminé.";

  const { isDirty, setIsDirty } = useContext(RECEContext);
  const [liste, setListe] = useState<ItemListe[]>(listePlus);
  const [openPopinErreur, setOpenPopinErreur] = useState(false);
  const [erreurMessagePopin, setErreurMessagePopin] = useState("");

  useEffect(() => {
    if (documents && acte) {
      setListe(genererListeAjoutComplementaire(documents, acte));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documents, retirerDocument]);

  const getMessageParentDeMemeSexeOuGenreIndetermine = (natureActe: string) => {
    return `Pas de délivrance d'extrait plurilingue de ${natureActe} avec une personne de genre indéterminé ou des parents de même sexe.`;
  };

  const handleSelectPlus = (indexChoix: number) => {
    let typeDocument: string | undefined;

    if (acte?.titulaires) {
      typeDocument = getTypeDocument(indexChoix);

      const messageErreur: string | undefined = getMessageErreurOnSelectPlus(
        indexChoix,
        acte
      );

      if (messageErreur) {
        showMessageErreur(messageErreur);
      } else {
        ajouterDocument(typeDocument);
      }
    }
  };

  const getMessageErreurOnSelectPlus = (
    indexChoix: number,
    acteRequete: IFicheActe
  ): string | undefined => {
    let messageErreur: string | undefined;
    if (FicheActe.estNombreDeTitulaireErrone(acteRequete)) {
      messageErreur = messageErreurTitulaireMultiple;
    } else if (indexChoix === INDEX_PLUS.INDEX_EXTRAIT_PLURILINGUE) {
      switch (requete.evenement?.natureActe) {
        case NatureActeRequete.NAISSANCE:
        case NatureActeRequete.DECES:
          if (
            titulairesEstDeGenreIndetermineOuParentMemeSexe(
              acteRequete.titulaires
            )
          ) {
            messageErreur = getMessageParentDeMemeSexeOuGenreIndetermine(
              requete.evenement.natureActe.libelle.toLowerCase()
            );
          }
          break;
        case NatureActeRequete.MARIAGE:
          if (
            TitulaireActe.genreIndetermineOuMemeSexe(acteRequete.titulaires)
          ) {
            messageErreur = messageErreurGenreIndetermineMariage;
          }
          break;
      }
    }

    return messageErreur;
  };

  const showMessageErreur = (message: string) => {
    setErreurMessagePopin(message);
    setOpenPopinErreur(true);
  };

  const handleSelectMoins = () => {
    retirerDocument();
  };

  const handleClick = (idDoc: string) => {
    if (idDoc !== idDocumentEdite && checkDirty(isDirty, setIsDirty)) {
      setDocumentEdite(idDoc);
    }
  };

  function getListeOnglets() {
    let res: any[] = [];
    if (documents) {
      if (documents.length === 0) {
        res = [
          {
            id: "COURRIER",
            libelle: "Courrier"
          }
        ];
      } else {
        res = documents.map(doc => ({
          id: doc.id,
          icone:
            doc.validation !== Validation.O &&
            !DocumentDelivrance.estCourrierDelivranceEC(doc.typeDocument),
          libelle: DocumentReponse.getLibelle(doc)
        }));
      }
    }
    return res;
  }

  return (
    <>
      <OngletsDynamique
        actionClick={handleClick}
        actionPlus={handleSelectPlus}
        actionMoins={handleSelectMoins}
        ongletSelectionne={idDocumentEdite}
        listeOnglets={getListeOnglets()}
        afficherPlus={afficherPlus(requete, documents)}
        listePlus={liste}
        nombreOngletsMax={NB_DOCUMENT_MAX}
        afficherMoins={
          documents?.length === TROIS &&
          StatutRequete.TRANSMISE_A_VALIDEUR !== requete.statutCourant.statut
        }
      />

      <ConfirmationPopin
        isOpen={openPopinErreur}
        messages={[erreurMessagePopin]}
        boutons={boutons}
      />
    </>
  );
};

function afficherPlus(
  requete: IRequeteDelivrance,
  documents?: IDocumentReponse[]
) {
  return (
    !ChoixDelivrance.estReponseSansDelivrance(requete.choixDelivrance) &&
    documents?.length === DocumentEC.Complementaire &&
    requete.choixDelivrance !== ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE &&
    !requete.provenanceRequete.provenancePlanete &&
    StatutRequete.TRANSMISE_A_VALIDEUR !== requete.statutCourant.statut &&
    !SousTypeDelivrance.estRDDP(requete.sousType)
  );
}
