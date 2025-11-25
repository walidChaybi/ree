import { Droit } from "@model/agent/enum/Droit";
import { Perimetre } from "@model/agent/enum/Perimetre";
import { UtilisateurConnecte } from "@model/agent/Utilisateur";
import { ESousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { ELibelleSousTypeRequete } from "@model/requete/enum/SousTypeRequete";
import { TRequeteAssociee } from "@model/rmc/requete/RequeteAssociee";
import { TitulaireRequeteAssociee } from "@model/rmc/requete/TitulaireRequeteAssociee";
import { NB_LIGNES_PAR_APPEL_REQUETE_ASSOCIEES } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { useCallback, useContext, useState } from "react";
import { IParametresRecherche, TLigneTableau } from "../../../composants/commun/tableau/Tableau";
import { RECEContextData } from "../../../contexts/RECEContextProvider";

const verifierDroitUtilisateurOuvrirRequeteTypeCreation = (requeteAssociee: TRequeteAssociee, utilisateurConnecte: UtilisateurConnecte) => {
  switch (requeteAssociee.sousType) {
    case ESousTypeCreation.RCEXR:
      return utilisateurConnecte.estHabilitePour({
        leDroit: Droit.CREER_ACTE_ETABLI,
        surUnDesPerimetres: [Perimetre.TOUS_REGISTRES, Perimetre.ETAX]
      });
    case ESousTypeCreation.RCTD:
    case ESousTypeCreation.RCTC:
      return utilisateurConnecte.estHabilitePour({ leDroit: Droit.TRANSCRIPTION_CREER_PROJET_ACTE });
    default:
      return false;
  }
};

const verifierDroitUtilisateurOuvrirRequete = (requeteAssociee: TRequeteAssociee, utilisateurConnecte: UtilisateurConnecte): boolean => {
  switch (requeteAssociee.type) {
    case "DELIVRANCE":
      return utilisateurConnecte.estHabilitePour({ leDroit: Droit.DELIVRER });
    case "CREATION":
      return verifierDroitUtilisateurOuvrirRequeteTypeCreation(requeteAssociee, utilisateurConnecte);
    case "INFORMATION":
      return utilisateurConnecte.estHabilitePour({ leDroit: Droit.INFORMER_USAGER });
    default:
      return false;
  }
};

export const useTableauRMCRequetesAssociees = () => {
  const { utilisateurConnecte } = useContext(RECEContextData);
  const [requeteSelectionnee, setRequeteSelectionnee] = useState<TRequeteAssociee | null>(null);
  const [parametresRecherche, setParametresRecherche] = useState<IParametresRecherche>({
    tri: "titulaires",
    sens: "ASC",
    range: `0-${NB_LIGNES_PAR_APPEL_REQUETE_ASSOCIEES}`
  });

  const onFermetureFenetreExterne = () => {
    setRequeteSelectionnee(null);
  };

  const mapRequetesAssocieesCommeLignesTableau = useCallback(
    (
      requetesAssociees: TRequeteAssociee[],
      RenderCelluleTitulaires: (titulaires: TitulaireRequeteAssociee[]) => JSX.Element
    ): TLigneTableau[] =>
      requetesAssociees.map(requeteAssociee => ({
        cle: requeteAssociee.id ?? "",
        donnees: {
          titulaires: RenderCelluleTitulaires(requeteAssociee.titulaires),
          libelleSousTypeCourt: ELibelleSousTypeRequete[requeteAssociee.sousType].court ?? "",
          dateCreation: requeteAssociee.dateCreation ?? "",
          statut: requeteAssociee.statut ?? ""
        },
        onClick: () => {
          if (verifierDroitUtilisateurOuvrirRequete(requeteAssociee, utilisateurConnecte)) {
            setRequeteSelectionnee(requeteAssociee);
          }
        }
      })),
    [setRequeteSelectionnee]
  );

  return {
    requeteSelectionnee,
    parametresRecherche,
    setParametresRecherche,
    mapRequetesAssocieesCommeLignesTableau,
    onFermetureFenetreExterne
  };
};
