import { IRMCActeInscriptionForm, RMCActeInscriptionForm } from "@model/form/rmc/RMCActeInscriptionForm";
import { ITitulaireRequete } from "@model/requete/ITitulaireRequete";
import { MIN_YEAR } from "@util/DateUtils";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { stockageDonnees } from "@util/stockageDonnees";
import { Formulaire } from "@widget/formulaire/Formulaire";
import { useMemo } from "react";
import * as Yup from "yup";
import ChampDate from "../../../../composants/commun/champs/ChampDate";
import ChampTexte from "../../../../composants/commun/champs/ChampTexte";
import { ChampsNomPrenomInterchangeables } from "../../../../composants/commun/champs/ChampsNomPrenomInterchangeables";
import ConteneurAvecBordure from "../../../../composants/commun/conteneurs/formulaire/ConteneurAvecBordure";
import BlocFiltreEvenement from "../../../../composants/pages/rmc/formulaire/BlocFiltreEvenement";
import BoutonsRMC from "../../../../composants/pages/rmc/formulaire/BoutonsRMC";
import { useTitreDeLaFenetre } from "../../../../hooks/utilitaires/TitreDeLaFenetreHook";
import RMCBoutons from "../boutons/RMCBoutons";
import DatesDebutFinAnneeFiltre, {
  DatesDebutFinAnneeDefaultValues,
  DatesDebutFinAnneeFiltreProps,
  DatesDebutFinAnneeValidationSchema
} from "../filtres/datesDebutFinAnnee/DatesDebutFinAnneeFiltre";
import RegistreRepertoireFiltre, {
  RegistreRepertoireDefaultValues,
  RegistreRepertoireFiltreProps,
  RegistreRepertoireValidationSchema
} from "../filtres/registreReperoire/RegistreRepertoireFiltre";
import TitulaireFiltre, {
  TitulaireDefaultValues,
  TitulaireFiltreProps,
  TitulaireValidationSchema
} from "../filtres/titulaire/TitulaireFiltre";
import "./scss/RMCActeInscriptionPage.scss";

// Nom des filtres
export const TITULAIRE = "titulaire";
export const DATES_DEBUT_FIN_ANNEE = "datesDebutFinAnnee";
export const REGISTRE_REPERTOIRE = "registreRepertoire";

// Valeurs par défaut des champs
export const DefaultValuesRMCActeInscription = {
  [TITULAIRE]: TitulaireDefaultValues,
  [DATES_DEBUT_FIN_ANNEE]: DatesDebutFinAnneeDefaultValues,
  [REGISTRE_REPERTOIRE]: RegistreRepertoireDefaultValues
};

// Schéma de validation en sortie de champs
export const ValidationSchemaRMCActeInscription = Yup.object({
  [TITULAIRE]: TitulaireValidationSchema,
  [DATES_DEBUT_FIN_ANNEE]: DatesDebutFinAnneeValidationSchema,
  [REGISTRE_REPERTOIRE]: RegistreRepertoireValidationSchema
});

export const titreForm = "Critères de recherche d'un acte et d'une inscription";

interface RMCActeInscriptionProps {
  onSubmit: (values: any) => void;
  titulaires?: ITitulaireRequete[];
}

export const RMCActeInscription: React.FC<RMCActeInscriptionProps> = props => {
  const blocsForm: JSX.Element[] = [getFormTitulaire(props.titulaires), getRegistreRepertoire(), getFormDatesDebutFinAnnee()];

  const onSubmitRMCActeInscription = (values: any): void => {
    props.onSubmit(values);
  };

  const rappelCriteres = () => {
    return stockageDonnees.recupererCriteresRMCActeInspt();
  };

  const afficherNouvelleRMC = useMemo(() => gestionnaireFeatureFlag.estActif(FeatureFlag.FF_UTILISER_NOUVELLE_RMC), []);

  useTitreDeLaFenetre(titreForm);

  return (
    <Formulaire<IRMCActeInscriptionForm>
      titre={titreForm}
      formDefaultValues={RMCActeInscriptionForm.valeursInitiales()}
      formValidationSchema={RMCActeInscriptionForm.schemaValidation()}
      onSubmit={onSubmitRMCActeInscription}
    >
      <div className="FormulaireRMCAI grid grid-cols-2">
        {afficherNouvelleRMC ? (
          <>
            <div>
              <ConteneurAvecBordure
                titreEnTete="Filtre titulaire"
                className="mt-8"
              >
                <ChampsNomPrenomInterchangeables
                  cheminNom="titulaire.nom"
                  cheminPrenom="titulaire.prenom"
                />
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <ChampDate
                    name="titulaire.dateNaissance"
                    libelle="Date de naissance"
                    avecBoutonReinitialiser
                  />
                  <ChampTexte
                    name="titulaire.paysNaissance"
                    libelle="Pays de naissance"
                  />
                </div>
              </ConteneurAvecBordure>
              <BlocFiltreEvenement />
              {getFormDatesDebutFinAnnee()}
            </div>

            {getRegistreRepertoire(afficherNouvelleRMC)}
          </>
        ) : (
          blocsForm
        )}
      </div>
      {gestionnaireFeatureFlag.estActif(FeatureFlag.FF_UTILISER_NOUVELLE_RMC) ? (
        <BoutonsRMC rappelCriteres={rappelCriteres} />
      ) : (
        <RMCBoutons rappelCriteres={rappelCriteres} />
      )}
    </Formulaire>
  );
};

function getFormTitulaire(titulaires?: ITitulaireRequete[]): JSX.Element {
  const titulaireFiltreProps = {
    nomFiltre: TITULAIRE
  } as TitulaireFiltreProps;
  return (
    <TitulaireFiltre
      key={TITULAIRE}
      {...titulaireFiltreProps}
      titulaires={titulaires}
    />
  );
}

function getFormDatesDebutFinAnnee(): JSX.Element {
  const datesDebutFinAnneeFiltreProps = {
    nomFiltre: DATES_DEBUT_FIN_ANNEE,
    anneeMin: MIN_YEAR
  } as DatesDebutFinAnneeFiltreProps;
  return (
    <DatesDebutFinAnneeFiltre
      key={DATES_DEBUT_FIN_ANNEE}
      {...datesDebutFinAnneeFiltreProps}
    />
  );
}

function getRegistreRepertoire(afficherNouvelleRMC?: boolean): JSX.Element {
  const registreRepertoireFiltreFiltreProps = {
    nomFiltre: REGISTRE_REPERTOIRE,
    afficherNouvelleRMC
  } as RegistreRepertoireFiltreProps;
  return (
    <RegistreRepertoireFiltre
      key={REGISTRE_REPERTOIRE}
      {...registreRepertoireFiltreFiltreProps}
    />
  );
}
