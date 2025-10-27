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
  nombreDeTitulaires?: number;
}

const ChampsAnalyseMarginaleFormulaire: React.FC<IChampsAnalyseMarginaleFormulaireProps> = ({
  setAnalyseMarginaleModifiee,
  motif,
  nombreDeTitulaires = 1
}) => {
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
      <div className="pb-4 pt-6">
        <div className="grid gap-6">
          {[...Array(nombreDeTitulaires).keys()].map(index => (
            <ConteneurAvecBordure
              key={`conteneurTitulaire${index}`}
              titreEnTete={nombreDeTitulaires > 1 ? `Titulaire ${index + 1}` : "Titulaire"}
              sansMargeHorizontale
            >
              <div>
                <ChampsNomSecable
                  nom={{ name: `titulaires[${index}].nom`, libelle: "Nom" }}
                  secable={{ name: `titulaires[${index}].nomSecable`, libelle: "Nom sécable" }}
                  nomPartie1={{
                    name: `titulaires[${index}].nomPartie1`,
                    libelle: "Nom 1re partie"
                  }}
                  nomPartie2={{
                    name: `titulaires[${index}].nomPartie2`,
                    libelle: "Nom 2nde partie"
                  }}
                  estObligatoire
                />
              </div>

              <ChampsPrenoms
                cheminPrenoms={`titulaires[${index}].prenoms`}
                prefixePrenom={"prenom"}
              />
            </ConteneurAvecBordure>
          ))}

          <ChampTexte
            className="champs-motif"
            name="motif"
            libelle="Motif"
            type="text"
            estObligatoire
          />
          <div className="flex justify-between pt-6">
            <Bouton
              disabled={!dirty}
              onClick={() => {
                resetForm();
              }}
            >
              {"Annuler la saisie en cours"}
            </Bouton>
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
