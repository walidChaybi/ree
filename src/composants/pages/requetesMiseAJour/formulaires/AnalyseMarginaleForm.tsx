import { ObjetFormulaire } from "@model/form/commun/ObjetFormulaire";
import { useFormikContext } from "formik";
import { useEffect } from "react";
import Bouton from "../../../commun/bouton/Bouton";
import ChampTexte from "../../../commun/champs/ChampTexte";
import ChampsNomSecable from "../../../commun/champs/ChampsNomSecable";
import ChampsPrenoms from "../../../commun/champs/ChampsPrenoms";
import ConteneurAvecBordure from "../../../commun/conteneurs/formulaire/ConteneurAvecBordure";
import { IMiseAJourForm } from "../PartieFormulaire";

interface IAnalyseMarginaleFormProps {
  analyseMarginaleModifiee: boolean;
  setAnalyseMarginaleModifiee: (estModifiee: boolean) => void;
}

const AnalyseMarginaleForm: React.FC<IAnalyseMarginaleFormProps> = ({ analyseMarginaleModifiee, setAnalyseMarginaleModifiee }) => {
  const { values, initialValues, setValues } = useFormikContext<IMiseAJourForm>();

  useEffect(() => {
    setAnalyseMarginaleModifiee(
      ObjetFormulaire.valeursModifiees({
        valeurs: values.analyseMarginale,
        valeursInitiales: initialValues.analyseMarginale
      })
    );
  }, [values, initialValues]);

  return (
    <ConteneurAvecBordure sansMargeBasse>
      <div className="p-4 pt-2">
        <div className="grid gap-6">
          <div>
            <ChampsNomSecable
              nom={{ name: "analyseMarginale.nom", libelle: "Nom" }}
              secable={{ name: "analyseMarginale.nomSecable", libelle: "Nom sécable" }}
              nomPartie1={{
                name: "analyseMarginale.nomPartie1",
                libelle: "Nom 1re partie"
              }}
              nomPartie2={{
                name: "analyseMarginale.nomPartie2",
                libelle: "Nom 2nde partie"
              }}
            />
          </div>

          <ChampsPrenoms
            cheminPrenoms={"analyseMarginale.prenoms"}
            prefixePrenom={"prenom"}
          />

          <ChampTexte
            className="champs-motif"
            name="analyseMarginale.motif"
            libelle="Motif"
            type="text"
          />
        </div>

        <div className="sticky bottom-8 mt-8 w-fit text-start">
          <Bouton
            disabled={!analyseMarginaleModifiee}
            onClick={() => setValues({ mentions: values.mentions, analyseMarginale: initialValues.analyseMarginale })}
          >
            {"Annuler la saisie en cours"}
          </Bouton>
        </div>
      </div>
    </ConteneurAvecBordure>
  );
};

export default AnalyseMarginaleForm;
