import { CONFIG_PUT_ANALYSE_MARGINALE_ET_MENTIONS } from "@api/configurations/etatCivil/PutAnalyseMarginaleEtMentionsConfigApi";
import { CONFIG_PUT_MISE_A_JOUR_ANALYSE_MARGINALE } from "@api/configurations/etatCivil/PutMiseAJourAnalyseMarginaleConfigApi";
import { TErreurApi } from "@model/api/Api";
import AnalyseMarginaleForm from "@model/form/AnalyseMarginale/AnalyseMarginaleForm";
import { TObjetFormulaire } from "@model/form/commun/ObjetFormulaire";
import { TPrenomsForm } from "@model/form/commun/PrenomsForm";

import { CONFIG_GET_RESUME_ACTE } from "@api/configurations/etatCivil/acte/GetResumeActeConfigApi";
import { mapActe } from "@hook/repertoires/MappingRepertoires";
import { FicheActe, IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import MiseAJourForm from "@model/form/miseAJour/MiseAJourForm";
import { useContext, useEffect, useState } from "react";
import { ECleOngletsMiseAJour, EditionMiseAJourContext } from "../../../contexts/EditionMiseAJourContextProvider";
import useFetchApi from "../../../hooks/api/FetchApiHook";
import AfficherMessage from "../../../utils/AfficherMessage";
import { ConteneurBoutonBasDePage } from "../../commun/bouton/conteneurBoutonBasDePage/ConteneurBoutonBasDePage";
import PageChargeur from "../../commun/chargeurs/PageChargeur";
import OngletsBouton from "../../commun/onglets/OngletsBouton";
import OngletsContenu from "../../commun/onglets/OngletsContenu";
import BoutonTerminerEtSigner from "./formulaires/BoutonTerminerEtSigner";
import BoutonValiderEtTerminer from "./formulaires/BoutonValiderEtTerminer";
import MentionForm, { IInfoTitulaire } from "./formulaires/MentionForm";
import AnalyseMarginaleFormulaire from "./formulaires/mentions/AnalyseMarginaleFormulaire/AnalyseMarginaleFormulaire";
import ListeMentionsFormulaire from "./formulaires/mentions/ListeMentionsFormulaire/ListeMentionsFormulaire";

interface IDonneesAideSaisie {
  champs: TObjetFormulaire;
  textesEdites: { [cle: string]: { edite: string; original: string } };
}

export interface IMentionMiseAJour {
  texte: string;
  idTypeMention: string;
  affecteAnalyseMarginale: boolean;
  donneesAideSaisie?: IDonneesAideSaisie;
}

export interface IMentionEnCours {
  index: number | null;
  mention: IMentionMiseAJour;
}

export interface IAnalyseMarginaleMiseAJour extends TObjetFormulaire {
  nom: string;
  nomSecable: boolean;
  nomPartie1: string;
  nomPartie2: string;
  prenoms: TPrenomsForm;
  motif: string;
}
export interface IMiseAJourForm {
  mentions: IMentionMiseAJour[];
  analyseMarginale: IAnalyseMarginaleMiseAJour;
}

export interface IMiseAJourMentionsForm {
  mentions: IMentionMiseAJour[];
}

const PartieFormulaire: React.FC = () => {
  const { estMiseAJourAvecMentions, ongletsActifs, idActe, miseAJourEffectuee } = useContext(EditionMiseAJourContext.Valeurs);
  const { changerOnglet, activerOngletActeMisAJour, setComposerActeMisAJour } = useContext(EditionMiseAJourContext.Actions);

  const { appelApi: appelApiMiseAJourAnalyseMarginaleEtMentions, enAttenteDeReponseApi: enAttenteMiseAJourAnalyseMarginaleEtMention } =
    useFetchApi(CONFIG_PUT_ANALYSE_MARGINALE_ET_MENTIONS);
  const { appelApi: appelApiMisAJourAnalyseMarginale, enAttenteDeReponseApi: enAttenteMiseAJourAnalyseMarginale } = useFetchApi(
    CONFIG_PUT_MISE_A_JOUR_ANALYSE_MARGINALE
  );
  const [afficherAnalyseMarginale, setAfficherAnalyseMarginale] = useState(!estMiseAJourAvecMentions);

  const [titulaire, setTitulaire] = useState<IInfoTitulaire | null>(null);
  const [formulaireMentionEnCoursDeSaisie, setFormulaireMentionEnCoursDeSaisie] = useState<boolean>(false);

  const [donneesAnalyseMarginale, setDonneesAnalyseMarginale] = useState<IAnalyseMarginaleMiseAJour | null>(null);
  const [analyseMarginaleModifiee, setAnalyseMarginaleModifiee] = useState<boolean>(false);
  const [donneesMentions, setDonneesMentions] = useState<IMentionMiseAJour[]>([]);
  const [motif, setMotif] = useState<string | null>(null);

  const [acte, setActe] = useState<IFicheActe | null>(null);
  const { appelApi: appelResumeActe } = useFetchApi(CONFIG_GET_RESUME_ACTE, true);
  const [valeursInitialesFormulaireAnalyseMarginale, setValeursInitialesFormulaireAnalyseMarginale] =
    useState<IAnalyseMarginaleMiseAJour | null>(null);

  useEffect(() => {
    const apresRetour = {
      apresSucces: () => {
        activerOngletActeMisAJour();
        setComposerActeMisAJour(true);
        changerOnglet(ECleOngletsMiseAJour.ACTE_MIS_A_JOUR, null);
      },
      apresErreur: (erreurs: TErreurApi[]) => {
        const messageErreur = (() => {
          switch (true) {
            case Boolean(erreurs?.find(erreur => erreur.code === "FCT_16136")):
              return "Aucune modification de l'analyse marginale n'a été détectée";
            case estMiseAJourAvecMentions:
              return "Impossible de mettre à jour l'acte";
            default:
              return "Impossible de mettre à jour l'analyse marginale";
          }
        })();

        AfficherMessage.erreur(messageErreur, { erreurs, fermetureAuto: true });
      }
    };

    if (estMiseAJourAvecMentions && donneesMentions.length) {
      appelApiMiseAJourAnalyseMarginaleEtMentions({
        parametres: {
          body: MiseAJourForm.versDto(
            idActe,
            donneesMentions,
            donneesAnalyseMarginale,
            afficherAnalyseMarginale && analyseMarginaleModifiee && donneesAnalyseMarginale != null
          )
        },
        ...apresRetour
      });
    }

    if (!estMiseAJourAvecMentions && donneesAnalyseMarginale != null) {
      appelApiMisAJourAnalyseMarginale({
        parametres: {
          path: { idActe: idActe },
          body: AnalyseMarginaleForm.versDto(donneesAnalyseMarginale)
        },
        ...apresRetour
      });
    }
  }, [donneesAnalyseMarginale, donneesMentions]);

  useEffect(() => {
    appelResumeActe({
      parametres: {
        path: { idActe: idActe },
        query: { remplaceIdentiteTitulaireParIdentiteTitulaireAM: true }
      },
      apresSucces: acteDto => {
        const acteTransforme = mapActe(acteDto);
        setActe(acteTransforme);

        const titulaireRep = acteTransforme.titulaires?.[0] || {};

        setTitulaire({
          nom: titulaireRep.nom ?? "",
          nomPartie1: titulaireRep.nomPartie1 ?? "",
          nomPartie2: titulaireRep.nomPartie2 ?? "",
          nomSecable: Boolean(titulaireRep.nomPartie1 && titulaireRep.nomPartie2),
          sexe: titulaireRep.sexe ?? null
        });
      },
      apresErreur: erreurs =>
        AfficherMessage.erreur("Une erreur est survenue lors de la récupération des informations de l'acte", { erreurs })
    });
  }, []);

  useEffect(() => {
    if (!acte) return;

    const analyseMarginale = (FicheActe.getAnalyseMarginaleLaPlusRecente(acte) ?? acte)?.titulaires[0];

    setValeursInitialesFormulaireAnalyseMarginale(AnalyseMarginaleForm.genererValeursDefautFormulaire(analyseMarginale, motif));
  }, [motif, acte]);

  return (
    <>
      {(enAttenteMiseAJourAnalyseMarginale || enAttenteMiseAJourAnalyseMarginaleEtMention) && <PageChargeur />}
      <div className="w-1/2">
        <OngletsBouton<ECleOngletsMiseAJour>
          onglets={[
            ...(estMiseAJourAvecMentions
              ? [
                  {
                    cle: ECleOngletsMiseAJour.MENTIONS,
                    libelle: "Mentions"
                  }
                ]
              : []),

            ...(afficherAnalyseMarginale
              ? [
                  {
                    cle: ECleOngletsMiseAJour.ANALYSE_MARGINALE,
                    libelle: "Analyse Marginale"
                  }
                ]
              : [])
          ]}
          cleOngletActif={ongletsActifs.formulaires}
          changerOnglet={valeur => changerOnglet(null, valeur)}
        />

        <div className="mt-4 flex h-[calc(100vh-16rem)] flex-col overflow-y-auto">
          {estMiseAJourAvecMentions && (
            <OngletsContenu estActif={ongletsActifs.formulaires === ECleOngletsMiseAJour.MENTIONS}>
              <ListeMentionsFormulaire
                setAfficherAnalyseMarginale={setAfficherAnalyseMarginale}
                setDonneesMentions={setDonneesMentions}
                setMotif={setMotif}
              />
              <MentionForm
                infoTitulaire={{
                  nom: titulaire?.nom ?? "",
                  nomPartie1: titulaire?.nomPartie1 ?? "",
                  nomPartie2: titulaire?.nomPartie2 ?? "",
                  nomSecable: titulaire?.nomSecable ?? false,
                  sexe: titulaire?.sexe ?? null
                }}
                setEnCoursDeSaisie={estEnCours => setFormulaireMentionEnCoursDeSaisie(estEnCours)}
              />
            </OngletsContenu>
          )}

          {afficherAnalyseMarginale && (
            <OngletsContenu estActif={ongletsActifs.formulaires === ECleOngletsMiseAJour.ANALYSE_MARGINALE}>
              <AnalyseMarginaleFormulaire
                setDonneesAnalyseMarginale={setDonneesAnalyseMarginale}
                setAnalyseMarginaleModifiee={setAnalyseMarginaleModifiee}
                valeursInitiales={valeursInitialesFormulaireAnalyseMarginale}
                motif={motif}
              />
            </OngletsContenu>
          )}

          <ConteneurBoutonBasDePage position="droite">
            {estMiseAJourAvecMentions ? (
              <BoutonTerminerEtSigner saisieMentionEnCours={formulaireMentionEnCoursDeSaisie} />
            ) : (
              <BoutonValiderEtTerminer disabled={!miseAJourEffectuee} />
            )}
          </ConteneurBoutonBasDePage>
        </div>
      </div>
    </>
  );
};

export default PartieFormulaire;
