/* v8 ignore start A TESTER 03/25 */
import { CONFIG_POST_REQUETE_TRANSCRIPTION } from "@api/configurations/requete/creation/PostRequeteTranscriptionConfigApi";
import { CONFIG_POST_PIECE_JUSTIFICATIVE } from "@api/configurations/requete/pieceJustificative/PostPieceJustificativeConfigApi";
import { TErreurApi } from "@model/api/Api";
import { ISaisieRequeteRCTCForm, SaisieRequeteRCTCForm } from "@model/form/creation/transcription/ISaisirRequeteRCTCPageForm";
import { IRequeteConsulaire } from "@model/requete/IRequeteConsulaire";
import { useEffect, useState } from "react";
import useFetchApi from "../../../hooks/api/FetchApiHook";
import { PieceJointe } from "../../../utils/FileUtils";
import { TTraitementApi } from "../TTraitementApi";

interface IParametresTraitement {
  valeurs: ISaisieRequeteRCTCForm;
}

interface IReponseTraitment {
  id: string;
}

interface IDonneesTraitement {
  idRequete: string | null;
  piecesASauvergarder: PieceJointe[];
  pieces: { traitees: number; aTraiter: number };
  messageErreur: string;
}

const PIECES_PAR_GROUPE_APPELS = 5;

const TRAITEMENT_ENREGISTRER_RCTC: TTraitementApi<IParametresTraitement, IReponseTraitment> = {
  Lancer: terminerTraitement => {
    const [donneesTraitement, setDonneesTraitement] = useState<IDonneesTraitement>({
      idRequete: null,
      piecesASauvergarder: [],
      pieces: {
        aTraiter: 0,
        traitees: 0
      },
      messageErreur: ""
    });
    const { appelApi: postRequeteTranscription } = useFetchApi(CONFIG_POST_REQUETE_TRANSCRIPTION);
    const { appelApi: postPieceJustificative } = useFetchApi(CONFIG_POST_PIECE_JUSTIFICATIVE);

    const lancer = (parametres: IParametresTraitement) => {

      const apresSucces = (requeteCreee?: { id: string }[]) =>
        setDonneesTraitement(prec => ({
          ...prec,
          idRequete: requeteCreee?.[0]?.id ?? "",
          piecesASauvergarder: parametres.valeurs.pieceJointe,
          messageErreur: ""
        }));

      const apresErreur = (erreurs: TErreurApi[]) => {
        setDonneesTraitement(prec => ({ ...prec, messageErreur: "Erreur lors de l'enregistrement de la requête" }));
        terminerTraitement();
      };

      postRequeteTranscription({
        parametres: { body: [SaisieRequeteRCTCForm.versDto(parametres.valeurs)] },
        apresSucces,
        apresErreur
      });
    };

    useEffect(() => {
      if (donneesTraitement.idRequete === null) {
        return;
      }

      if (!donneesTraitement.piecesASauvergarder.length && donneesTraitement.pieces.aTraiter <= donneesTraitement.pieces.traitees) {
        terminerTraitement();

        return;
      }

      if (donneesTraitement.pieces.traitees !== donneesTraitement.pieces.aTraiter) {
        return;
      }

      const piecesATraiter = donneesTraitement.piecesASauvergarder.slice(0, PIECES_PAR_GROUPE_APPELS);
      setDonneesTraitement(prec => ({
        ...prec,
        piecesASauvergarder: donneesTraitement.piecesASauvergarder.slice(PIECES_PAR_GROUPE_APPELS),
        pieces: {
          aTraiter: piecesATraiter.length,
          traitees: 0
        }
      }));

      piecesATraiter.forEach(pieceJustificative => {
        postPieceJustificative({
          parametres: {
            path: { idRequete: donneesTraitement.idRequete ?? "" },
            body: {
              nom: pieceJustificative.base64File.fileName,
              contenu: pieceJustificative.base64File.base64String,
              mimeType: pieceJustificative.base64File.mimeType,
              extension: pieceJustificative.base64File.extension,
              taille: pieceJustificative.base64File.taille,
              typePieceJustificative: pieceJustificative.type?.cle ?? ""
            }
          },
          apresErreur: erreurs => console.error(erreurs),
          finalement: () => setDonneesTraitement(prec => ({ ...prec, pieces: { ...prec.pieces, traitees: prec.pieces.traitees + 1 } })),
          forcerAppelsMultiples: true
        });
      });
    }, [donneesTraitement]);

    return {
      lancer,
      erreurTraitement: { enEchec: Boolean(donneesTraitement.messageErreur), message: donneesTraitement.messageErreur },
      reponseTraitement: { id: donneesTraitement.idRequete ?? "" }
    };
  }
};

export default TRAITEMENT_ENREGISTRER_RCTC;
/* v8 ignore end */
