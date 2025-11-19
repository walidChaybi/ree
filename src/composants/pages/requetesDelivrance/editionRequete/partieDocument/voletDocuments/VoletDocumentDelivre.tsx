import { CONFIG_GET_DOCUMENTS_REPONSE_DELIVRANCE } from "@api/configurations/requete/documentsReponses/GetDocumentsReponseDelivranceConfigApi";
import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { ETypeActe } from "@model/etatcivil/enum/ETypeActe";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance, ECodeDocumentDelivrance, IDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { EValidation } from "@model/requete/enum/EValidation";
import { GestionMentions } from "@views/pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/mentions/GestionMentions";
import { SaisirExtraitForm } from "@views/pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/saisirExtrait/SaisirExtraitForm";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { EditionDelivranceContext } from "../../../../../../contexts/EditionDelivranceContextProvider";
import useFetchApi from "../../../../../../hooks/api/FetchApiHook";
import { EMimeType } from "../../../../../../ressources/EMimeType";
import AffichageDocument from "../../../../../commun/affichageDocument/AffichageDocument";
import PageChargeur from "../../../../../commun/chargeurs/PageChargeur";
import OngletsBouton from "../../../../../commun/onglets/OngletsBouton";
import RetoucheImage from "../../../../../commun/retoucheImage/RetoucheImage";
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
  DOCUMENT_EDITE = "document-edite",
  RETOUCHE_IMAGE = "retouche-image"
}

const aOngletSaisirExtrait = (typeDelivrance: IDocumentDelivrance | null): boolean =>
  ![ECodeDocumentDelivrance.CODE_COPIE_INTEGRALE, ECodeDocumentDelivrance.CODE_COPIE_NON_SIGNEE].includes(
    (typeDelivrance?.code ?? "") as ECodeDocumentDelivrance
  );

const aOngletMention = (typeDelivrance: IDocumentDelivrance | null, requete: IRequeteDelivrance, acte: FicheActe | null) => {
  switch (typeDelivrance?.code) {
    case ECodeDocumentDelivrance.CODE_EXTRAIT_PLURILINGUE:
      return acte && ["NAISSANCE", "MARIAGE"].includes(acte.nature);
    case ECodeDocumentDelivrance.CODE_COPIE_INTEGRALE:
    case ECodeDocumentDelivrance.CODE_COPIE_NON_SIGNEE:
      return acte?.type === ETypeActe.TEXTE && requete.choixDelivrance !== ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE;
    default:
      return true;
  }
};

const aOngletSaisirCorps = (typeDelivrance: IDocumentDelivrance | null, validation: EValidation | undefined): boolean =>
  [ECodeDocumentDelivrance.CODE_EXTRAIT_AVEC_FILIATION, ECodeDocumentDelivrance.CODE_EXTRAIT_SANS_FILIATION].includes(
    typeDelivrance?.code as ECodeDocumentDelivrance
  ) && validation !== EValidation.E;

const aOngletRetoucheImage = (typeDelivrance: IDocumentDelivrance | null, typeActe: keyof typeof ETypeActe): boolean =>
  typeActe === "IMAGE" && typeDelivrance?.code === ECodeDocumentDelivrance.CODE_COPIE_INTEGRALE;

const VoletDocumentDelivre: React.FC<IVoletDocumentDelivreProps> = ({ documentDelivre, resetOngletActif }) => {
  const idDocumentDelivre = useMemo(() => documentDelivre.id, [documentDelivre]);
  const { requete, acte } = useContext(EditionDelivranceContext);
  const [contenuDocument, setContenuDocument] = useState<string | null>(null);
  const ongletsDisponible = useMemo(() => {
    const typeDocument = DocumentDelivrance.depuisId(documentDelivre.typeDocument);

    return {
      saisie: aOngletSaisirExtrait(typeDocument),
      mention: aOngletMention(typeDocument, requete, acte),
      saisieCorps: aOngletSaisirCorps(typeDocument, documentDelivre.validation),
      retoucheImage: aOngletRetoucheImage(typeDocument, acte?.type ?? "INCONNU"),
      documentEdite: !aOngletRetoucheImage(typeDocument, acte?.type ?? "INCONNU")
    };
  }, [idDocumentDelivre]);

  const ongletParDefaut: ECleOngletDocumentDelivre = useMemo(
    () => (ongletsDisponible.documentEdite ? ECleOngletDocumentDelivre.DOCUMENT_EDITE : ECleOngletDocumentDelivre.RETOUCHE_IMAGE),
    [ongletsDisponible]
  );

  const [ongletActif, setOngletActif] = useState<ECleOngletDocumentDelivre>(ongletParDefaut);

  useEffect(() => {
    resetOngletActif && setOngletActif(ongletParDefaut);
  }, [resetOngletActif, ongletParDefaut]);

  const { appelApi: getDocumentsReponse } = useFetchApi(CONFIG_GET_DOCUMENTS_REPONSE_DELIVRANCE);

  useEffect(() => {
    getDocumentsReponse({
      parametres: { path: { idDocumentReponse: idDocumentDelivre } },
      apresSucces: document => setContenuDocument(document.contenu)
    });
  }, [idDocumentDelivre]);

  return !acte ? (
    <PageChargeur />
  ) : (
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

          ...(ongletsDisponible.documentEdite
            ? [
                {
                  cle: ECleOngletDocumentDelivre.DOCUMENT_EDITE,
                  libelle: "Document édité"
                }
              ]
            : [])
        ]}
        cleOngletActif={ongletActif}
        changerOnglet={(valeur: string) => setOngletActif(valeur as ECleOngletDocumentDelivre)}
        masquerSeparateur={ongletsDisponible.retoucheImage}
      />

      {ongletsDisponible.saisie && (
        <ConteneurVoletEdition
          estActif={ongletActif === ECleOngletDocumentDelivre.SAISIE}
          estSousOnglet
        >
          <div className="m-0 overflow-auto text-start">
            <SaisirExtraitForm
              acte={acte}
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
            acte={acte ?? undefined}
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

      {ongletsDisponible.documentEdite && (
        <ConteneurVoletEdition
          estActif={ongletActif === ECleOngletDocumentDelivre.DOCUMENT_EDITE}
          estSousOnglet
        >
          <AffichageDocument
            contenuBase64={contenuDocument}
            typeZoom={90}
            typeMime={EMimeType.APPLI_PDF}
          />
        </ConteneurVoletEdition>
      )}

      {ongletsDisponible.retoucheImage && (
        <ConteneurVoletEdition
          estActif={ongletActif === ECleOngletDocumentDelivre.RETOUCHE_IMAGE}
          sansMargeHaute
        >
          <RetoucheImage idActe={acte.id} />
        </ConteneurVoletEdition>
      )}
    </>
  );
};

export default VoletDocumentDelivre;
