import { Droit } from "@model/agent/enum/Droit";
import { estOfficierHabiliterPourTousLesDroits } from "@model/agent/IOfficier";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { TUuidActeParams } from "@model/params/TUuidActeParams";
import ActeRegistre from "@pages/requeteCreation/commun/composants/ActeRegistre";
import { getLibelle, UN, ZERO } from "@util/Utils";
import { OperationLocaleEnCoursSimple } from "@widget/attente/OperationLocaleEnCoursSimple";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { PopinSignatureMiseAJourMentions } from "@widget/signature/PopinSignatureMiseAJourMentions";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ApercuActeMisAJour } from "../commun/ApercuActeMisAjour";
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
  setOngletSelectionne: React.Dispatch<React.SetStateAction<number>>;
  setEstBoutonTerminerSignerActif: React.Dispatch<
    React.SetStateAction<boolean>
  >;
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
    >,
    setOngletSelectionne: ((value: number) => {}) as React.Dispatch<
      React.SetStateAction<number>
    >,
    setEstBoutonTerminerSignerActif: ((value: boolean) => {}) as React.Dispatch<
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
  const [estPopinSignatureOuverte, setEstPopinSignatureOuverte] =
    useState<boolean>(false);
  const [ongletSelectionne, setOngletSelectionne] = useState(0);
  const [estBoutonTerminerSignerActif, setEstBoutonTerminerSignerActif] =
    useState(false);

  const getListeOngletsGauche = (): ItemListe[] => {
    const liste: ItemListe[] = [
      {
        titre: getLibelle("Acte Registre"),
        component: <ActeRegistre idActeAAfficher={idActeParam} />,
        index: ZERO
      }
    ];
    if (listeMentionsEnregistrees.length > 0) {
      liste.push({
        titre: getLibelle("Apercu acte mis à jour"),
        component: <ApercuActeMisAJour idActeAAfficher={idActeParam} />,
        index: UN
      });
    }

    return liste;
  };

  useEffect(() => {
    if (estFormulaireDirty) {
      setEstBoutonTerminerSignerActif(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estFormulaireDirty]);

  useEffect(() => {
    if (!listeMentionsEnregistrees.length) {
      setOngletSelectionne(ZERO);
    }
  }, [listeMentionsEnregistrees]);

  const getListeOngletsDroit = (): ItemListe[] => {
    const liste: ItemListe[] = [
      {
        titre: getLibelle("Gérer les mentions"),
        component: <MiseAJourMentions />,
        index: ZERO
      }
    ];

    const mentionChangeAM = listeMentions.some(mention => {
      return TypeMention.getTypeMentionById(
        mention.typeMention.idMentionNiveauTrois ||
          mention.typeMention.idMentionNiveauDeux ||
          mention.typeMention.idMentionNiveauUn
      )?.affecteAnalyseMarginale;
    });

    if (mentionChangeAM) {
      liste.push({
        titre: getLibelle("Analyse marginale"),
        component: <MiseAJourAnalyseMarginale />,
        index: UN
      });
    }
    return liste;
  };

  const handleChange = (newValue: number) => {
    setOngletSelectionne(newValue);
  };

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
          setEstFormulaireDirty,
          setOngletSelectionne,
          setEstBoutonTerminerSignerActif
        }}
      >
        {idActeParam ? (
          <>
            <div className="OngletsApercuCreationEtablissement">
              <VoletAvecOnglet
                liste={getListeOngletsGauche()}
                ongletSelectionne={ongletSelectionne}
                checkDirty={true}
                handleChange={handleChange}
              />
              <Bouton
                className="boutonAbandonner"
                title="Abandonner"
                onClick={() => {}}
              >
                {getLibelle("Abandonner")}
              </Bouton>
            </div>
            <div className="OngletsApercuCreationEtablissement">
              <VoletAvecOnglet
                liste={getListeOngletsDroit()}
                checkDirty={true}
              />
              {estOfficierHabiliterPourTousLesDroits([
                Droit.SIGNER_MENTION,
                Droit.METTRE_A_JOUR_ACTE
              ]) && (
                <Bouton
                  disabled={!estBoutonTerminerSignerActif}
                  onClick={() => setEstPopinSignatureOuverte(true)}
                >
                  {getLibelle("Terminer et Signer")}
                </Bouton>
              )}
            </div>
            <PopinSignatureMiseAJourMentions
              estOuvert={estPopinSignatureOuverte}
              setEstOuvert={setEstPopinSignatureOuverte}
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
