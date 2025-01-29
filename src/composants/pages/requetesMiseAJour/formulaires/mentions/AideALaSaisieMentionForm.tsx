/* v8 ignore start */
import { IChamp, IMetaModelBloc, IMetamodeleTypeMention, IValeursPossibles } from "@model/etatcivil/acte/mention/IMetaModeleTypeMention";
import { useField, useFormikContext } from "formik";
import React, { Suspense, lazy, useEffect, useMemo } from "react";
import { TMentionForm, TValeurAideSaisie } from "../MentionForm";
import { TexteMentionAideALaSaisie } from "./GenerateurTexteSaisieMention";

const ChampsCaseACocher = lazy(() => import("../../../../commun/champs/ChampsCaseACocher"));
const ChampDate = lazy(() => import("../../../../commun/champs/ChampDate"));
const ChampListeDeroulante = lazy(() => import("../../../../commun/champs/ChampListeDeroulante"));
const ChampsTexte = lazy(() => import("../../../../commun/champs/ChampsTexte"));

interface IAideALaSaisieMention {
  metamodeleTypeMention: IMetamodeleTypeMention | null;
}

const getClassesChamp = (typeChamp: string) => {
  switch (typeChamp) {
    case "text":
    case "select":
    case "dateComplete":
    case "dateIncomplete":
    case "int":
      return "w-[42.5%] px-[2.5%] pb-4";
    case "boolean":
      return "w-full px-[2.5%] pb-6 pt-4 text-left";
    default:
      return "";
  }
};

export const recupererValeurAttribut = (valeurs: TMentionForm, nomAttribut: string) =>
  nomAttribut
    .split(".")
    .reduce((valeur: TValeurAideSaisie, cle) => (typeof valeur === "object" ? (valeur[cle] ?? undefined) : undefined), valeurs);

const ContneurChampFormulaireAideSaisie: React.FC<{ champ: IChamp; children: React.ReactNode; idBloc: string }> = ({
  champ,
  children,
  idBloc
}) => {
  const { values, setFieldValue } = useFormikContext<TMentionForm>();
  const idChamp = useMemo(() => `${idBloc}.${champ.id}`, [champ, idBloc]);

  const estAffiche = useMemo(
    () =>
      champ.estAffiche.every(exigence => {
        switch (exigence.operateur) {
          case "AlwaysTrue":
            return true;
          case "AlwaysFalse":
            return false;
          default:
            return exigence.operateur === "=="
              ? exigence.valeurs.find(
                  valeurAttendue => recupererValeurAttribut(values, exigence.idChampReference)?.toString() === valeurAttendue.toString()
                )
              : exigence.valeurs.find(
                  valeurAttendue => recupererValeurAttribut(values, exigence.idChampReference)?.toString() !== valeurAttendue.toString()
                );
        }
      }),
    [values]
  );

  useEffect(() => {
    if (estAffiche) {
      return;
    }

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

  return estAffiche ? <>{children}</> : <></>;
};

const ChampListeDeroulateConditionnee: React.FC<{ libelle: string; name: string; valeursPossibles: IValeursPossibles[] }> = ({
  libelle,
  name,
  valeursPossibles
}) => {
  const [field] = useField(name);
  const { values, setFieldValue } = useFormikContext<TMentionForm>();
  const options = useMemo(() => {
    const valeursOption =
      valeursPossibles.filter(valeurPossible => {
        return valeurPossible.conditions.filter(exigence => {
          if (exigence.operateur === "AlwaysTrue") return true;

          const exigenceRespectee = exigence.valeurs.includes(recupererValeurAttribut(values, exigence.idChampReference)?.toString() ?? "");

          return exigence.operateur === "==" ? exigenceRespectee : !exigenceRespectee;
        }).length;
      })[0]?.valeurs ?? [];
    if (!valeursOption.includes(field.value)) {
      setFieldValue(name, valeursOption[0] ?? "");
    }

    return valeursOption.map(valeur => ({ cle: valeur, libelle: valeur }));
  }, [values]);

  return (
    <ChampListeDeroulante
      libelle={libelle}
      name={name}
      options={options}
    />
  );
};

const AideALaSaisieMention: React.FC<IAideALaSaisieMention> = ({ metamodeleTypeMention }) => (
  <div className="mt-10 grid gap-6 pb-6 pl-8 pr-5">
    {metamodeleTypeMention?.metamodelsBlocs
      .sort((blocA, blocB) => blocA.position - blocB.position)
      .map((bloc: IMetaModelBloc) => (
        <div
          key={bloc.id}
          className="mt-4 rounded-xl border-2 border-solid border-bleu pb-2 text-start"
        >
          <div className="-mt-3 pl-4">
            <span className="bg-white px-2 text-start text-bleu-sombre">{bloc.titre}</span>
          </div>
          <div className="mt-3 flex flex-wrap">
            {bloc.champs
              .sort((champA, champB) => champA.position - champB.position)
              .map((champ: IChamp) => (
                <ContneurChampFormulaireAideSaisie
                  key={`${bloc.id}.${champ.id}`}
                  champ={champ}
                  idBloc={bloc.id}
                >
                  <div
                    className={getClassesChamp(champ.type)}
                    key={`${bloc.id}.${champ.id}`}
                  >
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
                                libelle={champ.libelle}
                                name={`${bloc.id}.${champ.id}`}
                                valeursPossibles={champ.valeursPossibles}
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
                          case "int":
                            return (
                              <ChampsTexte
                                name={`${bloc.id}.${champ.id}`}
                                libelle={champ.libelle}
                                numerique
                              />
                            );
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

    {metamodeleTypeMention?.modeleHandleBars && (
      <TexteMentionAideALaSaisie
        blocs={metamodeleTypeMention.metamodelsBlocs}
        templateTexteMention={metamodeleTypeMention.modeleHandleBars}
      />
    )}
  </div>
);

export default AideALaSaisieMention;
/* v8 ignore end */
