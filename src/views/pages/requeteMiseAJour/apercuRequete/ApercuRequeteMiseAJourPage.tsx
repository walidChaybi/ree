import { TUuidActeParams } from "@model/params/TUuidActeParams";
import ActeRegistre from "@pages/requeteCreation/commun/composants/ActeRegistre";
import { getLibelle, UN, ZERO } from "@util/Utils";
import { OperationLocaleEnCoursSimple } from "@widget/attente/OperationLocaleEnCoursSimple";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useState } from "react";
import { useParams } from "react-router";
import MiseAJourAnalyseMarginale from "./contenu/MiseAJourAnalyseMarginal/MiseAJourAnalyseMarginal";
import MiseAJourMentions from "./contenu/MiseAJourMentions/MiseAJourMentions";
import "./scss/ApercuRequeteMiseAJourPage.scss";

interface ItemListe {
  titre: string;
  index: number;
  component: JSX.Element;
}

export interface IMentionsDetail {
  idMentionNiveauUn: string;
  idMentionNiveauDeux: string;
  idMentionNiveauTrois?: string;
}

export interface IMentions {
  texte: string;
  typeMention: IMentionsDetail;
  numeroOrdre: number;
}

interface IMiseAJourMentionsContext {
  listeMentions: IMentions[],
  setListeMentions: React.Dispatch<React.SetStateAction<IMentions[]>>,
  listeMentionsEnregistrees: IMentions[],
  setListeMentionsEnregistrees: React.Dispatch<React.SetStateAction<IMentions[]>>,
  numeroOrdreEnModification?: number,
  setNumeroOrdreEnModification: React.Dispatch<React.SetStateAction<number | undefined>>
}

export const MiseAJourMentionsContext = React.createContext<IMiseAJourMentionsContext>({
  listeMentions: [],
  setListeMentions: ((mentions: IMentions[]) => {}) as React.Dispatch<React.SetStateAction<IMentions[]>>,
  listeMentionsEnregistrees: [],
  setListeMentionsEnregistrees: ((mentions: IMentions[]) => {}) as React.Dispatch<React.SetStateAction<IMentions[]>>,
  setNumeroOrdreEnModification: ((id: number) => {}) as React.Dispatch<React.SetStateAction<number | undefined>>
});

const ApercuRequeteMiseAJourPage: React.FC = () => {
  const { idActeParam } = useParams<TUuidActeParams>();
  const [numeroOrdreEnModification, setNumeroOrdreEnModification] =
    useState<number>();
  const [listeMentionsEnregistrees, setListeMentionsEnregistrees] = useState<IMentions[]>([]);
  const [listeMentions, setListeMentions] = useState<IMentions[]>([]);

  const listeOngletsGauche: ItemListe[] = [
    {
      titre: getLibelle("Acte Registre"),
      component: <ActeRegistre idActeAAfficher={idActeParam} />,
      index: ZERO
    }
  ];

  const listeOngletsDroit: ItemListe[] = [
    {
      titre: getLibelle("Gérer les mentions"),
      component: <MiseAJourMentions />,
      index: ZERO
    },
    {
      titre: getLibelle("Analyse marginale"),
      component: <MiseAJourAnalyseMarginale />,
      index: UN
    }
  ];

  return (
    <div className="ApercuRequeteMiseAJourPage">
      <MiseAJourMentionsContext.Provider
        value={{
          listeMentions,
          setListeMentions,
          numeroOrdreEnModification,
          setNumeroOrdreEnModification,
          listeMentionsEnregistrees,
          setListeMentionsEnregistrees
        }}
      >
        {idActeParam ? (
          <>
            <div className="OngletsApercuCreationEtablissement">
              <VoletAvecOnglet liste={listeOngletsGauche} />
              <Bouton
                className="boutonAbandonner"
                title="Abandonner"
                onClick={() => {}}
              >
                {getLibelle("Abandonner")}
              </Bouton>
            </div>
            <div className="OngletsApercuCreationEtablissement">
              <VoletAvecOnglet liste={listeOngletsDroit} checkDirty={true} />
            </div>
          </>
        ) : (
          <OperationLocaleEnCoursSimple />
        )}
      </MiseAJourMentionsContext.Provider>
    </div>
  );
};

export default ApercuRequeteMiseAJourPage;
