import { URL_RECHERCHE_ACTE_INSCRIPTION } from "@router/ReceUrls";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  ECleOngletsMiseAJour,
  EditionMiseAJourContext
} from "../../../contexts/EditionMiseAJourContextProvider";
import Bouton from "../../commun/bouton/Bouton";
import OngletsBouton from "../../commun/onglets/OngletsBouton";
import "./PartieActeRequete.scss";
import OngletActe from "./onglets/OngletActe";
import OngletActeMisAJour from "./onglets/OngletActeMisAJour";

export const PartieActeRequete: React.FC = () => {
  const navigate = useNavigate();

  const { ongletsActifs, miseAJourEffectuee } = useContext(
    EditionMiseAJourContext.Valeurs
  );
  const { changerOnglet } = useContext(EditionMiseAJourContext.Actions);

  return (
    <div className="partie-acte-requete">
      <OngletsBouton
        onglets={[
          {
            cle: ECleOngletsMiseAJour.ACTE,
            libelle: "Acte registre"
          },
          {
            cle: ECleOngletsMiseAJour.ACTE_MIS_A_JOUR,
            libelle: "Acte mis à jour",
            inactif: !miseAJourEffectuee
          }
        ]}
        cleOngletActif={ongletsActifs.actes}
        changerOnglet={(valeur: string) =>
          changerOnglet(valeur as ECleOngletsMiseAJour, null)
        }
      />

      <OngletActe
        estActif={ongletsActifs.actes === ECleOngletsMiseAJour.ACTE}
      />

      <OngletActeMisAJour
        estActif={ongletsActifs.actes === ECleOngletsMiseAJour.ACTE_MIS_A_JOUR}
      />

      <Bouton
        className="bouton-abandonner"
        title="Abandonner"
        onClick={() => navigate(URL_RECHERCHE_ACTE_INSCRIPTION)}
      >
        {"Abandonner"}
      </Bouton>
    </div>
  );
};
