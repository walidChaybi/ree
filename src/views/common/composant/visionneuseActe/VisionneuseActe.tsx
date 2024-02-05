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
import { base64ToBlob } from "@util/FileUtils";
import { VisionneuseDocument } from "@widget/visionneuseDocument/VisionneuseDocument";
import React, { useEffect, useState } from "react";
import { MimeType } from "../../../../ressources/MimeType";
import "./scss/VisionneuseActe.scss";

interface IVisionneuseActeProps {
  idActe?: string;
  typeActe?: TypeActe;
  estReecrit?: boolean;
}

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
    if (recupererActeTexteResultat?.acteTexteJson && !estReecrit) {
      setCompositionActeTexteParams({
        acteTexteJson: recupererActeTexteResultat.acteTexteJson
      });
    } else if (recupererActeTexteReprisResultat?.acteTexteJson && estReecrit) {
      setCompositionActeTexteParams({
        acteTexteJson: recupererActeTexteReprisResultat.acteTexteJson
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recupererActeTexteResultat, recupererActeTexteReprisResultat]);

  useEffect(() => {
    if (estImage) {
      if (recupererActeImageResultat?.contenuBlob) {
        setContenuBlob(recupererActeImageResultat.contenuBlob);
      } else if (recupererActeImageResultat?.erreur) {
        setErreur(recupererActeImageResultat?.erreur);
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

  const clickSwitch = () => {
    setContenuBlob(undefined);
    setEstImage(!estImage);
  };

  return (
    <div id="docActeViewer" className="DocumentActeViewer">
      {estReecrit && (
        <button className="ButtonSwitchActe" onClick={() => clickSwitch()}>
          Texte saisi &lt;-&gt; Image
        </button>
      )}
      {erreur ? (
        erreur
      ) : (
        <VisionneuseDocument
          infoBulle="Visionneuse PDF"
          contenuBlob={contenuBlob}
          typeMime={MimeType.APPLI_PDF}
        />
      )}
    </div>
  );
};
