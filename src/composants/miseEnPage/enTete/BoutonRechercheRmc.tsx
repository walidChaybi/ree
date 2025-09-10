import Button from "@mui/material/Button";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import FenetreExterne, { IFenetreExterneRef } from "../../../composants/commun/conteneurs/FenetreExterne";
import PageRMCActeInscription from "../../../pages/rmc/PageRMCActeInscription";

const width = 1200;
const ratioHeight = 1;

export const BoutonRechercheRmc: React.FC = () => {
  const [rmcExterne, setRmcExterne] = useState<boolean>(false);
  const [fenetreExterne, setFenetreExterne] = useState<IFenetreExterneRef | null>(null);

  const handleClick = () => {
    if (!rmcExterne) {
      setRmcExterne(true);
    } else {
      fenetreExterne?.ref.focus();
    }
  };

  return (
    <>
      <Button
        onClick={handleClick}
        title={"Recherche acte/inscription"}
        aria-label="Recherche acte/inscription"
      >
        <FaSearch
          className="text-xl text-white"
          aria-hidden
        />
      </Button>
      {rmcExterne && (
        <FenetreExterne
          apresFermeture={() => setRmcExterne(false)}
          largeur={width}
          ratioHauteur={ratioHeight}
          ratioLargeur={1}
          titre="Recherche acte et inscription"
          setFenetreExterneRef={ref => setFenetreExterne(ref)}
        >
          <>
            <PageRMCActeInscription />
            <ToastContainer
              containerId={"toastContainer-externe"}
              className={"toast-container"}
              position="top-center"
              newestOnTop={true}
              closeOnClick={true}
              rtl={false}
              draggable={true}
              pauseOnHover={true}
            />
          </>
        </FenetreExterne>
      )}
    </>
  );
};
