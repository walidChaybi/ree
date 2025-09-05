import { compositionApi } from "@api/appels/compositionApi";
import { CONFIG_GET_CORPS_ACTE_IMAGE } from "@api/configurations/etatCivil/acte/GetCorpsActeImage";
import { CONFIG_GET_DONNEES_POUR_COMPOSITION_ACTE_REPRIS } from "@api/configurations/etatCivil/acte/GetDonneesPourCompositionActeReprisConfigApi";
import { CONFIG_GET_DONNEES_POUR_COMPOSITION_ACTE_TEXTE } from "@api/configurations/etatCivil/acte/GetDonneesPourCompositionActeTexteConfigApi";
import { IDonneesComposition } from "@model/composition/commun/retourApiComposition/IDonneesComposition";
import { ETypeActe } from "@model/etatcivil/enum/ETypeActe";
import { VisionneuseDocument } from "@widget/visionneuseDocument/VisionneuseDocument";
import React, { useEffect, useState } from "react";
import useFetchApi from "../../../../hooks/api/FetchApiHook";
import { MimeType } from "../../../../ressources/MimeType";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";
import { base64EnBlob } from "../../../../utils/FileUtils";
import "./scss/VisionneuseActe.scss";

interface IVisionneuseActeProps {
  idActe?: string;
  typeActe?: keyof typeof ETypeActe;
  estReecrit?: boolean;
}

const VisionneuseActe: React.FC<IVisionneuseActeProps> = ({ idActe, typeActe, estReecrit }) => {
  const [contenuBlob, setContenuBlob] = useState<Blob>();
  const [estImage, setEstImage] = useState(typeActe === ETypeActe.IMAGE);

  const [donneesPourCompositionActeTexte, setDonneesPourCompositionActeTexte] = useState<string | null>(null);

  const { appelApi: recupererCorpsActeImage } = useFetchApi(CONFIG_GET_CORPS_ACTE_IMAGE);
  const { appelApi: recupererDonneesCompositionActeTexte } = useFetchApi(CONFIG_GET_DONNEES_POUR_COMPOSITION_ACTE_TEXTE);
  const { appelApi: recupererDonneesPourCompositionActeRepris } = useFetchApi(CONFIG_GET_DONNEES_POUR_COMPOSITION_ACTE_REPRIS);

  useEffect(() => {
    if (!idActe) return;

    switch (true) {
      case estImage:
        !contenuBlob &&
          recupererCorpsActeImage({
            parametres: { path: { idActe } },
            apresSucces: corpsActeImage => setContenuBlob(base64EnBlob(corpsActeImage.contenu)),
            apresErreur: erreurs =>
              AfficherMessage.erreur("Une erreur est survenue lors de la récupération de l'acte image.", {
                erreurs
              })
          });
        break;

      case estReecrit:
        !donneesPourCompositionActeTexte &&
          recupererDonneesPourCompositionActeRepris({
            parametres: { path: { idActe } },
            apresSucces: setDonneesPourCompositionActeTexte,
            apresErreur: erreurs =>
              AfficherMessage.erreur("Une erreur est survenue lors de la récupération de l'acte texte.", {
                erreurs
              })
          });
        break;

      default:
        !donneesPourCompositionActeTexte &&
          recupererDonneesCompositionActeTexte({
            parametres: { path: { idActe } },
            apresSucces: setDonneesPourCompositionActeTexte,
            apresErreur: erreurs =>
              AfficherMessage.erreur("Une erreur est survenue lors de la récupération de l'acte texte.", {
                erreurs
              })
          });
        break;
    }
  }, [idActe, estImage, estReecrit]);

  useEffect(() => {
    if (!donneesPourCompositionActeTexte) return;

    compositionApi
      .getCompositionActeTexte(donneesPourCompositionActeTexte)
      .then(reponse => {
        if (reponse.body.size === 0) {
          AfficherMessage.erreur("La visualisation de l'acte n'est pas disponible");
          return;
        }
        setContenuBlob(base64EnBlob((reponse.body.data as IDonneesComposition).contenu));
      })
      .catch(erreurs => {
        AfficherMessage.erreur("Impossible d'obtenir les informations de l'acte", {
          erreurs: estTableauErreurApi(erreurs) ? erreurs : []
        });
      });
  }, [donneesPourCompositionActeTexte]);

  const onClickSwitchActeExtraitRepris = () => {
    setContenuBlob(undefined);
    setEstImage(prec => !prec);
  };

  return (
    <div
      id="docActeViewer"
      className="DocumentActeViewer"
    >
      {estReecrit && (
        <button
          className="ButtonSwitchActe"
          onClick={onClickSwitchActeExtraitRepris}
        >
          {estImage ? "Voir extrait repris" : "Voir acte"}
        </button>
      )}
      {contenuBlob && (
        <VisionneuseDocument
          infoBulle="Visionneuse PDF"
          contenuBlob={contenuBlob}
          typeMime={MimeType.APPLI_PDF}
        />
      )}
    </div>
  );
};

export default VisionneuseActe;
