import { Sexe } from "@model/etatcivil/enum/Sexe";
import { IParents } from "@model/requete/IParent";
import { genererArrondissements, premiereLettreEnMajusculeLeResteEnMinuscule } from "@util/Utils";
import { Form, Formik, useFormikContext } from "formik";
import React, { memo, useCallback, useMemo } from "react";
import ChampDate from "../../../../commun/champs/ChampDate";
import ChampListeDeroulante from "../../../../commun/champs/ChampListeDeroulante";
import ChampsCaseACocher from "../../../../commun/champs/ChampsCaseACocher";
import ChampsPrenoms from "../../../../commun/champs/ChampsPrenoms";
import ChampsRadio from "../../../../commun/champs/ChampsRadio";
import ChampsTexte from "../../../../commun/champs/ChampsTexte";

type TTypeLieu = "France" | "Étranger" | "Inconnu" | "";

const TYPES_LIEU = [
  { cle: "France", libelle: "France" },
  { cle: "Étranger", libelle: "Étranger" },
  { cle: "Inconnu", libelle: "Inconnu" }
];

const arrondissementsOptions = {
  Paris: [...genererArrondissements(20), { cle: "centre", libelle: "centre" }],
  Marseille: genererArrondissements(16),
  Lyon: genererArrondissements(9)
};

const initialValues: IParents = {
  parent1: {
    sexe: Sexe.MASCULIN,
    nom: "",
    prenoms: {},
    dateNaissance: undefined,
    lieuNaissance: { type: "" },
    sansProfession: false,
    domicile: { type: "" },
    renseignerAge: false
  },
  parent2: {
    sexe: Sexe.FEMININ,
    nom: "",
    prenoms: {},
    dateNaissance: undefined,
    lieuNaissance: { type: "" },
    sansProfession: false,
    domicile: { type: "" },
    renseignerAge: false
  },
  domicileCommun: false
};

interface IFormulaireAdresseProps {
  prefix: string;
  categorieLieu: TTypeLieu;
  ville?: string;
  onVilleChange: (e: React.ChangeEvent<HTMLInputElement>, prefix: string) => void;
}

interface IParentFormProps {
  parentIndex: 1 | 2;
}

const FormulaireAdresse: React.FC<IFormulaireAdresseProps> = memo(({ prefix, categorieLieu: categorieLieu, ville, onVilleChange }) => {
  const estVilleSpeciale = useMemo(() => ville && ["Paris", "Marseille", "Lyon"].includes(ville), [ville]);

  if (categorieLieu === "France") {
    return (
      <div className="mt-4 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <ChampsTexte
              name={`${prefix}.ville`}
              libelle="Ville"
              onChange={e => onVilleChange(e, prefix)}
            />
          </div>
          {estVilleSpeciale && (
            <div className="w-48">
              <ChampListeDeroulante
                name={`${prefix}.arrondissement`}
                libelle="Arrondissement"
                options={arrondissementsOptions[ville as keyof typeof arrondissementsOptions]}
              />
            </div>
          )}
          <div className="flex-1">
            <ChampsTexte
              name={`${prefix}.departement`}
              libelle="Département"
            />
          </div>
        </div>
        <ChampsTexte
          name={`${prefix}.adresse`}
          libelle="Adresse"
        />
      </div>
    );
  }
  if (categorieLieu === "Étranger") {
    return (
      <div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <ChampsTexte
            name={`${prefix}.ville`}
            libelle="Ville"
          />
          <ChampsTexte
            name={`${prefix}.etatProvince`}
            libelle="État, canton, province"
          />
        </div>
        <div className="mt-4">
          <ChampsTexte
            name={`${prefix}.pays`}
            libelle="Pays"
          />
        </div>
        <div className="mt-4">
          <ChampsTexte
            name={`${prefix}.adresse`}
            libelle="Adresse"
          />
        </div>
      </div>
    );
  }

  return <></>;
});

