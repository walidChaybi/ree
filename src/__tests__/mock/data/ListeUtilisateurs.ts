import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { Utilisateur } from "@model/agent/Utilisateur";
import { Droit } from "@model/agent/enum/Droit";

export const LISTE_UTILISATEURS: Utilisateur[] = Array.from({ length: 4 }, (index: number) =>
  MockUtilisateurBuilder.utilisateur({ idUtilisateur: `idUtilisateur${index + 1}`, prenom: `prenom${index + 1}`, nom: `NOM${index + 1}` })
    .avecAttributs({ idService: "idService", estDuSCEC: true })
    .avecDroits([Droit.DELIVRER, Droit.ATTRIBUER_REQUETE, Droit.CONSULTER, Droit.INFORMER_USAGER])
    .generer()
);
