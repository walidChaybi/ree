import { ISaisieRDCForm } from "@model/form/delivrance/ISaisieRDCForm";
import { useFormikContext } from "formik";
import React, { useMemo } from "react";
import ChampDate from "../../../commun/champs/ChampDate";
import ChampTexte from "../../../commun/champs/ChampTexte";
import ConteneurAvecBordure from "../../../commun/conteneurs/formulaire/ConteneurAvecBordure";
import SeparateurSection from "../../../commun/conteneurs/formulaire/SeparateurSection";

interface IBlocTitulaireProps {
  indexTitulaire?: 1 | 2;
  unSeulTitulaire?: boolean;
}

const BlocTitulaire: React.FC<IBlocTitulaireProps> = ({ indexTitulaire, unSeulTitulaire }) => {
  const prefixeTitulaire = useMemo(() => `titulaires.titulaire${indexTitulaire}`, [indexTitulaire]);

  return (
    <ConteneurAvecBordure
      titreEnTete={`Titulaire ${unSeulTitulaire ? "" : indexTitulaire}`}
      sansMargeHorizontale={!unSeulTitulaire}
    >
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2">
        <ChampTexte
          name={`${prefixeTitulaire}.nomNaissance`}
          libelle="Nom de naissance"
          optionFormatage="MAJUSCULES"
          maxLength={100}
        />

        <ChampTexte
          name={`${prefixeTitulaire}.prenom`}
          libelle="Prénom"
          maxLength={100}
        />
      </div>

      <SeparateurSection titre="Naissance" />

      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        <ChampDate
          name={`${prefixeTitulaire}.naissance.date`}
          libelle="Date de naissance"
        />

        <ChampTexte
          name={`${prefixeTitulaire}.naissance.pays`}
          libelle="Pays de naissance"
          maxLength={100}
        />
      </div>
    </ConteneurAvecBordure>
  );
};

interface IBlocTitulairesProps {}

const BlocTitulaires: React.FC<IBlocTitulairesProps> = () => {
  const { values } = useFormikContext<ISaisieRDCForm>();

  return (
    <>
      {["NAISSANCE", "DECES"].includes(values.requete.natureActe) ? (
        <BlocTitulaire
          indexTitulaire={1}
          unSeulTitulaire={true}
        />
      ) : (
        <ConteneurAvecBordure titreEnTete="TITULAIRES">
          <div className="grid gap-8 pt-2">
            <BlocTitulaire
              indexTitulaire={1}
              unSeulTitulaire={false}
            />
            <BlocTitulaire indexTitulaire={2} />
          </div>
        </ConteneurAvecBordure>
      )}
    </>
  );
};

export default BlocTitulaires;
