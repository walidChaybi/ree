import { IAlerte } from "@model/etatcivil/fiche/IAlerte";
import { TRequete } from "@model/requete/IRequete";
import { IResultatRMCInscription } from "@model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { ResultatRMCActe } from "@model/rmc/acteInscription/resultat/ResultatRMCActe";
import { IParamsTableau } from "@util/GestionDesLiensApi";
import { Fieldset } from "@widget/fieldset/Fieldset";
import { TChangeEventSurHTMLInputElement } from "@widget/tableau/TableauRece/colonneElements/IColonneElementsParams";
import { forwardRef } from "react";
import "../scss/RMCActeInscriptionResultats.scss";
import { RMCTableauActes } from "./RMCTableauActes";
import { TypeRMC } from "./RMCTableauCommun";
import { RMCTableauInscriptions } from "./RMCTableauInscriptions";

interface RMCActeInscriptionResultatsProps {
  typeRMC: TypeRMC;
  dataAlertes?: IAlerte[];
  dataRequete?: TRequete;
  dataRMCActe: ResultatRMCActe[];
  dataTableauRMCActe: IParamsTableau;
  dataRMCInscription: IResultatRMCInscription[];
  dataTableauRMCInscription: IParamsTableau;
  setRangeActe?: (range: string) => void;
  setRangeInscription?: (range: string) => void;
  resetRMC?: boolean;
  onClickCheckboxTableauActes?: (event: TChangeEventSurHTMLInputElement, data: ResultatRMCActe) => void;
  onClickCheckboxTableauInscriptions?: (event: TChangeEventSurHTMLInputElement, data: IResultatRMCInscription) => void;
  nbLignesParPageActe: number;
  nbLignesParAppelActe: number;
  nbLignesParPageInscription: number;
  nbLignesParAppelInscription: number;
  // Données propre à une fiche Acte pour sa pagination/navigation
  getLignesSuivantesOuPrecedentesActe?: (ficheIdentifiant: string, lien: string) => void;
  idFicheActe?: string;
  dataRMCFicheActe?: ResultatRMCActe[];
  dataTableauRMCFicheActe?: IParamsTableau;
  // Données propre à une fiche Inscription pour sa pagination/navigation
  getLignesSuivantesOuPrecedentesInscription?: (ficheIdentifiant: string, lien: string) => void;
  idFicheInscription?: string;
  dataRMCFicheInscription?: IResultatRMCInscription[];
  dataTableauRMCFicheInscription?: IParamsTableau;
}

export const RMCActeInscriptionResultats = forwardRef<HTMLDivElement, RMCActeInscriptionResultatsProps>(
  (
    {
      typeRMC,
      dataAlertes,
      dataRequete,
      dataRMCActe,
      dataTableauRMCActe,
      dataRMCInscription,
      dataTableauRMCInscription,
      setRangeActe,
      setRangeInscription,
      resetRMC,
      onClickCheckboxTableauActes,
      onClickCheckboxTableauInscriptions,
      nbLignesParPageActe,
      nbLignesParAppelActe,
      nbLignesParPageInscription,
      nbLignesParAppelInscription,
      // Données propre à une fiche Acte pour sa pagination/navigation
      getLignesSuivantesOuPrecedentesActe,
      idFicheActe,
      dataRMCFicheActe,
      dataTableauRMCFicheActe,
      // Données propre à une fiche Inscription pour sa pagination/navigation
      getLignesSuivantesOuPrecedentesInscription,
      idFicheInscription,
      dataRMCFicheInscription,
      dataTableauRMCFicheInscription
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
            <RMCTableauActes
              typeRMC={typeRMC}
              dataRequete={dataRequete}
              dataAlertes={dataAlertes}
              dataRMCActe={dataRMCActe}
              dataTableauRMCActe={dataTableauRMCActe}
              setRangeActe={setRangeActe}
              resetTableauActe={resetRMC}
              onClickCheckboxCallBack={onClickCheckboxTableauActes}
              nbLignesParPage={nbLignesParPageActe}
              nbLignesParAppel={nbLignesParAppelActe}
              getLignesSuivantesOuPrecedentesActe={getLignesSuivantesOuPrecedentesActe}
              idFicheActe={idFicheActe}
              dataRMCFicheActe={dataRMCFicheActe}
              dataTableauRMCFicheActe={dataTableauRMCFicheActe}
            />
          </div>
          <div className="SubResultatsRMC">
            <div className="SousTitre">
              <span>{"Recherche dans les répertoires de greffe et registre des PACS des étrangers nés à l'étranger"}</span>
            </div>
            <RMCTableauInscriptions
              typeRMC={typeRMC}
              dataRequete={dataRequete}
              dataRMCInscription={dataRMCInscription}
              dataTableauRMCInscription={dataTableauRMCInscription}
              setRangeInscription={setRangeInscription}
              resetTableauInscription={resetRMC}
              onClickCheckboxCallBack={onClickCheckboxTableauInscriptions}
              nbLignesParPage={nbLignesParPageInscription}
              nbLignesParAppel={nbLignesParAppelInscription}
              getLignesSuivantesOuPrecedentesInscription={getLignesSuivantesOuPrecedentesInscription}
              idFicheInscription={idFicheInscription}
              dataRMCFicheInscription={dataRMCFicheInscription}
              dataTableauRMCFicheInscription={dataTableauRMCFicheInscription}
            />
          </div>
        </Fieldset>
      </div>
    );
  }
);
