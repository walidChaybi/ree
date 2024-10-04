import { compositionApi } from "@api/appels/compositionApi";
import { getDonneesPourCompositionActeTexte } from "@api/appels/etatcivilApi";
import { AlertesActes } from "@composant/alertesActe/AlertesActes";
import { URL_RECHERCHE_ACTE_INSCRIPTION } from "@router/ReceUrls";
import { getLibelle } from "@util/Utils";
import { replaceUrl } from "@util/route/UrlUtil";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AffichagePDF from "../../commun/affichageDocument/AffichagePDF";
import OngletsBouton from "../../commun/onglets/OngletsBouton";
import OngletsContenu from "../../commun/onglets/OngletsContenu";
import "./PartieActeRequete.scss";
enum ECleOngletRequete {
  ACTE = "acte",
  MAJ = "mise-a-jour"
}

interface IPartieRequete {
  idActe: string;
}

export const PartieActeRequete: React.FC<IPartieRequete> = ({ idActe }) => {
  const navigate = useNavigate();

  // const { appelApi: appelApiDonneesPourComposition } = useFetchApi(
  //   CONFIG_GET_DONNEES_POUR_COMPOSITION_ACTE_TEXTE
  // );
  // const { appelApi: appelApicompositionActeTexte } = useFetchApi(
  //   CONFIG_POST_COMPOSITION_ACTE_TEXTE
  // );

  const [ongletActif, setOngletActif] = useState<string>(
    ECleOngletRequete.ACTE
  );
  const [contenuActe, setContenuActe] = useState<string | null>(null);

  useEffect(() => {
    if (!idActe) {
      return;
    }

    // appelApiDonneesPourComposition({
    //   parametres: {
    //     path: {
    //       idActe: idActe
    //     }
    //   },
    //   apresSucces: donneesComposition => {

    //     appelApicompositionActeTexte({
    //       parametres: {
    //         body: {
    //           donneesComposition: donneesComposition
    //         }
    //       },
    //       apresSucces: acteCompose => {
    //         //setContenuActe(acteCompose.contenu ?? "");
    //       },
    //       apresErreur: erreurs => {
    //         logError({
    //           messageUtilisateur:
    //             "Impossible de récupérer les données pour la composition de l'acte",
    //           error: erreurs[0]
    //         });
    //       }
    //     });
    //   },
    //   apresErreur: erreurs => {
    //     logError({
    //       messageUtilisateur: "Impossible de récupérer l'acte recomposé'",
    //       error: erreurs[0]
    //     });
    //   }
    // });

    getDonneesPourCompositionActeTexte(idActe).then(data =>
      compositionApi
        .getCompositionActeTexte(data.body)
        .then(dataComposition =>
          setContenuActe(dataComposition.body.data.contenu ?? "")
        )
    );
  }, [idActe]);

  return (
    <div className="partie-acte-requete">
      <OngletsBouton
        onglets={[
          {
            cle: ECleOngletRequete.ACTE,
            libelle: "Acte registre"
          }
        ]}
        cleOngletActif={ongletActif}
        changerOnglet={(valeur: string) => setOngletActif(valeur)}
      />
      <OngletsContenu estActif={ongletActif === ECleOngletRequete.ACTE}>
        <AlertesActes />
        <AffichagePDF contenuBase64={contenuActe} />
      </OngletsContenu>
      <BoutonDoubleSubmit
        className="bouton-abandonner"
        title="Abandonner"
        onClick={() => replaceUrl(navigate, URL_RECHERCHE_ACTE_INSCRIPTION)}
      >
        {getLibelle("Abandonner")}
      </BoutonDoubleSubmit>
    </div>
  );
};
