import { ObjetFormulaire } from "@model/form/commun/ObjetFormulaire";
import { useFormikContext } from "formik";
import { useEffect } from "react";
import Bouton from "../../../../../commun/bouton/Bouton";
import ChampTexte from "../../../../../commun/champs/ChampTexte";
import ChampsNomSecable from "../../../../../commun/champs/ChampsNomSecable";
import ChampsPrenoms from "../../../../../commun/champs/ChampsPrenoms";
import ConteneurAvecBordure from "../../../../../commun/conteneurs/formulaire/ConteneurAvecBordure";
import { IAnalyseMarginaleMiseAJour } from "../../../PartieFormulaire";

interface IChampsAnalyseMarginaleFormulaireProps {
  setAnalyseMarginaleModifiee: (estModifiee: boolean) => void;
  motif: string | null;
}

const ChampsAnalyseMarginaleFormulaire: React.FC<IChampsAnalyseMarginaleFormulaireProps> = ({ setAnalyseMarginaleModifiee, motif }) => {
  const { values, initialValues, dirty, resetForm, isValid } = useFormikContext<IAnalyseMarginaleMiseAJour>();

  useEffect(() => {
    const { motif } = initialValues;

    setAnalyseMarginaleModifiee(
      ObjetFormulaire.valeursModifiees({
        valeurs: motif ? values : { ...values, motif: "" },
        valeursInitiales: motif ? initialValues : { ...initialValues, motif: "" }
      })
    );
  }, [values, initialValues]);

  useEffect(() => {
    if (motif !== null) {
      resetForm({
        values: {
          ...values,
          motif
        }
      });
    }
  }, [motif]);

  return (
    <ConteneurAvecBordure>
      <div className="pb-4 pt-3">
        <div className="grid gap-6">
          <div>
            <ChampsNomSecable
              nom={{ name: "nom", libelle: "Nom" }}
              secable={{ name: "nomSecable", libelle: "Nom sécable" }}
              nomPartie1={{
                name: "nomPartie1",
                libelle: "Nom 1re partie"
              }}
              nomPartie2={{
                name: "nomPartie2",
                libelle: "Nom 2nde partie"
              }}
              estObligatoire
            />
          </div>

          <ChampsPrenoms
            cheminPrenoms={"prenoms"}
            prefixePrenom={"prenom"}
          />

          <ChampTexte
            className="champs-motif"
            name="motif"
            libelle="Motif"
            type="text"
            estObligatoire
          />
        </div>

        <div className="sticky bottom-8 mt-8 flex w-full justify-between">
          <div className="w-fit text-start">
            <Bouton
              disabled={!dirty}
              onClick={() => {
                resetForm();
              }}
            >
              {"Annuler la saisie en cours"}
            </Bouton>
          </div>

          <div className="w-fit text-end">
            <Bouton
              disabled={!(isValid && dirty)}
              type="submit"
            >
              {"Modifier l'analyse marginale"}
            </Bouton>
          </div>
        </div>
      </div>
    </ConteneurAvecBordure>
  );
};

export default ChampsAnalyseMarginaleFormulaire;
