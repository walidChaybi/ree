import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { TUuidActeParams } from "@model/params/TUuidActeParams";
import ActeRegistre from "@pages/requeteCreation/commun/composants/ActeRegistre";
import { getLibelle, UN, ZERO } from "@util/Utils";
import { OperationLocaleEnCoursSimple } from "@widget/attente/OperationLocaleEnCoursSimple";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useEffect, useState } from "react";
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

export const MiseAJourMentionsContext = React.createContext({
  listeMentions: [] as IMentions[],
  setListeMentions: (liste: IMentions[]) => {}
});

const ApercuRequeteMiseAJourPage: React.FC = () => {
  const { idActeParam } = useParams<TUuidActeParams>();

  const [listeMentions, setListeMentions] = useState<IMentions[]>([]);

  useEffect(() => {
    if (
      listeMentions.find(mention =>
        TypeMention.getIdsMentionsChangementAnalyseMarginal().includes(
          TypeMention.getMentionsById(
            mention.typeMention.idMentionNiveauTrois ||
              mention.typeMention.idMentionNiveauDeux ||
              mention.typeMention.idMentionNiveauUn
          )?.id || ""
        )
      )
    ) {
      window.alert(
        "Veuillez vérifier s'il y a lieu de mettre à jour l'analyse marginal"
      );
    }
  }, [listeMentions]);

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
          setListeMentions
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
