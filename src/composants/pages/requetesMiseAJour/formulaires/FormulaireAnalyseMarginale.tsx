import { CONFIG_PUT_MISE_A_JOUR_ANALYSE_MARGINALE } from "@api/configurations/etatCivil/PutMiseAJourAnalyseMarginaleConfigApi";
import {
  IMiseAJourAnalyseMarginaleValeursForm,
  MiseAJourAnalyseMarginaleValeursForm,
  SCHEMA_VALIDATION_MISE_A_JOUR_ANALYSE_MARGINALE
} from "@api/validations/requeteMiseAJour/MiseAJourAnalyseMarginaleValidation";
import { IDerniereAnalyseMarginalResultat } from "@hook/requete/miseajour/DerniereAnalyseMarginaleApiHook";
import messageManager from "@util/messageManager";
import { Formulaire } from "@widget/formulaire/Formulaire";
import { useContext, useState } from "react";
import { ECleOngletsMiseAJour, EditionMiseAJourContext } from "../../../../contexts/EditionMiseAJourContextProvider";
import useFetchApi from "../../../../hooks/api/FetchApiHook";
import ChampsNomSecable from "../../../commun/champs/ChampsNomSecable";
import ChampsPrenoms from "../../../commun/champs/ChampsPrenoms";
import ChampsTexte from "../../../commun/champs/ChampsTexte";
import PageChargeur from "../../../commun/chargeurs/PageChargeur";
import BoutonActualiserEtVisualiser from "./BoutonActualiserEtVisualiser";
import BoutonAnnulerSaisie from "./BoutonAnnulerSaisie";
import BoutonValiderEtTerminer from "./BoutonValiderEtTerminer";
import "./FormulaireAnalyseMarginale.scss";

interface IFormulaireAnalyseMarginaleProps {
  derniereAnalyseMarginale: IDerniereAnalyseMarginalResultat;
}

const FormulaireAnalyseMarginale: React.FC<IFormulaireAnalyseMarginaleProps> = ({ derniereAnalyseMarginale }) => {
  const { idActe } = useContext(EditionMiseAJourContext.Valeurs);
  const { activerOngletActeMisAJour, setComposerActeMisAJour, changerOnglet } = useContext(EditionMiseAJourContext.Actions);
  const { appelApi: appelApiMisAJourAnalyseMarginale, enAttenteDeReponseApi: enAttenteMiseAJourAnalyseMarginale } = useFetchApi(
    CONFIG_PUT_MISE_A_JOUR_ANALYSE_MARGINALE
  );
  const [valeursParDefaut, setValeursParDefaut] = useState<IMiseAJourAnalyseMarginaleValeursForm>(
    MiseAJourAnalyseMarginaleValeursForm.valeurParDefaut(derniereAnalyseMarginale)
  );

  const onSubmit = (valeurs: IMiseAJourAnalyseMarginaleValeursForm) => {
    appelApiMisAJourAnalyseMarginale({
      parametres: {
        path: { idActe: idActe },
        body: MiseAJourAnalyseMarginaleValeursForm.versDto(valeurs)
      },
      apresSucces: () => {
        setValeursParDefaut(valeurs);
        activerOngletActeMisAJour();
        setComposerActeMisAJour(true);
        changerOnglet(ECleOngletsMiseAJour.ACTE_MIS_A_JOUR, null);
      },
      apresErreur: erreurs => {
        if (erreurs.find(erreur => erreur.code === "FCT_16136")) {
          messageManager.showError("Aucune modification de l'analyse marginale n'a été détectée");

          return;
        }
        messageManager.showError("Impossible de mettre à jour l'analyse marginale");
      }
    });
  };

  return (
    <>
      {enAttenteMiseAJourAnalyseMarginale && <PageChargeur />}

      <Formulaire
        formDefaultValues={valeursParDefaut}
        formValidationSchema={SCHEMA_VALIDATION_MISE_A_JOUR_ANALYSE_MARGINALE}
        onSubmit={valeurs => onSubmit(valeurs as IMiseAJourAnalyseMarginaleValeursForm)}
      >
        <div className="formulaire-mise-a-jour-analyse-marginale">
          <div className="champs-formulaire">
            <div>
              <ChampsNomSecable
                nom={{ name: "analyseMarginale.nom", libelle: "Nom" }}
                secable={{ name: "nomSecable.secable", libelle: "Nom sécable" }}
                nomPartie1={{
                  name: "nomSecable.nomPartie1",
                  libelle: "Nom 1re partie"
                }}
                nomPartie2={{
                  name: "nomSecable.nomPartie2",
                  libelle: "Nom 2nde partie"
                }}
              />
            </div>

            <div>
              <ChampsPrenoms cheminPrenoms={"analyseMarginale.prenoms"} prefixePrenom={"prenom"} />
            </div>

            <ChampsTexte className="champs-motif" name="analyseMarginale.motif" libelle="Motif" type="text" />
          </div>

          <div className="bouton-annuler-saisie">
            <BoutonAnnulerSaisie />
          </div>

          <div className="boutons-actions-form">
            <BoutonActualiserEtVisualiser />
            <BoutonValiderEtTerminer />
          </div>
        </div>
      </Formulaire>
    </>
  );
};

export default FormulaireAnalyseMarginale;
