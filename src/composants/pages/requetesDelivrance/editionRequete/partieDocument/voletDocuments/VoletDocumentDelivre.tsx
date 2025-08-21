import { CONFIG_GET_DOCUMENTS_REPONSE_DELIVRANCE } from "@api/configurations/requete/documentsReponses/GetDocumentsReponseDelivrance";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { ETypeActe } from "@model/etatcivil/enum/ETypeActe";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance, ECodeDocumentDelivrance, IDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { Validation } from "@model/requete/enum/Validation";
import { GestionMentions } from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/mentions/GestionMentions";
import { SaisirExtraitForm } from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/saisirExtrait/SaisirExtraitForm";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { EditionDelivranceContext } from "../../../../../../contexts/EditionDelivranceContextProvider";
import useFetchApi from "../../../../../../hooks/api/FetchApiHook";
import AffichagePDF from "../../../../../commun/affichageDocument/AffichagePDF";
import OngletsBouton from "../../../../../commun/onglets/OngletsBouton";
import ConteneurVoletEdition from "../../ConteneurVoletEdition";
import ModifierCorpsExtrait from "./ModifierCorpsExtrait";

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

const aOngletSaisirExtrait = (typeDelivrance: IDocumentDelivrance | null): boolean =>
  ![ECodeDocumentDelivrance.CODE_COPIE_INTEGRALE, ECodeDocumentDelivrance.CODE_COPIE_NON_SIGNEE].includes(
    (typeDelivrance?.code ?? "") as ECodeDocumentDelivrance
  );

const aOngletMention = (typeDelivrance: IDocumentDelivrance | null, requete: IRequeteDelivrance, acte: IFicheActe | null) => {
  switch (typeDelivrance?.code) {
    case ECodeDocumentDelivrance.CODE_EXTRAIT_PLURILINGUE:
      return acte && [NatureActe.NAISSANCE, NatureActe.MARIAGE].includes(acte.nature);
    case ECodeDocumentDelivrance.CODE_COPIE_INTEGRALE:
    case ECodeDocumentDelivrance.CODE_COPIE_NON_SIGNEE:
      return acte?.type === ETypeActe.TEXTE && requete.choixDelivrance !== ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE;
    default:
      return true;
  }
};

const aOngletSaisirCorps = (typeDelivrance: IDocumentDelivrance | null, validation: Validation | undefined): boolean =>
  [ECodeDocumentDelivrance.CODE_EXTRAIT_AVEC_FILIATION, ECodeDocumentDelivrance.CODE_EXTRAIT_SANS_FILIATION].includes(
    typeDelivrance?.code as ECodeDocumentDelivrance
  ) && validation !== Validation.E;

const VoletDocumentDelivre: React.FC<IVoletDocumentDelivreProps> = ({ documentDelivre, resetOngletActif }) => {
  const idDocumentDelivre = useMemo(() => documentDelivre.id, [documentDelivre]);
  const { requete, acte } = useContext(EditionDelivranceContext);
  const [contenuDocument, setContenuDocument] = useState<string | null>(null);
  const [ongletActif, setOngletActif] = useState<ECleOngletDocumentDelivre>(ECleOngletDocumentDelivre.DOCUMENT_EDITE);
  const ongletsDisponible = useMemo(() => {
    const typeDocument = DocumentDelivrance.depuisId(documentDelivre.typeDocument);

    return {
      saisie: aOngletSaisirExtrait(typeDocument),
      mention: aOngletMention(typeDocument, requete, acte),
      saisieCorps: aOngletSaisirCorps(typeDocument, documentDelivre.validation)
    };
  }, [idDocumentDelivre]);
  const { appelApi: getDocumentsReponse } = useFetchApi(CONFIG_GET_DOCUMENTS_REPONSE_DELIVRANCE);

  useEffect(() => {
    resetOngletActif && setOngletActif(ECleOngletDocumentDelivre.DOCUMENT_EDITE);
  }, [resetOngletActif]);

  useEffect(() => {
    getDocumentsReponse({
      parametres: { path: { idDcumentReponse: idDocumentDelivre } },
      apresSucces: document => setContenuDocument(document.contenu)
    });
  }, [idDocumentDelivre]);

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
          <div className="m-0 overflow-auto text-start">
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
            documentReponse={documentDelivre}
            versOngletDocumentEdite={() => setOngletActif(ECleOngletDocumentDelivre.DOCUMENT_EDITE)}
          />
        </ConteneurVoletEdition>
      )}

      <ConteneurVoletEdition
        estActif={ongletActif === ECleOngletDocumentDelivre.DOCUMENT_EDITE}
        estSousOnglet
      >
        <AffichagePDF
          contenuBase64={contenuDocument}
          typeZoom={90}
        />
      </ConteneurVoletEdition>
    </>
  );
};

export default VoletDocumentDelivre;
