import { Identite } from "@model/etatcivil/enum/Identite";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { Option } from "@util/Type";
import { useFormikContext } from "formik";
import React, { useEffect, useMemo } from "react";
import ChampListeDeroulante from "../../../../commun/champs/ChampListeDeroulante";
import ChampsCaseACocher from "../../../../commun/champs/ChampsCaseACocher";
import ChampsPrenoms from "../../../../commun/champs/ChampsPrenoms";
import ChampsRadio from "../../../../commun/champs/ChampsRadio";
import ChampsTexte from "../../../../commun/champs/ChampsTexte";
import ChampsZoneTexte from "../../../../commun/champs/ChampsZoneTexte";
import ConteneurAvecBordure from "../../../../commun/conteneurs/formulaire/ConteneurAvecBordure";
import SeparateurSection from "../../../../commun/conteneurs/formulaire/SeparateurSection";
import FormulaireAdresse from "../../../../commun/formulaire/FormulaireAdresse";
import { ISaisieProjetActeForm } from "./FormulaireSaisirProjet";

const optionsDeclarant: Option[] = [
  { cle: Identite.getKey(Identite.PERE), libelle: Identite.PERE.libelle },
  { cle: Identite.getKey(Identite.MERE), libelle: Identite.MERE.libelle },
  { cle: Identite.getKey(Identite.PERE_ET_MERE), libelle: Identite.PERE_ET_MERE.libelle },
  { cle: Identite.getKey(Identite.TIERS), libelle: Identite.TIERS.libelle }
];

const BlocDeclarant: React.FC = () => {
  const { values, setFieldValue, initialValues } = useFormikContext<ISaisieProjetActeForm>();
  const estUnTier = useMemo(() => values.declarant.identite === Identite.getKey(Identite.TIERS), [values.declarant.identite]);

  useEffect(() => {
    if (values.declarant.identite !== Identite.getKey(Identite.TIERS)) {
      setFieldValue("declarant", { ...initialValues.declarant, identite: values.declarant.identite });
    }
  }, [values.declarant.identite]);

  useEffect(() => {
    if (values.declarant?.sansProfession) {
      setFieldValue(`declarant.profession`, "");
    }
  }, [values.declarant?.sansProfession]);

  return (
    <ConteneurAvecBordure>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 grid grid-cols-2 gap-x-4">
          <ChampListeDeroulante
            name="declarant.identite"
            libelle="Identité"
            options={optionsDeclarant}
            premiereLettreMajuscule
          />
        </div>
      </div>
      {estUnTier && (
        <>
          <div className="pt-4">
            <ChampsTexte
              name="declarant.nom"
              libelle="Nom"
              estObligatoire={estUnTier}
            />
          </div>

          <div className="pt-4">
            <ChampsPrenoms
              cheminPrenoms="declarant.prenomsChemin"
              prefixePrenom="prenom"
            />
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-x-4 pt-4">
            <ChampsRadio
              name="declarant.sexe"
              libelle="Sexe"
              options={[
                { libelle: Sexe.MASCULIN.libelle, cle: Sexe.getKey(Sexe.MASCULIN) },
                { libelle: Sexe.FEMININ.libelle, cle: Sexe.getKey(Sexe.FEMININ) }
              ]}
            />
            <ChampsTexte
              className="w-1/2"
              name="declarant.age"
              libelle={"Âge"}
              numerique
              maxLength={3}
            />
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-x-4 pt-4">
            <ChampsTexte
              name="declarant.qualite"
              libelle="Qualité"
              placeholder="Ex: la grand-mère"
            />
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-x-4 pt-4">
            <ChampsTexte
              name="declarant.profession"
              libelle="Profession"
              data-testid="declarant-profession"
              disabled={values.declarant.sansProfession ?? false}
            />
            <div className="w-full pt-[2rem] text-start">
              <ChampsCaseACocher
                name="declarant.sansProfession"
                libelle="Sans profession"
              />
            </div>
          </div>

          <SeparateurSection titre="Domicile" />

          <FormulaireAdresse
            key={values.declarant.domicile?.typeLieu}
            prefix={"declarant.domicile"}
            categorieLieu={values.declarant.domicile?.typeLieu}
            ville={values.declarant?.domicile?.ville}
          />
          <SeparateurSection titre="Complément" />

          <ChampsZoneTexte
            name="declarant.complement"
            libelle=""
            placeholder="Ex: Chez qui l'accouchement à eu lieu"
            maxLength={250}
            typeRedimensionnement="fixe"
          />
        </>
      )}
    </ConteneurAvecBordure>
  );
};

export default BlocDeclarant;
