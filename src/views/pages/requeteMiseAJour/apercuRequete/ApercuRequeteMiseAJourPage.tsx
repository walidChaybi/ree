import {
  IMentionsParams,
  useMentionsApiHook
} from "@hook/acte/mentions/MentionsApiHook";
import { mappingVersMentionAffichagePourMiseAJour } from "@model/etatcivil/acte/mention/IMentionAffichage";
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

const ApercuRequeteMiseAJourPage: React.FC = () => {
  const { idActeParam } = useParams<TUuidActeParams>();

  const [mentionsApiParams, setMentionsApiParams] = useState<IMentionsParams>();
  const mentionsActeResultat = useMentionsApiHook(mentionsApiParams);

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
    </div>
  );
};

export default ApercuRequeteMiseAJourPage;
