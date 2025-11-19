import { TUuidRequeteParams } from "@model/params/TUuidRequeteParams";
import { IEchange } from "@model/requete/IEchange";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { QualiteFamille } from "@model/requete/enum/QualiteFamille";
import { SituationFamiliale } from "@model/requete/enum/SituationFamiliale";
import { TypeObjetTitulaire } from "@model/requete/enum/TypeObjetTitulaire";
import { ZERO } from "@util/Utils";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { SuiviObservationsRequete } from "@views/common/composant/suivis/SuiviObservationsRequete";
import TableauSuiviDossier from "@views/pages/requeteCreation/commun/composants/TableauSuiviDossier/TableauSuiviDossier";
import React, { useState } from "react";
import { useParams } from "react-router";
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
  const [echanges, setEchanges] = useState<IEchange[] | undefined>(props.echanges);
  const postulant = props.requete.titulaires?.find(titu => TypeObjetTitulaire.POSTULANT_NATIONALITE === titu.typeObjetTitulaire);

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
      {gestionnaireFeatureFlag.estActif(FeatureFlag.FF_INTEGRATION_CIBLE_REQUETE_NATURALISATION) && afficherTableauSuiviDossier && (
        <TableauSuiviDossier requete={props.requete} />
      )}
      <Item titre="Retour SDANF">
        <ItemEchangesRetourSDANF echanges={echanges} />

        {idRequeteParam && (
          <ListeActionsRetourSDANF
            setEchanges={setEchanges}
            echanges={echanges}
            statusRequete={props.requete?.statutCourant.statut}
            idRequeteCorbeilleAgent={props.requete?.idUtilisateur}
            idRequeteParam={idRequeteParam ?? ""}
            modeConsultation={props.modeConsultation}
          />
        )}
      </Item>

      <SuiviObservationsRequete
        idRequete={idRequeteParam ?? ""}
        observations={props.requete?.observations}
      />
    </>
  );
};
