import { IAlerte } from "@model/etatcivil/fiche/IAlerte";
import { TRequete } from "@model/requete/IRequete";
import { ResultatRMCActe } from "@model/rmc/acteInscription/resultat/ResultatRMCActe";
import { TResultatRMCInscription } from "@model/rmc/acteInscription/resultat/ResultatRMCInscription";
import { IParamsTableau } from "@util/GestionDesLiensApi";
import { Fieldset } from "@widget/fieldset/Fieldset";
import { TChangeEventSurHTMLInputElement } from "@widget/tableau/TableauRece/colonneElements/IColonneElementsParams";
import { forwardRef } from "react";
import PageChargeur from "../../../../../composants/commun/chargeurs/PageChargeur";
import "../scss/RMCActeInscriptionResultats.scss";
import { RMCTableauActes } from "./RMCTableauActes";
import { TypeRMC } from "./RMCTableauCommun";
import { RMCTableauInscriptions } from "./RMCTableauInscriptions";

interface IRMCActeInscriptionResultatsProps {
  typeRMC: TypeRMC;
  dataAlertes?: IAlerte[];
  dataRequete?: TRequete;
  dataRMCActe: ResultatRMCActe[];
  dataTableauRMCActe: IParamsTableau;
  dataRMCInscription: TResultatRMCInscription[];
  dataTableauRMCInscription: IParamsTableau;
  resetRMC?: boolean;
  onClickCheckboxTableauActes?: (event: TChangeEventSurHTMLInputElement, data: ResultatRMCActe) => void;
  onClickCheckboxTableauInscriptions?: (event: TChangeEventSurHTMLInputElement, data: TResultatRMCInscription) => void;
  nbLignesParPageActe: number;
  nbLignesParAppelActe: number;
  nbLignesParPageInscription: number;
  nbLignesParAppelInscription: number;
  rmcActeEnCours: boolean;
  rmcInscriptionEnCours: boolean;
}

export const RMCActeInscriptionResultats = forwardRef<HTMLDivElement, IRMCActeInscriptionResultatsProps>(
  (
    {
      typeRMC,
      dataAlertes,
      dataRequete,
      dataRMCActe,
      dataTableauRMCActe,
      dataRMCInscription,
      dataTableauRMCInscription,
      resetRMC,
      onClickCheckboxTableauActes,
      onClickCheckboxTableauInscriptions,
      nbLignesParPageActe,
      nbLignesParAppelActe,
      nbLignesParPageInscription,
      nbLignesParAppelInscription,
      rmcActeEnCours,
      rmcInscriptionEnCours
    },
    refTableau
  ) => {
    return (
      <div
        className={`ResultatsRMC${typeRMC}`}
        ref={refTableau}
      >
        <Fieldset titre={"Résultats de la recherche multi-critères"}>
          <div className="SubResultatsRMC">
            <div className="SousTitre">
              <span>{"Recherche dans les registres d'état civil"}</span>
            </div>
            {rmcActeEnCours ? (
              <PageChargeur />
            ) : (
              <RMCTableauActes
                typeRMC={typeRMC}
                dataRequete={dataRequete}
                dataAlertes={dataAlertes}
                dataRMCActe={dataRMCActe}
                dataTableauRMCActe={dataTableauRMCActe}
                resetTableauActe={resetRMC}
                onClickCheckboxCallBack={onClickCheckboxTableauActes}
                nbLignesParPage={nbLignesParPageActe}
                nbLignesParAppel={nbLignesParAppelActe}
              />
            )}
          </div>
          <div className="SubResultatsRMC">
            <div className="SousTitre">
              <span>{"Recherche dans les répertoires de greffe et registre des PACS des étrangers nés à l'étranger"}</span>
            </div>
            {rmcInscriptionEnCours ? (
              <PageChargeur />
            ) : (
              <RMCTableauInscriptions
                typeRMC={typeRMC}
                dataRequete={dataRequete}
                dataRMCInscription={dataRMCInscription}
                dataTableauRMCInscription={dataTableauRMCInscription}
                resetTableauInscription={resetRMC}
                onClickCheckboxCallBack={onClickCheckboxTableauInscriptions}
                nbLignesParPage={nbLignesParPageInscription}
                nbLignesParAppel={nbLignesParAppelInscription}
              />
            )}
          </div>
        </Fieldset>
      </div>
    );
  }
);
