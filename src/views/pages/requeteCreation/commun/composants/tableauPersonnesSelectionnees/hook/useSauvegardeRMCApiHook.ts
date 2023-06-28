import { postSauvegardePersonneEtActeSelectionne } from "@api/appels/requeteApi";
import { RolePersonneSauvegardee } from "@model/requete/enum/RolePersonneSauvegardee";
import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { logError } from "@util/LogManager";
import messageManager from "@util/messageManager";
import { getValeurOuUndefined } from "@util/Utils";
import { useEffect, useState } from "react";
import { IDataTableauActeInscriptionSelectionne } from "../../tableauActesInscriptionsSelectionnes/IDataTableauActeInscriptionSelectionne";
import { IDataTableauPersonneSelectionnee } from "../IDataTableauPersonneSelectionne";

enum NatureActeEtinscription {
  NAISSANCE = "NAISSANCE",
  MARIAGE = "MARIAGE",
  DECES = "DECES",
  RC = "RC",
  RCA = "RCA",
  PACS = "PACS"
}

// Pour mapping: DTO envoyé au serveur lors du POST
interface ISauvegardePersonneEtActeSelectionneDto {
  personneSauvegardeeDtos?: IDetailsPersonnesSauvegardeesEtPiecesJustificatifsDto[];
  piecesJustificatifsSauvegardeeDtos?: IPiecesJustificatifSauvegardeeDto[];
}

interface IDetailsPersonnesSauvegardeesEtPiecesJustificatifsDto {
  idPersonne: string;
  role: string;
}

interface IPiecesJustificatifSauvegardeeDto {
  idPersonne: string;
  nom: string;
  prenom: string;
  idNomenclature: string;
  idActe: string | null;
  idRC: string | null;
  idRCA: string | null;
  idPACS: string | null;
  nature?: string;
  reference: string;
}

export interface ISauvegardeRMCApiHookParams {
  dataPersonnesSelectionnees: IDataTableauPersonneSelectionnee[];
  dataActesInscriptionsSelectionnes: IDataTableauActeInscriptionSelectionne[];
  idRequete: string;
}

interface ISauvegardeRMCApiHookResultat {
  estValide: boolean;
}

export function useSauvegardeRMCApiHook(
  params?: ISauvegardeRMCApiHookParams
): ISauvegardeRMCApiHookResultat | undefined {
  const [resultat, setResultat] = useState<ISauvegardeRMCApiHookResultat>();
  useEffect(() => {
    if (params) {
      postSauvegardePersonneEtActeSelectionne(
        params.idRequete,
        mapPersonneEtActeSelectionne(params)
      )
        .then(res => {
          setResultat({ estValide: true });
          messageManager.showSuccessAndClose(
            "Enregistrement effectué avec succès !"
          );
        })
        .catch(error => {
          logError({
            messageUtilisateur:
              "Impossible de sauvegarder la selection des actes et des personnes",
            error
          });
          setResultat({ estValide: false });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return resultat;
}

function mapPersonneEtActeSelectionne(
  params: ISauvegardeRMCApiHookParams
): ISauvegardePersonneEtActeSelectionneDto {
  const personnes = params.dataPersonnesSelectionnees.map((personne, index) => {
    return {
      idPersonne: personne.idPersonne,
      role: personne.role
        ? RolePersonneSauvegardee.getKeyForLibelle(personne.role)
        : ""
    };
  });

  const acteEtInscription = params.dataActesInscriptionsSelectionnes.map(
    (acteOuInscription, index): IPiecesJustificatifSauvegardeeDto => {
      return {
        idPersonne: acteOuInscription.idPersonne,
        nom: getValeurOuUndefined(acteOuInscription.nom),
        prenom: getValeurOuUndefined(acteOuInscription.prenoms?.split(",")[0]),
        idNomenclature: TypePieceJustificative.getKeyForLibelle(
          getValeurOuUndefined(acteOuInscription.typePJ)
        ),
        idActe: estActeFromNatureActe(
          getValeurOuUndefined(acteOuInscription.nature)
        )
          ? acteOuInscription.idActeInscription
          : null,
        idRCA:
          getRCAOuRCOuPACS(
            getValeurOuUndefined(acteOuInscription.reference)
          ) === "RCA"
            ? acteOuInscription.idActeInscription
            : null,
        idRC:
          getRCAOuRCOuPACS(
            getValeurOuUndefined(acteOuInscription.reference)
          ) === "RC"
            ? acteOuInscription.idActeInscription
            : null,
        idPACS:
          getRCAOuRCOuPACS(
            getValeurOuUndefined(acteOuInscription.reference)
          ) === "PACS"
            ? acteOuInscription.idActeInscription
            : null,
        nature: mapNatureActeOuInscription(
          acteOuInscription.nature,
          acteOuInscription.reference
        ),
        reference: acteOuInscription.reference || ""
      };
    }
  );
  return {
    personneSauvegardeeDtos: personnes,
    piecesJustificatifsSauvegardeeDtos: acteEtInscription
  };
}

const estActeFromNatureActe = (nature?: string): boolean => {
  if (
    nature?.includes("Naissance") ||
    nature?.includes("Mariage") ||
    nature?.includes("Décès")
  ) {
    return true;
  } else {
    return false;
  }
};

function mapNatureActeOuInscription(nature?: string, reference?: string) {
  if (estActeFromNatureActe(nature)) {
    return nature?.toUpperCase();
  } else {
    return getRCAOuRCOuPACS(reference);
  }
}

const getRCAOuRCOuPACS = (
  reference?: string
): NatureActeEtinscription | undefined => {
  let rCAOuRCOuPACS;

  if (reference) {
    const str = reference.split("-")[0];
    if (str.includes("RCA")) {
      rCAOuRCOuPACS = NatureActeEtinscription.RCA;
    } else if (str.includes("RC")) {
      rCAOuRCOuPACS = NatureActeEtinscription.RC;
    } else if (str.includes("PACS")) {
      rCAOuRCOuPACS = NatureActeEtinscription.PACS;
    }
  }

  return rCAOuRCOuPACS;
};
