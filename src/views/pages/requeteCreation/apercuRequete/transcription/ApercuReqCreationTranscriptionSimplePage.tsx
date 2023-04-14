import {
  ICreationActionMiseAjourStatutHookParams,
  useCreationActionMiseAjourStatut
} from "@hook/requete/CreationActionMiseAjourStatutHook";
import { useDetailRequeteApiHook } from "@hook/requete/DetailRequeteHook";
import { Droit } from "@model/agent/enum/Droit";
import {
  appartientAMonServiceOuServicesMeresOuServicesFilles,
  mAppartientOuAppartientAPersonne,
  officierHabiliterPourLeDroit
} from "@model/agent/IOfficier";
import { IUuidRequeteParams } from "@model/params/IUuidRequeteParams";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IRequete } from "@model/requete/IRequete";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { mappingUneRequeteTableauCreation } from "@model/requete/IRequeteTableauCreation";
import { RMCRequetesAssocieesResultats } from "@pages/rechercheMultiCriteres/autoRequetes/resultats/RMCRequetesAssocieesResultats";
import { OngletProps } from "@pages/requeteCreation/commun/requeteCreationUtils";
import {
  URL_RECHERCHE_REQUETE,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_TRANSCRIPTION_PRISE_CHARGE_ID
} from "@router/ReceUrls";
import { getUrlPrecedente, getUrlWithParam } from "@util/route/UrlUtil";
import { getLibelle } from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import ConteneurRetractable from "@widget/conteneurRetractable/ConteneurRetractable";
import { BoutonRetour } from "@widget/navigation/BoutonRetour";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { OngletPiecesJustificatives } from "../../commun/composants/OngletPiecesJustificatives";
import Labels from "../../commun/Labels";
import "../../commun/scss/ApercuReqCreationPage.scss";
import {
  getComposantResumeRequeteEnFonctionNatureActe,
  onRenommePieceJustificative
} from "./ApercuReqCreationTranscriptionUtils";

interface ApercuReqCreationTranscriptionSimplePageProps {
  idRequeteAAfficher?: string;
}

export const ApercuReqCreationTranscriptionSimplePage: React.FC<
  ApercuReqCreationTranscriptionSimplePageProps
> = props => {
  const { idRequeteParam } = useParams<IUuidRequeteParams>();
  const [ongletSelectionne, setOngletSelectionne] = useState(0);
  const [requete, setRequete] = useState<IRequeteCreationTranscription>();
  const history = useHistory();
  const { detailRequeteState } = useDetailRequeteApiHook(
    props.idRequeteAAfficher ?? idRequeteParam,
    history.location.pathname.includes(URL_RECHERCHE_REQUETE)
  );

  const [
    paramsCreationActionMiseAjourStatut,
    setCreationActionMiseAjourStatut
  ] = useState<ICreationActionMiseAjourStatutHookParams | undefined>();

  useCreationActionMiseAjourStatut(paramsCreationActionMiseAjourStatut);

  const estModeConsultation = props.idRequeteAAfficher !== undefined;

  useEffect(() => {
    if (detailRequeteState) {
      setRequete(detailRequeteState as IRequeteCreationTranscription);
    }
  }, [detailRequeteState]);

  const handleChange = (e: any, newValue: string) => {
    setOngletSelectionne(parseInt(newValue));
  };

  function onRenommePieceJustificativeApercuSimple(
    idPieceJustificative: string,
    nouveauLibelle: string
  ) {
    onRenommePieceJustificative(
      idPieceJustificative,
      nouveauLibelle,
      requete,
      setRequete
    );
  }

  function redirectApercuRequetePriseEnCharge() {
    if (requete) {
      history.push(
        getUrlWithParam(
          URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_TRANSCRIPTION_PRISE_CHARGE_ID,
          requete?.id
        )
      );
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
                onRenommePieceJustificative={
                  onRenommePieceJustificativeApercuSimple
                }
              />
            ),

            index: 1
          }
        ]
      : [];
  }

  function estPresentBoutonPrendreEnCharge(): boolean {
    if (requete) {
      return (
        SousTypeCreation.estRCTDOuRCTC(requete.sousType) &&
        StatutRequete.estATraiterOuTransferee(requete.statutCourant?.statut) &&
        officierHabiliterPourLeDroit(Droit.CREER_ACTE_TRANSCRIT) &&
        mAppartientOuAppartientAPersonne(requete.idUtilisateur) &&
        appartientAMonServiceOuServicesMeresOuServicesFilles(requete.idEntite)
      );
    } else {
      return false;
    }
  }

  function handlePrendreEnCharge() {
    setCreationActionMiseAjourStatut({
      libelleAction: StatutRequete.PRISE_EN_CHARGE.libelle,
      statutRequete: StatutRequete.PRISE_EN_CHARGE,
      requete: mappingUneRequeteTableauCreation(requete, false),
      callback: redirectApercuRequetePriseEnCharge
    });
  }

  function pagePrecedenteEstRechercherUneRequete(): boolean {
    return getUrlPrecedente(history.location.pathname) === URL_RECHERCHE_REQUETE
      ? true
      : false;
  }

  return (
    <div className="ApercuReqCreationTranscriptionSimplePage">
      {requete && (
        <>
          <ConteneurRetractable
            titre={Labels.resume.requete.description}
            className="ResumeRequeteCreation"
            initConteneurFerme={false}
            estADroite={false}
          >
            {getComposantResumeRequeteEnFonctionNatureActe(requete)}

            {!estModeConsultation && (
              <RMCRequetesAssocieesResultats requete={requete as IRequete} />
            )}
          </ConteneurRetractable>

          <VoletAvecOnglet
            liste={getListeOnglets()}
            ongletSelectionne={ongletSelectionne}
            handleChange={handleChange}
          >
            <div className="boutons">
              {pagePrecedenteEstRechercherUneRequete() && <BoutonRetour />}

              {estPresentBoutonPrendreEnCharge() && (
                <Bouton
                  type="button"
                  aria-label={"Prendre en charge"}
                  id="boutonAnnuler"
                  onClick={() => {
                    handlePrendreEnCharge();
                  }}
                >
                  {getLibelle("Prendre en charge")}
                </Bouton>
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
              onRenommePieceJustificative={
                onRenommePieceJustificativeApercuSimple
              }
            />
          </ConteneurRetractable>
        </>
      )}
    </div>
  );
};
