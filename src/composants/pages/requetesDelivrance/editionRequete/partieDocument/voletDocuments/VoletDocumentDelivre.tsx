import { CONFIG_GET_DOCUMENTS_REPONSE_DELIVRANCE } from "@api/configurations/requete/documentsReponses/GetDocumentsReponseDelivrance";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { TypeActe } from "@model/etatcivil/enum/TypeActe";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import {
  CODE_COPIE_INTEGRALE,
  CODE_COPIE_NON_SIGNEE,
  CODE_EXTRAIT_AVEC_FILIATION,
  CODE_EXTRAIT_PLURILINGUE,
  CODE_EXTRAIT_SANS_FILIATION
} from "@model/requete/enum/DocumentDelivranceConstante";
import { Validation } from "@model/requete/enum/Validation";
import { GestionMentions } from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/mentions/GestionMentions";
import { ModifierCorpsExtrait } from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/modifierCorpsExtrait/ModifierCorpsExtrait";
import { SaisirExtraitForm } from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/saisirExtrait/SaisirExtraitForm";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { EditionDelivranceContext } from "../../../../../../contexts/EditionDelivranceContextProvider";
import useFetchApi from "../../../../../../hooks/api/FetchApiHook";
import AffichagePDF from "../../../../../commun/affichageDocument/AffichagePDF";
import OngletsBouton from "../../../../../commun/onglets/OngletsBouton";
import ConteneurVoletEdition from "../../ConteneurVoletEdition";

interface IVoletDocumentDelivreProps {
  documentDelivre: IDocumentReponse;
  resetOngletActif: boolean;
}

export enum ECleOngletDocumentDelivre {
  SAISIE = "saisie",
  MENTION = "mention",
  SAISIE_CORPS = "saisie-corps",
  DOCUMENT_EDITE = "document-edite"
}

const aOngletSaisirExtrait = (typeDelivrance: DocumentDelivrance): boolean =>
  ![CODE_COPIE_INTEGRALE, CODE_COPIE_NON_SIGNEE].includes(typeDelivrance.code);

const aOngletMention = (typeDelivrance: DocumentDelivrance, requete: IRequeteDelivrance, acte: IFicheActe | null) => {
  switch (typeDelivrance.code) {
    case CODE_EXTRAIT_PLURILINGUE:
      return acte && [NatureActe.NAISSANCE, NatureActe.MARIAGE].includes(acte.nature);
    case CODE_COPIE_INTEGRALE:
    case CODE_COPIE_NON_SIGNEE:
      return acte?.type === TypeActe.TEXTE && requete.choixDelivrance !== ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE;
    default:
      return true;
  }
};

const aOngletSaisirCorps = (typeDelivrance: DocumentDelivrance, validation: Validation | undefined) =>
  [CODE_EXTRAIT_AVEC_FILIATION, CODE_EXTRAIT_SANS_FILIATION].includes(typeDelivrance.code) && validation !== Validation.E;

const VoletDocumentDelivre: React.FC<IVoletDocumentDelivreProps> = ({ documentDelivre, resetOngletActif }) => {
  const { requete, acte } = useContext(EditionDelivranceContext);
  const [contenuDocument, setContenuDocument] = useState<string | null>(null);
  const [ongletActif, setOngletActif] = useState<ECleOngletDocumentDelivre>(ECleOngletDocumentDelivre.DOCUMENT_EDITE);
  const ongletsDisponible = useMemo(() => {
    const typeDocument = DocumentDelivrance.getEnumForUUID(documentDelivre.typeDocument);

    return {
      saisie: aOngletSaisirExtrait(typeDocument),
      mention: aOngletMention(typeDocument, requete, acte),
      saisieCorps: aOngletSaisirCorps(typeDocument, documentDelivre.validation)
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentDelivre]);
  const { appelApi: getDocumentsReponse } = useFetchApi(CONFIG_GET_DOCUMENTS_REPONSE_DELIVRANCE);

  useEffect(() => {
    resetOngletActif && setOngletActif(ECleOngletDocumentDelivre.DOCUMENT_EDITE);
  }, [resetOngletActif]);

  useEffect(() => {
    getDocumentsReponse({
      parametres: { path: { idDcumentReponse: documentDelivre.id } },
      apresSucces: document => setContenuDocument(document.contenu)
    });
  }, [documentDelivre]);

  return (
    <>
      <OngletsBouton
        onglets={[
          ...(ongletsDisponible.saisie
            ? [
                {
                  cle: ECleOngletDocumentDelivre.SAISIE,
                  libelle: "Saisir l'extrait"
                }
              ]
            : []),
          ...(ongletsDisponible.mention
            ? [
                {
                  cle: ECleOngletDocumentDelivre.MENTION,
                  libelle: "Gérer les mentions"
                }
              ]
            : []),
          ...(ongletsDisponible.saisieCorps
            ? [
                {
                  cle: ECleOngletDocumentDelivre.SAISIE_CORPS,
                  libelle: "Modifier le corps de l'extrait"
                }
              ]
            : []),
          {
            cle: ECleOngletDocumentDelivre.DOCUMENT_EDITE,
            libelle: "Document édité"
          }
        ]}
        cleOngletActif={ongletActif}
        changerOnglet={(valeur: string) => setOngletActif(valeur as ECleOngletDocumentDelivre)}
      />

      {ongletsDisponible.saisie && (
        <ConteneurVoletEdition
          estActif={ongletActif === ECleOngletDocumentDelivre.SAISIE}
          estSousOnglet
        >
          <div className="m-0 overflow-auto">
            <SaisirExtraitForm
              acte={acte as IFicheActe}
              requete={requete}
              setOngletDocumentDelivre={(nouvelOnglet: ECleOngletDocumentDelivre) => setOngletActif(nouvelOnglet)}
            />
          </div>
        </ConteneurVoletEdition>
      )}

      {ongletsDisponible.mention && (
        <ConteneurVoletEdition
          estActif={ongletActif === ECleOngletDocumentDelivre.MENTION}
          estScrollable
          estSousOnglet
        >
          <GestionMentions
            acte={acte as IFicheActe}
            document={documentDelivre}
            requete={requete}
            setOngletDocumentDelivre={(nouvelOnglet: ECleOngletDocumentDelivre) => setOngletActif(nouvelOnglet)}
          ></GestionMentions>
        </ConteneurVoletEdition>
      )}

      {ongletsDisponible.saisieCorps && (
        <ConteneurVoletEdition
          estActif={ongletActif === ECleOngletDocumentDelivre.SAISIE_CORPS}
          estScrollable
          estSousOnglet
        >
          <ModifierCorpsExtrait
            acte={acte as IFicheActe}
            requete={requete}
            document={documentDelivre}
            setOngletDocumentDelivre={(nouvelOnglet: ECleOngletDocumentDelivre) => setOngletActif(nouvelOnglet)}
          />
        </ConteneurVoletEdition>
      )}

      <ConteneurVoletEdition
        estActif={ongletActif === ECleOngletDocumentDelivre.DOCUMENT_EDITE}
        estSousOnglet
      >
        <AffichagePDF
          contenuBase64={contenuDocument}
          typeZoom="auto"
        />
      </ConteneurVoletEdition>
    </>
  );
};

export default VoletDocumentDelivre;
