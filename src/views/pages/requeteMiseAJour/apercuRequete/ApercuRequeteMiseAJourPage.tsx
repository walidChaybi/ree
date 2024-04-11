import {
  IAbandonnerMajMentionsParams,
  useAbandonnerMajMentionsApiHook
} from "@hook/acte/mentions/AbandonnerMiseAJourMentionsApiHook";
import {
  IModifierStatutRequeteMiseAJourParams,
  useModifierStatutRequeteMiseAJourApiHook
} from "@hook/requete/miseajour/ModifierStatutRequeteMiseAJourApiHook";
import { Droit } from "@model/agent/enum/Droit";
import { estOfficierHabiliterPourTousLesDroits } from "@model/agent/IOfficier";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { TUuidActeParams } from "@model/params/TUuidActeParams";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import ActeRegistre from "@pages/requeteCreation/commun/composants/ActeRegistre";
import { URL_RECHERCHE_ACTE_INSCRIPTION } from "@router/ReceUrls";
import messageManager from "@util/messageManager";
import { replaceUrl } from "@util/route/UrlUtil";
import { getLibelle, UN, ZERO } from "@util/Utils";
import { OperationLocaleEnCoursSimple } from "@widget/attente/OperationLocaleEnCoursSimple";
import { BlockerNavigation } from "@widget/blocker/BlockerNavigation";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { PopinSignatureMiseAJourMentions } from "@widget/signature/PopinSignatureMiseAJourMentions";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
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
  }
);

const ApercuRequeteMiseAJourPage: React.FC = () => {
  const { idActeParam, idRequeteParam } = useParams<TUuidActeParams>();

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
  const [affichageApresSignature, setAffichageApresSignature] = useState(false);
  const [estNavigationBloquee, setEstNavigationBloquee] =
    useState<boolean>(false);

  const [abandonnerMajMentionsParams, setAbandonnerMajMentionsParams] =
    useState<IAbandonnerMajMentionsParams>();
  const resultatAbandonMentions = useAbandonnerMajMentionsApiHook(
    abandonnerMajMentionsParams
  );

  const [
    modifierStatutRequeteMiseAJourParams,
    setModifierStatutRequeteMiseAJourParams
  ] = useState<IModifierStatutRequeteMiseAJourParams>();
  const resultatAbandonRequete = useModifierStatutRequeteMiseAJourApiHook(
    modifierStatutRequeteMiseAJourParams
  );

  const handleAffichageActeRecomposeApresSignature = () => {
    // TODO: [QuickFix] setOngletSelectionne permet de basculer sur le bon onglet.
    // A revoir quand on aura corriger le bug des onglets de VoletAvecOnglet.
    setOngletSelectionne(ZERO);
    setAffichageApresSignature(true);
    messageManager.showSuccessAndClose(
      getLibelle("L'acte a été mis à jour avec succès.")
    );
    setEstNavigationBloquee(false);
  };

  const navigate = useNavigate();

  const getListeOngletsGauche = (): ItemListe[] => {
    const liste: ItemListe[] = [
      {
        titre: getLibelle("Acte Registre"),
        component: (
          <ActeRegistre
            idActeAAfficher={idActeParam}
            affichageApresSignature={affichageApresSignature}
          />
        ),
        index: ZERO
      }
    ];
    if (listeMentionsEnregistrees.length > ZERO && !affichageApresSignature) {
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

  const retourRMCActe = () => {
    navigate(URL_RECHERCHE_ACTE_INSCRIPTION);
  };

  const onClickBoutonAbandonner = () => {
    replaceUrl(navigate, URL_RECHERCHE_ACTE_INSCRIPTION);
  };

  const onConfirmationBlocker = () => {
    idActeParam && setAbandonnerMajMentionsParams({ idActe: idActeParam });
  };

  useEffect(() => {
    if (listeMentionsEnregistrees.length > 0) {
      setEstNavigationBloquee(true);
    }
  }, [listeMentionsEnregistrees]);

  useEffect(() => {
    if (resultatAbandonMentions.termine && idRequeteParam) {
      setModifierStatutRequeteMiseAJourParams({
        idRequete: idRequeteParam,
        statutRequete: StatutRequete.ABANDONNEE
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatAbandonMentions]);

  return (
    <div>
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
                {!affichageApresSignature && (
                  <Bouton
                    className="boutonAbandonner"
                    title="Abandonner"
                    onClick={onClickBoutonAbandonner}
                  >
                    {getLibelle("Abandonner")}
                  </Bouton>
                )}
              </div>
              {!affichageApresSignature && (
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
              )}
              <PopinSignatureMiseAJourMentions
                estOuvert={estPopinSignatureOuverte}
                setEstOuvert={setEstPopinSignatureOuverte}
                actionApresSignatureReussie={
                  handleAffichageActeRecomposeApresSignature
                }
              />
            </>
          ) : (
            <OperationLocaleEnCoursSimple />
          )}
        </MiseAJourMentionsContext.Provider>
        <BlockerNavigation
          estNavigationBloquee={estNavigationBloquee}
          onConfirmation={onConfirmationBlocker}
          estNavigationDebloquee={!!resultatAbandonRequete}
          titre={getLibelle("Abandon du traitement")}
          messages={[
            getLibelle("La saisie en cours sera perdue."),
            getLibelle("Voulez-vous continuer ?")
          ]}
        />
      </div>
      {affichageApresSignature && (
        <Bouton onClick={retourRMCActe}>
          {getLibelle("Retour rechercher un acte")}
        </Bouton>
      )}
    </div>
  );
};

export default ApercuRequeteMiseAJourPage;
