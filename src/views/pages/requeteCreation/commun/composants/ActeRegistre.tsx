import { CONFIG_GET_RECOMPOSER_DOCUMENT_FINAL } from "@api/configurations/etatCivil/acte/GetRecomposerDocumentFinalConfigApi";
import { AlertesActes } from "@composant/alertesActe/AlertesActes";
import VisionneuseActe from "@composant/visionneuseActe/VisionneuseActe";
import React, { useEffect, useState } from "react";
import AffichageDocument from "../../../../../composants/commun/affichageDocument/AffichageDocument";
import useFetchApi from "../../../../../hooks/api/FetchApiHook";
import { EMimeType } from "../../../../../ressources/EMimeType";
import AfficherMessage from "../../../../../utils/AfficherMessage";

interface ActeRegistreProps {
  idActeAAfficher?: string;
  affichageApresSignature?: boolean;
}

const ActeRegistre: React.FC<ActeRegistreProps> = ({ idActeAAfficher, affichageApresSignature }) => {
  const [acteRecompose, setActeRecompose] = useState<Blob>();
  const { appelApi: recomposerDocumentFinal } = useFetchApi(CONFIG_GET_RECOMPOSER_DOCUMENT_FINAL);

  useEffect(() => {
    if (!idActeAAfficher || !affichageApresSignature) return;

    recomposerDocumentFinal({
      parametres: { path: { idActe: idActeAAfficher } },
      apresSucces: pdf => {
        if (pdf.size === 0) {
          AfficherMessage.erreur("La visualisation de l'acte n'est pas disponible");
        }
        setActeRecompose(pdf);
      },
      apresErreur: erreurs =>
        AfficherMessage.erreur("Impossible de récupérer l'acte recomposé", {
          erreurs
        })
    });
  }, [idActeAAfficher, affichageApresSignature]);

  return (
    <div className="h-screen">
      {affichageApresSignature ? (
        <AffichageDocument
          contenuBlob={acteRecompose}
          typeZoom={"page-fit"}
          typeMime={EMimeType.APPLI_PDF}
          titre={"Visionneuse acte registre"}
        />
      ) : (
        <>
          <AlertesActes idActeInit={idActeAAfficher} />
          <VisionneuseActe idActe={idActeAAfficher} />
        </>
      )}
    </div>
  );
};

export default ActeRegistre;
