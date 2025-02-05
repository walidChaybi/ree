/* v8 ignore start */
import { BlocMetaModele, ChampMetaModele, MetaModeleTypeMention } from "@model/etatcivil/typesMention/MetaModeleTypeMention";
import { useField, useFormikContext } from "formik";
import React, { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { TMentionForm } from "../MentionForm";
import { TexteMentionAideALaSaisie } from "./GenerateurTexteSaisieMention";

const ChampsCaseACocher = lazy(() => import("../../../../commun/champs/ChampsCaseACocher"));
const ChampDate = lazy(() => import("../../../../commun/champs/ChampDate"));
const ChampListeDeroulante = lazy(() => import("../../../../commun/champs/ChampListeDeroulante"));
const ChampsTexte = lazy(() => import("../../../../commun/champs/ChampsTexte"));

interface IAideALaSaisieMention {
  metamodeleTypeMention: MetaModeleTypeMention | null;
}

const getClassesChamp = (typeChamp: string) => {
  switch (typeChamp) {
    case "text":
    case "select":
    case "dateComplete":
    case "dateIncomplete":
    case "annee":
    case "int":
      return "w-[42.5%] px-[2.5%] pb-4";
    case "boolean":
      return "w-full px-[2.5%] pb-6 pt-4 text-left";
    case "sousTitre":
      return "mb-4 mt-3 mx-4 flex w-full border-0 border-b-2 border-solid border-bleu text-start";
    default:
      return "";
  }
};

const ContneurChampFormulaireAideSaisie: React.FC<{ champ: ChampMetaModele; children: React.ReactNode; idBloc: string }> = ({
  champ,
  children,
  idBloc
}) => {
  const { values, setFieldValue, setFieldTouched } = useFormikContext<TMentionForm>();
  const idChamp = useMemo(() => `${idBloc}.${champ.id}`, [champ, idBloc]);
  const estAffiche = useMemo(() => champ.estAffichable(values), [values]);

  useEffect(() => {
    if (estAffiche) {
      return;
    }

    setFieldTouched(idChamp, false);
    switch (champ.type) {
      case "select":
        return;
      case "boolean":
        setFieldValue(idChamp, false);

        return;
      case "dateComplete":
      case "dateIncomplete":
        setFieldValue(`${idChamp}.jour`, "");
        setFieldValue(`${idChamp}.mois`, "");
        setFieldValue(`${idChamp}.annee`, "");

        return;
      default:
        setFieldValue(idChamp, "");
    }
  }, [estAffiche]);

  return estAffiche || champ.type === "select" ? <>{children}</> : <></>;
};

const ChampListeDeroulateConditionnee: React.FC<{
  name: string;
  champ: ChampMetaModele;
}> = ({ name, champ }) => {
  const [field] = useField(name);
  const { values, setFieldValue } = useFormikContext<TMentionForm>();
  const [nombreOptions, setNombreOptions] = useState<number>(0);
  const options = useMemo(
    () =>
      (champ.valeursPossibles.find(valeursPossibles => valeursPossibles.sontUtilisables(values))?.valeurs ?? []).map(valeur => ({
        cle: valeur,
        libelle: valeur
      })),
    [values]
  );

  useEffect(() => {
    const valeursOption = options.map(option => option.libelle);

    if (!valeursOption.includes(field.value) || nombreOptions !== valeursOption.length) {
      const nouvelleValeur = (() => {
        switch (true) {
          case valeursOption.includes(champ.valeurParDefaut ?? ""):
            return champ.valeurParDefaut ?? "";
          case Boolean(valeursOption[0]):
            return valeursOption[0];
          default:
            return "";
        }
      })();

      setFieldValue(name, nouvelleValeur);
      setNombreOptions(valeursOption.length);
    }
  }, [options]);

  return options.length ? (
    <ChampListeDeroulante
      libelle={champ.libelle}
      name={name}
      options={options}
    />
  ) : (
    <></>
  );
};

const AideALaSaisieMention: React.FC<IAideALaSaisieMention> = ({ metamodeleTypeMention }) => (
  <div className="mt-10 grid gap-6 pb-6 pl-8 pr-5">
    {metamodeleTypeMention?.metamodelsBlocs.map((bloc: BlocMetaModele) => (
      <div
        key={bloc.id}
        className="mt-4 rounded-xl border-2 border-solid border-bleu pb-2 text-start"
      >
        <div className="-mt-3 pl-4">
          <span className="bg-white px-2 text-start text-bleu-sombre">{bloc.titre}</span>
        </div>
        <div className="mt-3 flex flex-wrap">
          {bloc.champs.map((champ: ChampMetaModele) => (
            <ContneurChampFormulaireAideSaisie
              key={`${bloc.id}.${champ.id}`}
              champ={champ}
              idBloc={bloc.id}
            >
              <div className={getClassesChamp(champ.type)}>
                <Suspense fallback={<></>}>
                  {(() => {
                    switch (champ.type) {
                      case "text":
                        return (
                          <ChampsTexte
                            name={`${bloc.id}.${champ.id}`}
                            type="text"
                            libelle={champ.libelle}
                          />
                        );
                      case "select":
                        return (
                          <ChampListeDeroulateConditionnee
                            name={`${bloc.id}.${champ.id}`}
                            champ={champ}
                          />
                        );

                      case "boolean":
                        return (
                          <ChampsCaseACocher
                            name={`${bloc.id}.${champ.id}`}
                            libelle={champ.libelle}
                          />
                        );
                      case "dateComplete":
                      case "dateIncomplete":
                        return (
                          <ChampDate
                            name={`${bloc.id}.${champ.id}`}
                            libelle={champ.libelle}
                            desactiverCorrectionAutomatique
                          />
                        );
                      case "annee":
                      case "int":
                        return (
                          <ChampsTexte
                            name={`${bloc.id}.${champ.id}`}
                            libelle={champ.libelle}
                            numerique
                          />
                        );
                      case "sousTitre":
                        return <h3 className="-mb-3 ml-8 bg-blanc px-2 text-bleu-sombre">{champ.libelle}</h3>;
                      default:
                        return <></>;
                    }
                  })()}
                </Suspense>
              </div>
            </ContneurChampFormulaireAideSaisie>
          ))}
        </div>
      </div>
    ))}

    {metamodeleTypeMention?.modeleHandleBars && <TexteMentionAideALaSaisie templateTexteMention={metamodeleTypeMention.modeleHandleBars} />}
  </div>
);

export default AideALaSaisieMention;
/* v8 ignore end */