const ParentForm: React.FC<IParentFormProps> = memo(({ parentIndex }) => {
  const { values, setFieldValue } = useFormikContext<IParents>();
  const prefix = `parent${parentIndex}`;
  const parent = values[`parent${parentIndex}` as keyof Pick<IParents, "parent1" | "parent2">];

  const optionsSexe = useMemo(() => Sexe.getAllEnumsAsOptionsSansInconnu(), []);

  const handleVilleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, fieldPrefix: string) => {
      const ville = e.target.value.toLowerCase();
      setFieldValue(`${fieldPrefix}.ville`, premiereLettreEnMajusculeLeResteEnMinuscule(ville));

      if (["paris", "marseille", "lyon"].includes(ville)) {
        setFieldValue(`${fieldPrefix}.departement`, "");
        setFieldValue(`${fieldPrefix}.arrondissement`, "");
      } else {
        setFieldValue(`${fieldPrefix}.arrondissement`, "");
      }
    },
    [setFieldValue]
  );

  const handleSansProfessionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setFieldValue(`${prefix}.profession`, "");
      }
    },
    [prefix, setFieldValue]
  );

  return (
    <div className="m-4 mb-10 mt-8 rounded-md border border-solid border-blue-200 bg-white p-4 shadow-md">
      <div className="relative mb-5 flex border-bleu">
        <h2 className="absolute -top-[3.4rem] ml-8 bg-white px-2 uppercase text-bleu-sombre">
          {"Parent "} {parentIndex}
        </h2>
      </div>

      <div className="space-y-4">
        <ChampsTexte
          name={`${prefix}.nom`}
          libelle="Nom"
        />
        <ChampsPrenoms
          cheminPrenoms={`${prefix}.prenoms`}
          prefixePrenom="prenom"
        />
        <ChampsRadio
          name={`${prefix}.sexe`}
          libelle="Sexe"
          options={optionsSexe}
        />

        <div className="grid grid-cols-2">
          <div className={parent.renseignerAge ? "pointer-events-none opacity-50" : ""}>
            <ChampDate
              name={`${prefix}.dateNaissance`}
              libelle="Date de naissance"
            />
          </div>
          <div className="flex items-end space-x-4">
            <ChampsCaseACocher
              name={`${prefix}.renseignerAge`}
              libelle="Saisir l'âge"
            />
            {parent.renseignerAge && (
              <div className="flex-1">
                <ChampsTexte
                  name={`${prefix}.age`}
                  libelle="Âge (en années)"
                  type="number"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-8 flex w-full border-0 border-b-2 border-solid border-bleu text-start">
        <h3 className="-mb-3 ml-6 bg-blanc px-1.5 uppercase text-bleu-sombre">Lieu de naissance</h3>
      </div>

      <ChampsRadio
        name={`${prefix}.lieuNaissance.type`}
        libelle=""
        options={TYPES_LIEU}
      />

      <FormulaireAdresse
        prefix={`${prefix}.lieuNaissance`}
        categorieLieu={parent.lieuNaissance.type as TTypeLieu}
        ville={parent.lieuNaissance.ville}
        onVilleChange={handleVilleChange}
      />

      <div className="mb-8 flex border-0 border-b-2 border-solid border-bleu text-start">
        <h3 className="-mb-3 ml-6 bg-blanc px-1.5 uppercase text-bleu-sombre">Profession</h3>
      </div>

      <div className="grid grid-cols-2 items-center gap-4">
        <ChampsTexte
          name={`${prefix}.profession`}
          libelle=""
          data-testid={`${prefix}-profession`}
          disabled={parent.sansProfession}
        />
        <ChampsCaseACocher
          name={`${prefix}.sansProfession`}
          libelle="Sans profession"
          onChange={handleSansProfessionChange}
        />
      </div>

      <div className="mb-8 flex w-full border-0 border-b-2 border-solid border-bleu text-start">
        <h3 className="-mb-3 ml-6 bg-blanc px-1.5 uppercase text-bleu-sombre">Domicile</h3>
      </div>

      {parentIndex === 2 && (
        <ChampsCaseACocher
          name="domicileCommun"
          libelle="Domicile commun avec parent 1"
        />
      )}

      {(!values.domicileCommun || parentIndex === 1) && (
        <>
          <ChampsRadio
            name={`${prefix}.domicile.type`}
            libelle=""
            options={TYPES_LIEU}
          />
          <FormulaireAdresse
            prefix={`${prefix}.domicile`}
            categorieLieu={parent.domicile.type as TTypeLieu}
            ville={parent.domicile.ville}
            onVilleChange={handleVilleChange}
          />
        </>
      )}
    </div>
  );
});

const BlocParents: React.FC = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {}}
    >
      <Form>
        <ParentForm parentIndex={1} />
        <ParentForm parentIndex={2} />
      </Form>
    </Formik>
  );
};

export default memo(BlocParents);
