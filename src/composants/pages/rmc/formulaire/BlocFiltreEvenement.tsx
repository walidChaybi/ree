/* v8 ignore start SERA TESTEE LORSQUE LA RMC ACTE INSCRIPTION SERA SORTIE DE VIEWS*/

import { TypeRepertoire } from "@model/etatcivil/enum/TypeRepertoire";
import { IRMCActeInscriptionForm } from "@model/form/rmc/RMCActeInscriptionForm";
import { useFormikContext } from "formik";
import React from "react";
import ChampDate from "../../../commun/champs/ChampDate";
import ChampTexte from "../../../commun/champs/ChampTexte";
import ConteneurAvecBordure from "../../../commun/conteneurs/formulaire/ConteneurAvecBordure";

const BlocFiltreEvenement: React.FC = () => {
  const { values, setValues } = useFormikContext<IRMCActeInscriptionForm>();

  const reinitialiserValeurs = () => {
    setValues({
      ...values,
      registreRepertoire: {
        ...values.registreRepertoire,
        evenement: {
          dateEvenement: {
            jour: "",
            mois: "",
            annee: ""
          },
          paysEvenement: ""
        }
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
          name="registreRepertoire.evenement.dateEvenement"
          libelle="Date de l'évènement"
          avecBoutonReinitialiser
        />
        <ChampTexte
          name="registreRepertoire.evenement.paysEvenement"
          libelle="Pays de l'évènement"
          disabled={[TypeRepertoire.RC.libelle, TypeRepertoire.RCA.libelle].includes(values.registreRepertoire.repertoire.typeRepertoire)}
        />
      </div>
    </ConteneurAvecBordure>
  );
};

export default BlocFiltreEvenement;
/* v8 ignore stop */
