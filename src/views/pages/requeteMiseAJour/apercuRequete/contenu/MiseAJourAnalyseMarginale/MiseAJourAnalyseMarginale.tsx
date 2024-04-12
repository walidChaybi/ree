import {
  ANALYSE_MARGINALE,
  MOTIF,
  NOM,
  NOM_PARTIE1,
  NOM_PARTIE2,
  NOM_SECABLE,
  PRENOMS,
  SECABLE
} from "@composant/formulaire/ConstantesNomsForm";
import { IDerniereAnalyseMarginalResultat } from "@hook/requete/miseajour/DerniereAnalyseMarginaleApiHook";
import { IMajAnalyseMarginaleForm } from "@model/form/miseAJour/IMiseAJourMentionsForm";
import { getPrenomsOrdonneVersPrenomsDefaultValues } from "@pages/requeteDelivrance/saisirRequete/hook/mappingCommun";
import { getLibelle } from "@util/Utils";
import { Formulaire } from "@widget/formulaire/Formulaire";
import React, { useContext } from "react";
import * as Yup from "yup";
import { MiseAJourMentionsContext } from "../../ApercuRequeteMiseAJourPage";
import MiseAJourAnalyseMarginaleForm from "./form/MiseAJourAnalyseMarginaleForm";
import "./scss/MiseAJourAnalyseMarginale.scss";

const ValidationSchema = Yup.object({});

const MiseAJourAnalyseMarginale: React.FC = () => {
  const { derniereAnalyseMarginaleResultat } = useContext(
    MiseAJourMentionsContext
  );

  return (
    <div className="MiseAJourAnalyseMarginale">
      <Formulaire
        formDefaultValues={getValeursParDefaut(
          derniereAnalyseMarginaleResultat
        )}
        formValidationSchema={ValidationSchema}
        onSubmit={() => {}}
      >
        <div>bloc nom prénom</div>
        <div className="blocNomSecable">
          <div className="bandeauSection">
            <p>
              {getLibelle(
                "Gestion nom sécable pour la délivrance des extraits"
              )}
            </p>
          </div>
          <MiseAJourAnalyseMarginaleForm />
        </div>
      </Formulaire>
    </div>
  );
};

export default MiseAJourAnalyseMarginale;

const getValeursParDefaut = (
  derniereAnalyseMarginale: IDerniereAnalyseMarginalResultat | undefined
): IMajAnalyseMarginaleForm => {
  const secable = Boolean(
    derniereAnalyseMarginale?.titulaire.nomPartie1 &&
      derniereAnalyseMarginale?.titulaire.nomPartie2
  );
  return {
    [ANALYSE_MARGINALE]: {
      [NOM]: derniereAnalyseMarginale?.titulaire.nom || "",
      [PRENOMS]: getPrenomsOrdonneVersPrenomsDefaultValues(
        derniereAnalyseMarginale?.titulaire.prenoms
      ),
      [MOTIF]: ""
    },
    [NOM_SECABLE]: {
      [SECABLE]: secable,
      [NOM_PARTIE1]: derniereAnalyseMarginale
        ? derniereAnalyseMarginale.titulaire.nomPartie1
        : "",
      [NOM_PARTIE2]: derniereAnalyseMarginale
        ? derniereAnalyseMarginale.titulaire.nomPartie2
        : ""
    }
  };
};
