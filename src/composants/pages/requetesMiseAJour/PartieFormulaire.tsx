import { useContext } from "react";
import { ECleOngletsMiseAJour, EditionMiseAJourContext } from "../../../contexts/EditionMiseAJourContextProvider";
import OngletsBouton from "../../commun/onglets/OngletsBouton";
import OngletAnalyseMarginale from "./onglets/OngletAnalyseMarginale";

export const PartieFormulaire: React.FC = () => {
  const { ongletsActifs } = useContext(EditionMiseAJourContext.Valeurs);
  const { changerOnglet } = useContext(EditionMiseAJourContext.Actions);

  return (
    <div className="partie-formulaire">
      <OngletsBouton
        onglets={[
          {
            cle: ECleOngletsMiseAJour.ANALYSE_MARGINALE,
            libelle: "Analyse Marginale"
          }
        ]}
        cleOngletActif={ongletsActifs.formulaires}
        changerOnglet={(valeur: string) => changerOnglet(null, valeur as ECleOngletsMiseAJour)}
      />

      <OngletAnalyseMarginale estActif={ongletsActifs.formulaires === ECleOngletsMiseAJour.ANALYSE_MARGINALE} />
    </div>
  );
};

export default PartieFormulaire;
