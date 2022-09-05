import React, { useContext, useEffect, useState } from "react";
import { ConfirmationPopin } from "../..../../../../../common/widget/popin/ConfirmationPopin";
import {
  FicheActe,
  IFicheActe
} from "../../../../../model/etatcivil/acte/IFicheActe";
import {
  ITitulaireActe,
  TitulaireActe
} from "../../../../../model/etatcivil/acte/ITitulaireActe";
import { ChoixDelivrance } from "../../../../../model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance } from "../../../../../model/requete/enum/DocumentDelivrance";
import {
  CODE_COPIE_INTEGRALE,
  CODE_EXTRAIT_AVEC_FILIATION,
  CODE_EXTRAIT_PLURILINGUE,
  CODE_EXTRAIT_SANS_FILIATION
} from "../../../../../model/requete/enum/DocumentDelivranceConstante";
import { NatureActeRequete } from "../../../../../model/requete/enum/NatureActeRequete";
import {
  DocumentReponse,
  IDocumentReponse
} from "../../../../../model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "../../../../../model/requete/IRequeteDelivrance";
import { checkDirty, getLibelle } from "../../../../common/util/Utils";
import { OngletsDynamique } from "../../../../common/widget/ongletsDynamique/OngletsDynamique";
import { RECEContext } from "../../../../core/body/Body";

interface OngletsDocumentsProps {
  documents?: IDocumentReponse[];
  requete: IRequeteDelivrance;
  idDocumentEdite?: string;
  setDocumentEdite: (document: string) => void;
  ajouterDocument: (document: any) => void;
  retirerDocument: () => void;
  acte?: IFicheActe;
}

interface ItemListe {
  label: string;
  value: number;
}

enum INDEX_PLUS {
  INDEX_EXTRAIT_PLURILINGUE,
  INDEX_EXTRAIT_SANS_FILIATION,
  INDEX_EXTRAIT_AVEC_FILIATION,
  INDEX_COPIE_INTEGRALE
}

const titulairesEstDeGenreIndetermine = (titulaires: ITitulaireActe[]) => {
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

export const OngletDocumentsEdites: React.FC<OngletsDocumentsProps> = ({
  documents,
  idDocumentEdite,
  setDocumentEdite,
  ajouterDocument,
  requete,
  retirerDocument,
  acte
}) => {
  const listePlus = [
    {
      label: "Extrait plurilingue",
      value: INDEX_PLUS.INDEX_EXTRAIT_PLURILINGUE
    },
    {
      label: "Extrait copie sans filiation",
      value: INDEX_PLUS.INDEX_EXTRAIT_SANS_FILIATION
    },
    {
      label: "Extrait copie avec filiation",
      value: INDEX_PLUS.INDEX_EXTRAIT_AVEC_FILIATION
    },
    { label: "Copie intégrale", value: INDEX_PLUS.INDEX_COPIE_INTEGRALE }
  ];

  const boutons = [
    {
      label: getLibelle("Ok"),
      action: () => setOpenPopinErreur(false)
    }
  ];

  const messageErreurTitulaireMultiple =
    "Pas de délivrance d'extrait sur la base d'un acte à titulaires multiples.";
  const messageErreurGenreIndetermine =
    "Pas de délivrance d'extrait plurilingue de naissance avec une personne de genre indéterminé ou des parents de même sexe.";

  const { isDirty, setIsDirty } = useContext(RECEContext);
  const [liste, setListe] = useState<ItemListe[]>(listePlus);
  const [openPopinErreur, setOpenPopinErreur] = useState(false);
  const [erreurMessagePopin, setErreurMessagePopin] = useState("");

  useEffect(() => {
    genererListeAjoutComplementaire();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documents, retirerDocument]);

  const estDeTypeNaissanceOuMariageOuDeces = (natureActe: any) => {
    return (
      natureActe === NatureActeRequete.NAISSANCE ||
      NatureActeRequete.MARIAGE ||
      NatureActeRequete.DECES
    );
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
    if (
      indexChoix === INDEX_PLUS.INDEX_EXTRAIT_PLURILINGUE &&
      estDeTypeNaissanceOuMariageOuDeces(requete.evenement?.natureActe) &&
      titulairesEstDeGenreIndetermine(acteRequete.titulaires)
    ) {
      messageErreur = messageErreurGenreIndetermine;
    } else if (FicheActe.estNombreDeTitulaireErrone(acteRequete)) {
      messageErreur = messageErreurTitulaireMultiple;
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
          libelle: DocumentReponse.getLibelle(doc)
        }));
      }
    }
    return res;
  }

  function genererListeAjoutComplementaire() {
    if (documents) {
      let listeMapped: ItemListe[] = [];
      const index = 0;

      for (let i = index; i < documents?.length; i++) {
        listeMapped = listePlus.filter((itemListe: ItemListe) => {
          return documents[i].nom !== itemListe.label;
        });
      }

      if (listeMapped.length) {
        setListe(listeMapped);
      }
    }
  }

  return (
    <>
      <OngletsDynamique
        actionClick={handleClick}
        actionPlus={handleSelectPlus}
        actionMoins={handleSelectMoins}
        ongletSelectionne={idDocumentEdite}
        listeOnglets={getListeOnglets()}
        afficherPlus={
          (documents?.length !== 0 ||
            ChoixDelivrance.estReponseSansDelivrance(
              requete.choixDelivrance
            )) &&
          requete.choixDelivrance !==
            ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE &&
          !requete.provenanceRequete.provenancePlanete
        }
        listePlus={liste}
        nombreOngletsMax={NB_DOCUMENT_MAX}
        afficherMoins={true}
      />

      <ConfirmationPopin
        isOpen={openPopinErreur}
        messages={[erreurMessagePopin]}
        boutons={boutons}
      />
    </>
  );
};
function getTypeDocument(indexChoix: number): string | undefined {
  let typeDocument: string | undefined;
  switch (indexChoix) {
    case INDEX_PLUS.INDEX_EXTRAIT_PLURILINGUE:
      typeDocument = DocumentDelivrance.getKeyForCode(CODE_EXTRAIT_PLURILINGUE);

      break;
    case INDEX_PLUS.INDEX_EXTRAIT_SANS_FILIATION:
      typeDocument = DocumentDelivrance.getKeyForCode(
        CODE_EXTRAIT_SANS_FILIATION
      );

      break;
    case INDEX_PLUS.INDEX_EXTRAIT_AVEC_FILIATION:
      typeDocument = DocumentDelivrance.getKeyForCode(
        CODE_EXTRAIT_AVEC_FILIATION
      );

      break;
    case INDEX_PLUS.INDEX_COPIE_INTEGRALE:
      typeDocument = DocumentDelivrance.getKeyForCode(CODE_COPIE_INTEGRALE);
      break;
    default:
      break;
  }
  return typeDocument;
}
