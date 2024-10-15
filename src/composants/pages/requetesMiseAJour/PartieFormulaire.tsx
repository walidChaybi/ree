import { useDerniereAnalyseMarginaleApiHook } from "@hook/requete/miseajour/DerniereAnalyseMarginaleApiHook";
import { useContext } from "react";
import {
  ECleOngletsMiseAJour,
  EditionMiseAJourContext
} from "../../../contexts/EditionMiseAJourContextProvider";
import OngletsBouton from "../../commun/onglets/OngletsBouton";
import OngletsContenu from "../../commun/onglets/OngletsContenu";
import { MiseAJourAnalyseMarginaleForm } from "./miseAJourAnalyseMarginaleForm/MiseAJourAnalyseMarginaleForm";

export const PartieFormulaire: React.FC = () => {
  const { idActe, ongletsActifs } = useContext(EditionMiseAJourContext.Valeurs);
  const { changerOnglet } = useContext(EditionMiseAJourContext.Actions);

  const derniereAnalyseMarginaleResultat =
    useDerniereAnalyseMarginaleApiHook(idActe);

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
        changerOnglet={(valeur: string) =>
          changerOnglet(null, valeur as ECleOngletsMiseAJour)
        }
      />

      <OngletsContenu
        estActif={
          ongletsActifs.formulaires === ECleOngletsMiseAJour.ANALYSE_MARGINALE
        }
      >
        {derniereAnalyseMarginaleResultat && (
          <MiseAJourAnalyseMarginaleForm
            derniereAnalyseMarginal={derniereAnalyseMarginaleResultat}
          />
        )}
      </OngletsContenu>
    </div>
  );
};

export default PartieFormulaire;
