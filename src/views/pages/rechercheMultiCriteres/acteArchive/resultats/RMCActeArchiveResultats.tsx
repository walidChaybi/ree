import { IResultatRMCActe } from "@model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IParamsTableau } from "@util/GestionDesLiensApi";
import { getLibelle } from "@util/Utils";
import { Fieldset } from "@widget/fieldset/Fieldset";
import {
  NB_LIGNES_PAR_APPEL_ACTE,
  NB_LIGNES_PAR_PAGE_ACTE
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import React from "react";
import { RMCTableauActes } from "../../acteInscription/resultats/RMCTableauActes";
import "../scss/RMCActeArchiveResultats.scss";

export interface RMCActeArchiveResultatsProps {
  dataRMCActeArchive: IResultatRMCActe[];
  dataTableauRMCActeArchive: IParamsTableau;
  setRangeActeArchive?: (range: string) => void;
  resetRMC?: boolean;
  nbLignesParAppel: number;
  nbLignesParPage: number;
  // Données propre à une fiche Acte pour sa pagination/navigation
  getLignesSuivantesOuPrecedentesActe?: (
    ficheIdentifiant: string,
    lien: string
  ) => void;
  idFicheActe?: string;
  dataRMCFicheActe?: IResultatRMCActe[];
  dataTableauRMCFicheActe?: IParamsTableau;
}

export const RMCActeArchiveResultats: React.FC<
  RMCActeArchiveResultatsProps
> = props => {
  return (
    <div className="ResultatsRMC">
      <Fieldset titre={getLibelle("Résultats de la recherche multi-critères")}>
        <div className="SubResultatsRMC">
          <div className="SousTitre">
            <span>
              {getLibelle("Recherche dans les registres d'état civil")}
            </span>
          </div>
          {props.dataRMCActeArchive.length > 0 ? (
            <RMCTableauActes
              typeRMC="Classique"
              ajoutAlertePossible={false}
              dataRMCActe={props.dataRMCActeArchive}
              dataTableauRMCActe={props.dataTableauRMCActeArchive}
              setRangeActe={props.setRangeActeArchive}
              resetTableauActe={props.resetRMC}
              nbLignesParAppel={NB_LIGNES_PAR_APPEL_ACTE}
              nbLignesParPage={NB_LIGNES_PAR_PAGE_ACTE}
              getLignesSuivantesOuPrecedentesActe={
                props.getLignesSuivantesOuPrecedentesActe
              }
              idFicheActe={props.idFicheActe}
              dataRMCFicheActe={props.dataRMCFicheActe}
              dataTableauRMCFicheActe={props.dataTableauRMCFicheActe}
            />
          ) : (
            <div className="AucunResultat">
              {getLibelle("Aucun acte trouvé pour ces critères de recherche")}
            </div>
          )}
        </div>
      </Fieldset>
    </div>
  );
};
