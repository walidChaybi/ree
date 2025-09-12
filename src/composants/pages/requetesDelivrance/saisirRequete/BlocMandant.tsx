import { ISaisieRDCForm } from "@model/form/delivrance/ISaisieRDCForm";
import { ETypeMandant } from "@model/requete/enum/TypeMandant";
import { enumVersOptions } from "@util/Utils";
import { useFormikContext } from "formik";
import { useCallback } from "react";
import ChampTexte from "../../../commun/champs/ChampTexte";
import ChampsRadio from "../../../commun/champs/ChampsRadio";
import ConteneurAvecBordure from "../../../commun/conteneurs/formulaire/ConteneurAvecBordure";

const OPTIONS_TYPE_MANDANT = enumVersOptions(ETypeMandant);

const BlocMandant: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<ISaisieRDCForm>();

  const gererChangementTypeMandant = useCallback((typeMandant: string) => {
    setFieldValue("mandant", {
      type: typeMandant,
      raisonSociale: "",
      nom: "",
      prenom: ""
    });
  }, []);

  return (
    <ConteneurAvecBordure titreEnTete="MANDANT">
      <div className="grid grid-cols-2 gap-4 pt-4">
        <ChampsRadio
          name="mandant.type"
          libelle="Type"
          options={OPTIONS_TYPE_MANDANT}
          apresChangement={gererChangementTypeMandant}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4">
        {values.mandant.type === "PERSONNE_MORALE" && (
          <ChampTexte
            name="mandant.raisonSociale"
            libelle="Raison sociale"
          />
        )}

        <ChampTexte
          name="mandant.nom"
          libelle="Nom"
          optionFormatage="MAJUSCULES"
        />

        <ChampTexte
          name="mandant.prenom"
          libelle="Prénom"
        />
      </div>
    </ConteneurAvecBordure>
  );
};

export default BlocMandant;
