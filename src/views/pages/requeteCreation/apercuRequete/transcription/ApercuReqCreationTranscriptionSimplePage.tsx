import { RECEContextData } from "@core/contexts/RECEContext";
import {
  ICreationActionMiseAjourStatutHookParams,
  useCreationActionMiseAjourStatut
} from "@hook/requete/CreationActionMiseAjourStatutHook";
import { IDetailRequeteParams, useDetailRequeteApiHook } from "@hook/requete/DetailRequeteHook";
import {
  IOfficier,
  appartientAMonServiceOuServicesParentsOuServicesFils,
  appartientAUtilisateurConnecteOuPersonne,
  officierHabiliterPourLeDroit
} from "@model/agent/IOfficier";
import { IService } from "@model/agent/IService";
import { IUtilisateur } from "@model/agent/IUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { TUuidRequeteParams } from "@model/params/TUuidRequeteParams";
import { IRequete } from "@model/requete/IRequete";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { mappingUneRequeteTableauCreation } from "@model/requete/IRequeteTableauCreation";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { RMCRequetesAssocieesResultats } from "@pages/rechercheMultiCriteres/autoRequetes/resultats/RMCRequetesAssocieesResultats";
import { OngletProps } from "@pages/requeteCreation/commun/requeteCreationUtils";
import { URL_MES_REQUETES_CONSULAIRE_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID, URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import { getLibelle } from "@util/Utils";
import { getUrlPrecedente, getUrlWithParam } from "@util/route/UrlUtil";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import ConteneurRetractable from "@widget/conteneurRetractable/ConteneurRetractable";
import { BoutonRetour } from "@widget/navigation/BoutonRetour";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  const [detailRequeteParams, setDetailRequeteParams] = useState<IDetailRequeteParams>();
  const { detailRequeteState } = useDetailRequeteApiHook(detailRequeteParams);

  const [paramsCreationActionMiseAjourStatut, setCreationActionMiseAjourStatut] = useState<
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
      idRequete: props.idRequeteAAfficher ?? idRequeteParam,
      estConsultation: location.pathname.includes(URL_RECHERCHE_REQUETE)
    });
  }, [props.idRequeteAAfficher, location.pathname, idRequeteParam]);

  function onRenommePieceJustificativeApercuSimple(idPieceJustificative: string, nouveauLibelle: string) {
    onRenommePieceJustificative(idPieceJustificative, nouveauLibelle, requete, setRequete);
  }

  function redirectApercuRequetePriseEnCharge() {
    if (requete) {
      navigate(getUrlWithParam(URL_MES_REQUETES_CONSULAIRE_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID, requete?.id));
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

  const estPresentBoutonPrendreEnCharge = (utilisateurConnecte: IOfficier): boolean => {
    if (requete) {
      return (
        SousTypeCreation.estRCTDOuRCTC(requete.sousType) &&
        StatutRequete.estATraiterOuTransferee(requete.statutCourant?.statut) &&
        officierHabiliterPourLeDroit(utilisateurConnecte, Droit.CREER_ACTE_TRANSCRIT) &&
        appartientAUtilisateurConnecteOuPersonne(utilisateurConnecte, requete.idUtilisateur) &&
        appartientAMonServiceOuServicesParentsOuServicesFils(utilisateurConnecte, requete.idService)
      );
    } else {
      return false;
    }
  };

  function handlePrendreEnCharge(utilisateurs: IUtilisateur[], services: IService[]) {
    setCreationActionMiseAjourStatut({
      libelleAction: StatutRequete.PRISE_EN_CHARGE.libelle,
      statutRequete: StatutRequete.PRISE_EN_CHARGE,
      requete: mappingUneRequeteTableauCreation(requete, false, utilisateurs, services),
      callback: redirectApercuRequetePriseEnCharge
    });
  }

  function pagePrecedenteEstRechercherUneRequete(): boolean {
    return getUrlPrecedente(location.pathname) === URL_RECHERCHE_REQUETE;
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

            {!estModeConsultation && <RMCRequetesAssocieesResultats requete={requete as IRequete} />}
          </ConteneurRetractable>

          <VoletAvecOnglet liste={getListeOnglets()}>
            <div className="boutons">
              {pagePrecedenteEstRechercherUneRequete() && <BoutonRetour />}

              {estPresentBoutonPrendreEnCharge(utilisateurConnecte) && (
                <BoutonDoubleSubmit
                  type="button"
                  aria-label={"Prendre en charge"}
                  id="boutonAnnuler"
                  onClick={() => {
                    handlePrendreEnCharge(utilisateurs, services);
                  }}
                >
                  {getLibelle("Prendre en charge")}
                </BoutonDoubleSubmit>
              )}
            </div>
          </VoletAvecOnglet>

          <ConteneurRetractable
            titre="Pièces justificatives / Annexes"
            className="FocusPieceJustificative"
            estADroite={true}
          >
            <OngletPiecesJustificatives
              requete={requete}
              onRenommePieceJustificative={onRenommePieceJustificativeApercuSimple}
            />
          </ConteneurRetractable>
        </>
      )}
    </div>
  );
};
