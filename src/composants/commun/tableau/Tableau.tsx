import ArrowUpward from "@mui/icons-material/ArrowUpward";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Report from "@mui/icons-material/Report";
import { UN } from "@util/Utils";
import React from "react";
import "./Tableau.scss";

export type TSensTri = "ASC" | "DESC";

export interface IParametresPagination {
  pageActuelle: number;
  lignesParPage: number;
  totalLignes: number;
}

export interface IEnTeteTableau {
  cle: string;
  libelle: string;
  triable?: boolean;
}

interface ITableauProps {
  enTetes: IEnTeteTableau[];
  lignes:
    | ({ cle: string } & {
        [cleCollone: string]:
          | string
          | number
          | boolean
          | JSX.Element
          | undefined;
      })[]
    | undefined;
  messageAucuneLigne?: string;
  onClickLigne?: (cle: string) => void;
  parametresTri?: {
    cle: string;
    sens: TSensTri;
    onChangeTri: (cle: string, sens: TSensTri) => void;
  };
  parametresPagination?: IParametresPagination & {
    onChangePage: (pageSuivante: boolean) => void;
  };
}

const libellePagination = (infoPagination: IParametresPagination) => {
  const premiereLigne =
    infoPagination.pageActuelle * infoPagination.lignesParPage + UN;
  const derniereLigne =
    (infoPagination.pageActuelle + UN) * infoPagination.lignesParPage;

  return `${premiereLigne}-${
    derniereLigne > infoPagination.totalLignes
      ? infoPagination.totalLignes
      : derniereLigne
  } sur ${infoPagination.totalLignes}`;
};

const pasDePageSuivante = (infoPagination: IParametresPagination) =>
  (infoPagination.pageActuelle + UN) * infoPagination.lignesParPage >=
  infoPagination.totalLignes;

const Tableau: React.FC<ITableauProps> = ({
  enTetes,
  lignes,
  messageAucuneLigne,
  onClickLigne,
  parametresTri,
  parametresPagination
}) =>
  lignes ? (
    <>
      <table className="tableau">
        <thead>
          <tr>
            {enTetes.map(enTete => (
              <th key={enTete.cle}>
                {enTete.triable && parametresTri ? (
                  <button
                    key={enTete.cle}
                    type="button"
                    title={`Trier par ${enTete.libelle.toLowerCase()}`}
                    onClick={() => {
                      if (!parametresTri) {
                        return;
                      }

                      parametresTri.onChangeTri(
                        enTete.cle,
                        enTete.cle === parametresTri.cle &&
                          parametresTri.sens === "ASC"
                          ? "DESC"
                          : "ASC"
                      );
                    }}
                  >
                    <span>{enTete.libelle}</span>
                    {enTete.cle === parametresTri?.cle && (
                      <ArrowUpward
                        {...(parametresTri.sens === "DESC"
                          ? { className: "sens-desc" }
                          : {})}
                      />
                    )}
                  </button>
                ) : (
                  <span key={enTete.cle}>{enTete.libelle}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lignes.length
            ? lignes.map(ligne => (
                <tr
                  key={ligne.cle}
                  {...(onClickLigne
                    ? {
                        className: "ligne-clickable",
                        onClick: () => onClickLigne(ligne.cle)
                      }
                    : {})}
                >
                  {enTetes.map(enTete => (
                    <td key={`${ligne.cle}-${enTete.cle}`}>
                      {ligne[enTete.cle]}
                    </td>
                  ))}
                </tr>
              ))
            : messageAucuneLigne && (
                <tr className="tableau-sans-ligne">
                  <td colSpan={enTetes.length}>
                    <Report />
                    <div>{messageAucuneLigne}</div>
                  </td>
                </tr>
              )}
        </tbody>
      </table>

      {parametresPagination && (
        <div className="conteneur-pagination-tableau">
          <span>{libellePagination(parametresPagination)}</span>
          <button
            type="button"
            onClick={() => parametresPagination.onChangePage(false)}
            disabled={!parametresPagination.pageActuelle}
            title="Page précédente"
          >
            <ChevronLeft fontSize="large" />
          </button>
          <button
            type="button"
            onClick={() => parametresPagination.onChangePage(true)}
            disabled={pasDePageSuivante(parametresPagination)}
            title="Page suivante"
          >
            <ChevronRight fontSize="large" />
          </button>
        </div>
      )}
    </>
  ) : (
    <></>
  );

export default Tableau;
