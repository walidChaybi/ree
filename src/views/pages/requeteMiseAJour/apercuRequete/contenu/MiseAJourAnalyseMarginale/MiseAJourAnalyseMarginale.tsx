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
  IMajMention,
  MiseAJourMentionsContext
} from "../../ApercuRequeteMiseAJourPage";
import MiseAJourAnalyseMarginaleForm from "./form/MiseAJourAnalyseMarginaleForm";
import "./scss/MiseAJourAnalyseMarginale.scss";

const ValidationSchema = Yup.object({
  [NOM_SECABLE]: Yup.object({
    [SECABLE]: Yup.boolean(),
    [NOM_PARTIE1]: Yup.string(),
    [NOM_PARTIE2]: Yup.string()
  })
}).test("nomsConformes", "Le nomSecable ne peut être vide", function (value) {
  const nom = (value as any)[ANALYSE_MARGINALE][NOM];
  const { nomPartie1, nomPartie2, secable } = value[NOM_SECABLE];
  if (
    secable &&
    nom.replace(/\s/g, "") !== `${nomPartie1}${nomPartie2?.replace(/\s/g, "")}`
  ) {
    return this.createError({
      path: "nomSecable.nomPartie2",
      message:
        "Les données saisies dans le nom sont incohérentes avec les données du nom sécable"
    });
  }

  return true;
});

const MiseAJourAnalyseMarginale: React.FC = () => {
  const { derniereAnalyseMarginaleResultat, listeMentions } = useContext(
    MiseAJourMentionsContext
  );

  return (
    <div className="MiseAJourAnalyseMarginale">
      <Formulaire
        formDefaultValues={getValeursParDefaut(
          listeMentions,
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
  listeMentions: IMajMention[],
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
      [MOTIF]: getMotif(listeMentions, derniereAnalyseMarginaleEnregistree)
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
  listeMentions: IMajMention[],
  derniereAnalyseMarginaleEnregistree?: IDerniereAnalyseMarginalResultat
) => {
  const listeMentionsAffecteAnalyseMarginal: IMajMention[] =
    listeMentions.filter(mention => {
      return TypeMention.getTypeMentionById(
        mention.typeMention.idMentionNiveauTrois ||
          mention.typeMention.idMentionNiveauDeux ||
          mention.typeMention.idMentionNiveauUn
      )?.affecteAnalyseMarginale;
    });

  const typeMention = listeMentionsAffecteAnalyseMarginal[0]?.typeMention;
  const codeTypeMention = TypeMention.getTypeMentionById(
    typeMention?.idMentionNiveauTrois ||
      typeMention?.idMentionNiveauDeux ||
      typeMention?.idMentionNiveauUn
  )
    ?.libelle.trim()
    .split(" ")[0];

  return derniereAnalyseMarginaleEnregistree &&
    listeMentionsAffecteAnalyseMarginal.length === UN
    ? derniereAnalyseMarginaleEnregistree.estValide
      ? `Suite à apposition de mention ${codeTypeMention}`
      : derniereAnalyseMarginaleEnregistree?.motif
    : "";
};

export default MiseAJourAnalyseMarginale;
