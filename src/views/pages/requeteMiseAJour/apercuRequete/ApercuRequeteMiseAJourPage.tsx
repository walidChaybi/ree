import { TUuidActeParams } from "@model/params/TUuidActeParams";
import ActeRegistre from "@pages/requeteCreation/commun/composants/ActeRegistre";
import { getLibelle, UN, ZERO } from "@util/Utils";
import { OperationLocaleEnCoursSimple } from "@widget/attente/OperationLocaleEnCoursSimple";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React from "react";
import { useParams } from "react-router";
import MiseAJourAnalyseMarginale from "./contenu/MiseAJourAnalyseMarginal/MiseAJourAnalyseMarginal";
import MiseAJourMentions from "./contenu/MiseAJourMentions/MiseAJourMentions";
import "./scss/ApercuRequeteMiseAJourPage.scss";

interface ItemListe {
  titre: string;
  index: number;
  component: JSX.Element;
}

interface ApercuRequeteMiseAJourPageProps {}

const ApercuRequeteMiseAJourPage: React.FC<
  ApercuRequeteMiseAJourPageProps
> = props => {
  const { idActeParam } = useParams<TUuidActeParams>();

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
      {idActeParam ? (
        <>
          <div className="OngletsApercuCreationEtablissement">
            <VoletAvecOnglet liste={listeOngletsGauche} />
            <Bouton
              className="boutonAbandonner"
              title="Abandonner"
              onClick={() => console.log("abandon")}
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
