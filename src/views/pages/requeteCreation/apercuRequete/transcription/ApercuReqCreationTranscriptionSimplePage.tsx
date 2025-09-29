import {
  ICreationActionMiseAjourStatutHookParams,
  useCreationActionMiseAjourStatut
} from "@hook/requete/CreationActionMiseAjourStatutHook";
import { IDetailRequeteParams, useDetailRequeteApiHook } from "@hook/requete/DetailRequeteHook";
import { IService } from "@model/agent/IService";
import { Utilisateur, UtilisateurConnecte } from "@model/agent/Utilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { TUuidRequeteParams } from "@model/params/TUuidRequeteParams";
import { IRequete } from "@model/requete/IRequete";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { mappingUneRequeteTableauCreation } from "@model/requete/IRequeteTableauCreation";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { EStatutRequete, StatutRequete } from "@model/requete/enum/StatutRequete";
import { RMCRequetesAssocieesResultats } from "@pages/rechercheMultiCriteres/autoRequetes/resultats/RMCRequetesAssocieesResultats";
import { OngletProps } from "@pages/requeteCreation/commun/requeteCreationUtils";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import ConteneurRetractable from "@widget/conteneurRetractable/ConteneurRetractable";
import { BoutonRetour } from "@widget/navigation/BoutonRetour";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import AccessibleAvecDroits from "../../../../../composants/commun/accessibleAvecDroits/AccessibleAvecDroits";
import { RECEContextData } from "../../../../../contexts/RECEContextProvider";
import LiensRECE from "../../../../../router/LiensRECE";
import { INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_PRISE_EN_CHARGE } from "../../../../../router/infoPages/InfoPagesEspaceConsulaire";
import Labels from "../../commun/Labels";
import { OngletPiecesJustificatives } from "../../commun/composants/OngletPiecesJustificatives";
import "../../commun/scss/ApercuReqCreationPage.scss";
import { getComposantResumeRequeteEnFonctionNatureActe, onRenommePieceJustificative } from "./ApercuReqCreationTranscriptionUtils";

interface ApercuReqCreationTranscriptionSimplePageProps {
  idRequeteAAfficher?: string;
}

export const ApercuReqCreationTranscriptionSimplePage: React.FC<ApercuReqCreationTranscriptionSimplePageProps> = props => {
  const { idRequeteParam } = useParams<TUuidRequeteParams>();
  const [requete, setRequete] = useState<IRequeteCreationTranscription>();
  const navigate = useNavigate();
  const location = useLocation();
  const [detailRequeteParams, setDetailRequeteParams] = useState<IDetailRequeteParams>({});
  const { detailRequeteState } = useDetailRequeteApiHook(detailRequeteParams);

  const [paramsCreationActionMiseAjourStatut, setParamsCreationActionMiseAjourStatut] = useState<
    ICreationActionMiseAjourStatutHookParams | undefined
  >();

  useCreationActionMiseAjourStatut(paramsCreationActionMiseAjourStatut);

  const estModeConsultation = props.idRequeteAAfficher !== undefined;

  useEffect(() => {
    if (detailRequeteState) {
      setRequete(detailRequeteState as IRequeteCreationTranscription);
    }
  }, [detailRequeteState]);

  useEffect(() => {
    setDetailRequeteParams({
      idRequete: props.idRequeteAAfficher ?? idRequeteParam
    });
  }, [props.idRequeteAAfficher, location.pathname, idRequeteParam]);

  function onRenommePieceJustificativeApercuSimple(idPieceJustificative: string, nouveauLibelle: string) {
    onRenommePieceJustificative(idPieceJustificative, nouveauLibelle, requete, setRequete);
  }

  function redirectApercuRequetePriseEnCharge() {
    if (requete) {
      navigate(LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_PRISE_EN_CHARGE.url, { idRequeteParam: requete.id }));
    }
  }

  function getListeOnglets(): OngletProps[] {
    return requete
      ? [
          {
            titre: "Pièces justificatives / Annexes",
            component: (
              <OngletPiecesJustificatives
                requete={requete}
                autoriseOuvertureFenetreExt={true}
                onRenommePieceJustificative={onRenommePieceJustificativeApercuSimple}
              />
            ),

            index: 1
          }
        ]
      : [];
  }

  const estPresentBoutonPrendreEnCharge = (utilisateurConnecte: UtilisateurConnecte): boolean => {
    if (requete) {
      return (
        SousTypeCreation.estRCTDOuRCTC(requete.sousType) &&
        StatutRequete.estATraiterOuTransferee(requete.statutCourant?.statut) &&
        utilisateurConnecte.estHabilitePour({ leDroit: Droit.TRANSCRIPTION_CREER_PROJET_ACTE }) &&
        (!requete.idUtilisateur || utilisateurConnecte.id === requete.idUtilisateur) &&
        [utilisateurConnecte.idService, ...utilisateurConnecte.idServicesFils, ...utilisateurConnecte.idServicesParent].includes(
          requete.idService
        )
      );
    } else {
      return false;
    }
  };

  function handlePrendreEnCharge(utilisateurs: Utilisateur[], services: IService[]) {
    setParamsCreationActionMiseAjourStatut({
      libelleAction: EStatutRequete.PRISE_EN_CHARGE,
      statutRequete: "PRISE_EN_CHARGE",
      requete: mappingUneRequeteTableauCreation(requete, false, utilisateurs, services),
      callback: redirectApercuRequetePriseEnCharge
    });
  }

  const { utilisateurs, services, utilisateurConnecte } = useContext(RECEContextData);

  return (
    <div className="ApercuReqCreationTranscriptionSimplePage">
      {requete && (
        <>
          <OperationEnCours visible={!utilisateurConnecte || !utilisateurs || !services} />
          <ConteneurRetractable
            titre={Labels.resume.requete.description}
            className="ResumeRequeteCreation"
            initConteneurFerme={false}
            estADroite={false}
          >
            {getComposantResumeRequeteEnFonctionNatureActe(requete)}

            <AccessibleAvecDroits auMoinsUnDesDroits={[Droit.CONSULTER]}>
              {!estModeConsultation && <RMCRequetesAssocieesResultats requete={requete as IRequete} />}
            </AccessibleAvecDroits>
          </ConteneurRetractable>

          <VoletAvecOnglet liste={getListeOnglets()}>
            <div className="boutons">
              {LiensRECE.estPageConsultation() && <BoutonRetour />}

              {estPresentBoutonPrendreEnCharge(utilisateurConnecte) && (
                <BoutonDoubleSubmit
                  type="button"
                  aria-label={"Prendre en charge"}
                  id="boutonAnnuler"
                  onClick={() => {
                    handlePrendreEnCharge(utilisateurs, services);
                  }}
                >
                  {"Prendre en charge"}
                </BoutonDoubleSubmit>
              )}
            </div>
          </VoletAvecOnglet>
        </>
      )}
    </div>
  );
};
