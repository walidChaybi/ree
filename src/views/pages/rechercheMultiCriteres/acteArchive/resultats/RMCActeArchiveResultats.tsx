import { ResultatRMCActe } from "@model/rmc/acteInscription/resultat/ResultatRMCActe";
import { IParamsTableau } from "@util/GestionDesLiensApi";

import { Fieldset } from "@widget/fieldset/Fieldset";
import { NB_LIGNES_PAR_APPEL_ACTE, NB_LIGNES_PAR_PAGE_ACTE } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import React from "react";
import { RMCTableauActes } from "../../acteInscription/resultats/RMCTableauActes";
import "../scss/RMCActeArchiveResultats.scss";

interface RMCActeArchiveResultatsProps {
  dataRMCActeArchive: ResultatRMCActe[];
  dataTableauRMCActeArchive: IParamsTableau;
  setRangeActeArchive?: (range: string) => void;
  resetRMC?: boolean;
  nbLignesParAppel: number;
  nbLignesParPage: number;
  // Données propre à une fiche Acte pour sa pagination/navigation
  getLignesSuivantesOuPrecedentesActe?: (ficheIdentifiant: string, lien: string) => void;
  idFicheActe?: string;
  dataRMCFicheActe?: ResultatRMCActe[];
  dataTableauRMCFicheActe?: IParamsTableau;
}

export const RMCActeArchiveResultats: React.FC<RMCActeArchiveResultatsProps> = props => {
  return (
    <div className="ResultatsRMC">
      <Fieldset titre={"Résultats de la recherche multi-critères"}>
        <div className="SubResultatsRMC">
          <div className="SousTitre">
            <span>{"Recherche dans les registres d'état civil"}</span>
          </div>
          {props.dataRMCActeArchive.length > 0 ? (
            <RMCTableauActes
              typeRMC="Classique"
              dataRMCActe={props.dataRMCActeArchive}
              dataTableauRMCActe={props.dataTableauRMCActeArchive}
              setRangeActe={props.setRangeActeArchive}
              resetTableauActe={props.resetRMC}
              nbLignesParAppel={NB_LIGNES_PAR_APPEL_ACTE}
              nbLignesParPage={NB_LIGNES_PAR_PAGE_ACTE}
              getLignesSuivantesOuPrecedentesActe={props.getLignesSuivantesOuPrecedentesActe}
              idFicheActe={props.idFicheActe}
              dataRMCFicheActe={props.dataRMCFicheActe}
              dataTableauRMCFicheActe={props.dataTableauRMCFicheActe}
            />
          ) : (
            <div className="AucunResultat">{"Aucun acte trouvé pour ces critères de recherche"}</div>
          )}
        </div>
      </Fieldset>
    </div>
  );
};
