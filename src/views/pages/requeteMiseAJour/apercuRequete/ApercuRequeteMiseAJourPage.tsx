import {
  IEnregistrerMentionsEtAnalyseMarginaleParams,
  IMajAnalyseMarginale,
  useEnregistrerMentionsEtAnalyseMarginaleApiHook
} from "@hook/acte/EnregistrerMentionsApiHook";
import {
  IAbandonnerMajMentionsParams,
  useAbandonnerMajMentionsApiHook
} from "@hook/acte/mentions/AbandonnerMiseAJourMentionsApiHook";
import {
  IDerniereAnalyseMarginalResultat,
  useDerniereAnalyseMarginaleApiHook
} from "@hook/requete/miseajour/DerniereAnalyseMarginaleApiHook";
import {
  IModifierStatutRequeteMiseAJourParams,
  useModifierStatutRequeteMiseAJourApiHook
} from "@hook/requete/miseajour/ModifierStatutRequeteMiseAJourApiHook";
import { estOfficierHabiliterPourTousLesDroits } from "@model/agent/IOfficier";
import { Droit } from "@model/agent/enum/Droit";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { TUuidActeParams } from "@model/params/TUuidActeParams";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import ActeRegistre from "@pages/requeteCreation/commun/composants/ActeRegistre";
import { URL_RECHERCHE_ACTE_INSCRIPTION } from "@router/ReceUrls";
import {
  UN,
  ZERO,
  getLibelle,
  shallowEgal,
  shallowEgalTableau
} from "@util/Utils";
import messageManager from "@util/messageManager";
import { replaceUrl } from "@util/route/UrlUtil";
import { OperationLocaleEnCoursSimple } from "@widget/attente/OperationLocaleEnCoursSimple";
import {
  BlocageNavigationDetail,
  BlockerNavigation
} from "@widget/blocker/BlockerNavigation";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { PopinSignatureMiseAJourMentions } from "@widget/signature/PopinSignatureMiseAJourMentions";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ApercuActeMisAJour } from "../commun/ApercuActeMisAjour";
import MiseAJourAnalyseMarginale from "./contenu/MiseAJourAnalyseMarginale/MiseAJourAnalyseMarginale";
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

export interface IMajMention {
  texte: string;
  typeMention: IMentionsDetail;
  numeroOrdre: number;
}

interface IMiseAJourMentionsContext {
  listeMentions: IMajMention[];
  setListeMentions: React.Dispatch<React.SetStateAction<IMajMention[]>>;
  listeMentionsEnregistrees: IMajMention[];
  numeroOrdreEnModification?: number;
  setNumeroOrdreEnModification: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  estFormulaireDirty: boolean;
  setEstFormulaireDirty: React.Dispatch<React.SetStateAction<boolean>>;
  derniereAnalyseMarginaleResultat:
    | IDerniereAnalyseMarginalResultat
    | undefined;
  analyseMarginale: IMajAnalyseMarginale | undefined;
  setAnalyseMarginale: React.Dispatch<
    React.SetStateAction<IMajAnalyseMarginale | undefined>
  >;
  analyseMarginaleEnregistree: IMajAnalyseMarginale | undefined;
}

export const MiseAJourMentionsContext = React.createContext<IMiseAJourMentionsContext>(
  {
    listeMentions: [],
    setListeMentions: ((mentions: IMajMention[]) => {}) as React.Dispatch<
      React.SetStateAction<IMajMention[]>
    >,
    listeMentionsEnregistrees: [],
    setNumeroOrdreEnModification: ((id: number) => {}) as React.Dispatch<
      React.SetStateAction<number | undefined>
    >,
    estFormulaireDirty: false,
    setEstFormulaireDirty: ((value: boolean) => {}) as React.Dispatch<
      React.SetStateAction<boolean>
    >,
    derniereAnalyseMarginaleResultat: undefined,
    analyseMarginale: undefined,
    setAnalyseMarginale: ((
      value: IMajAnalyseMarginale | undefined
    ) => {}) as React.Dispatch<
      React.SetStateAction<IMajAnalyseMarginale | undefined>
    >,
    analyseMarginaleEnregistree: undefined
  }
);

