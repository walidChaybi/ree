import { useDetailRequeteApiHook } from "@hook/requete/DetailRequeteHook";
import { IUuidRequeteParams } from "@model/params/IUuidRequeteParams";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { useRMCAutoPersonneApiHook } from "@pages/rechercheMultiCriteres/autoPersonne/hook/RMCAutoPersonneApiHook";
import { ApercuProjet } from "@pages/requeteCreation/commun/composants/ApercuProjet";
import { Echanges } from "@pages/requeteCreation/commun/composants/Echanges";
import { GestionMentions } from "@pages/requeteCreation/commun/composants/GestionMentions";
import { OngletRMCPersonne } from "@pages/requeteCreation/commun/composants/OngletRMCPersonne";
import { PiecesAnnexes } from "@pages/requeteCreation/commun/composants/PiecesAnnexes";
import { SaisieProjet } from "@pages/requeteCreation/commun/composants/SaisirProjet";
import { OngletProps } from "@pages/requeteCreation/commun/requeteCreationUtils";
import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import "../../commun/scss/ApercuReqCreationPage.scss";
import ResumeRequeteCreation from "../etablissement/composants/ResumeRequeteCreation";
import mappingIRequeteCreationVersResumeRequeteCreationProps from "../etablissement/mappingIRequeteCreationVersResumeRequeteCreationProps";

interface ApercuReqCreationTranscriptionSaisieProjetPageProps {}

export const ApercuReqCreationTranscriptionSaisieProjetPage: React.FC<
  ApercuReqCreationTranscriptionSaisieProjetPageProps
> = props => {
  const { idRequeteParam } = useParams<IUuidRequeteParams>();
  const [requete, setRequete] = useState<IRequeteCreationTranscription>();
  const history = useHistory();
  const [ongletSelectionnePartieGauche, setOngletSelectionnePartieGauche] =
    useState(0);
  const [ongletSelectionnePartieDroite, setOngletSelectionnePartieDroite] =
    useState(0);
  const { resultatRMCAutoPersonne } = useRMCAutoPersonneApiHook(requete);
  const { detailRequeteState } = useDetailRequeteApiHook(
    idRequeteParam,
    history.location.pathname.includes(URL_RECHERCHE_REQUETE)
  );

  useEffect(() => {}, [idRequeteParam]);

  useEffect(() => {
    if (detailRequeteState) {
      setRequete(detailRequeteState as IRequeteCreationTranscription);
    }
  }, [detailRequeteState]);

  const handleChangeOngletPartieGauche = (e: any, newValue: string) => {
    /* istanbul ignore next */
    setOngletSelectionnePartieGauche(parseInt(newValue));
  };

  const handleChangeOngletPartieDroite = (e: any, newValue: string) => {
    setOngletSelectionnePartieDroite(parseInt(newValue));
  };

  function getListeOngletsPartieGauche(): OngletProps[] {
    return requete
      ? [
          {
            titre: "Description de la requête",
            component: (
              <ResumeRequeteCreation
                {...mappingIRequeteCreationVersResumeRequeteCreationProps(
                  requete
                )}
              />
            ),
            index: 0
          },
          {
            titre: "RMC",
            component: (
              <OngletRMCPersonne
                rmcAutoPersonneResultat={resultatRMCAutoPersonne}
              />
            ),
            index: 1
          },
          {
            titre: "Pièces Annexes",
            component: <PiecesAnnexes />,
            index: 2
          },
          {
            titre: "Aperçu du projet",
            component: <ApercuProjet />,
            index: 3
          }
        ]
      : [];
  }

  function getListeOngletsPartieDroite(): OngletProps[] {
    return requete
      ? [
          {
            titre: "Saisir le projet",
            component: <SaisieProjet />,
            index: 0
          },
          {
            titre: "Gérer les mentions",
            component: <GestionMentions />,
            index: 1
          },
          {
            titre: "Echanges",
            component: <Echanges />,
            index: 2
          }
        ]
      : [];
  }

  return (
    <div className="ApercuReqCreationTranscriptionSaisieProjetPage">
      {requete && (
        <>
          <VoletAvecOnglet
            liste={getListeOngletsPartieGauche()}
            ongletSelectionne={ongletSelectionnePartieGauche}
            handleChange={handleChangeOngletPartieGauche}
          />

          <VoletAvecOnglet
            liste={getListeOngletsPartieDroite()}
            ongletSelectionne={ongletSelectionnePartieDroite}
            handleChange={handleChangeOngletPartieDroite}
          />
        </>
      )}
    </div>
  );
};
