import React, { useState } from "react";
import { Droit } from "../../../../model/Droit";
import { Sexe } from "../../../../model/etatcivil/enum/Sexe";
import { officierHabiliterPourLeDroit } from "../../../../model/IOfficierSSOApi";
import { DocumentDelivrance } from "../../../../model/requete/v2/enum/DocumentDelivrance";
import { Provenance } from "../../../../model/requete/v2/enum/Provenance";
import { StatutRequete } from "../../../../model/requete/v2/enum/StatutRequete";
import { IPrenomOrdonnes } from "../../../../model/requete/v2/IPrenomOrdonnes";
import { TRequete } from "../../../../model/requete/v2/IRequete";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import {
  IRequeteTableau,
  ITitulaireRequeteTableau
} from "../../../../model/requete/v2/IRequeteTableau";
import { ITitulaireRequete } from "../../../../model/requete/v2/ITitulaireRequete";
import { getUrlWithParam } from "../../../common/util/route/routeUtil";
import { storeRece } from "../../../common/util/storeRece";
import { getLibelle } from "../../../common/widget/Text";
import { URL_MES_REQUETES_APERCU_REQUETE } from "../../../router/ReceUrls";
import {
  CreationActionMiseAjourStatutEtRmcAutoHookParams,
  useCreationActionMiseAjourStatutEtRmcAuto
} from "../commun/hook/CreationActionMiseAjourStatutEtRmcAutoHook";
import "./scss/BoutonPrendreEnCharge.scss";

interface BoutonPrendreEnChargeProps {
  requete: TRequete;
}

export const BoutonPrendreEnCharge: React.FC<BoutonPrendreEnChargeProps> = props => {
  const [estDisabled, setEstDisabled] = useState(true);

  const [params, setParams] = useState<
    CreationActionMiseAjourStatutEtRmcAutoHookParams | undefined
  >();

  const setActionEtUpdateStatut = () => {
    setParams({
      requete: mapRequeteRmcAuto(props.requete as IRequeteDelivrance),
      dataRequetes: [],
      libelleAction: StatutRequete.PRISE_EN_CHARGE.libelle,
      statutRequete: StatutRequete.PRISE_EN_CHARGE,
      urlCourante: getUrlWithParam(
        URL_MES_REQUETES_APERCU_REQUETE,
        props.requete.id
      )
    });
  };

  useCreationActionMiseAjourStatutEtRmcAuto(params);

  const estATraiterOuATransferee =
    props.requete.statutCourant.statut === StatutRequete.A_TRAITER ||
    props.requete.statutCourant.statut === StatutRequete.TRANSFEREE;

  const mAppartientOuAppartientAPersonne =
    !props.requete.idUtilisateur ||
    props.requete.idUtilisateur === storeRece.utilisateurCourant?.idUtilisateur;

  const comedecDroitDelivrerCOMEDECouDroitDelivrer = aDroitPrendreEnCharge(
    props.requete as IRequeteDelivrance
  );

  const appartientAMonServiceMereServiceOuFillesServices =
    storeRece.utilisateurCourant?.entite?.idEntite === props.requete.idEntite ||
    storeRece.utilisateurCourant?.entitesFilles?.some(
      el => el.idEntite === props.requete.idEntite
    ) ||
    storeRece.utilisateurCourant?.entite?.hierarchieEntite?.some(
      el => el.entiteMere.idEntite === props.requete.idEntite
    );

  if (
    estATraiterOuATransferee &&
    mAppartientOuAppartientAPersonne &&
    comedecDroitDelivrerCOMEDECouDroitDelivrer &&
    appartientAMonServiceMereServiceOuFillesServices &&
    estDisabled
  ) {
    setEstDisabled(false);
  }

  return (
    <button
      className="BoutonPriseEnCharge"
      type="button"
      disabled={estDisabled}
      onClick={setActionEtUpdateStatut}
    >
      {getLibelle("Prendre en charge")}
    </button>
  );
};

const mapRequeteRmcAuto = (requete: IRequeteDelivrance): IRequeteTableau => {
  return {
    idRequete: requete.id,
    numero: requete.numero,
    titulaires: requete.titulaires ? getTitulaires(requete.titulaires) : [],
    requerant: requete.requerant,
    idUtilisateur: requete.idUtilisateur,
    type: requete.type?.libelle,
    statut: StatutRequete.PRISE_EN_CHARGE.libelle,
    document: DocumentDelivrance.getKeyForNom(requete.documentDemande?.nom)
  };
};

const getTitulaires = (
  titulaires: ITitulaireRequete[]
): ITitulaireRequeteTableau[] => {
  return titulaires.map((t: ITitulaireRequete) => {
    const titulaire = {} as ITitulaireRequeteTableau;
    titulaire.nom = t.nomNaissance;
    if (t.jourNaissance) {
      titulaire.jourNaissance = t.jourNaissance;
    }
    if (t.moisNaissance) {
      titulaire.moisNaissance = t.moisNaissance;
    }
    if (t.anneeNaissance) {
      titulaire.anneeNaissance = t.anneeNaissance;
    }
    titulaire.paysNaissance = t.paysNaissance;
    titulaire.villeNaissance = t.villeNaissance;
    titulaire.sexe = Sexe.getEnumFor(t.sexe);
    titulaire.prenoms = t.prenoms ? getPrenoms(t.prenoms) : [];
    return titulaire;
  });
};

const getPrenoms = (prenoms: IPrenomOrdonnes[]): string[] => {
  return prenoms.map((p: IPrenomOrdonnes) => {
    return p.prenom;
  });
};

const aDroitPrendreEnCharge = (requete: IRequeteDelivrance) => {
  return (
    (requete?.provenanceRequete?.provenance === Provenance.COMEDEC &&
      officierHabiliterPourLeDroit(Droit.DELIVRER_COMEDEC)) ||
    (requete?.provenanceRequete?.provenance !== Provenance.COMEDEC &&
      officierHabiliterPourLeDroit(Droit.DELIVRER))
  );
};
