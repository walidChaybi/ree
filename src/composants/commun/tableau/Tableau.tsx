import { NB_LIGNES_PAR_APPEL_DEFAUT, NB_LIGNES_PAR_PAGE_DEFAUT } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import React, { useEffect, useMemo, useState } from "react";
import { MdArrowUpward, MdChevronLeft, MdChevronRight, MdReport } from "react-icons/md";
import Bouton from "../bouton/Bouton";

type TSensTri = "ASC" | "DESC";

export interface IEnTeteTableau {
  cle: string;
  libelle: string;
  triable?: boolean;
}

export interface IParametresRecherche {
  tri: string;
  sens: TSensTri;
  range?: string;
}

interface ITableauProps {
  enTetes: IEnTeteTableau[];
  lignes: TLigneTableau[] | null;
  messageAucuneLigne?: string;
  nombreTotalLignes: number;
  nombreLignesParPage?: number;
  nombreElementsParPlage?: number;
  parametresRecherche: IParametresRecherche;
  setParametresRecherche: React.Dispatch<React.SetStateAction<IParametresRecherche>>;
}

const Tableau: React.FC<ITableauProps> = ({
  enTetes,
  lignes,
  messageAucuneLigne,
  nombreLignesParPage = NB_LIGNES_PAR_PAGE_DEFAUT,
  nombreElementsParPlage = NB_LIGNES_PAR_APPEL_DEFAUT,
  nombreTotalLignes,
  parametresRecherche,
  setParametresRecherche
}) => {
  const [pageActuelle, setPageActuelle] = useState<number>(0);

  const lignesAAfficher = useMemo(() => {
    if (!lignes) return null;

    const plageActuelle = parseInt(parametresRecherche.range?.split("-")[0] ?? "0");

    return lignes.slice(
      pageActuelle * nombreLignesParPage - plageActuelle * nombreElementsParPlage,
      (pageActuelle + 1) * nombreLignesParPage - plageActuelle * nombreElementsParPlage
    );
  }, [nombreLignesParPage, lignes, pageActuelle]);

  const parametresPagination: { libellePagination: string; pasDePageSuivante: boolean } = useMemo(() => {
    const premiereLigne = Math.min(pageActuelle * nombreLignesParPage + 1, nombreTotalLignes);
    const derniereLigne = Math.min((pageActuelle + 1) * nombreLignesParPage, nombreTotalLignes);

    return {
      libellePagination: `${premiereLigne}-${derniereLigne} sur ${nombreTotalLignes}`,
      pasDePageSuivante: (pageActuelle + 1) * nombreLignesParPage >= nombreTotalLignes
    };
  }, [nombreLignesParPage, nombreTotalLignes, pageActuelle]);

  useEffect(() => {
    const plageActuelle = parseInt(parametresRecherche.range?.split("-")[0] ?? "0");
    const nouvellePlage = Math.floor((pageActuelle * nombreLignesParPage) / nombreElementsParPlage);
    if (plageActuelle === nouvellePlage) return;

    setParametresRecherche(prec => ({
      ...prec,
      range: `${nouvellePlage}-${nombreElementsParPlage}`
    }));
  }, [pageActuelle]);

  return lignesAAfficher ? (
    <>
      <table className="min-w-full border-spacing-0 rounded-t-xl border border-solid border-gris-sombre text-sm shadow-lg">
        <thead className="">
          <tr>
            {enTetes.map(enTete => (
              <th
                key={enTete.cle}
                className="text-center first:text-left"
              >
                {enTete.triable ? (
                  <Bouton
                    title={`Trier par ${enTete.libelle.toLowerCase()}`}
                    aria-label={`Trier par ${enTete.libelle.toLowerCase()}`}
                    className="relative border-none bg-transparent text-bleu hover:bg-transparent focus:bg-transparent"
                    onClick={() => {
                      setParametresRecherche(prec => ({
                        tri: enTete.cle,
                        sens: enTete.cle === prec.tri && prec.sens === "ASC" ? "DESC" : "ASC",
                        range: `0-${nombreElementsParPlage}`
                      }));
                    }}
                  >
                    <span className="text-sm normal-case underline">{enTete.libelle}</span>
                    <MdArrowUpward
                      fontSize="inherit"
                      className={`absolute -right-1 top-1/2 -translate-y-1/2 ${
                        enTete.cle !== parametresRecherche.tri ? "opacity-0" : ""
                      } ${parametresRecherche.sens === "DESC" ? "rotate-180" : ""}`}
                    />
                  </Bouton>
                ) : (
                  <span className="px-4 font-marianne-bold text-bleu">{enTete.libelle}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {lignesAAfficher.length
            ? lignesAAfficher.map(ligne => (
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

      <div className="mt-4 flex items-center justify-end gap-4">
        <span className="text-gris">{parametresPagination.libellePagination}</span>
        <button
          type="button"
          onClick={() => setPageActuelle(pagePrec => pagePrec - 1)}
          disabled={pageActuelle === 0}
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
          onClick={() => setPageActuelle(pagePrec => pagePrec + 1)}
          disabled={parametresPagination.pasDePageSuivante}
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
    </>
  ) : (
    <></>
  );
};

type TDonneesLigne = {
  [cleColonne: string]: string | number | boolean | React.JSX.Element | undefined;
};

export type TLigneTableau = {
  cle: string;
  donnees: TDonneesLigne;
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
        {ligne.donnees[enTete.cle]}
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
