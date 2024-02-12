import { SuiviObservationsRequete } from "@composant/suivis/SuiviObservationsRequete";
import { QualiteFamille } from "@model/requete/enum/QualiteFamille";
import { SituationFamiliale } from "@model/requete/enum/SituationFamiliale";
import { TypeObjetTitulaire } from "@model/requete/enum/TypeObjetTitulaire";
import TableauSuiviDossier from "@pages/requeteCreation/commun/composants/TableauSuiviDossier/TableauSuiviDossier";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { getLibelle, ZERO } from "@util/Utils";
import React, { useState } from "react";
import { useParams } from "react-router";
import { TUuidRequeteParams } from "../../../../../../../model/params/TUuidRequeteParams";
import { IEchange } from "../../../../../../../model/requete/IEchange";
import { IRequeteCreationEtablissement } from "../../../../../../../model/requete/IRequeteCreationEtablissement";
import { Item } from "../../commun/resumeRequeteCreationEtablissement/items/Item";
import "../../commun/scss/OngletsApercuCreationEtablissement.scss";
import { ItemEchangesRetourSDANF } from "./ItemEchangesRetourSDANF";
import { ListeActionsRetourSDANF } from "./ListeActions";
interface ISuiviDossierProps {
  echanges?: IEchange[];
  requete: IRequeteCreationEtablissement;
  modeConsultation?: boolean;
}

export const SuiviDossier: React.FC<ISuiviDossierProps> = props => {
  const { idRequeteParam } = useParams<TUuidRequeteParams>();
  const [echanges, setEchanges] = useState<IEchange[] | undefined>(
    props.echanges
  );
  const postulant = props.requete.titulaires?.find(
    titu => TypeObjetTitulaire.POSTULANT_NATIONALITE === titu.typeObjetTitulaire
  );

  const afficherTableauSuiviDossier =
    postulant &&
    postulant.situationFamiliale === SituationFamiliale.CELIBATAIRE.nom &&
    !props.requete.titulaires?.some(
      titulaire =>
        titulaire.qualite === QualiteFamille.ENFANT_MINEUR &&
        titulaire.valideEffetCollectif === "OUI" &&
        titulaire.retenueSdanf?.paysNaissance?.toUpperCase() !== "FRANCE"
    ) &&
    postulant.evenementUnions?.length === ZERO;

  return (
    <>
      {gestionnaireFeatureFlag.estActif(
        FeatureFlag.FF_INTEGRATION_REQUETE_CIBLE
      ) &&
        afficherTableauSuiviDossier && (
          <TableauSuiviDossier requete={props.requete} />
        )}
      <Item titre={getLibelle("Retour SDANF")}>
        <ItemEchangesRetourSDANF echanges={echanges} />

        {gestionnaireFeatureFlag.estActif(FeatureFlag.FF_RETOUR_SDANF) &&
          idRequeteParam && (
            <ListeActionsRetourSDANF
              setEchanges={setEchanges}
              echanges={echanges}
              statusRequete={props.requete?.statutCourant.statut}
              idRequeteCorbeilleAgent={props.requete?.idUtilisateur}
              idRequeteParam={idRequeteParam}
              modeConsultation={props.modeConsultation}
            />
          )}
      </Item>

      <SuiviObservationsRequete
        idRequete={idRequeteParam || ""}
        observations={props.requete?.observations}
      />
    </>
  );
};
