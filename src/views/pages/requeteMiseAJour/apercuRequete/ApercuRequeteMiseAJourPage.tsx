import { RECEContextData } from "@core/contexts/RECEContext";
import {
  IEnregistrerMentionsEtAnalyseMarginaleParams,
  IMajAnalyseMarginale,
  useEnregistrerMentionsEtAnalyseMarginaleApiHook
} from "@hook/acte/EnregistrerMentionsApiHook";
import { IAbandonnerMajMentionsParams, useAbandonnerMajMentionsApiHook } from "@hook/acte/mentions/AbandonnerMiseAJourMentionsApiHook";
import {
  IDerniereAnalyseMarginalResultat,
  useDerniereAnalyseMarginaleApiHook
} from "@hook/requete/miseajour/DerniereAnalyseMarginaleApiHook";
import {
  IModifierStatutRequeteMiseAJourParams,
  useModifierStatutRequeteMiseAJourApiHook
} from "@hook/requete/miseajour/ModifierStatutRequeteMiseAJourApiHook";
import { useSupprimerDerniereAnalyseMarginaleNonValideApiHook } from "@hook/requete/miseajour/SupprimerDerniereAnalyseMarginaleNonValideApiHook";
import { estOfficierHabiliterPourTousLesDroits } from "@model/agent/IOfficier";
import { Droit } from "@model/agent/enum/Droit";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { TUuidActeParams } from "@model/params/TUuidActeParams";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import ActeRegistre from "@pages/requeteCreation/commun/composants/ActeRegistre";
import { URL_RECHERCHE_ACTE_INSCRIPTION } from "@router/ReceUrls";
import { UN, ZERO, getLibelle, shallowEgal, shallowEgalTableau } from "@util/Utils";
import messageManager from "@util/messageManager";
import { replaceUrl } from "@util/route/UrlUtil";
import { OperationLocaleEnCoursSimple } from "@widget/attente/OperationLocaleEnCoursSimple";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import { PopinSignatureMiseAJourMentions } from "@widget/signature/PopinSignatureMiseAJourMentions";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BlocageNavigationDetail, BlockerNavigation } from "../../../../composants/commun/blocker/BlockerNavigation";
import { ApercuActeMisAJour } from "./commun/ApercuActeMisAjour";
import MiseAJourAnalyseMarginale from "./contenu/MiseAJourAnalyseMarginale/MiseAJourAnalyseMarginale";
import MiseAJourMentions from "./contenu/MiseAJourMentions/MiseAJourMentions";
import "./scss/ApercuRequeteMiseAJourPage.scss";

interface ItemListe {
  titre: string;
  index: number;
  component: JSX.Element;
}

interface IMiseAJourDirty {
  mentionsFormEstDirty?: boolean;
  analyseMarginaleFormEstDirty?: boolean;
}

interface IMiseAJourValide {
  mentionsFormEstValide?: boolean;
  analyseMarginaleFormEstValide?: boolean;
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
  setNumeroOrdreEnModification: React.Dispatch<React.SetStateAction<number | undefined>>;
  estFormulaireDirty: IMiseAJourDirty;
  setEstFormulaireDirty: React.Dispatch<React.SetStateAction<IMiseAJourDirty>>;
  estFormulaireValide: IMiseAJourValide;
  setEstFormulaireValide: React.Dispatch<React.SetStateAction<IMiseAJourValide>>;
  derniereAnalyseMarginaleResultat: IDerniereAnalyseMarginalResultat | undefined;
  analyseMarginale: IMajAnalyseMarginale | undefined;
  setAnalyseMarginale: React.Dispatch<React.SetStateAction<IMajAnalyseMarginale | undefined>>;
  analyseMarginaleEnregistree: IMajAnalyseMarginale | undefined;
}

