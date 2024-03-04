import {
  IMentionsParams,
  useMentionsApiHook
} from "@hook/acte/mentions/MentionsApiHook";
import { mappingVersMentionAffichagePourMiseAJour } from "@model/etatcivil/acte/mention/IMentionAffichage";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { StatutMention } from "@model/etatcivil/enum/StatutMention";
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
  ordre: number;
}

export const MiseAJourAMContext = React.createContext({
  afficheOngletAM: false,
  setAfficheOngletAM: (bool: boolean) => {},
  listeMentions: [] as IMentions[],
  setListeMentions: (liste: IMentions[]) => {}
});

const ApercuRequeteMiseAJourPage: React.FC = () => {
  const { idActeParam } = useParams<TUuidActeParams>();

  const [mentionsApiParams, setMentionsApiParams] = useState<IMentionsParams>();
  const [afficheOngletAM, setAfficheOngletAM] = useState<boolean>(false);
  const [listeMentions, setListeMentions] = useState<IMentions[]>([]);
  const mentionsActeResultat = useMentionsApiHook(mentionsApiParams);

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

  useEffect(() => {
    if (idActeParam) {
      setMentionsApiParams({
        idActe: idActeParam,
        statutMention: StatutMention.BROUILLON
      });
    }
  }, [idActeParam]);

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
      component:
        mentionsActeResultat?.mentions === undefined ? (
          <></>
        ) : (
          <MiseAJourMentions
            mentionsAffichees={mappingVersMentionAffichagePourMiseAJour(
              mentionsActeResultat.mentions
            )}
          />
        ),
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
      <MiseAJourAMContext.Provider
        value={{
          afficheOngletAM,
          setAfficheOngletAM,
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
      </MiseAJourAMContext.Provider>
    </div>
  );
};

export default ApercuRequeteMiseAJourPage;
