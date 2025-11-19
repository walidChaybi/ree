import { Droit } from "@model/agent/enum/Droit";
import { TUuidRequeteParams } from "@model/params/TUuidRequeteParams";
import { IRequete } from "@model/requete/IRequete";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import ConteneurRetractable from "@widget/conteneurRetractable/ConteneurRetractable";
import { BoutonRetour } from "@widget/navigation/BoutonRetour";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import AccessibleAvecDroits from "../../../../../composants/commun/accessibleAvecDroits/AccessibleAvecDroits";
import { RECEContextData } from "../../../../../contexts/RECEContextProvider";
import LiensRECE from "../../../../../router/LiensRECE";
import { IDetailRequeteParams, useDetailRequeteApiHook } from "../../../../common/hook/requete/DetailRequeteHook";
import { RMCRequetesAssocieesResultats } from "../../../rechercheMultiCriteres/autoRequetes/resultats/RMCRequetesAssocieesResultats";
import Labels from "../../commun/Labels";
import "../../commun/scss/ApercuReqCreationPage.scss";
import { getComposantResumeRequeteEnFonctionNatureActe } from "./ApercuReqCreationTranscriptionUtils";

interface ApercuReqCreationTranscriptionSimplePageProps {
  idRequeteAAfficher?: string;
}

export const ApercuReqCreationTranscriptionSimplePage: React.FC<ApercuReqCreationTranscriptionSimplePageProps> = props => {
  const { idRequeteParam } = useParams<TUuidRequeteParams>();
  const [requete, setRequete] = useState<IRequeteCreationTranscription>();
  const location = useLocation();
  const [detailRequeteParams, setDetailRequeteParams] = useState<IDetailRequeteParams>({});
  const { detailRequeteState } = useDetailRequeteApiHook(detailRequeteParams);

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

          <VoletAvecOnglet liste={[]}>
            {LiensRECE.estPageConsultation() && (
              <div className="boutons">
                <BoutonRetour />
              </div>
            )}
          </VoletAvecOnglet>
        </>
      )}
    </div>
  );
};
