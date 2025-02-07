import { Identite } from "@model/etatcivil/enum/Identite";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { Option } from "@util/Type";
import { useFormikContext } from "formik";
import React, { memo, useEffect, useMemo } from "react";
import ChampListeDeroulante from "../../../../commun/champs/ChampListeDeroulante";
import ChampsCaseACocher from "../../../../commun/champs/ChampsCaseACocher";
import ChampsPrenoms from "../../../../commun/champs/ChampsPrenoms";
import ChampsRadio from "../../../../commun/champs/ChampsRadio";
import ChampsTexte from "../../../../commun/champs/ChampsTexte";
import ChampsZoneTexte from "../../../../commun/champs/ChampsZoneTexte";
import FormulaireAdresse from "../../../../commun/formulaire/FormulaireAdresse";
import { ISaisieProjetActeForm, initialValueDeclarant } from "./FormulaireSaisirProjet";

const optionsDeclarant: Option[] = [
  { cle: Identite.getKey(Identite.PERE), libelle: Identite.PERE.libelle },
  { cle: Identite.getKey(Identite.MERE), libelle: Identite.MERE.libelle },
  { cle: Identite.getKey(Identite.PERE_ET_MERE), libelle: Identite.PERE_ET_MERE.libelle },
  { cle: Identite.getKey(Identite.TIERS), libelle: Identite.TIERS.libelle }
];

interface ITitreSectionProps {
  titre: string;
}

const TitreSection = memo<ITitreSectionProps>(({ titre }) => (
  <div className="mb-8 flex w-full border-0 border-b-2 border-solid border-bleu text-start">
    <h3 className="-mb-3 ml-6 bg-blanc px-1.5 text-bleu-sombre">{titre}</h3>
  </div>
));

const BlocDeclarant: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<ISaisieProjetActeForm>();
  const declarant = useMemo(() => values.declarant, [values]);
  const estUnTier = useMemo(() => declarant.identite === Identite.getKey(Identite.TIERS), [declarant.identite]);

  useEffect(() => {
    if (declarant.identite !== Identite.getKey(Identite.TIERS)) {
      setFieldValue("declarant", { ...initialValueDeclarant, identite: declarant.identite });
    }
  }, [declarant.identite]);

  useEffect(() => {
    if (declarant?.sansProfession) {
      setFieldValue(`declarant.profession`, "");
    }
  }, [declarant?.sansProfession]);

  return (
    <div className="m-4 mb-10 mt-8 rounded-md border border-solid border-blue-200 bg-white p-4 shadow-md">
      <div className="relative mb-5 flex border-bleu">
        <h2 className="absolute -top-[3.4rem] ml-8 bg-white px-2 text-bleu-sombre">{"Identité"}</h2>
      </div>
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
              optionFormatage="NOMS_PROPRES"
              estObligatoire={declarant.identite === Identite.getKey(Identite.TIERS)}
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
              optionFormatage="PREMIER_MAJUSCULE"
            />
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-x-4 pt-4">
            <ChampsTexte
              name="declarant.profession"
              libelle="Profession"
              data-testid="declarant-profession"
              disabled={declarant.sansProfession ?? false}
              optionFormatage="PREMIER_MAJUSCULE"
            />
            <div className="w-full pt-[2rem] text-start">
              <ChampsCaseACocher
                name="declarant.sansProfession"
                libelle="Sans profession"
              />
            </div>
          </div>

          <TitreSection titre="Domicile" />
          <FormulaireAdresse
            key={declarant.domicile?.typeLieu}
            prefix={"declarant.domicile"}
            categorieLieu={declarant.domicile?.typeLieu}
            ville={declarant?.domicile?.ville}
          />
          <TitreSection titre="Complément" />

          <div className="-pr-4 grid w-full">
            <ChampsZoneTexte
              name="declarant.complement"
              libelle=""
              placeholder="Ex: Chez qui l'accouchement à eu lieu"
              maxLength={250}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default BlocDeclarant;
