import { CONFIG_POST_MAJ_ACTION } from "@api/configurations/requete/actions/PostMajActionConfigApi";
import { CONFIG_PATCH_REQUETE_DELIVRANCE } from "@api/configurations/requete/delivrance/PatchRequeteDelivranceConfigApi";
import { CONFIG_POST_REQUETE_DELIVRANCE } from "@api/configurations/requete/delivrance/PostRequeteDelivranceConfigApi";
import { CONFIG_POST_PIECE_JUSTIFICATIVE } from "@api/configurations/requete/pieceJustificative/PostPieceJustificativeConfigApi";
import { TTraitementApi } from "@api/traitements/TTraitementApi";
import { ISaisieRDCForm, SaisieRDCForm } from "@model/form/delivrance/ISaisieRDCForm";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { useEffect, useState } from "react";
import useFetchApi from "../../../../hooks/api/FetchApiHook";
import { PieceJointe } from "../../../../utils/FileUtils";

interface IParametresTraitementEnregistrerRDC {
  valeurs: ISaisieRDCForm;
  requeteModifiee: { id: string; idUtilisateur: string } | null;
}

interface IReponseTraitmentEnregistrerRDC {
  id: string;
}

interface IDonneesTraitementEnregistrerRDC {
  idRequete: string | null;
  piecesASauvergarder: PieceJointe[];
  pieces: { traitees: number; aTraiter: number };
  messageErreur: string;
}

const PIECES_PAR_GROUPE_APPELS = 5;

const TRAITEMENT_ENREGISTRER_RDC: TTraitementApi<IParametresTraitementEnregistrerRDC, IReponseTraitmentEnregistrerRDC> = {
  Lancer: terminerTraitement => {
    const [donneesTraitement, setDonneesTraitement] = useState<IDonneesTraitementEnregistrerRDC>({
      idRequete: null,
      piecesASauvergarder: [],
      pieces: {
        aTraiter: 0,
        traitees: 0
      },
      messageErreur: ""
    });
    const { appelApi: appelPostRequeteDelivrance } = useFetchApi(CONFIG_POST_REQUETE_DELIVRANCE);
    const { appelApi: appelPatchRequeteDelivrance } = useFetchApi(CONFIG_PATCH_REQUETE_DELIVRANCE);
    const { appelApi: appelPostPieceJustificative } = useFetchApi(CONFIG_POST_PIECE_JUSTIFICATIVE);
    const { appelApi: appelPostAction } = useFetchApi(CONFIG_POST_MAJ_ACTION);

    const lancer = (parametres: IParametresTraitementEnregistrerRDC) => {
      if (parametres.requeteModifiee) {
        appelPatchRequeteDelivrance({
          parametres: {
            path: {
              idRequete: parametres.requeteModifiee.id
            },
            query: { refus: false, futurStatut: StatutRequete.getKey(StatutRequete.PRISE_EN_CHARGE) },
            body: {
              idUtilisateur: parametres.requeteModifiee.idUtilisateur,
              ...SaisieRDCForm.versDto(parametres.valeurs)
            }
          },
          apresSucces: () => {
            appelPostAction({
              parametres: {
                query: {
                  idRequete: parametres.requeteModifiee?.id ?? "",
                  libelleAction: "Requête modifiée"
                }
              },
              apresErreur: erreurs => {
                console.error(erreurs);
                setDonneesTraitement(prec => ({ ...prec, messageErreur: "Erreur lors de l'enregistrement de l'action" }));
                terminerTraitement();
              }
            });
            setDonneesTraitement(prec => ({
              ...prec,
              idRequete: parametres.requeteModifiee?.id ?? "",
              piecesASauvergarder: parametres.valeurs.piecesJustificatives.filter(piece => Boolean(piece.base64File.base64String?.length))
            }));
          },
          apresErreur: erreurs => {
            console.error(erreurs);
            setDonneesTraitement(prec => ({ ...prec, messageErreur: "Erreur lors de l'enregistrement de la requête" }));
            terminerTraitement();
          }
        });

        return;
      }

      appelPostRequeteDelivrance({
        parametres: {
          query: { refus: false, futurStatut: StatutRequete.getKey(StatutRequete.PRISE_EN_CHARGE) },
          body: SaisieRDCForm.versDto(parametres.valeurs)
        },
        apresSucces: requeteCreee => {
          setDonneesTraitement(prec => ({
            ...prec,
            idRequete: requeteCreee?.id ?? "",
            piecesASauvergarder: parametres.valeurs.piecesJustificatives
          }));
        },
        apresErreur: erreurs => {
          console.error(erreurs);
          setDonneesTraitement(prec => ({ ...prec, messageErreur: "Erreur lors de l'enregistrement de la requête" }));
          terminerTraitement();
        }
      });
    };

    useEffect(() => {
      if (donneesTraitement.idRequete === null || donneesTraitement.pieces.traitees !== donneesTraitement.pieces.aTraiter) return;

      if (!donneesTraitement.piecesASauvergarder.length && donneesTraitement.pieces.aTraiter <= donneesTraitement.pieces.traitees) {
        terminerTraitement();

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
              typePieceJustificative: TypePieceJustificative.depuisLibelle(pieceJustificative.type?.libelle ?? "")?.id
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

export default TRAITEMENT_ENREGISTRER_RDC;
