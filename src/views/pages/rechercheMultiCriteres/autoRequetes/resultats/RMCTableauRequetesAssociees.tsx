import { RECEContextData } from "@core/contexts/RECEContext";
import { UtilisateurConnecte } from "@model/agent/Utilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { Perimetre } from "@model/agent/enum/Perimetre";
import { ESousTypeCreation, SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { ELibelleSousTypeRequete, TSousTypeRequete } from "@model/requete/enum/SousTypeRequete";
import { ETypeRequete, TypeRequete } from "@model/requete/enum/TypeRequete";
import { ICriteresRMCRequete } from "@model/rmc/requete/ICriteresRMCRequete";
import { IRMCRequeteForm } from "@model/rmc/requete/IRMCRequete";
import { TRequeteAssociee } from "@model/rmc/requete/RequeteAssociee";
import { ApercuRequeteEtablissementSimplePage } from "@pages/requeteCreation/apercuRequete/etablissement/apercuSimple/ApercuRequeteEtablissementSimplePage";
import { ApercuReqCreationTranscriptionSimplePage } from "@pages/requeteCreation/apercuRequete/transcription/ApercuReqCreationTranscriptionSimplePage";
import { ApercuRequetePage } from "@pages/requeteDelivrance/apercuRequete/apercuRequete/ApercuRequetePage";
import { ApercuReqInfoPage } from "@pages/requeteInformation/apercuRequeteInformation/ApercuReqInfoPage";
import { FenetreExterne } from "@util/FenetreExterne";
import { IParamsTableau } from "@util/GestionDesLiensApi";
import { RenderMessageZeroRequete } from "@util/tableauRequete/TableauRequeteUtils";
import {
  NB_LIGNES_PAR_APPEL_REQUETE_ASSOCIEES,
  NB_LIGNES_PAR_PAGE_REQUETE_ASSOCIEES
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import React, { useCallback, useContext, useState } from "react";
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

export interface IInfoRequeteSelectionnee {
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
  const [nouvelleRMCRequete, setNouvelleRMCRequete] = useState<boolean>(false);

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
        resetTableau={nouvelleRMCRequete}
        noRows={RenderMessageZeroRequete()}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_REQUETE_ASSOCIEES}
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_REQUETE_ASSOCIEES}
      >
        <BoutonNouvelleRMCRequete
          setNouvelleRMCRequete={setNouvelleRMCRequete}
          setValuesRMCRequete={setValuesRMCRequete}
          setCriteresRechercheRequete={setCriteresRechercheRequete}
        />
      </TableauRece>
      {requeteSelectionnee && (
        <FenetreExterne
          titre={`Détails requête : N°${requeteSelectionnee.numeroFonctionnel}`}
          onCloseHandler={onClose}
          height={height}
          width={width}
        >
          {getApercuRequeteSimple(requeteSelectionnee)}
        </FenetreExterne>
      )}
    </>
  );
};

export const utilisateurADroitOuvrirRequete = <TTypeRequete extends keyof typeof ETypeRequete>(
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
            return utilisateurConnecte.estHabilitePour({ leDroit: Droit.CREER_ACTE_TRANSCRIT });
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

export const getApercuRequeteEtablissementOuTranscription = (requeteSelectionnee: IInfoRequeteSelectionnee): JSX.Element => {
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
