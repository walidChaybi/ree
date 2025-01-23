import { postSauvegardePersonneEtActeSelectionne } from "@api/appels/requeteApi";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { RolePersonneSauvegardee } from "@model/requete/enum/RolePersonneSauvegardee";
import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { logError } from "@util/LogManager";
import messageManager from "@util/messageManager";
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
  personneSauvegardeeDtos?: IDetailsPersonnesSauvegardeesDto[];
  piecesJustificatifsSauvegardeeDtos?: IPiecesJustificativesSauvegardeesDto[];
}

interface IDetailsPersonnesSauvegardeesDto {
  idPersonne: string;
  role: string;
}

interface IPiecesJustificativesSauvegardeesDto {
  idPersonne: string;
  nom: string | null;
  prenom: string | null;
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

export function useSauvegardeRMCApiHook(params?: ISauvegardeRMCApiHookParams): ISauvegardeRMCApiHookResultat | undefined {
  const [resultat, setResultat] = useState<ISauvegardeRMCApiHookResultat>();
  useEffect(() => {
    if (params) {
      postSauvegardePersonneEtActeSelectionne(params.idRequete, mapPersonneEtActeSelectionne(params))
        .then(res => {
          setResultat({ estValide: true });
          messageManager.showSuccessAndClose("Enregistrement effectué avec succès !");
        })
        .catch(error => {
          logError({
            messageUtilisateur: "Impossible de sauvegarder la selection des actes et des personnes",
            error
          });
          setResultat({ estValide: false });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return resultat;
}

function mapPersonneEtActeSelectionne(params: ISauvegardeRMCApiHookParams): ISauvegardePersonneEtActeSelectionneDto {
  const personnes = params.dataPersonnesSelectionnees.reduce<IDetailsPersonnesSauvegardeesDto[]>((res, personne) => {
    const role = RolePersonneSauvegardee.getEnumFromLibelle(personne.role);
    if (role) {
      res.push({
        idPersonne: personne.idPersonne,
        role: role.nom
      });
    }
    return res;
  }, []);

  const acteEtInscription = params.dataActesInscriptionsSelectionnes.map(
    (acteOuInscription, index): IPiecesJustificativesSauvegardeesDto => {
      return {
        idPersonne: acteOuInscription.idPersonne,
        nom: acteOuInscription.nom ?? null,
        prenom: acteOuInscription.prenoms?.split(",")[0] ?? null,
        idNomenclature: TypePieceJustificative.depuisLibelle(acteOuInscription.typePJ ?? "")?.id ?? "",
        idActe: estActe(acteOuInscription.nature) ? acteOuInscription.idActeInscription : null,
        idRCA: getRCAOuRCOuPACS(acteOuInscription.reference) === "RCA" ? acteOuInscription.idActeInscription : null,
        idRC: getRCAOuRCOuPACS(acteOuInscription.reference) === "RC" ? acteOuInscription.idActeInscription : null,
        idPACS: getRCAOuRCOuPACS(acteOuInscription.reference) === "PACS" ? acteOuInscription.idActeInscription : null,
        nature: mapNatureActeOuInscription(acteOuInscription.nature, acteOuInscription.reference),
        reference: acteOuInscription.reference ?? ""
      };
    }
  );
  return {
    personneSauvegardeeDtos: personnes,
    piecesJustificatifsSauvegardeeDtos: acteEtInscription
  };
}

const mapNatureActeOuInscription = (nature?: string, reference?: string): string | NatureActeEtinscription | undefined => {
  if (nature && estActe(nature)) {
    const natureEnum = NatureActeRequete.getEnumFromLibelle(nature);
    return natureEnum?.nom;
  }

  return getRCAOuRCOuPACS(reference);
};

const estActe = (nature?: string): boolean => {
  if (!nature) return false;
  const natureActe = nature
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return ["naissance", "deces", "mariage"].includes(natureActe);
};

const getRCAOuRCOuPACS = (reference?: string): NatureActeEtinscription | undefined => {
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