const ApercuRequeteMiseAJourPage: React.FC = () => {
  const { idActeParam, idRequeteParam } = useParams<TUuidActeParams>();

  const navigate = useNavigate();

  const [listeMentions, setListeMentions] = useState<IMajMention[]>([]);
  const [listeMentionsEnregistrees, setListeMentionsEnregistrees] = useState<
    IMajMention[]
  >([]);
  const [analyseMarginale, setAnalyseMarginale] = useState<
    IMajAnalyseMarginale | undefined
  >();
  const [analyseMarginaleEnregistree, setAnalyseMarginaleEnregistree] =
    useState<IMajAnalyseMarginale>();
  const [numeroOrdreEnModification, setNumeroOrdreEnModification] =
    useState<number>();
  const [estFormulaireDirty, setEstFormulaireDirty] = useState<boolean>(false);
  const [estPopinSignatureOuverte, setEstPopinSignatureOuverte] =
    useState<boolean>(false);
  const [ongletSelectionne, setOngletSelectionne] = useState(0);
  const [affichageApresSignature, setAffichageApresSignature] = useState(false);
  const [estNavigationBloquee, setEstNavigationBloquee] =
    useState<BlocageNavigationDetail>({
      estBloquee: true,
      estPopinAffichee: false
    });

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

  useEffect(() => {
    if (Boolean(resultatAbandonRequete)) {
      setEstNavigationBloquee({
        estBloquee: false,
        estPopinAffichee: false
      } as BlocageNavigationDetail);
    }
  }, [resultatAbandonRequete]);

  const [
    enregistrerMentionsEtAnalyseMarginaleParams,
    setEnregistrerMentionsEtAnalyseMarginaleParams
  ] = useState<IEnregistrerMentionsEtAnalyseMarginaleParams>();
  const enregistrerMentionsApiHookResultat =
    useEnregistrerMentionsEtAnalyseMarginaleApiHook(
      enregistrerMentionsEtAnalyseMarginaleParams
    );

  useEffect(() => {
    if (!listeMentionsEnregistrees.length) {
      setOngletSelectionne(ZERO);
    }
  }, [listeMentionsEnregistrees]);

  const [derniereAnalyseMarginaleParams, setDerniereAnalyseMarginaleParams] =
    useState<string>();

  const derniereAnalyseMarginaleResultat = useDerniereAnalyseMarginaleApiHook(
    derniereAnalyseMarginaleParams
  );

  useEffect(() => {
    if (resultatAbandonMentions.termine && idRequeteParam) {
      setModifierStatutRequeteMiseAJourParams({
        idRequete: idRequeteParam,
        statutRequete: StatutRequete.ABANDONNEE
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatAbandonMentions]);

  useEffect(() => {
    if (enregistrerMentionsApiHookResultat) {
      setListeMentionsEnregistrees(listeMentions);
      setAnalyseMarginaleEnregistree(analyseMarginale);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enregistrerMentionsApiHookResultat]);

  useEffect(() => {
    if (listeMentionsEnregistrees.length > ZERO) {
      setEstNavigationBloquee({
        estBloquee: true,
        estPopinAffichee: true
      } as BlocageNavigationDetail);
    }
  }, [listeMentionsEnregistrees]);

  useEffect(() => {
    const mentionChangeAM = listeMentions.some(mention => {
      return TypeMention.getTypeMentionById(
        mention.typeMention.idMentionNiveauTrois ||
          mention.typeMention.idMentionNiveauDeux ||
          mention.typeMention.idMentionNiveauUn
      )?.affecteAnalyseMarginale;
    });
    if (mentionChangeAM) {
      setDerniereAnalyseMarginaleParams(idActeParam);
    } else {
      setDerniereAnalyseMarginaleParams(undefined);
      setAnalyseMarginale(undefined);
    }
  }, [listeMentions, idActeParam]);

  const abandonnerRequete = () => {
    if (idRequeteParam) {
      setModifierStatutRequeteMiseAJourParams({
        idRequete: idRequeteParam,
        statutRequete: StatutRequete.ABANDONNEE
      });
    }
  };

  const handleChange = (newValue: number) => {
    setOngletSelectionne(newValue);
  };

  const handleAffichageActeRecomposeApresSignature = () => {
    // TODO: [QuickFix] setOngletSelectionne permet de basculer sur le bon onglet.
    // A revoir quand on aura corriger le bug des onglets de VoletAvecOnglet.
    setOngletSelectionne(ZERO);
    setAffichageApresSignature(true);
    messageManager.showSuccessAndClose(
      getLibelle("L'acte a été mis à jour avec succès.")
    );
    setEstNavigationBloquee({
      estBloquee: false,
      estPopinAffichee: false
    } as BlocageNavigationDetail);
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

  const estVerrouilleActualiserEtVisualiser =
    (shallowEgalTableau(listeMentions, listeMentionsEnregistrees) &&
      shallowEgal(analyseMarginale, analyseMarginaleEnregistree)) ||
    estFormulaireDirty;

  const estVerrouilleTerminerEtSigner =
    !estVerrouilleActualiserEtVisualiser ||
    estFormulaireDirty ||
    listeMentions.length === ZERO;

  const actualiserEtVisualiserCallback = () => {
    if (idActeParam) {
      setEnregistrerMentionsEtAnalyseMarginaleParams({
        idActe: idActeParam,
        mentions: listeMentions.map(mention => ({
          idTypeMention:
            mention.typeMention.idMentionNiveauTrois ||
            mention.typeMention.idMentionNiveauDeux ||
            mention.typeMention.idMentionNiveauUn,
          numeroOrdre: mention.numeroOrdre,
          texteMention: mention.texte
        })),
        analyseMarginale: analyseMarginale
          ? {
              motif: analyseMarginale?.motif,
              nom: analyseMarginale?.nom,
              prenoms: analyseMarginale?.prenoms,
              nomPartie1: analyseMarginale?.nomPartie1,
              nomPartie2: analyseMarginale?.nomPartie2
            }
          : undefined
      });
    }
    setOngletSelectionne(UN);
  };

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
            estFormulaireDirty,
            setEstFormulaireDirty,
            derniereAnalyseMarginaleResultat,
            analyseMarginale,
            setAnalyseMarginale,
            analyseMarginaleEnregistree
          }}
        >
          {idActeParam ? (
            <>
              <div className="OngletsApercuCreationEtablissement">
                <VoletAvecOnglet
                  liste={getListeOngletsGauche(
                    idActeParam,
                    listeMentionsEnregistrees.length > ZERO &&
                      !affichageApresSignature,
                    affichageApresSignature
                  )}
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
                    liste={getListeOngletsDroit(listeMentions)}
                    checkDirty={true}
                  />
                  <div className="ConteneurBoutons">
                    <Bouton
                      disabled={estVerrouilleActualiserEtVisualiser}
                      onClick={actualiserEtVisualiserCallback}
                    >
                      {getLibelle("Actualiser et visualiser")}
                    </Bouton>
                    {estOfficierHabiliterPourTousLesDroits([
                      Droit.SIGNER_MENTION,
                      Droit.METTRE_A_JOUR_ACTE
                    ]) && (
                      <Bouton
                        disabled={estVerrouilleTerminerEtSigner}
                        onClick={() => setEstPopinSignatureOuverte(true)}
                      >
                        {getLibelle("Terminer et Signer")}
                      </Bouton>
                    )}
                  </div>
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
          titre={getLibelle("Abandon du traitement")}
          fonctionAExecuterAvantRedirection={abandonnerRequete}
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

const getListeOngletsGauche = (
  idActe: string,
  estVisibleApercuActeMisAJour: boolean,
  affichageApresSignature: boolean
): ItemListe[] => {
  const liste: ItemListe[] = [
    {
      titre: getLibelle("Acte Registre"),
      component: (
        <ActeRegistre
          idActeAAfficher={idActe}
          affichageApresSignature={affichageApresSignature}
        />
      ),
      index: ZERO
    }
  ];
  if (estVisibleApercuActeMisAJour) {
    liste.push({
      titre: getLibelle("Apercu acte mis à jour"),
      component: <ApercuActeMisAJour idActeAAfficher={idActe} />,
      index: UN
    });
  }

  return liste;
};

const getListeOngletsDroit = (listeMentions: IMajMention[]): ItemListe[] => {
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

export default ApercuRequeteMiseAJourPage;