export const MiseAJourMentionsContext = React.createContext<IMiseAJourMentionsContext>({
  listeMentions: [],
  setListeMentions: ((mentions: IMajMention[]) => {}) as React.Dispatch<React.SetStateAction<IMajMention[]>>,
  listeMentionsEnregistrees: [],
  setNumeroOrdreEnModification: ((id: number) => {}) as React.Dispatch<React.SetStateAction<number | undefined>>,
  estFormulaireDirty: {
    mentionsFormEstDirty: false,
    analyseMarginaleFormEstDirty: false
  },
  setEstFormulaireDirty: ((value: IMiseAJourDirty) => {}) as React.Dispatch<React.SetStateAction<IMiseAJourDirty>>,
  estFormulaireValide: {
    mentionsFormEstValide: true,
    analyseMarginaleFormEstValide: true
  },
  setEstFormulaireValide: ((value: IMiseAJourValide) => {}) as React.Dispatch<React.SetStateAction<IMiseAJourValide>>,
  derniereAnalyseMarginaleResultat: undefined,
  analyseMarginale: undefined,
  setAnalyseMarginale: ((value: IMajAnalyseMarginale | undefined) => {}) as React.Dispatch<
    React.SetStateAction<IMajAnalyseMarginale | undefined>
  >,
  analyseMarginaleEnregistree: undefined
});

