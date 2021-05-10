import React from "react";
import "./scss/TableauSimple.scss";
export interface Entete {
  className?: string;
  libelle: string;
}

export interface Ligne {
  key: string;
  colonnes: Colonne[];
}

export interface Colonne {
  className?: string;
  contenu: JSX.Element | string;
  onClick?: (idxColonne: number) => void;
  title?: string;
}

export interface TableauSimpleProps {
  className?: string;
  entetes: Entete[];
  lignes: Ligne[];
}

export const TableauSimple: React.FC<TableauSimpleProps> = props => {
  return (
    <table className={`TableauSimple ${props.className}`}>
      <thead>
        <tr>
          {props.entetes.map((e: Entete, idx: number) => (
            <th key={`${e.libelle}-${idx}`} className={e.className}>
              {e.libelle}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.lignes.map(ligne => (
          <tr key={ligne.key}>
            {ligne.colonnes.map((colonne: Colonne, idx: number) => (
              <td
                key={`${ligne.key}-${idx}`}
                className={colonne.className}
                onClick={() => {
                  if (colonne.onClick) {
                    colonne.onClick(idx);
                  }
                }}
                title={colonne.title}
              >
                {colonne.contenu}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
