import { UtilisateurConnecte } from "@model/agent/Utilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { Perimetre } from "@model/agent/enum/Perimetre";
import { ESousTypeCreation, SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { ELibelleSousTypeRequete, TSousTypeRequete } from "@model/requete/enum/SousTypeRequete";
import { ETypeRequete, TypeRequete } from "@model/requete/enum/TypeRequete";
import { ICriteresRMCRequete } from "@model/rmc/requete/ICriteresRMCRequete";
import { IRMCRequeteForm } from "@model/rmc/requete/IRMCRequete";
import { TRequeteAssociee } from "@model/rmc/requete/RequeteAssociee";
import { IParamsTableau } from "@util/GestionDesLiensApi";
import { RenderMessageZeroRequete } from "@util/tableauRequete/TableauRequeteUtils";
import {
  NB_LIGNES_PAR_APPEL_REQUETE_ASSOCIEES,
  NB_LIGNES_PAR_PAGE_REQUETE_ASSOCIEES
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import React, { useCallback, useContext, useState } from "react";
import FenetreExterne from "../../../../../composants/commun/conteneurs/FenetreExterne";
import { RECEContextData } from "../../../../../contexts/RECEContextProvider";
import { ApercuRequeteEtablissementSimplePage } from "../../../requeteCreation/apercuRequete/etablissement/apercuSimple/ApercuRequeteEtablissementSimplePage";
import { ApercuReqCreationTranscriptionSimplePage } from "../../../requeteCreation/apercuRequete/transcription/ApercuReqCreationTranscriptionSimplePage";
import { ApercuRequetePage } from "../../../requeteDelivrance/apercuRequete/apercuRequete/ApercuRequetePage";
import { ApercuReqInfoPage } from "../../../requeteInformation/apercuRequeteInformation/ApercuReqInfoPage";
import { goToLinkRMC } from "../../acteInscription/resultats/RMCTableauCommun";
import { BoutonNouvelleRMCRequete } from "../contenu/BoutonNouvelleRMCRequete";
import { columnsTableauRequeteAssociees } from "./RMCTableauRequetesAssocieesParams";

const width = 1100;
const height = 600;

interface IRMCTableauRequetesAssocieesProps {
  dataRMCRequete: TRequeteAssociee[];
  dataTableauRMCRequete: IParamsTableau;
  setRangeRequete: (range: string) => void;
  setValuesRMCRequete: React.Dispatch<React.SetStateAction<IRMCRequeteForm<keyof typeof ETypeRequete | ""> | null>>;
  setCriteresRechercheRequete: React.Dispatch<React.SetStateAction<ICriteresRMCRequete | undefined>>;
}

interface IInfoRequeteSelectionnee {
  idRequete: string;
  numeroFonctionnel?: string;
  type: string;
  sousType: string;
}

export const RMCTableauRequetesAssociees: React.FC<IRMCTableauRequetesAssocieesProps> = ({
  dataRMCRequete,
  dataTableauRMCRequete,
  setRangeRequete,
  setValuesRMCRequete,
  setCriteresRechercheRequete
}) => {
  const { utilisateurConnecte } = useContext(RECEContextData);
  // Gestion du tableau
  const [requeteSelectionnee, setRequeteSelectionnee] = useState<IInfoRequeteSelectionnee>();

  const goToLink = useCallback(
    (link: string) => {
      const range = goToLinkRMC(link);
      if (range && setRangeRequete) {
        setRangeRequete(range);
      }
    },
    [setRangeRequete]
  );

  const onClose = () => {
    setRequeteSelectionnee(undefined);
  };

  const onClickOnLine = (idRequete: string, data: TRequeteAssociee[], idx: number) => {
    const requeteCliquee = data[idx];
    const utilisateurPeutOuvrirLaRequete = utilisateurADroitOuvrirRequete(
      requeteCliquee.type ?? "",
      requeteCliquee.sousType,
      utilisateurConnecte
    );
    if (utilisateurPeutOuvrirLaRequete) {
      setRequeteSelectionnee({
        idRequete: requeteCliquee.id,
        numeroFonctionnel: requeteCliquee.numero,
        type: ETypeRequete[requeteCliquee.type],
        sousType: ELibelleSousTypeRequete[requeteCliquee.sousType].court
      });
    }
  };

  return (
    <>
      <TableauRece
        idKey={"idRequete"}
        onClickOnLine={onClickOnLine}
        columnHeaders={columnsTableauRequeteAssociees}
        dataState={dataRMCRequete}
        paramsTableau={dataTableauRMCRequete}
        goToLink={goToLink}
        messageAucunResultat={RenderMessageZeroRequete()}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_REQUETE_ASSOCIEES}
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_REQUETE_ASSOCIEES}
      >
        <BoutonNouvelleRMCRequete
          setValuesRMCRequete={setValuesRMCRequete}
          setCriteresRechercheRequete={setCriteresRechercheRequete}
        />
      </TableauRece>
      {requeteSelectionnee && (
        <FenetreExterne
          titre={`Détails requête : N°${requeteSelectionnee.numeroFonctionnel}`}
          apresFermeture={onClose}
          hauteur={height}
          largeur={width}
        >
          {getApercuRequeteSimple(requeteSelectionnee)}
        </FenetreExterne>
      )}
    </>
  );
};

