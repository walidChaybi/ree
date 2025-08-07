/* v8 ignore start A TESTER 03/25 */
import { CONFIG_PATCH_REQUETE_TRANSCRIPTION } from "@api/configurations/requete/creation/PatchRequeteTranscriptionConfigApi";
import { CONFIG_POST_REQUETE_TRANSCRIPTION } from "@api/configurations/requete/creation/PostRequeteTranscriptionConfigApi";
import { CONFIG_POST_REQUETE_TRANSCRIPTION_TRANSMISE } from "@api/configurations/requete/creation/PostRequeteTranscriptionTransmiseConfigApi";
import { CONFIG_POST_PIECE_JUSTIFICATIVE } from "@api/configurations/requete/pieceJustificative/PostPieceJustificativeConfigApi";
import { ISaisieRequeteRCTCForm, SaisieRequeteRCTCForm } from "@model/form/creation/transcription/ISaisirRequeteRCTCPageForm";
import { IRequeteConsulaire } from "@model/requete/IRequeteConsulaire";
import { useEffect, useState } from "react";
import useFetchApi from "../../../hooks/api/FetchApiHook";
import { PieceJointe } from "../../../utils/FileUtils";
import { TTraitementApi } from "../TTraitementApi";

interface IParametresTraitement {
  valeurs: ISaisieRequeteRCTCForm;
  requeteModifiee: IRequeteConsulaire | null;
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
    const { appelApi: appelPostRequeteTranscription } = useFetchApi(CONFIG_POST_REQUETE_TRANSCRIPTION);
    const { appelApi: appelPostRequeteTranscriptionTransmise } = useFetchApi(CONFIG_POST_REQUETE_TRANSCRIPTION_TRANSMISE);
    const { appelApi: appelPatchRequeteTranscription } = useFetchApi(CONFIG_PATCH_REQUETE_TRANSCRIPTION);
    const { appelApi: appelPostPieceJustificative } = useFetchApi(CONFIG_POST_PIECE_JUSTIFICATIVE);

    const lancer = (parametres: IParametresTraitement) => {
      switch (true) {
        case Boolean(parametres.requeteModifiee):
          appelPatchRequeteTranscription({
            parametres: {
              path: { idRequete: parametres.requeteModifiee?.id ?? "" },
              body: {
                idUtilisateur: parametres.requeteModifiee?.idUtilisateur,
                statut: parametres.requeteModifiee?.statut,
                ...SaisieRequeteRCTCForm.versDto(parametres.valeurs)
              }
            },
            apresSucces: () =>
              setDonneesTraitement(prec => ({
                ...prec,
                idRequete: parametres.requeteModifiee?.id ?? "",
                piecesASauvergarder: parametres.valeurs.pieceJointe
              })),
            apresErreur: erreurs => {
              console.error(erreurs);
              setDonneesTraitement(prec => ({ ...prec, messageErreur: "Erreur lors de l'enregistrement de la requête" }));
              terminerTraitement();
            }
          });

          return;
        case Boolean(parametres.valeurs.service.idService):
          appelPostRequeteTranscriptionTransmise({
            parametres: {
              query: { idService: parametres.valeurs.service.idService },
              body: [SaisieRequeteRCTCForm.versDto(parametres.valeurs)]
            },
            apresSucces: requeteCree =>
              setDonneesTraitement(prec => ({
                ...prec,
                idRequete: requeteCree[0]?.id ?? "",
                piecesASauvergarder: parametres.valeurs.pieceJointe
              })),
            apresErreur: erreurs => {
              console.error(erreurs);
              setDonneesTraitement(prec => ({ ...prec, messageErreur: "Erreur lors de l'enregistrement de la requête" }));
              terminerTraitement();
            }
          });

          return;
        default:
          appelPostRequeteTranscription({
            parametres: { body: [SaisieRequeteRCTCForm.versDto(parametres.valeurs)] },
            apresSucces: requeteCree =>
              setDonneesTraitement(prec => ({
                ...prec,
                idRequete: requeteCree[0]?.id ?? "",
                piecesASauvergarder: parametres.valeurs.pieceJointe
              })),
            apresErreur: erreurs => {
              console.error(erreurs);
              setDonneesTraitement(prec => ({ ...prec, messageErreur: "Erreur lors de l'enregistrement de la requête" }));
              terminerTraitement();
            }
          });
      }
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
        appelPostPieceJustificative({
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
