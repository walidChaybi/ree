import { useEffect, useState } from "react";
import { creationRequeteDelivrance } from "../../../../api/appels/requeteApi";
import { SousTypeDelivrance } from "../../../../model/requete/v2/enum/SousTypeDelivrance";
import { TypeRequete } from "../../../../model/requete/v2/enum/TypeRequete";
import { IPieceJustificative } from "../../../common/types/RequeteType";
import { logError } from "../../../common/util/LogManager";
import { SaisieRequeteRDCSC } from "../modelForm/ISaisirRDCSCPageModel";

export function useCreationRequeteDelivrance(
  sousType: SousTypeDelivrance,
  requeteSaisieRDCSC?: SaisieRequeteRDCSC
) {
  const [idNouvelleRequete, setIdNouvelleRequete] = useState<string>();
  useEffect(() => {
    if (requeteSaisieRDCSC) {
      const requeteDelivrance = mapRequeteDelivrance(
        requeteSaisieRDCSC,
        sousType
      );

      creationRequeteDelivrance(requeteDelivrance)
        .then((result: any) => {
          setIdNouvelleRequete(result.body.data);
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur:
              "Une erreur est survenu lors de la création de la requête",
            error
          });
        });
    }
  }, [requeteSaisieRDCSC, sousType]);

  return idNouvelleRequete;
}

// TODO A compléter avec le reste des infos de la requete
function mapRequeteDelivrance(
  requeteSaisieRDCSC: SaisieRequeteRDCSC,
  sousType: SousTypeDelivrance
): any {
  requeteSaisieRDCSC.document = "";
  const nouvellesPiecesJointes = requeteSaisieRDCSC.piecesJointes;

  const piecesJustificatives: IPieceJustificative[] = nouvellesPiecesJointes
    ? nouvellesPiecesJointes.map(
        pj =>
          (({
            nom: pj.base64File.fileName,
            typePieceJustificative: pj.type?.value,
            contenu: pj.base64File.base64String,
            mimeType: pj.base64File.mimeType,
            taille: pj.base64File.taille,
            extension: pj.base64File.extension
          } as any) as IPieceJustificative)
      )
    : [];
  return {
    type: TypeRequete.getCode(TypeRequete.DELIVRANCE),
    sousType: sousType.nom,
    piecesJustificatives
  } as any;
}
