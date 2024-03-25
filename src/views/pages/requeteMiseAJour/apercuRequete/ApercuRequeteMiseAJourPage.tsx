import { Droit } from "@model/agent/enum/Droit";
import { estOfficierHabiliterPourTousLesDroits } from "@model/agent/IOfficier";
import { TUuidActeParams } from "@model/params/TUuidActeParams";
import ActeRegistre from "@pages/requeteCreation/commun/composants/ActeRegistre";
import { getLibelle, UN, ZERO } from "@util/Utils";
import { OperationLocaleEnCoursSimple } from "@widget/attente/OperationLocaleEnCoursSimple";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { PopinSignatureMiseAJourMentions } from "@widget/signature/PopinSignatureMiseAJourMentions";
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
  listeMentions: IMentions[];
  setListeMentions: React.Dispatch<React.SetStateAction<IMentions[]>>;
  listeMentionsEnregistrees: IMentions[];
  setListeMentionsEnregistrees: React.Dispatch<
    React.SetStateAction<IMentions[]>
  >;
  numeroOrdreEnModification?: number;
  setNumeroOrdreEnModification: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  estFormulaireDirty: boolean;
  setEstFormulaireDirty: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MiseAJourMentionsContext =
  React.createContext<IMiseAJourMentionsContext>({
    listeMentions: [],
    setListeMentions: ((mentions: IMentions[]) => {}) as React.Dispatch<
      React.SetStateAction<IMentions[]>
    >,
    listeMentionsEnregistrees: [],
    setListeMentionsEnregistrees: ((
      mentions: IMentions[]
    ) => {}) as React.Dispatch<React.SetStateAction<IMentions[]>>,
    setNumeroOrdreEnModification: ((id: number) => {}) as React.Dispatch<
      React.SetStateAction<number | undefined>
    >,
    estFormulaireDirty: false,
    setEstFormulaireDirty: ((value: boolean) => {}) as React.Dispatch<
      React.SetStateAction<boolean>
    >
  });

const ApercuRequeteMiseAJourPage: React.FC = () => {
  const { idActeParam } = useParams<TUuidActeParams>();
  const [numeroOrdreEnModification, setNumeroOrdreEnModification] =
    useState<number>();
  const [listeMentionsEnregistrees, setListeMentionsEnregistrees] = useState<
    IMentions[]
  >([]);
  const [listeMentions, setListeMentions] = useState<IMentions[]>([]);
  const [estFormulaireDirty, setEstFormulaireDirty] = useState<boolean>(false);
  const [estPopinOuverte, setEstPopinOuverte] = useState<boolean>(false);

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
          setListeMentionsEnregistrees,
          estFormulaireDirty,
          setEstFormulaireDirty
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
              {estOfficierHabiliterPourTousLesDroits([
                Droit.SIGNER_MENTION,
                Droit.METTRE_A_JOUR_ACTE
              ]) && (
                <Bouton onClick={() => setEstPopinOuverte(true)}>
                  {getLibelle("Terminer et Signer")}
                </Bouton>
              )}
            </div>
            <PopinSignatureMiseAJourMentions
              estOuvert={estPopinOuverte}
              setEstOuvert={setEstPopinOuverte}
            />
          </>
        ) : (
          <OperationLocaleEnCoursSimple />
        )}
      </MiseAJourMentionsContext.Provider>
    </div>
  );
};

export default ApercuRequeteMiseAJourPage;
