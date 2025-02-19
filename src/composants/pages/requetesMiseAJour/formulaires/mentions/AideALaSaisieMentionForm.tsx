/* v8 ignore start */
import { BlocMetaModele, ChampMetaModele, MetaModeleTypeMention } from "@model/etatcivil/typesMention/MetaModeleTypeMention";
import React from "react";
import { ConteneurBlocFormulaireAideSaisie } from "./AideSaisieMentionForm/ConteneurBlocFormulaireAideSaisie";
import { ConteneurChampFormulaireAideSaisie } from "./AideSaisieMentionForm/ConteneurChampFormulaireAideSaisie";
import { TexteMentionAideALaSaisie } from "./GenerateurTexteSaisieMention";

interface IAideALaSaisieMention {
  metamodeleTypeMention: MetaModeleTypeMention | null;
}

const AideALaSaisieMention: React.FC<IAideALaSaisieMention> = ({ metamodeleTypeMention }) => (
  <div className="mt-10 grid gap-6">
    {metamodeleTypeMention?.metamodelsBlocs.map((bloc: BlocMetaModele) => (
      <ConteneurBlocFormulaireAideSaisie
        bloc={bloc}
        key={`${metamodeleTypeMention.idTypeMention}-${bloc.id}`}
      >
        {bloc.champs.map((champ: ChampMetaModele) => (
          <ConteneurChampFormulaireAideSaisie
            key={`${bloc.id}.${champ.id}`}
            champ={champ}
            idBloc={bloc.id}
          />
        ))}
      </ConteneurBlocFormulaireAideSaisie>
    ))}

    {metamodeleTypeMention?.modeleHandleBars && <TexteMentionAideALaSaisie templateTexteMention={metamodeleTypeMention.modeleHandleBars} />}
  </div>
);

export default AideALaSaisieMention;
/* v8 ignore end */