const utilisateurADroitOuvrirRequete = <TTypeRequete extends keyof typeof ETypeRequete>(
  typeRequete: string | TTypeRequete,
  sousTypeRequete: string | TSousTypeRequete<TTypeRequete>,
  utilisateurConnecte: UtilisateurConnecte
): boolean => {
  switch (typeRequete) {
    case TypeRequete.DELIVRANCE.libelle:
    case "DELIVRANCE":
      return utilisateurConnecte.estHabilitePour({ leDroit: Droit.DELIVRER });
    case TypeRequete.CREATION.libelle:
    case "CREATION":
      return (() => {
        const sousTypeCreation = SousTypeCreation.getEnumFromLibelleCourt(sousTypeRequete);

        switch (true) {
          case sousTypeCreation === SousTypeCreation.RCEXR || (sousTypeRequete as ESousTypeCreation) === ESousTypeCreation.RCEXR:
            return utilisateurConnecte.estHabilitePour({
              leDroit: Droit.CREER_ACTE_ETABLI,
              surUnDesPerimetres: [Perimetre.TOUS_REGISTRES, Perimetre.ETAX]
            });
          case [SousTypeCreation.RCTD, SousTypeCreation.RCTC].includes(sousTypeCreation) ||
            [ESousTypeCreation.RCTD, ESousTypeCreation.RCTC].includes(sousTypeRequete as ESousTypeCreation):
            return utilisateurConnecte.estHabilitePour({ leDroit: Droit.TRANSCRIPTION_CREER_PROJET_ACTE });
          default:
            return false;
        }
      })();
    case TypeRequete.INFORMATION.libelle:
    case "INFORMATION":
      return utilisateurConnecte.estHabilitePour({ leDroit: Droit.INFORMER_USAGER });
    default:
      return false;
  }
};

const getApercuRequeteSimple = (requeteSelectionnee: IInfoRequeteSelectionnee): JSX.Element => {
  switch (requeteSelectionnee.type) {
    case TypeRequete.DELIVRANCE.libelle:
      return <ApercuRequetePage idRequeteAAfficher={requeteSelectionnee?.idRequete} />;
    case TypeRequete.CREATION.libelle:
      return getApercuRequeteEtablissementOuTranscription(requeteSelectionnee);
    case TypeRequete.INFORMATION.libelle:
      return <ApercuReqInfoPage idRequeteAAfficher={requeteSelectionnee?.idRequete} />;
    default:
      return <></>;
  }
};

const getApercuRequeteEtablissementOuTranscription = (requeteSelectionnee: IInfoRequeteSelectionnee): JSX.Element => {
  switch (SousTypeCreation.getEnumFromLibelleCourt(requeteSelectionnee.sousType)) {
    case SousTypeCreation.RCEXR:
      return <ApercuRequeteEtablissementSimplePage idRequeteAAfficher={requeteSelectionnee.idRequete} />;
    case SousTypeCreation.RCTD:
    case SousTypeCreation.RCTC:
      return <ApercuReqCreationTranscriptionSimplePage idRequeteAAfficher={requeteSelectionnee.idRequete} />;
    default:
      return <></>;
  }
};
