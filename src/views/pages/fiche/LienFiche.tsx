import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import Link from "@mui/material/Link";
import { FenetreExterne, FenetreExterneUtil } from "@util/FenetreExterne";
import React, { useState } from "react";
import { FichePage } from "./FichePage";
import "./scss/LienFiche.scss";

interface IDataLienFicheProps {
  identifiant: string;
  categorie: TypeFiche;
  numero: string;
  title?: string;
}

/** Le BoutonFiche simule une ligne du futur tableau des resultats d'une RMC */

export const LienFiche: React.FC<IDataLienFicheProps> = props => {
  const [fenetreOuverteState, setFenetreOuverteState] = useState(false);
  const [fenetreExterneUtil, setFenetreExterneUtil] =
    useState<FenetreExterneUtil>();

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
          onCloseHandler={() => {
            toggleFenetre();
          }}
          setFenetreExterneUtil={setFenetreExterneUtil}
        >
          <FichePage
            dataFicheIdentifiant={props.identifiant}
            datasFiches={[
              {
                identifiant: props.identifiant,
                categorie: props.categorie
              }
            ]}
            fenetreExterneUtil={fenetreExterneUtil}
            index={{ value: 0 }}
            nbLignesTotales={1}
            nbLignesParAppel={1}
          />
        </FenetreExterne>
      )}
    </>
  );
};
