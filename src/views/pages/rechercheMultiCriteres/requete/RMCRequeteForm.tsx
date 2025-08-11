import { DATES_DEBUT_FIN_ANNEE, REQUERANT, REQUETE, TITULAIRE } from "@composant/formulaire/ConstantesNomsForm";
import { ETypeRequete } from "@model/requete/enum/TypeRequete";
import { ICriteresRMCRequete } from "@model/rmc/requete/ICriteresRMCRequete";
import { IRMCRequeteForm } from "@model/rmc/requete/IRMCRequete";
import { MEP_YEAR } from "@util/DateUtils";
import { stockageDonnees } from "@util/stockageDonnees";
import { Formulaire } from "@widget/formulaire/Formulaire";
import { NB_LIGNES_PAR_APPEL_REQUETE } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import React from "react";
import * as Yup from "yup";
import { useTitreDeLaFenetre } from "../../../../hooks/utilitaires/TitreDeLaFenetreHook";
import AfficherMessage from "../../../../utils/AfficherMessage";
import RMCBoutons from "../boutons/RMCBoutons";
import DatesDebutFinAnneeFiltre, {
  DatesDebutFinAnneeDefaultValues,
  DatesDebutFinAnneeFiltreProps,
  DatesDebutFinAnneeValidationSchema
} from "../filtres/datesDebutFinAnnee/DatesDebutFinAnneeFiltre";
import RequerantFiltre, {
  RequerantDefaultValues,
  RequerantFiltreProps,
  RequerantValidationSchema
} from "../filtres/requerant/RequerantFiltre";
import RequeteFiltre, { RequeteDefaultValues, RequeteFiltreProps, RequeteValidationSchema } from "../filtres/requete/RequeteFiltre";
import TitulaireFiltre, {
  TitulaireDefaultValues,
  TitulaireFiltreProps,
  TitulaireValidationSchema
} from "../filtres/titulaire/TitulaireFiltre";
import "./scss/RMCRequetePage.scss";
import { getMessageSiVerificationRestrictionRmcRequeteEnErreur } from "./validation/VerificationRestrictionRmcRequete";

// Valeurs par défaut des champs
const DefaultValuesRMCRequete = {
  [REQUETE]: RequeteDefaultValues,
  [DATES_DEBUT_FIN_ANNEE]: DatesDebutFinAnneeDefaultValues,
  [TITULAIRE]: TitulaireDefaultValues,
  [REQUERANT]: RequerantDefaultValues
};

// Schéma de validation en sortie de champs
const ValidationSchemaRMCRequete = Yup.object({
  [REQUETE]: RequeteValidationSchema,
  [DATES_DEBUT_FIN_ANNEE]: DatesDebutFinAnneeValidationSchema,
  [TITULAIRE]: TitulaireValidationSchema,
  [REQUERANT]: RequerantValidationSchema
});

export const titreForm = "Critères de recherche d'une requête";

interface RMCRequeteFormProps {
  closePopIn?: () => void;
  setNouvelleRMCRequete: React.Dispatch<React.SetStateAction<boolean>>;
  setValuesRMCRequete: React.Dispatch<React.SetStateAction<IRMCRequeteForm<keyof typeof ETypeRequete | ""> | null>>;
  setCriteresRechercheRequete: (criteres: ICriteresRMCRequete) => void;
}

export const RMCRequeteForm: React.FC<RMCRequeteFormProps> = ({
  closePopIn,
  setNouvelleRMCRequete,
  setValuesRMCRequete,
  setCriteresRechercheRequete
}) => {
  const blocsForm: JSX.Element[] = [getFormRequete(), getFormDatesDebutFin(), getFormTitulaire(), getFormRequerant()];

  const onSubmitRMCRequete = (values: any) => {
    const messageErreur = getMessageSiVerificationRestrictionRmcRequeteEnErreur(values);
    if (messageErreur) {
      AfficherMessage.erreur(messageErreur, { fermetureAuto: true });
    } else {
      if (closePopIn) {
        closePopIn();
      }

      setNouvelleRMCRequete(true);
      setValuesRMCRequete(values);
      setCriteresRechercheRequete({
        valeurs: values,
        range: `0-${NB_LIGNES_PAR_APPEL_REQUETE}`
      });
      stockageDonnees.stockerCriteresRMCReq(values);
      setNouvelleRMCRequete(false);
    }
  };

  const rappelCriteres = () => {
    return stockageDonnees.recupererCriteresRMCReq();
  };

  useTitreDeLaFenetre(titreForm);

  return (
    <Formulaire
      titre={titreForm}
      formDefaultValues={DefaultValuesRMCRequete}
      formValidationSchema={ValidationSchemaRMCRequete}
      onSubmit={onSubmitRMCRequete}
    >
      <div className="DeuxColonnes FormulaireRMCRequete">{blocsForm}</div>
      <RMCBoutons rappelCriteres={rappelCriteres} />
    </Formulaire>
  );
};

function getFormRequete(): JSX.Element {
  const requeteFiltreProps = {
    nomFiltre: REQUETE
  } as RequeteFiltreProps;
  return (
    <RequeteFiltre
      key={REQUETE}
      {...requeteFiltreProps}
    />
  );
}

function getFormDatesDebutFin(): JSX.Element {
  const datesDebutFinAnneeFiltreProps = {
    nomFiltre: DATES_DEBUT_FIN_ANNEE,
    anneeMin: MEP_YEAR
  } as DatesDebutFinAnneeFiltreProps;
  return (
    <DatesDebutFinAnneeFiltre
      key={DATES_DEBUT_FIN_ANNEE}
      {...datesDebutFinAnneeFiltreProps}
    />
  );
}

function getFormTitulaire(): JSX.Element {
  const titulaireFiltreProps = {
    nomFiltre: TITULAIRE
  } as TitulaireFiltreProps;
  return (
    <TitulaireFiltre
      key={TITULAIRE}
      {...titulaireFiltreProps}
    />
  );
}

function getFormRequerant(): JSX.Element {
  const requerantFiltreProps = {
    nomFiltre: REQUERANT
  } as RequerantFiltreProps;
  return (
    <RequerantFiltre
      key={REQUERANT}
      {...requerantFiltreProps}
    />
  );
}
