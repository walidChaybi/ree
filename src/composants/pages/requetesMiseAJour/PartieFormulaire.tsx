import { useDerniereAnalyseMarginaleApiHook } from "@hook/requete/miseajour/DerniereAnalyseMarginaleApiHook";
import { useState } from "react";
import OngletsBouton from "../../commun/onglets/OngletsBouton";
import OngletsContenu from "../../commun/onglets/OngletsContenu";
import { MiseAJourAnalyseMarginaleForm } from "./miseAJourAnalyseMarginaleForm/MiseAJourAnalyseMarginaleForm";

enum ECleOngletFormulaire {
  ANALYSE_MARGINALE = "analyse-marginale"
}

interface IPartieFormulaireProps {
  idActe: string;
}

export const PartieFormulaire: React.FC<IPartieFormulaireProps> = ({
  idActe
}) => {
  const [ongletActif, setOngletActif] = useState<ECleOngletFormulaire>(
    ECleOngletFormulaire.ANALYSE_MARGINALE
  );

  const derniereAnalyseMarginaleResultat =
    useDerniereAnalyseMarginaleApiHook(idActe);

  return (
    <div className="partie-formulaire">
      <OngletsBouton
        onglets={[
          {
            cle: ECleOngletFormulaire.ANALYSE_MARGINALE,
            libelle: "Analyse Marginale"
          }
        ]}
        cleOngletActif={ongletActif}
        changerOnglet={(valeur: string) =>
          setOngletActif(valeur as ECleOngletFormulaire)
        }
      />

      <OngletsContenu
        estActif={ongletActif === ECleOngletFormulaire.ANALYSE_MARGINALE}
      >
        <MiseAJourAnalyseMarginaleForm
          derniereAnalyseMarginal={derniereAnalyseMarginaleResultat}
        />
      </OngletsContenu>
    </div>
  );
};

export default PartieFormulaire;
