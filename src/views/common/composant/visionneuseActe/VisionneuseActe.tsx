import { compositionApi } from "@api/appels/compositionApi";
import { CONFIG_GET_CORPS_ACTE_IMAGE } from "@api/configurations/etatCivil/acte/GetCorpsActeImage";
import { CONFIG_GET_DONNEES_POUR_COMPOSITION_ACTE_REPRIS } from "@api/configurations/etatCivil/acte/GetDonneesPourCompositionActeReprisConfigApi";
import { CONFIG_GET_DONNEES_POUR_COMPOSITION_ACTE_TEXTE_MIS_A_JOUR } from "@api/configurations/etatCivil/acte/GetDonneesPourCompositionActeTexteMisAJourConfigApi";
import { IDonneesComposition } from "@model/composition/commun/retourApiComposition/IDonneesComposition";
import { ETypeActe } from "@model/etatcivil/enum/ETypeActe";
import React, { useEffect, useState } from "react";
import AffichageDocument from "../../../../composants/commun/affichageDocument/AffichageDocument";
import Bouton from "../../../../composants/commun/bouton/Bouton";
import useFetchApi from "../../../../hooks/api/FetchApiHook";
import { EMimeType } from "../../../../ressources/EMimeType";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

interface IVisionneuseActeProps {
  idActe?: string;
  typeActe?: keyof typeof ETypeActe;
  estReecrit?: boolean;
}

const VisionneuseActe: React.FC<IVisionneuseActeProps> = ({ idActe, typeActe, estReecrit }) => {
  const [contenuTexteBase64, setContenuTexteBase64] = useState<string | null>(null);
  const [contenuImageBase64, setContenuImageBase64] = useState<string | null>(null);
  const [estImage, setEstImage] = useState(typeActe === ETypeActe.IMAGE);

  const contenuBase64AAfficher = estImage ? contenuImageBase64 : contenuTexteBase64;

  const [donneesPourCompositionActeTexte, setDonneesPourCompositionActeTexte] = useState<string | null>(null);

  const { appelApi: recupererCorpsActeImage } = useFetchApi(CONFIG_GET_CORPS_ACTE_IMAGE);
  const { appelApi: recupererDonneesCompositionActeTexte } = useFetchApi(CONFIG_GET_DONNEES_POUR_COMPOSITION_ACTE_TEXTE_MIS_A_JOUR);
  const { appelApi: recupererDonneesPourCompositionActeRepris } = useFetchApi(CONFIG_GET_DONNEES_POUR_COMPOSITION_ACTE_REPRIS);

  useEffect(() => {
    if (!idActe) return;

    switch (true) {
      case estImage:
        !contenuImageBase64 &&
          recupererCorpsActeImage({
            parametres: { path: { idActe } },
            apresSucces: corpsActeImage => setContenuImageBase64(corpsActeImage.contenu),
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
        setContenuTexteBase64((reponse.body.data as IDonneesComposition).contenu);
      })
      .catch(erreurs => {
        AfficherMessage.erreur("Impossible d'obtenir les informations de l'acte", {
          erreurs: estTableauErreurApi(erreurs) ? erreurs : []
        });
      });
  }, [donneesPourCompositionActeTexte]);

  const onClickSwitchActeExtraitRepris = () => {
    setEstImage(prec => !prec);
  };

  return (
    <>
      {estReecrit && (
        <Bouton
          className="float-right"
          onClick={onClickSwitchActeExtraitRepris}
          styleBouton="principal"
        >
          {estImage ? "Voir extrait repris" : "Voir acte"}
        </Bouton>
      )}
      {contenuBase64AAfficher && (
        <AffichageDocument
          contenuBase64={contenuBase64AAfficher}
          typeZoom={estImage ? "auto" : 90}
          typeMime={EMimeType.APPLI_PDF}
        />
      )}
    </>
  );
};

export default VisionneuseActe;
