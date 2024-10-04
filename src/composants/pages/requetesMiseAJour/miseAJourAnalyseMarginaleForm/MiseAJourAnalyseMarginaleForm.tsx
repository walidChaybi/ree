import { TypeDeValeursParDefaut } from "@composant/formulaire/nomsPrenoms/PrenomsForm";
import { IDerniereAnalyseMarginalResultat } from "@hook/requete/miseajour/DerniereAnalyseMarginaleApiHook";
import { IMajAnalyseMarginaleForm } from "@model/form/miseAJour/IMiseAJourMentionsForm";
import { getPrenomsOrdonneVersPrenomsDefaultValues } from "@pages/requeteDelivrance/saisirRequete/hook/mappingCommun";
import { getValeurOuVide } from "@util/Utils";
import { Formulaire } from "@widget/formulaire/Formulaire";
import ModificationAnalyseMarginale from "./ModificationAnalyseMarginale";

interface IMiseAJourAnalyseMarginaleForm {
  derniereAnalyseMarginal?: IDerniereAnalyseMarginalResultat;
}

const getValeurParDefaut = (
  derniereAM?: IDerniereAnalyseMarginalResultat
): IMajAnalyseMarginaleForm => {
  const secable = Boolean(
    derniereAM?.titulaire.nomPartie1 && derniereAM?.titulaire.nomPartie2
  );
  return {
    analyseMarginale: {
      nom: derniereAM?.titulaire.nom ?? "",
      prenoms: getPrenomsOrdonneVersPrenomsDefaultValues(
        derniereAM?.titulaire.prenoms,
        TypeDeValeursParDefaut.UNDEFINED
      ),
      motif: ""
    },
    nomSecable: {
      nomPartie1: secable
        ? getValeurOuVide(derniereAM?.titulaire.nomPartie1)
        : "",
      nomPartie2: secable
        ? getValeurOuVide(derniereAM?.titulaire.nomPartie2)
        : "",
      secable: secable
    }
  };
};

export const MiseAJourAnalyseMarginaleForm: React.FC<
  IMiseAJourAnalyseMarginaleForm
> = ({ derniereAnalyseMarginal }) => {
  return (
    <Formulaire
      formDefaultValues={getValeurParDefaut(derniereAnalyseMarginal)}
      formValidationSchema={undefined}
      onSubmit={() => console.log("Soumission implémentée dans STRECE-3846")}
      className="sans-marge"
    >
      <ModificationAnalyseMarginale />
    </Formulaire>
  );
};
