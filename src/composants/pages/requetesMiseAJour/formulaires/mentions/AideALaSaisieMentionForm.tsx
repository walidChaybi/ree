import { TEXTE_MENTION } from "@composant/formulaire/ConstantesNomsForm";
import { IChamp, IMetaModelBloc } from "@model/etatcivil/acte/mention/IMetaModeleTypeMention";
import { useFormikContext } from "formik";
import React, { Suspense, lazy, useContext } from "react";
import { EditionMiseAJourContext } from "../../../../../contexts/EditionMiseAJourContextProvider";
import ChampDate from "../../../../commun/champs/ChampDate";
import ChampListeDeroulante from "../../../../commun/champs/ChampListeDeroulante";
import PageChargeur from "../../../../commun/chargeurs/PageChargeur";
const ChampsCaseACocher = lazy(() => import("../../../../commun/champs/ChampsCaseACocher"));
const ChampsZoneTexte = lazy(() => import("../../../../commun/champs/ChampsZoneTexte"));
const ChampsTexte = lazy(() => import("../../../../commun/champs/ChampsTexte"));

const renderChampFormulaire = (champ: IChamp, idBlock: string, values: Record<string, any>) => {
  const masquerChamp = champ.exigencesPourValorisation.some(exigence => {
    return exigence.operateur === "="
      ? !exigence.valeurs.includes(values[idBlock]?.[exigence.idChampReference]?.toString())
      : exigence.valeurs.includes(values[idBlock]?.[exigence.idChampReference]?.toString());
  });
  if (masquerChamp) return;

  switch (champ.type) {
    case "text":
      return (
        <div
          className="w-[42.5%] px-[2.5%] pb-4"
          key={`${idBlock}.${champ.id}`}
        >
          <Suspense fallback={<PageChargeur />}>
            <ChampsTexte
              name={`${idBlock}.${champ.id}`}
              type="text"
              libelle={champ.libelle}
            />
          </Suspense>
        </div>
      );
    case "select":
      return (
        <div
          className="w-[42.5%] px-[2.5%] pb-4"
          key={`${idBlock}.${champ.id}`}
        >
          <Suspense fallback={<PageChargeur />}>
            <ChampListeDeroulante
              libelle={champ.libelle}
              name={`${idBlock}.${champ.id}`}
              options={champ.options}
            />
          </Suspense>
        </div>
      );
    case "boolean":
      return (
        <div
          className="w-full px-[2.5%] pb-6 pt-4 text-left"
          key={`${idBlock}.${champ.id}`}
        >
          <Suspense fallback={<PageChargeur />}>
            <ChampsCaseACocher
              name={`${idBlock}.${champ.id}`}
              libelle={champ.libelle}
            />
          </Suspense>
        </div>
      );
    case "dateComplete":
    case "dateIncomplete":
      return (
        <div
          className="w-[42.5%] px-[2.5%] pb-4"
          key={`${idBlock}.${champ.id}`}
        >
          <Suspense fallback={<PageChargeur />}>
            <ChampDate
              name={`${idBlock}.${champ.id}`}
              libelle={champ.libelle}
            />
          </Suspense>
        </div>
      );
    case "int":
      return (
        <div
          className="w-[42.5%] px-[2.5%] pb-4"
          key={`${idBlock}.${champ.id}`}
        >
          <Suspense fallback={<PageChargeur />}>
            <ChampsTexte
              name={`${idBlock}.${champ.id}`}
              type="text"
              libelle={champ.libelle}
            />
          </Suspense>
        </div>
      );
    default:
      return <></>;
  }
};

const AideALaSaisieMention: React.FC = () => {
  const { metamodeleTypeMention } = useContext(EditionMiseAJourContext.Valeurs);

  const { setFieldTouched, setFieldValue, values } = useFormikContext<Record<string, any>>();

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
                .map((champ: IChamp) => {
                  return renderChampFormulaire(champ, bloc.id, values);
                })}
            </div>
          </div>
        ))}

      <div className="w-full border-0 border-t border-solid border-gris-clair pt-6">
        <h3 className="text-left">Texte mention</h3>
        <Suspense fallback={<PageChargeur />}>
          <ChampsZoneTexte
            name={TEXTE_MENTION}
            className="mr-14 h-48 w-11/12 pb-4"
            value={metamodeleTypeMention?.modeleHandleBars}
            onChange={event => {
              setFieldTouched(TEXTE_MENTION);
              setFieldValue(TEXTE_MENTION, event.target.value, true);
            }}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default AideALaSaisieMention;
