import { logErrorOnConsole } from "@util/LogManager";
import messageManager from "@util/messageManager";
import { estTableauNonVide, getLibelle } from "@util/Utils";
import React, { useCallback, useEffect } from "react";
import { MimeType } from "../../../../ressources/MimeType";

interface IRetoucheImageProps {
  images: string[];
  onRetoucheTerminee: (imagesBase64?: string[]) => void;
}

interface IFichierReponse {
  contenuBase64: string;
  typeMime: string;
}

interface IErreurReponse {
  code: string;
  details?: string;
  libelle: string;
}

interface IDetailReponse {
  fichiersModifies?: IFichierReponse[];
  erreurs?: IErreurReponse[];
}
interface IEventRetoucheImageReponse {
  detail: IDetailReponse;
}

interface IFichierAEnvoyer {
  nom: string;
  typeMime: string;
  contenuBase64: string;
}

interface IDetailReponseAEnvoyer {
  direction: string;
  fichiers: IFichierAEnvoyer[];
}

type TEvent = IEventRetoucheImageReponse & Event;

const NOM_EVT_REPONSE_WEB_EXT = "retoucheimageWebextResponse";
const NOM_EVT_ENVOI_WEB_EXT = "retoucheimageWebextCall";

const DIRECTION_VERS_WEB_EXT = "to-webextension";
const MAX_LONG_LOG = 300;
export const RetoucheImage: React.FC<IRetoucheImageProps> = props => {
  const onWebExtensionReponse = useCallback(
    (event: Event) => {
      const tEvent = event as TEvent;

      if (estTableauNonVide(tEvent.detail.erreurs)) {
        //@ts-ignore tEvent.detail.erreur non null
        const toutesLesErreurs = tEvent.detail.erreurs
          .map(erreur => erreur.libelle)
          .join(", ");
        messageManager.showErrorAndClose(toutesLesErreurs);
        props.onRetoucheTerminee(undefined);
        //@ts-ignore tEvent.detail.erreur non null
        tEvent.detail.erreurs.forEach(erreur =>
          logErrorOnConsole({
            errorInfo: erreur.libelle,
            error: erreur.details
              ? erreur.details.substring(0, MAX_LONG_LOG)
              : ""
          })
        );
      } else if (tEvent.detail.fichiersModifies) {
        const contenuFichiersModifiersBase64: string[] =
          tEvent.detail.fichiersModifies.map(
            (fichier: IFichierReponse) => fichier.contenuBase64
          );
        props.onRetoucheTerminee(contenuFichiersModifiersBase64);
      } else {
        messageManager.showErrorAndClose(
          getLibelle(
            "Une erreur inattendue s'est produite lors du retour de l'application de retouche d'image"
          )
        );
      }
    },
    [props]
  );

  useEffect(() => {
    //Ajout du listener pour communiquer avec la webextension
    if (window.top) {
      window.top.removeEventListener(
        NOM_EVT_REPONSE_WEB_EXT,
        onWebExtensionReponse
      );

      window.top.addEventListener(
        NOM_EVT_REPONSE_WEB_EXT,
        onWebExtensionReponse
      );
    }

    return () => {
      if (window.top) {
        window.top.removeEventListener(
          NOM_EVT_REPONSE_WEB_EXT,
          onWebExtensionReponse
        );
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onWebExtensionReponse]);

  useEffect(() => {
    if (estTableauNonVide(props.images) && window.top) {
      const detail: IDetailReponseAEnvoyer = {
        direction: DIRECTION_VERS_WEB_EXT,
        fichiers: props.images.map((contenuBase64: string, index: number) => ({
          contenuBase64,
          nom: `fichier${index}.tiff`,
          typeMime: MimeType.IMAGE_TIFF
        }))
      };

      window.top.dispatchEvent(
        new CustomEvent(NOM_EVT_ENVOI_WEB_EXT, { detail })
      );
    }
  }, [props.images]);

  return <></>;
};
