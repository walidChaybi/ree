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
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { IMajAnalyseMarginaleForm } from "@model/form/miseAJour/IMiseAJourMentionsForm";
import { getPrenomsOrdonneVersPrenomsDefaultValues } from "@pages/requeteDelivrance/saisirRequete/hook/mappingCommun";
import { UN } from "@util/Utils";
import { Formulaire } from "@widget/formulaire/Formulaire";
import React, { useContext } from "react";
import * as Yup from "yup";
import {
  IMentions,
  MiseAJourMentionsContext
} from "../../ApercuRequeteMiseAJourPage";
import MiseAJourAnalyseMarginaleForm from "./form/MiseAJourAnalyseMarginaleForm";
import "./scss/MiseAJourAnalyseMarginale.scss";

const ValidationSchema = Yup.object({});

const MiseAJourAnalyseMarginale: React.FC = () => {
  const { listeMentionsEnregistrees, derniereAnalyseMarginaleResultat } =
    useContext(MiseAJourMentionsContext);

  return (
    <div className="MiseAJourAnalyseMarginale">
      <Formulaire
        formDefaultValues={getValeursParDefaut(
          listeMentionsEnregistrees,
          derniereAnalyseMarginaleResultat
        )}
        formValidationSchema={ValidationSchema}
        onSubmit={() => {}}
      >
        <MiseAJourAnalyseMarginaleForm />
      </Formulaire>
    </div>
  );
};

const getValeursParDefaut = (
  listeMentionsEnregistrees: IMentions[],
  derniereAnalyseMarginaleEnregistree:
    | IDerniereAnalyseMarginalResultat
    | undefined
): IMajAnalyseMarginaleForm => {
  const secable = Boolean(
    derniereAnalyseMarginaleEnregistree?.titulaire.nomPartie1 &&
      derniereAnalyseMarginaleEnregistree?.titulaire.nomPartie2
  );
  return {
    [ANALYSE_MARGINALE]: {
      [NOM]: derniereAnalyseMarginaleEnregistree?.titulaire.nom || "",
      [PRENOMS]: getPrenomsOrdonneVersPrenomsDefaultValues(
        derniereAnalyseMarginaleEnregistree?.titulaire.prenoms
      ),
      [MOTIF]: getMotif(
        listeMentionsEnregistrees,
        derniereAnalyseMarginaleEnregistree
      )
    },
    [NOM_SECABLE]: {
      [SECABLE]: secable,
      [NOM_PARTIE1]: derniereAnalyseMarginaleEnregistree
        ? derniereAnalyseMarginaleEnregistree.titulaire.nomPartie1
        : "",
      [NOM_PARTIE2]: derniereAnalyseMarginaleEnregistree
        ? derniereAnalyseMarginaleEnregistree.titulaire.nomPartie2
        : ""
    }
  };
};

const getMotif = (
  listeMentionsEnregistrees: IMentions[],
  derniereAnalyseMarginaleEnregistree?: IDerniereAnalyseMarginalResultat
) => {
  const typeMention = listeMentionsEnregistrees[0]?.typeMention;
  const codeTypeMention = TypeMention.getTypeMentionById(
    typeMention?.idMentionNiveauTrois ||
      typeMention?.idMentionNiveauDeux ||
      typeMention?.idMentionNiveauUn
  )
    ?.libelle.trim()
    .split(" ")[0];

  return derniereAnalyseMarginaleEnregistree &&
    listeMentionsEnregistrees.length === UN
    ? derniereAnalyseMarginaleEnregistree.estValide
      ? `Suite à apposition de mention ${codeTypeMention} si une seule mention ultérieure est ajoutée`
      : derniereAnalyseMarginaleEnregistree?.motif
    : "";
};

export default MiseAJourAnalyseMarginale;
