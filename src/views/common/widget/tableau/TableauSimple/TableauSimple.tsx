import React from "react";
import "./scss/TableauSimple.scss";
interface Entete {
  className?: string;
  libelle: string;
}

export interface Ligne {
  key: string;
  colonnes: Colonne[];
  className?: string;
}

interface Colonne {
  className?: string;
  contenu: JSX.Element | string;
  onClick?: (idxColonne: number) => void;
  onDoubleClick?: (idxColonne: number) => void;
  title?: string;
}

export interface TableauSimpleProps {
  className?: string;
  entetes: Entete[];
  lignes: Ligne[];
}

export const TableauSimple: React.FC<TableauSimpleProps> = props => {
  return (
    <table className={props.className ? `${props.className} TableauSimple` : "TableauSimple"}>
      <thead>
        <tr>
          {props.entetes.map((e: Entete, idx: number) => (
            <th
              key={`${e.libelle}-${idx}`}
              className={e.className}
            >
              {e.libelle}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.lignes.map((ligne: Ligne, idxLigne: number) => (
          <tr
            key={`${ligne.key}-${idxLigne}`}
            className={ligne.className}
          >
            {ligne.colonnes.map((colonne: Colonne, idxColonne: number) => (
              <td
                key={`${ligne.key}-${idxLigne}${idxColonne}`}
                className={colonne.className}
                onClick={() => {
                  if (colonne.onClick) {
                    colonne.onClick(idxColonne);
                  }
                }}
                onDoubleClick={() => {
                  if (colonne.onDoubleClick) {
                    colonne.onDoubleClick(idxColonne);
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
