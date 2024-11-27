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
import { IMajAnalyseMarginale } from "@hook/acte/EnregistrerMentionsApiHook";
import { IDerniereAnalyseMarginalResultat } from "@hook/requete/miseajour/DerniereAnalyseMarginaleApiHook";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { IMajAnalyseMarginaleForm } from "@model/form/miseAJour/IMiseAJourMentionsForm";
import { getPrenomsOrdonneVersPrenomsDefaultValues } from "@pages/requeteDelivrance/saisirRequete/hook/mappingCommun";
import { UN, getPremiereOuSecondeValeur, mapPrenomsVersPrenomsOrdonnes } from "@util/Utils";
import { Formulaire } from "@widget/formulaire/Formulaire";
import React, { Dispatch, SetStateAction, useContext } from "react";
import * as Yup from "yup";
import { IMajMention, MiseAJourMentionsContext } from "../../ApercuRequeteMiseAJourPage";
import MiseAJourAnalyseMarginaleForm from "./form/MiseAJourAnalyseMarginaleForm";
import "./scss/MiseAJourAnalyseMarginale.scss";

type MiseAJourAnalyseMarginaleProps = {
  onClickAbandonnerDerniereAnalyseMarginaleNonValide: () => void;
  resetForm: boolean;
  setResetForm: Dispatch<SetStateAction<boolean>>;
};

const ValidationSchema = Yup.object({
  [ANALYSE_MARGINALE]: Yup.object({
    [NOM]: Yup.string().required("La saisie du nom est obligatoire"),
    [MOTIF]: Yup.string().required("La saisie du motif est obligatoire")
  }),
  [NOM_SECABLE]: Yup.object({
    [SECABLE]: Yup.boolean(),
    [NOM_PARTIE1]: Yup.string()
      .nullable()
      .when(SECABLE, {
        is: (secable: boolean) => secable,
        then: Yup.string().required("La 1re partie est obligatoire")
      }),
    [NOM_PARTIE2]: Yup.string()
      .nullable()
      .when(SECABLE, {
        is: (secable: boolean) => secable,
        then: Yup.string().required("La 2nde partie est obligatoire")
      })
  })
}).test("nomsConformes", "Le nomSecable ne peut être vide", function (value) {
  const nom = (value as any)[ANALYSE_MARGINALE][NOM];
  const { nomPartie1, nomPartie2, secable } = value[NOM_SECABLE];
  if (secable && nom?.trim() !== `${nomPartie1?.trim()} ${nomPartie2?.trim()}`) {
    return this.createError({
      path: "nomSecable.nomPartie2",
      message: "Les données saisies dans le nom sont incohérentes avec les données du nom sécable"
    });
  }

  return true;
});

const MiseAJourAnalyseMarginale: React.FC<MiseAJourAnalyseMarginaleProps> = ({
  onClickAbandonnerDerniereAnalyseMarginaleNonValide,
  resetForm,
  setResetForm
}) => {
  const { derniereAnalyseMarginaleResultat, listeMentions, analyseMarginaleEnregistree } = useContext(MiseAJourMentionsContext);

  return (
    <div className="MiseAJourAnalyseMarginale">
      <Formulaire
        formDefaultValues={getValeursParDefaut(listeMentions, analyseMarginaleEnregistree, derniereAnalyseMarginaleResultat)}
        formValidationSchema={ValidationSchema}
        onSubmit={() => {}}
      >
        <MiseAJourAnalyseMarginaleForm
          onClickAbandonnerDerniereAnalyseMarginaleNonValide={onClickAbandonnerDerniereAnalyseMarginaleNonValide}
          resetForm={resetForm}
          setResetForm={setResetForm}
        />
      </Formulaire>
    </div>
  );
};

export const getValeursParDefaut = (
  listeMentions: IMajMention[],
  analyseMarginaleEnregistree: IMajAnalyseMarginale | undefined,
  derniereAnalyseMarginaleEnregistree: IDerniereAnalyseMarginalResultat | undefined
): IMajAnalyseMarginaleForm => {
  const secable = Boolean(
    derniereAnalyseMarginaleEnregistree?.titulaire.nomPartie1 && derniereAnalyseMarginaleEnregistree?.titulaire.nomPartie2
  );
  return {
    [ANALYSE_MARGINALE]: {
      [NOM]: getPremiereOuSecondeValeur(analyseMarginaleEnregistree?.nom, derniereAnalyseMarginaleEnregistree?.titulaire.nom),
      [PRENOMS]: analyseMarginaleEnregistree
        ? getPrenomsOrdonneVersPrenomsDefaultValues(mapPrenomsVersPrenomsOrdonnes(analyseMarginaleEnregistree.prenoms))
        : getPrenomsOrdonneVersPrenomsDefaultValues(derniereAnalyseMarginaleEnregistree?.titulaire.prenoms),
      [MOTIF]: getPremiereOuSecondeValeur(analyseMarginaleEnregistree?.motif, getMotif(listeMentions, derniereAnalyseMarginaleEnregistree))
    },
    [NOM_SECABLE]: {
      [SECABLE]: analyseMarginaleEnregistree ? analyseMarginaleEnregistree.secable : secable,
      [NOM_PARTIE1]: getPremiereOuSecondeValeur(
        analyseMarginaleEnregistree?.nomPartie1,
        derniereAnalyseMarginaleEnregistree?.titulaire.nomPartie1
      ),
      [NOM_PARTIE2]: getPremiereOuSecondeValeur(
        analyseMarginaleEnregistree?.nomPartie2,
        derniereAnalyseMarginaleEnregistree?.titulaire.nomPartie2
      )
    }
  };
};

export const getMotif = (listeMentions: IMajMention[], derniereAnalyseMarginaleEnregistree?: IDerniereAnalyseMarginalResultat) => {
  const listeMentionsAffecteAnalyseMarginal: IMajMention[] = listeMentions.filter(mention => {
    return TypeMention.getTypeMentionById(
      mention.typeMention.idMentionNiveauTrois || mention.typeMention.idMentionNiveauDeux || mention.typeMention.idMentionNiveauUn
    )?.affecteAnalyseMarginale;
  });

  const typeMention = listeMentionsAffecteAnalyseMarginal[0]?.typeMention;
  const codeTypeMention = TypeMention.getTypeMentionById(
    typeMention?.idMentionNiveauTrois || typeMention?.idMentionNiveauDeux || typeMention?.idMentionNiveauUn
  )
    ?.libelle.trim()
    .split(" ")[0];

  return derniereAnalyseMarginaleEnregistree && listeMentionsAffecteAnalyseMarginal.length === UN
    ? derniereAnalyseMarginaleEnregistree.estValide
      ? `Suite à apposition de mention ${codeTypeMention}`
      : derniereAnalyseMarginaleEnregistree?.motif
    : "";
};

export default MiseAJourAnalyseMarginale;
