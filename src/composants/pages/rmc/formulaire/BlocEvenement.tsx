import { ICriteresRMC } from "@model/rmc/commun/IRMCFormulaire";
import { useFormikContext } from "formik";
import React, { useContext, useMemo } from "react";
import { EBlocsRMC, RMCContext } from "../../../../contexts/RMCContextProvider";
import ChampDate from "../../../commun/champs/ChampDate";
import ChampTexte from "../../../commun/champs/ChampTexte";
import ConteneurAvecBordure from "../../../commun/conteneurs/formulaire/ConteneurAvecBordure";

const BlocEvenement: React.FC = () => {
  const { values, setValues } = useFormikContext<ICriteresRMC>();
  const { blocsRenseignes } = useContext(RMCContext);
  const blocRCRCAPACSAlimente = useMemo(() => blocsRenseignes?.includes(EBlocsRMC.INSCRIPTION), [blocsRenseignes]);

  const reinitialiserValeurs = () => {
    setValues({
      ...values,

      evenement: {
        dateEvenement: {
          jour: "",
          mois: "",
          annee: ""
        },
        paysEvenement: ""
      }
    });
  };

  return (
    <ConteneurAvecBordure
      titreEnTete="Filtre évènement"
      className="mt-8"
      reinitialiserDonneesBloc={reinitialiserValeurs}
    >
      <div className="grid grid-cols-2 gap-4 pt-4">
        <ChampDate
          name="evenement.dateEvenement"
          libelle="Date de l'évènement"
          avecBoutonReinitialiser
        />
        <ChampTexte
          name="evenement.paysEvenement"
          libelle="Pays de l'évènement"
          disabled={blocRCRCAPACSAlimente}
        />
      </div>
    </ConteneurAvecBordure>
  );
};

export default BlocEvenement;
