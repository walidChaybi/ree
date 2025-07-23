import { ETypeFiche } from "@model/etatcivil/enum/ETypeFiche";
import Link from "@mui/material/Link";
import React, { useState } from "react";
import FenetreExterne, { IFenetreExterneRef } from "../../../composants/commun/conteneurs/FenetreExterne";
import { FichePage } from "./FichePage";
import "./scss/LienFiche.scss";

interface IDataLienFicheProps {
  identifiant: string;
  categorie: ETypeFiche;
  numero: string;
  title?: string;
}

/** Le BoutonFiche simule une ligne du futur tableau des resultats d'une RMC */

export const LienFiche: React.FC<IDataLienFicheProps> = props => {
  const [fenetreOuverteState, setFenetreOuverteState] = useState(false);
  const [fenetreExterneRef, setFenetreExterneRef] = useState<IFenetreExterneRef>();

  const onClick = () => {
    toggleFenetre();
  };

  const toggleFenetre = () => {
    setFenetreOuverteState(!fenetreOuverteState);
  };

  return (
    <>
      <Link
        className={"lienFiche"}
        href={"#"}
        onClick={onClick}
        title={props.numero}
        underline="hover"
      >
        {`${props.numero}`}
      </Link>

      {fenetreOuverteState && (
        <FenetreExterne
          titre={props.title}
          apresFermeture={() => {
            toggleFenetre();
          }}
          setFenetreExterneRef={ref => setFenetreExterneRef(ref)}
        >
          <FichePage
            dataFicheIdentifiant={props.identifiant}
            datasFiches={[
              {
                identifiant: props.identifiant,
                categorie: props.categorie
              }
            ]}
            fenetreExterneRef={fenetreExterneRef}
            index={{ value: 0 }}
            nbLignesTotales={1}
            nbLignesParAppel={1}
          />
        </FenetreExterne>
      )}
    </>
  );
};