const ApercuRequeteMiseAJourPage: React.FC = () => {
  const { idActeParam, idRequeteParam } = useParams<TUuidActeParams>();

  const navigate = useNavigate();

  const { utilisateurConnecte } = useContext(RECEContextData);

  const [listeMentions, setListeMentions] = useState<IMajMention[]>([]);
  const [listeMentionsEnregistrees, setListeMentionsEnregistrees] = useState<IMajMention[]>([]);
  const [analyseMarginale, setAnalyseMarginale] = useState<IMajAnalyseMarginale | undefined>();
  const [analyseMarginaleEnregistree, setAnalyseMarginaleEnregistree] = useState<IMajAnalyseMarginale>();
  const [numeroOrdreEnModification, setNumeroOrdreEnModification] = useState<number>();
  const [estFormulaireDirty, setEstFormulaireDirty] = useState<IMiseAJourDirty>({
    mentionsFormEstDirty: false,
    analyseMarginaleFormEstDirty: false
  });
  const [estFormulaireValide, setEstFormulaireValide] = useState<IMiseAJourValide>({
    mentionsFormEstValide: true,
    analyseMarginaleFormEstValide: true
  });
  const [estPopinSignatureOuverte, setEstPopinSignatureOuverte] = useState<boolean>(false);
  const [ongletSelectionne, setOngletSelectionne] = useState(0);
  const [doitMettreAJourApercu, setDoitMettreAJourApercu] = useState<boolean>(false);
  const [affichageApresSignature, setAffichageApresSignature] = useState(false);
  const [estNavigationBloquee, setEstNavigationBloquee] = useState<BlocageNavigationDetail>({
    estBloquee: true,
    estPopinAffichee: false
  });
  const [resetFormAnalyseMarginale, setResetFormAnalyseMarginale] = useState<boolean>(false);

  const [abandonnerMajMentionsParams, setAbandonnerMajMentionsParams] = useState<IAbandonnerMajMentionsParams>();
  const resultatAbandonMentions = useAbandonnerMajMentionsApiHook(abandonnerMajMentionsParams);
  const [idActeAbandonnerDerniereAnalyseMarginaleNonValide, setIdActeAbandonnerDerniereAnalyseMarginaleNonValide] = useState<string>();
  const [modifierStatutRequeteMiseAJourParams, setModifierStatutRequeteMiseAJourParams] = useState<IModifierStatutRequeteMiseAJourParams>();
  const resultatAbandonRequete = useModifierStatutRequeteMiseAJourApiHook(modifierStatutRequeteMiseAJourParams);

  useEffect(() => {
    if (Boolean(resultatAbandonRequete)) {
      setEstNavigationBloquee({
        estBloquee: false,
        estPopinAffichee: false
      } as BlocageNavigationDetail);
    }
  }, [resultatAbandonRequete]);

  const [enregistrerMentionsEtAnalyseMarginaleParams, setEnregistrerMentionsEtAnalyseMarginaleParams] =
    useState<IEnregistrerMentionsEtAnalyseMarginaleParams>();

  const enregistrerMentionsApiHookResultat = useEnregistrerMentionsEtAnalyseMarginaleApiHook(enregistrerMentionsEtAnalyseMarginaleParams);

  const resultatSupressionDerniereAnalyseMarginaleNonValide = useSupprimerDerniereAnalyseMarginaleNonValideApiHook(
    idActeAbandonnerDerniereAnalyseMarginaleNonValide
  );

  useEffect(() => {
    if (!listeMentionsEnregistrees.length) {
      setOngletSelectionne(ZERO);
    }
  }, [listeMentionsEnregistrees]);

  const onClickAbandonnerDerniereAnalyseMarginaleNonValide = () => {
    setIdActeAbandonnerDerniereAnalyseMarginaleNonValide(idActeParam);
  };

  const [derniereAnalyseMarginaleParams, setDerniereAnalyseMarginaleParams] = useState<string>();

  const derniereAnalyseMarginaleResultat = useDerniereAnalyseMarginaleApiHook(derniereAnalyseMarginaleParams);

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
    if (resultatSupressionDerniereAnalyseMarginaleNonValide) {
      setAnalyseMarginale(undefined);
      setAnalyseMarginaleEnregistree(undefined);
      setIdActeAbandonnerDerniereAnalyseMarginaleNonValide(undefined);
      setResetFormAnalyseMarginale(true);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [resultatSupressionDerniereAnalyseMarginaleNonValide]);

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
        mention.typeMention.idMentionNiveauTrois || mention.typeMention.idMentionNiveauDeux || mention.typeMention.idMentionNiveauUn
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
    messageManager.showSuccessAndClose(getLibelle("L'acte a été mis à jour avec succès."));
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

  const estVerouilleCommunActualiserEtSigner =
    estFormulaireDirty.mentionsFormEstDirty || !estFormulaireValide.analyseMarginaleFormEstValide;

  const estVerrouilleActualiserEtVisualiser =
    estVerouilleCommunActualiserEtSigner ||
    (shallowEgalTableau(listeMentions, listeMentionsEnregistrees) && shallowEgal(analyseMarginale, analyseMarginaleEnregistree));

  const estVerrouilleTerminerEtSigner =
    listeMentions.length === ZERO ||
    estVerouilleCommunActualiserEtSigner ||
    estFormulaireDirty.analyseMarginaleFormEstDirty ||
    !estVerrouilleActualiserEtVisualiser;

  const actualiserEtVisualiserCallback = () => {
    if (idActeParam) {
      setEnregistrerMentionsEtAnalyseMarginaleParams({
        idActe: idActeParam,
        mentions: listeMentions.map(mention => ({
          idTypeMention:
            mention.typeMention.idMentionNiveauTrois || mention.typeMention.idMentionNiveauDeux || mention.typeMention.idMentionNiveauUn,
          numeroOrdre: mention.numeroOrdre,
          texteMention: mention.texte
        })),
        analyseMarginale: analyseMarginale
          ? {
              motif: analyseMarginale?.motif,
              nom: analyseMarginale?.nom,
              prenoms: analyseMarginale?.prenoms,
              secable: analyseMarginale.secable,
              nomPartie1: analyseMarginale?.nomPartie1,
              nomPartie2: analyseMarginale?.nomPartie2
            }
          : undefined
      });
    }
    setDoitMettreAJourApercu(true);
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
            estFormulaireValide,
            setEstFormulaireValide,
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
                    listeMentionsEnregistrees.length > ZERO && !affichageApresSignature,
                    affichageApresSignature,
                    doitMettreAJourApercu,
                    setDoitMettreAJourApercu
                  )}
                  ongletSelectionne={ongletSelectionne}
                  checkDirty={true}
                  handleChange={handleChange}
                />
                {!affichageApresSignature && (
                  <BoutonDoubleSubmit
                    className="boutonAbandonner"
                    title="Abandonner"
                    onClick={onClickBoutonAbandonner}
                  >
                    {getLibelle("Abandonner")}
                  </BoutonDoubleSubmit>
                )}
              </div>
              {!affichageApresSignature && (
                <div className="OngletsApercuCreationEtablissement">
                  <VoletAvecOnglet
                    liste={getListeOngletsDroit(
                      listeMentions,
                      onClickAbandonnerDerniereAnalyseMarginaleNonValide,
                      resetFormAnalyseMarginale,
                      setResetFormAnalyseMarginale
                    )}
                    checkDirty={true}
                  />
                  <div className="ConteneurBoutons">
                    <BoutonDoubleSubmit
                      disabled={estVerrouilleActualiserEtVisualiser}
                      onClick={actualiserEtVisualiserCallback}
                    >
                      {getLibelle("Actualiser et visualiser")}
                    </BoutonDoubleSubmit>
                    {estOfficierHabiliterPourTousLesDroits(utilisateurConnecte, [Droit.SIGNER_MENTION, Droit.METTRE_A_JOUR_ACTE]) && (
                      <BoutonDoubleSubmit
                        disabled={estVerrouilleTerminerEtSigner}
                        onClick={() => setEstPopinSignatureOuverte(true)}
                      >
                        {getLibelle("Terminer et Signer")}
                      </BoutonDoubleSubmit>
                    )}
                  </div>
                </div>
              )}
              <PopinSignatureMiseAJourMentions
                estOuvert={estPopinSignatureOuverte}
                setEstOuvert={setEstPopinSignatureOuverte}
                actionApresSignatureReussie={handleAffichageActeRecomposeApresSignature}
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
          messages={[getLibelle("La saisie en cours sera perdue."), getLibelle("Voulez-vous continuer ?")]}
        />
      </div>
      {affichageApresSignature && (
        <BoutonDoubleSubmit onClick={retourRMCActe}>{getLibelle("Retour rechercher un acte")}</BoutonDoubleSubmit>
      )}
    </div>
  );
};

