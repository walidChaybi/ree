import { TEXTE_MENTION } from "@composant/formulaire/ConstantesNomsForm";
import { IChamp, IMetaModelBloc } from "@model/etatcivil/acte/mention/IMetaModeleTypeMention";
import { useFormikContext } from "formik";
import React, { Suspense, lazy, useContext } from "react";
import { EditionMiseAJourContext } from "../../../../../contexts/EditionMiseAJourContextProvider";
import PageChargeur from "../../../../commun/chargeurs/PageChargeur";

const ChampsCaseACocher = lazy(() => import("../../../../commun/champs/ChampsCaseACocher"));
const ChampDate = lazy(() => import("../../../../commun/champs/ChampDate"));
const ChampListeDeroulante = lazy(() => import("../../../../commun/champs/ChampListeDeroulante"));
const ChampsZoneTexte = lazy(() => import("../../../../commun/champs/ChampsZoneTexte"));
const ChampsTexte = lazy(() => import("../../../../commun/champs/ChampsTexte"));

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

const estChampMasque = (champ: IChamp, idBloc: string, valeurs: Record<string, any>) =>
  champ.exigencesPourValorisation.some(exigence => {
    const valeurPourExigencePresente = exigence.valeurs.includes(valeurs[idBloc]?.[exigence.idChampReference]?.toString());

    return exigence.operateur === "=" ? !valeurPourExigencePresente : valeurPourExigencePresente;
  });

const AideALaSaisieMention: React.FC = () => {
  const { metamodeleTypeMention } = useContext(EditionMiseAJourContext.Valeurs);
  const { values } = useFormikContext<Record<string, any>>();

  return (
    <div className="ml-14 mt-10 grid gap-6">
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
                .map((champ: IChamp) =>
                  estChampMasque(champ, bloc.id, values) ? (
                    <></>
                  ) : (
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
                                <ChampListeDeroulante
                                  libelle={champ.libelle}
                                  name={`${bloc.id}.${champ.id}`}
                                  options={champ.options.map(option => ({ cle: option, libelle: option }))}
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
                  )
                )}
            </div>
          </div>
        ))}

      <div className="flex w-full justify-center pt-4">
        <div className="w-full pr-5">
          <Suspense fallback={<PageChargeur />}>
            <ChampsZoneTexte
              libelle="Texte mention"
              name={TEXTE_MENTION}
              className="h-48 w-full pb-4"
              value={metamodeleTypeMention?.modeleHandleBars}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AideALaSaisieMention;
