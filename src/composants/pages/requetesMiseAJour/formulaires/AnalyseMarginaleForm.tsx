import { useFormikContext } from "formik";
import { useEffect } from "react";
import Bouton from "../../../commun/bouton/Bouton";
import ChampsNomSecable from "../../../commun/champs/ChampsNomSecable";
import ChampsPrenoms from "../../../commun/champs/ChampsPrenoms";
import ChampsTexte from "../../../commun/champs/ChampsTexte";
import { IMiseAJourForm } from "../PartieFormulaire";

interface IAnalyseMarginaleFormProps {
  analyseMarginaleModifiee: boolean;
  setAnalyseMarginaleModifiee: (estModifiee: boolean) => void;
}

const AnalyseMarginaleForm: React.FC<IAnalyseMarginaleFormProps> = ({ analyseMarginaleModifiee, setAnalyseMarginaleModifiee }) => {
  const { values, initialValues, setValues } = useFormikContext<IMiseAJourForm>();

  useEffect(() => {
    type TObjet = {
      [cle: string]: string | number | boolean | TObjet;
    };

    const objetModifie = (objA: TObjet, objB: TObjet) => {
      if (Object.keys(objA).length !== Object.keys(objB).length) {
        return true;
      }

      for (let cleObj of Object.keys(objA)) {
        const valeurCleA = objA[cleObj];
        const valeurCleB = objB[cleObj];
        const modifiee =
          typeof valeurCleA === "object" && typeof valeurCleB === "object"
            ? objetModifie(valeurCleA, valeurCleB)
            : valeurCleA !== valeurCleB;
        if (modifiee) {
          return true;
        }
      }

      return false;
    };

    setAnalyseMarginaleModifiee(
      objetModifie(values.analyseMarginale as unknown as TObjet, initialValues.analyseMarginale as unknown as TObjet)
    );
  }, [values, initialValues]);

  return (
    <div className="px-4">
      <div className="grid grid-cols-2 gap-6">
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

        <div>
          <ChampsPrenoms
            cheminPrenoms={"analyseMarginale.prenoms"}
            prefixePrenom={"prenom"}
          />
        </div>

        <ChampsTexte
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
  );
};

export default AnalyseMarginaleForm;