const getListeOngletsGauche = (
  idActe: string,
  estVisibleApercuActeMisAJour: boolean,
  affichageApresSignature: boolean,
  doitMettreAJourApercu: boolean,
  setDoitMettreAJourApercu: React.Dispatch<React.SetStateAction<boolean>>
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
      component: (
        <ApercuActeMisAJour
          idActeAAfficher={idActe}
          doitMettreAJourApercu={doitMettreAJourApercu}
          setDoitMettreAJourApercu={setDoitMettreAJourApercu}
        />
      ),
      index: UN
    });
  }

  return liste;
};

const getListeOngletsDroit = (
  listeMentions: IMajMention[],
  onClickAbandonnerDerniereAnalyseMarginaleNonValide: () => void,
  resetFormAnalyseMarginale: boolean,
  setResetFormAnalyseMarginale: Dispatch<SetStateAction<boolean>>
): ItemListe[] => {
  const liste: ItemListe[] = [
    {
      titre: getLibelle("Gérer les mentions"),
      component: <MiseAJourMentions />,
      index: ZERO
    }
  ];

  const mentionChangeAM = listeMentions.some(mention => {
    return TypeMention.getTypeMentionById(
      mention.typeMention.idMentionNiveauTrois || mention.typeMention.idMentionNiveauDeux || mention.typeMention.idMentionNiveauUn
    )?.affecteAnalyseMarginale;
  });

  if (mentionChangeAM) {
    liste.push({
      titre: getLibelle("Analyse marginale"),
      component: (
        <MiseAJourAnalyseMarginale
          onClickAbandonnerDerniereAnalyseMarginaleNonValide={onClickAbandonnerDerniereAnalyseMarginaleNonValide}
          resetForm={resetFormAnalyseMarginale}
          setResetForm={setResetFormAnalyseMarginale}
        />
      ),
      index: UN
    });
  }
  return liste;
};

export default ApercuRequeteMiseAJourPage;
