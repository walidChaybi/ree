import { IReponseRequeteInfo, ReponseRequeteInfoUtils } from "@model/requete/IReponseRequeteInfo";
import { BesoinUsager } from "@model/requete/enum/BesoinUsager";
import { ComplementObjetRequete } from "@model/requete/enum/ComplementObjetRequete";
import { EObjetRequeteInfo } from "@model/requete/enum/EObjetRequeteInfo";
import { SousTypeInformation } from "@model/requete/enum/SousTypeInformation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { MenuTransfert } from "@views/common/composant/menuTransfert/MenuTransfert";
import { Fieldset } from "@widget/fieldset/Fieldset";
import React, { useContext, useEffect, useState } from "react";
import { RECEContextData } from "../../../../../contexts/RECEContextProvider";
import { RequeteInfoProps } from "./ResumeReqInfo";
import { BoutonReponseLibre } from "./choixReponse/BoutonReponseLibre";
import { MenuReponsesProposees } from "./choixReponse/MenuReponsesProposees";
import { MenuToutesLesReponses } from "./choixReponse/MenuToutesLesReponses";
import { ReponseReqInfoForm } from "./choixReponse/ReponseReqInfoForm";
import { useReponsesReqInfoApiHook } from "./hook/ReponsesReqInfoHook";
import "./scss/ReponseReqInfo.scss";

export const ReponseReqInfo: React.FC<RequeteInfoProps> = ({
  requete,
  disabled,
  affichageBoutonPrendreEnCharge,
  onclickPrendreEnCharge
}) => {
  const SAISIE_LIBRE_REPONSE = {
    id: "",
    libelle: "Réponse libre agent",
    objet: EObjetRequeteInfo[requete.objet],
    complementObjet: requete.complementObjet.libelle,
    corpsMail: ""
  };

  const { utilisateurConnecte } = useContext(RECEContextData);
  const [reponseChoisie, setReponseChoisie] = useState<IReponseRequeteInfo>(SAISIE_LIBRE_REPONSE);

  const [lesBoutonsDisabled, setLesBoutonsDisabled] = useState(false);
  const [formulaireDisabled, setFormulaireDisabled] = useState(false);
  const [retourVisible, setRetourVisible] = useState(false);
  const [tousLesBoutonsVisibles, setTousLesBoutonsVisibles] = useState(true);
  const [lesBoutonsReponsesVisibles, setLesBoutonsReponsesVisibles] = useState(true);

  useEffect(() => {
    const mauvaisUtilisateur = requete.idUtilisateur !== utilisateurConnecte.id;

    const rejetOuTraiteRepondu =
      requete.statutCourant.statut === StatutRequete.REJET || requete.statutCourant.statut === StatutRequete.TRAITE_REPONDU;

    const completerDemande =
      requete.besoinUsager === BesoinUsager.COMPLETER_DEMANDE && requete.sousType === SousTypeInformation.COMPLETION_REQUETE_EN_COURS;

    setRetourVisible(!disabled);
    setLesBoutonsDisabled(disabled || mauvaisUtilisateur);
    setFormulaireDisabled(disabled || mauvaisUtilisateur || rejetOuTraiteRepondu);
    setTousLesBoutonsVisibles(!rejetOuTraiteRepondu);
    setLesBoutonsReponsesVisibles(!completerDemande);
  }, [requete, disabled]);

  const { reponsesReqInfo } = useReponsesReqInfoApiHook();

  useEffect(() => {
    if (requete.reponseChoisie?.corpsMail) {
      setReponseChoisie({
        ...requete.reponseChoisie,
        libelle: ReponseRequeteInfoUtils.getLibelleNomenclatureReponseRequeteInfoParId(requete.reponseChoisie, reponsesReqInfo)
      });
    } else if (requete.sousType === SousTypeInformation.COMPLETION_REQUETE_EN_COURS) {
      const reponseLibre = ReponseRequeteInfoUtils.getNomenclatureReponseRequeteInfoFromObjetEtComplementObjet(
        {
          objet: "COMPLETION_REQUETE_EN_COURS",
          complementObjet: ComplementObjetRequete.REPONSE_LIBRE_AGENT.nom
        },
        reponsesReqInfo
      );

      if (reponseLibre) {
        setReponseChoisie(reponseLibre);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reponsesReqInfo]);

  useEffect(() => {
    if (requete.idUtilisateur !== utilisateurConnecte?.id) {
      setLesBoutonsDisabled(true);
    }
  }, [requete.idUtilisateur]);

  const onClick = (reponse: IReponseRequeteInfo) => {
    setReponseChoisie(reponse);
  };

  return (
    <Fieldset titre={"Choix de la réponse"}>
      <div>
        {!affichageBoutonPrendreEnCharge && tousLesBoutonsVisibles && (
          <div className="BoutonsReponse">
            {lesBoutonsReponsesVisibles && (
              <>
                <MenuReponsesProposees
                  listeReponse={reponsesReqInfo}
                  requete={requete}
                  onClick={onClick}
                  disabled={lesBoutonsDisabled}
                />
                <MenuToutesLesReponses
                  listeReponse={reponsesReqInfo}
                  onClick={onClick}
                  disabled={lesBoutonsDisabled}
                />
                <BoutonReponseLibre
                  onClick={onClick}
                  reponse={SAISIE_LIBRE_REPONSE}
                  disabled={lesBoutonsDisabled}
                ></BoutonReponseLibre>
              </>
            )}
            <MenuTransfert
              idRequete={requete.id}
              sousTypeRequete={requete.sousType}
              typeRequete={requete.type}
              estTransfert={true}
              menuFermer={true}
              disabled={lesBoutonsDisabled}
              idUtilisateurRequete={requete.idUtilisateur}
            />
          </div>
        )}
        <ReponseReqInfoForm
          reponse={reponseChoisie}
          requete={requete}
          formulaireDisabled={formulaireDisabled}
          boutonVisible={tousLesBoutonsVisibles}
          retourVisible={retourVisible}
          affichageBoutonPrendreEnCharge={affichageBoutonPrendreEnCharge}
          onclickPrendreEnCharge={onclickPrendreEnCharge}
        />
      </div>
    </Fieldset>
  );
};
