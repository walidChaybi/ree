import { useFormikContext } from "formik";
import { useContext } from "react";
import { EditionMiseAJourContext } from "../../../../contexts/EditionMiseAJourContextProvider";
import Bouton from "../../../commun/bouton/Bouton";
import ChampsNomSecable from "../../../commun/champs/ChampsNomSecable";
import ChampsPrenoms from "../../../commun/champs/ChampsPrenoms";
import ChampsTexte from "../../../commun/champs/ChampsTexte";
import "./MiseAJourAnalyseMarginaleForm.scss";
import "./ModificationAnalyseMarginale.scss";

interface IModificationAnalyseMarginaleProps {
  onValiderEtTerminer: () => void;
}

const ModificationAnalyseMarginale: React.FC<
  IModificationAnalyseMarginaleProps
> = ({ onValiderEtTerminer }) => {
  const { miseAJourEffectuee } = useContext(EditionMiseAJourContext.Valeurs);
  const { dirty, resetForm } = useFormikContext();

  return (
    <div className="formulaire-mise-a-jour-analyse-marginale">
      <div className="champs-formulaire">
        <div>
          <ChampsNomSecable
            nom={{ name: "analyseMarginale.nom", libelle: "Nom" }}
            secable={{ name: "nomSecable.secable", libelle: "Nom sécable" }}
            nomPartie1={{
              name: "nomSecable.nomPartie1",
              libelle: "Nom 1ère partie"
            }}
            nomPartie2={{
              name: "nomSecable.nomPartie2",
              libelle: "Nom 2ème partie"
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

      <div className="bouton-annuler-saisie">
        <Bouton
          type="button"
          title="Annuler la saisie en cours"
          disabled={!dirty}
          onClick={() => {
            resetForm();
          }}
        >
          {"Annuler la saisie en cours"}
        </Bouton>
      </div>

      <div className="boutons-actions-form">
        <Bouton
          title="Actualiser et visualiser"
          type="submit"
          disabled={!dirty}
        >
          {"Actualiser et visualiser"}
        </Bouton>
        <Bouton
          title="Valider et terminer"
          onClick={onValiderEtTerminer}
          disabled={!miseAJourEffectuee}
          type="button"
        >
          {"Valider et terminer"}
        </Bouton>
      </div>
    </div>
  );
};

export default ModificationAnalyseMarginale;
