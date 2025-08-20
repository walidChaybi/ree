import React from "react";
import { MdArrowUpward, MdChevronLeft, MdChevronRight, MdReport } from "react-icons/md";
import Bouton from "../bouton/Bouton";

export type TSensTri = "ASC" | "DESC";

interface IParametresPagination {
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
    | ({ cle: string; onClick?: () => void } & {
        [cleCollone: string]: string | number | boolean | React.JSX.Element | undefined;
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
  const premiereLigne = infoPagination.pageActuelle * infoPagination.lignesParPage + 1;
  const derniereLigne = (infoPagination.pageActuelle + 1) * infoPagination.lignesParPage;

  return `${premiereLigne}-${
    derniereLigne > infoPagination.totalLignes ? infoPagination.totalLignes : derniereLigne
  } sur ${infoPagination.totalLignes}`;
};

const pasDePageSuivante = (infoPagination: IParametresPagination) =>
  (infoPagination.pageActuelle + 1) * infoPagination.lignesParPage >= infoPagination.totalLignes;

const Tableau: React.FC<ITableauProps> = ({ enTetes, lignes, messageAucuneLigne, onClickLigne, parametresTri, parametresPagination }) =>
  lignes ? (
    <>
      <table className="min-w-full border-spacing-0 rounded-t-xl border border-solid border-gris-sombre text-sm shadow-lg">
        <thead className="">
          <tr>
            {enTetes.map(enTete => (
              <th
                key={enTete.cle}
                className="text-center first:text-left"
              >
                {enTete.triable && parametresTri ? (
                  <Bouton
                    key={enTete.cle}
                    title={`Trier par ${enTete.libelle.toLowerCase()}`}
                    aria-label={`Trier par ${enTete.libelle.toLowerCase()}`}
                    className="relative border-none bg-transparent text-bleu hover:bg-transparent focus:bg-transparent"
                    onClick={() => {
                      if (!parametresTri) return;
                      parametresTri.onChangeTri(
                        enTete.cle,
                        enTete.cle === parametresTri.cle && parametresTri.sens === "ASC" ? "DESC" : "ASC"
                      );
                    }}
                  >
                    <span className="text-sm normal-case underline">{enTete.libelle}</span>
                    <MdArrowUpward
                      fontSize="inherit"
                      className={`absolute -right-1 top-1/2 -translate-y-1/2 ${
                        enTete.cle !== parametresTri?.cle ? "opacity-0" : ""
                      } ${parametresTri?.sens === "DESC" ? "rotate-180" : ""}`}
                    />
                  </Bouton>
                ) : (
                  <span
                    key={enTete.cle}
                    className="font-marianne-bold px-4 text-bleu"
                  >
                    {enTete.libelle}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {lignes.length
            ? lignes.map(ligne => (
                <LigneTableau
                  ligne={ligne}
                  enTetes={enTetes}
                  key={ligne.cle}
                />
              ))
            : messageAucuneLigne && (
                <MessageAucuneLigne
                  message={messageAucuneLigne}
                  colSpan={enTetes.length}
                />
              )}
        </tbody>
      </table>

      {parametresPagination && (
        <div className="mt-4 flex items-center justify-end gap-4">
          <span className="text-gris">{libellePagination(parametresPagination)}</span>
          <button
            type="button"
            onClick={() => parametresPagination.onChangePage(false)}
            disabled={!parametresPagination.pageActuelle}
            title="Page précédente"
            aria-label="Page précédente"
            className="m-0 min-w-0 p-0 text-gris hover:text-bleu-sombre disabled:bg-transparent disabled:text-gris"
          >
            <MdChevronLeft
              className="text-xl"
              aria-hidden
            />
          </button>
          <button
            type="button"
            onClick={() => parametresPagination.onChangePage(true)}
            disabled={pasDePageSuivante(parametresPagination)}
            title="Page suivante"
            aria-label="Page suivante"
            className="m-0 min-w-0 p-0 text-gris-sombre hover:text-bleu-sombre disabled:bg-transparent disabled:text-gris"
          >
            <MdChevronRight
              className="text-xl"
              aria-hidden
            />
          </button>
        </div>
      )}
    </>
  ) : (
    <></>
  );

type TDonneesLigne = {
  [cleColonne: string]: string | number | boolean | React.JSX.Element | undefined;
};

type TLigneTableau = TDonneesLigne & {
  cle: string;
  onClick?: () => void;
};

const LigneTableau: React.FC<{ ligne: TLigneTableau; enTetes: IEnTeteTableau[] }> = ({ ligne, enTetes }) => (
  <tr
    className={`${ligne.onClick ? "cursor-pointer text-left hover:bg-bleu/50" : ""} odd:bg-bleu/15`}
    onClick={() => ligne.onClick?.()}
  >
    {enTetes.map(enTete => (
      <td
        key={`${ligne.cle}-${enTete.cle}`}
        className="px-4 py-1.5 text-center first:text-left"
      >
        {ligne[enTete.cle]}
      </td>
    ))}
  </tr>
);

const MessageAucuneLigne: React.FC<{ message: string; colSpan: number }> = ({ message, colSpan }) => (
  <tr>
    <td
      colSpan={colSpan}
      className="py-2"
    >
      <div className="flex flex-col items-center">
        <MdReport
          className="text-2xl"
          aria-hidden
        />
        <div>{message}</div>
      </div>
    </td>
  </tr>
);

export default Tableau;
