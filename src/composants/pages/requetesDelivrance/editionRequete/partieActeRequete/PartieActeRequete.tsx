import { compositionApi } from "@api/appels/compositionApi";
import { getDocumentReponseById } from "@api/appels/requeteApi";
import { CONFIG_GET_DONNEES_POUR_COMPOSITION_ACTE_TEXTE } from "@api/configurations/etatCivil/acte/GetDonneesPourCompositionActeTexteConfigApi";
import { AlertesActes } from "@composant/alertesActe/AlertesActes";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import React, { Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from "react";
import { EditionDelivranceContext } from "../../../../../contexts/EditionDelivranceContextProvider";
import useFetchApi from "../../../../../hooks/api/FetchApiHook";
import AfficherMessage from "../../../../../utils/AfficherMessage";
import AffichagePDF from "../../../../commun/affichageDocument/AffichagePDF";
import OngletsBouton from "../../../../commun/onglets/OngletsBouton";
import ConteneurVoletEdition from "../ConteneurVoletEdition";
import VoletRequete from "./VoletRequete";

export enum ECleOngletRequete {
  ACTE = "acte",
  REQUETE = "requete",
  COURRIER_EDITE = "courrier-edite"
}

interface IPartieActeRequeteProps {
  ongletActif: string;
  setOngletActif: Dispatch<SetStateAction<string>>;
}

const PartieActeRequete: React.FC<IPartieActeRequeteProps> = React.memo(({ ongletActif, setOngletActif }) => {
  const { requete, acte } = useContext(EditionDelivranceContext);

  const [contenuActe, setContenuActe] = useState<string | null>(null);
  const [contenuCourrier, setContenuCourrier] = useState<string | null>(null);
  const idDocumentCourrier = useMemo(
    () => requete.documentsReponses.filter(doc => DocumentDelivrance.estCourrierDelivranceEC(doc.typeDocument)).shift()?.id,
    [requete]
  );

  useEffect(() => {
    if (!idDocumentCourrier) return;

    getDocumentReponseById(idDocumentCourrier).then(data => setContenuCourrier(data.body.data.contenu ?? ""));
  }, [idDocumentCourrier]);

  const { appelApi: recupererDonneesCompositionActeTexte } = useFetchApi(CONFIG_GET_DONNEES_POUR_COMPOSITION_ACTE_TEXTE);

  useEffect(() => {
    if (contenuActe !== null || acte?.type !== "TEXTE") return;

    recupererDonneesCompositionActeTexte({
      parametres: { path: { idActe: acte.id } },
      apresSucces: donneesPourCompositionActeTexte => {
        compositionApi
          .getCompositionActeTexte(donneesPourCompositionActeTexte)
          .then(dataComposition => setContenuActe(dataComposition.body.data.contenu ?? ""));
      },
      apresErreur: erreurs =>
        AfficherMessage.erreur("Une erreur est survenue lors de la récupération de l'acte texte.", {
          erreurs
        })
    });
  }, [contenuActe, acte]);

  return (
    <div className="w-1/2">
      <OngletsBouton
        onglets={[
          ...(acte
            ? [
                {
                  cle: ECleOngletRequete.ACTE,
                  libelle: "Acte registre"
                }
              ]
            : []),
          {
            cle: ECleOngletRequete.REQUETE,
            libelle: "Requête"
          },
          ...(idDocumentCourrier
            ? [
                {
                  cle: ECleOngletRequete.COURRIER_EDITE,
                  libelle: "Courrier édité"
                }
              ]
            : [])
        ]}
        cleOngletActif={ongletActif}
        changerOnglet={(valeur: string) => setOngletActif(valeur)}
      />

      {acte && (
        <ConteneurVoletEdition estActif={ongletActif === ECleOngletRequete.ACTE}>
          <div className="flex flex-col gap-2">
            <AlertesActes idActeInit={acte?.id} />
            <AffichagePDF
              contenuBase64={contenuActe}
              typeZoom={90}
            />
          </div>
        </ConteneurVoletEdition>
      )}

      <ConteneurVoletEdition
        estActif={ongletActif === ECleOngletRequete.REQUETE}
        estScrollable
      >
        <VoletRequete requete={requete} />
      </ConteneurVoletEdition>

      {idDocumentCourrier && (
        <ConteneurVoletEdition estActif={ongletActif === ECleOngletRequete.COURRIER_EDITE}>
          <AffichagePDF
            contenuBase64={contenuCourrier}
            typeZoom={90}
          />
        </ConteneurVoletEdition>
      )}
    </div>
  );
});

export default PartieActeRequete;
