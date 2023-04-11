import { useDetailRequeteApiHook } from "@hook/requete/DetailRequeteHook";
import {
  IRMCAutoPersonneParams,
  useRMCAutoPersonneApiAvecCacheHook
} from "@hook/rmcAuto/RMCAutoPersonneApiHook";
import { mapTitulaireVersRMCAutoPersonneParams } from "@hook/rmcAuto/RMCAutoPersonneUtils";
import { IUuidRequeteParams } from "@model/params/IUuidRequeteParams";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { IRequete } from "@model/requete/IRequete";
import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { RMCRequetesAssocieesResultats } from "@pages/rechercheMultiCriteres/autoRequetes/resultats/RMCRequetesAssocieesResultats";
import { AnalyseDuDossier } from "@pages/requeteCreation/commun/composants/AnalyseDuDossier";
import { useDataTableauPersonneSauvegardeeHook } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/IDataTableauPersonneSauvegardee";
import { OngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/OngletRMCPersonne";
import Labels from "@pages/requeteCreation/commun/Labels";
import {
  getPostulantNationaliteOuTitulaireActeTranscritDresse,
  OngletProps
} from "@pages/requeteCreation/commun/requeteCreationUtils";
import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import ConteneurRetractable from "@widget/conteneurRetractable/ConteneurRetractable";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { OngletPiecesJustificatives } from "../../commun/composants/OngletPiecesJustificatives";
import "../../commun/scss/ApercuReqCreationPage.scss";
import {
  getComposantResumeRequeteEnFonctionNatureActe,
  onRenommePieceJustificative
} from "./ApercuReqCreationTranscriptionUtils";

interface ApercuReqCreationTranscriptionPriseEnChargePageProps {
  idRequeteAAfficher?: string;
}

export const ApercuReqCreationTranscriptionPriseEnChargePage: React.FC<
  ApercuReqCreationTranscriptionPriseEnChargePageProps
> = props => {
  // Params & history
  const { idRequeteParam } = useParams<IUuidRequeteParams>();
  const history = useHistory();

  // States
  const [requete, setRequete] = useState<IRequeteCreation>();
  const [ongletSelectionne, setOngletSelectionne] = useState(1);
  const [rmcAutoPersonneParams, setRmcAutoPersonneParams] =
    useState<IRMCAutoPersonneParams>();

  // Hooks
  const { detailRequeteState } = useDetailRequeteApiHook(
    props.idRequeteAAfficher ?? idRequeteParam,
    history.location.pathname.includes(URL_RECHERCHE_REQUETE)
  );
  const {
    dataPersonnesSauvegardees: dataPersonnesSelectionnees,
    setDataPersonnesSauvegardees: setDataPersonnesSelectionnees
  } = useDataTableauPersonneSauvegardeeHook(requete?.personnesSauvegardees);
  const resultatRMCAutoPersonne = useRMCAutoPersonneApiAvecCacheHook(
    rmcAutoPersonneParams
  );

  const estModeConsultation = props.idRequeteAAfficher !== undefined;

  useEffect(() => {
    if (detailRequeteState) {
      setRequete(detailRequeteState as IRequeteCreationTranscription);
    }
  }, [detailRequeteState]);

  useEffect(() => {
    if (requete) {
      const titulaire =
        getPostulantNationaliteOuTitulaireActeTranscritDresse(requete);
      if (titulaire) {
        setRmcAutoPersonneParams(
          mapTitulaireVersRMCAutoPersonneParams(titulaire)
        );
      }
    }
  }, [requete]);

  function onRenommePieceJustificativeApercuPriseEnCharge(
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

  const handleChange = (e: any, newValue: string) => {
    setOngletSelectionne(parseInt(newValue));
  };

  function handleClickSelectionTitulaireRmcPersonne(idTitulaire: string) {
    const titulaire = requete?.titulaires
      ?.filter(titulaireCourant => titulaireCourant.id === idTitulaire)
      .pop();
    if (titulaire) {
      setRmcAutoPersonneParams(
        mapTitulaireVersRMCAutoPersonneParams(titulaire)
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
                onRenommePieceJustificative={
                  onRenommePieceJustificativeApercuPriseEnCharge
                }
                autoriseOuvertureFenetreExt={true}
              />
            ),
            index: 0
          },
          {
            titre: "RMC",
            component: (
              <OngletRMCPersonne
                sousTypeRequete={requete.sousType}
                listeTitulaires={requete.titulaires}
                resultatRMCPersonne={resultatRMCAutoPersonne ?? []}
                handleClickMenuItem={handleClickSelectionTitulaireRmcPersonne}
                natureActeRequete={NatureActeRequete.getEnumFor(
                  requete.nature ?? ""
                )}
                dataPersonnesSelectionnees={dataPersonnesSelectionnees}
                setDataPersonnesSelectionnees={setDataPersonnesSelectionnees}
              />
            ),
            index: 1
          },
          {
            titre: "Analyse du dossier",
            component: <AnalyseDuDossier />,
            index: 2
          }
        ]
      : [];
  }

  return (
    <div className="ApercuReqCreationTranscriptionPriseEnChargePage">
      <>
        <ConteneurRetractable
          titre={`${Labels.resume.requeteTranscription.description} ${
            requete?.numeroDossierMetier || ""
          }`}
          className="ResumeRequeteCreation"
          initConteneurFerme={false}
          estADroite={false}
        >
          {getComposantResumeRequeteEnFonctionNatureActe(requete)}

          {!estModeConsultation && (
            <RMCRequetesAssocieesResultats requete={requete as IRequete} />
          )}
        </ConteneurRetractable>

        {requete && (
          <>
            <VoletAvecOnglet
              liste={getListeOnglets()}
              ongletSelectionne={ongletSelectionne}
              handleChange={handleChange}
            />

            <ConteneurRetractable
              titre="Pièces justificatives"
              className="FocusPieceJustificative"
              estADroite={true}
            >
              <OngletPiecesJustificatives
                requete={requete}
                onRenommePieceJustificative={
                  onRenommePieceJustificativeApercuPriseEnCharge
                }
              />
            </ConteneurRetractable>
          </>
        )}
      </>
    </div>
  );
};
