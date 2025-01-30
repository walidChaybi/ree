/* istanbul ignore file */
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { ILocation, IParents } from "@model/requete/IParent";
import { genererArrondissements } from "@util/Utils";
import { Form, Formik, useFormikContext } from "formik";
import React, { memo, useEffect, useMemo } from "react";
import ChampDate from "../../../../commun/champs/ChampDate";
import ChampListeDeroulante from "../../../../commun/champs/ChampListeDeroulante";
import ChampsCaseACocher from "../../../../commun/champs/ChampsCaseACocher";
import ChampsPrenoms from "../../../../commun/champs/ChampsPrenoms";
import ChampsRadio from "../../../../commun/champs/ChampsRadio";
import ChampsTexte from "../../../../commun/champs/ChampsTexte";

interface Option {
  cle: string;
  libelle: string;
}

type TTypeLieu = ILocation["typeLieu"];

interface IFormulaireAdresseProps {
  prefix: string;
  categorieLieu: TTypeLieu;
  ville?: string;
}

interface IParentFormProps {
  parentIndex: 1 | 2;
}

interface ITitreSectionProps {
  titre: string;
}

interface IAdresseFranceProps {
  prefix: string;
  ville?: string;
  estVilleSpeciale: boolean;
}

interface IAdresseEtrangerProps {
  prefix: string;
}

const TYPES_LIEU: Option[] = [
  { cle: "France", libelle: "France" },
  { cle: "Étranger", libelle: "Étranger" },
  { cle: "Inconnu", libelle: "Inconnu" }
];

const VILLES_SPECIALES = ["paris", "marseille", "lyon"] as const;
type TVilleSpeciale = (typeof VILLES_SPECIALES)[number];

const ARRONDISSEMENTS_OPTIONS: Record<TVilleSpeciale, Option[]> = {
  paris: [...genererArrondissements(20), { cle: "centre", libelle: "centre" }],
  marseille: genererArrondissements(16),
  lyon: genererArrondissements(9)
};

const initialValues: IParents = {
  parent1: {
    sexe: Sexe.MASCULIN,
    nom: "",
    prenoms: {},
    dateNaissance: {},
    lieuNaissance: { typeLieu: "Inconnu" },
    sansProfession: false,
    domicile: { typeLieu: "Inconnu" },
    renseignerAge: false
  },
  parent2: {
    sexe: Sexe.FEMININ,
    nom: "",
    prenoms: {},
    dateNaissance: {},
    lieuNaissance: { typeLieu: "Inconnu" },
    sansProfession: false,
    domicile: { typeLieu: "Inconnu" },
    renseignerAge: false
  },
  domicileCommun: false
};

const AdresseFrance = memo<IAdresseFranceProps>(({ prefix, ville, estVilleSpeciale }) => (
  <div className="mt-4 space-y-4">
    <div className="flex gap-4">
      <div className="flex-1">
        <ChampsTexte
          name={`${prefix}.ville`}
          libelle="Ville"
        />
      </div>
      {estVilleSpeciale && (
        <div className="flex-1">
          <ChampListeDeroulante
            name={`${prefix}.arrondissement`}
            libelle="Arrondissement"
            options={ARRONDISSEMENTS_OPTIONS[ville?.toLowerCase() as TVilleSpeciale]}
            premiereLettreMajuscule
          />
        </div>
      )}
      {ville?.toLowerCase() !== "paris" && (
        <div className="flex-1">
          <ChampsTexte
            name={`${prefix}.departement`}
            libelle="Département"
          />
        </div>
      )}
    </div>
    <ChampsTexte
      name={`${prefix}.adresse`}
      libelle="Adresse"
    />
  </div>
));

const AdresseEtranger = memo<IAdresseEtrangerProps>(({ prefix }) => (
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
));

const FormulaireAdresse: React.FC<IFormulaireAdresseProps> = memo(({ prefix, categorieLieu, ville }) => {
  const estVilleSpeciale = useMemo(() => Boolean(VILLES_SPECIALES.includes(ville?.toLowerCase() as TVilleSpeciale)), [ville]);

  switch (categorieLieu) {
    case "France":
      return (
        <AdresseFrance
          prefix={prefix}
          ville={ville}
          estVilleSpeciale={estVilleSpeciale}
        />
      );
    case "Étranger":
      return <AdresseEtranger prefix={prefix} />;
    default:
      return <></>;
  }
});

const TitreSection = memo<ITitreSectionProps>(({ titre }) => (
  <div className="mb-8 flex w-full border-0 border-b-2 border-solid border-bleu text-start">
    <h3 className="-mb-3 ml-6 bg-blanc px-1.5 text-bleu-sombre">{titre}</h3>
  </div>
));

const ParentForm: React.FC<IParentFormProps> = memo(({ parentIndex }) => {
  const { values, setFieldValue } = useFormikContext<IParents>();
  const prefix = `parent${parentIndex}`;
  const parent = useMemo(() => values[`parent${parentIndex}` as keyof Pick<IParents, "parent1" | "parent2">], [values, parentIndex]);
  const optionsSexe = useMemo(() => Sexe.getAllEnumsAsOptionsSansInconnu(), []);

  useEffect(() => {
    const valeurChamp = {
      cle: parent.renseignerAge ? "dateNaissance" : "age",
      valeur: parent.renseignerAge ? { jour: "", mois: "", annee: "" } : ""
    };
    setFieldValue(`${prefix}.${valeurChamp.cle}`, valeurChamp.valeur);
  }, [parent.renseignerAge]);

  useEffect(() => {
    if (parent.sansProfession) {
      setFieldValue(`${prefix}.profession`, "");
    }
  }, [parent.sansProfession]);

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
          <div>
            <ChampDate
              name={`${prefix}.dateNaissance`}
              libelle="Date de naissance"
              disabled={parent.renseignerAge}
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
                  numerique={true}
                  maxLength={3}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <TitreSection titre="Lieu de naissance" />
      <ChampsRadio
        name={`${prefix}.lieuNaissance.typeLieu`}
        libelle=""
        options={TYPES_LIEU}
      />
      <FormulaireAdresse
        key={`${prefix}.lieuNaissance`}
        prefix={`${prefix}.lieuNaissance`}
        categorieLieu={parent.lieuNaissance.typeLieu as TTypeLieu}
        ville={parent.lieuNaissance.ville}
      />

      <TitreSection titre="Profession" />
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
        />
      </div>

      <TitreSection titre="Domicile" />
      {parentIndex === 2 && (
        <ChampsCaseACocher
          name="domicileCommun"
          libelle="Domicile commun avec parent 1"
        />
      )}
      {(!values.domicileCommun || parentIndex === 1) && (
        <>
          <ChampsRadio
            name={`${prefix}.domicile.typeLieu`}
            libelle=""
            options={TYPES_LIEU}
          />
          <FormulaireAdresse
            key={`${prefix}.domicile`}
            prefix={`${prefix}.domicile`}
            categorieLieu={parent.domicile.typeLieu as TTypeLieu}
            ville={parent.domicile.ville}
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
