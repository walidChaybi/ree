import { CONFIG_GET_RECOMPOSER_DOCUMENT_FINAL } from "@api/configurations/etatCivil/acte/GetRecomposerDocumentFinalConfigApi";
import { AlertesActes } from "@composant/alertesActe/AlertesActes";
import VisionneuseActe from "@composant/visionneuseActe/VisionneuseActe";
import { VisionneuseDocument } from "@widget/visionneuseDocument/VisionneuseDocument";
import React, { useEffect, useState } from "react";
import useFetchApi from "../../../../../hooks/api/FetchApiHook";
import { MimeType } from "../../../../../ressources/MimeType";
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
    <div className="ActeRegistre">
      {affichageApresSignature ? (
        <VisionneuseDocument
          infoBulle="Visionneuse acte registre"
          typeMime={MimeType.APPLI_PDF}
          contenuBlob={acteRecompose}
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
