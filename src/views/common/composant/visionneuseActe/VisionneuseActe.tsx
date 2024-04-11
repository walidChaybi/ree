import {
  IGetCorpsActeImageParams,
  useGetCorpsActeImageApiHook
} from "@hook/acte/GetCorpsActeImageApiHook";
import useGetDonneesPourCompositionActeReprisApiHook, {
  IGetDonneesPourCompositionActeReprisParams
} from "@hook/acte/GetDonneesPourCompositionActeReprisApiHook";
import useGetDonneesPourCompositionActeTexteApiHook, {
  IGetDonneesPourCompositionActeTexteParams
} from "@hook/acte/GetDonneesPourCompositionActeTexteApiHook";
import {
  ICompositionActeTexteParams,
  useCompositionActeTexteApiHook
} from "@hook/composition/CompositionActeTexte";
import { TypeActe } from "@model/etatcivil/enum/TypeActe";
import { CodeErreurFonctionnelle } from "@model/requete/CodeErreurFonctionnelle";
import { base64ToBlob } from "@util/FileUtils";
import { getLibelle } from "@util/Utils";
import { VisionneuseDocument } from "@widget/visionneuseDocument/VisionneuseDocument";
import React, { useEffect, useState } from "react";
import { MimeType } from "../../../../ressources/MimeType";
import "./scss/VisionneuseActe.scss";

interface IVisionneuseActeProps {
  idActe?: string;
  typeActe?: TypeActe;
  estReecrit?: boolean;
}

const MESSAGE_VISUALISATION_INDISPONIBLE =
  "La visualisation de l'acte n'est pas disponible.";

export const VisionneuseActe: React.FC<IVisionneuseActeProps> = ({
  idActe,
  typeActe,
  estReecrit
}) => {
  const [contenuBlob, setContenuBlob] = useState<Blob>();
  const [erreur, setErreur] = useState<string>();
  const [estImage, setEstImage] = useState(TypeActe.estImage(typeActe));

  const [recupererActeImageParams, setRecupererActeImageParams] =
    useState<IGetCorpsActeImageParams>();
  const recupererActeImageResultat = useGetCorpsActeImageApiHook(
    recupererActeImageParams
  );

  const [recupererActeTexteReprisParams, setRecupererActeTexteReprisParams] =
    useState<IGetDonneesPourCompositionActeReprisParams>();
  const recupererActeTexteReprisResultat =
    useGetDonneesPourCompositionActeReprisApiHook(
      recupererActeTexteReprisParams
    );

  const [recupererActeTexteParams, setRecupererActeTexteParams] =
    useState<IGetDonneesPourCompositionActeTexteParams>();
  const recupererActeTexteResultat =
    useGetDonneesPourCompositionActeTexteApiHook(recupererActeTexteParams);

  const [compositionActeTexteParams, setCompositionActeTexteParams] =
    useState<ICompositionActeTexteParams>();
  const compositionActeTexteResultat = useCompositionActeTexteApiHook(
    compositionActeTexteParams
  );

  useEffect(() => {
    if (idActe) {
      if (estImage) {
        !recupererActeImageResultat && setRecupererActeImageParams({ idActe });
      } else {
        if (estReecrit) {
          !recupererActeTexteReprisResultat &&
            setRecupererActeTexteReprisParams({ idActe });
        } else {
          !recupererActeTexteResultat &&
            setRecupererActeTexteParams({ idActe });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idActe, estImage]);

  useEffect(() => {
    if (!estReecrit) {
      if (
        recupererActeTexteResultat?.erreur?.code ===
        CodeErreurFonctionnelle.FCT_ACTE_SANS_CORPS_TEXTE
      ) {
        setErreur(
          `[${CodeErreurFonctionnelle.FCT_ACTE_SANS_CORPS_TEXTE}] ${MESSAGE_VISUALISATION_INDISPONIBLE}`
        );
      } else if (recupererActeTexteResultat?.acteTexteJson) {
        setCompositionActeTexteParams({
          acteTexteJson: recupererActeTexteResultat.acteTexteJson
        });
      }
    } else if (recupererActeTexteReprisResultat?.acteTexteJson) {
      setCompositionActeTexteParams({
        acteTexteJson: recupererActeTexteReprisResultat.acteTexteJson
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recupererActeTexteResultat, recupererActeTexteReprisResultat]);

  useEffect(() => {
    if (estImage) {
      if (recupererActeImageResultat?.imageActe) {
        setContenuBlob(
          base64ToBlob(recupererActeImageResultat.imageActe.contenu)
        );
      } else if (recupererActeImageResultat?.erreur) {
        setErreur(
          `[${CodeErreurFonctionnelle.FCT_AUCUN_ACTE_IMAGE}] ${MESSAGE_VISUALISATION_INDISPONIBLE}`
        );
      }
    } else {
      if (compositionActeTexteResultat?.donneesComposition) {
        setContenuBlob(
          base64ToBlob(compositionActeTexteResultat.donneesComposition.contenu)
        );
      } else if (compositionActeTexteResultat?.erreur) {
        setErreur(compositionActeTexteResultat?.erreur);
      }
    }
  }, [compositionActeTexteResultat, recupererActeImageResultat, estImage]);

  const onClickSwitchActeExtraitRepris = () => {
    setContenuBlob(undefined);
    setEstImage(!estImage);
    setErreur(undefined);
  };

  return (
    <div id="docActeViewer" className="DocumentActeViewer">
      {estReecrit && (
        <button
          className="ButtonSwitchActe"
          onClick={onClickSwitchActeExtraitRepris}
        >
          {getLibelle(estImage ? "Voir extrait repris" : "Voir acte")}
        </button>
      )}
      {erreur ?? (
        <VisionneuseDocument
          infoBulle="Visionneuse PDF"
          contenuBlob={contenuBlob}
          typeMime={MimeType.APPLI_PDF}
        />
      )}
    </div>
  );
};
