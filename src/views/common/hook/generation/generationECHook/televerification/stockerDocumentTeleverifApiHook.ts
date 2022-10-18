import { sauvegarderDocuments } from "@api/appels/televerificationApi";
import { FicheActe, IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

// Paramètre du hook useGenerationEC
export interface IStockerDocumentsTeleverifParams {
  documents: {
    contenu: string;
    id: string;
  }[];
  idRequete: string;
  acte: IFicheActe;
}

export interface IStockerDocumentTeleverifResultat {
  resultat: boolean;
}

export function useStockerDocumentTeleverif(
  params?: IStockerDocumentsTeleverifParams
): IStockerDocumentTeleverifResultat | undefined {
  const [res, setRes] = useState<IStockerDocumentTeleverifResultat>();

  useEffect(() => {
    if (params) {
      sauvegarderDocuments(
        params.documents.map(document => ({
          idRequete: params.idRequete,
          idDocument: document.id,
          natureActe: NatureActe.getKey(params.acte.nature),
          anneeEvenement: params.acte.evenement?.annee,
          nomTitulaire1: FicheActe.getTitulairesActeDansLOrdre(params.acte)
            .titulaireActe1.nom,
          nomTitulaire2: FicheActe.getTitulairesActeDansLOrdre(params.acte)
            .titulaireActe2?.nom,
          pdf: document.contenu
        }))
      )
        .then(result => {
          setRes({ resultat: true });
        })
        .catch(error => {
          setRes({ resultat: false });
          /* istanbul ignore next */
          logError({
            messageUtilisateur: "Impossible de sauvegarder la télévérification",
            error
          });
        });
    }
  }, [params]);

  return res;
}
