import { MenuTransfert } from "@composant/menuTransfert/MenuTransfert";
import { BesoinUsager } from "@model/requete/enum/BesoinUsager";
import { ComplementObjetRequete } from "@model/requete/enum/ComplementObjetRequete";
import { ObjetRequete } from "@model/requete/enum/ObjetRequete";
import { SousTypeInformation } from "@model/requete/enum/SousTypeInformation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import {
  IReponseRequeteInfo,
  ReponseRequeteInfo
} from "@model/requete/IReponseRequeteInfo";
import { storeRece } from "@util/storeRece";
import { getLibelle } from "@util/Utils";
import { Fieldset } from "@widget/fieldset/Fieldset";
import React, { useEffect, useState } from "react";
import { BoutonReponseLibre } from "./choixReponse/BoutonReponseLibre";
import { MenuReponsesProposees } from "./choixReponse/MenuReponsesProposees";
import { MenuToutesLesReponses } from "./choixReponse/MenuToutesLesReponses";
import { ReponseReqInfoForm } from "./choixReponse/ReponseReqInfoForm";
import { useReponsesReqInfoApiHook } from "./hook/ReponsesReqInfoHook";
import { RequeteInfoProps } from "./ResumeReqInfo";
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
    objet: requete.objet.libelle,
    complementObjet: requete.complementObjet.libelle,
    corpsMail: ""
  };

  const [reponseChoisie, setReponseChoisie] =
    useState<IReponseRequeteInfo>(SAISIE_LIBRE_REPONSE);

  const [lesBoutonsDisabled, setLesBoutonsDisabled] = useState(false);
  const [formulaireDisabled, setFormulaireDisabled] = useState(false);
  const [retourVisible, setRetourVisible] = useState(false);
  const [tousLesBoutonsVisibles, setTousLesBoutonsVisibles] = useState(true);
  const [lesBoutonsReponsesVisibles, setLesBoutonsReponsesVisibles] =
    useState(true);

  useEffect(() => {
    const mauvaisUtilisateur =
      requete.idUtilisateur !== storeRece.utilisateurCourant?.idUtilisateur;

    const rejetOuTraiteRepondu =
      requete.statutCourant.statut === StatutRequete.REJET ||
      requete.statutCourant.statut === StatutRequete.TRAITE_REPONDU;

    const completerDemande =
      requete.besoinUsager === BesoinUsager.COMPLETER_DEMANDE &&
      requete.sousType === SousTypeInformation.COMPLETION_REQUETE_EN_COURS;

    setRetourVisible(!disabled);
    setLesBoutonsDisabled(disabled ? disabled : mauvaisUtilisateur);
    setFormulaireDisabled(
      disabled ? disabled : mauvaisUtilisateur || rejetOuTraiteRepondu
    );
    setTousLesBoutonsVisibles(!rejetOuTraiteRepondu);
    setLesBoutonsReponsesVisibles(!completerDemande);
  }, [requete, disabled]);

  const { reponsesReqInfo } = useReponsesReqInfoApiHook();

  useEffect(() => {
    if (requete.reponseChoisie) {
      setReponseChoisie({
        ...requete.reponseChoisie,
        libelle:
          ReponseRequeteInfo.getLibelleNomenclatureReponseRequeteInfoFromId(
            requete.reponseChoisie,
            reponsesReqInfo
          )
      });
    } else if (
      requete.sousType === SousTypeInformation.COMPLETION_REQUETE_EN_COURS
    ) {
      const reponseLibre =
        ReponseRequeteInfo.getNomenclatureReponseRequetInfoFromObjetEtComplementObjet(
          {
            objet: ObjetRequete.COMPLETION_REQUETE_EN_COURS.nom,
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
    if (requete.idUtilisateur !== storeRece.utilisateurCourant?.idUtilisateur) {
      setLesBoutonsDisabled(true);
    }
  }, [requete.idUtilisateur]);

  const onClick = (reponse: IReponseRequeteInfo) => {
    setReponseChoisie(reponse);
  };

  return (
    <>
      <Fieldset titre={getLibelle("Choix de la réponse")}>
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
    </>
  );
};
