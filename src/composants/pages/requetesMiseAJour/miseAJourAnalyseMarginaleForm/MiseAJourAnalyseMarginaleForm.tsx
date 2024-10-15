import { CONFIG_PATCH_MISE_A_JOUR_STATUT_REQUETE } from "@api/configurations/requete/miseAJour/PatchMiseAJourStatutRequeteApiConfig";
import { TypeDeValeursParDefaut } from "@composant/formulaire/nomsPrenoms/PrenomsForm";
import { IDerniereAnalyseMarginalResultat } from "@hook/requete/miseajour/DerniereAnalyseMarginaleApiHook";
import { IMajAnalyseMarginaleForm } from "@model/form/miseAJour/IMiseAJourMentionsForm";
import { getPrenomsOrdonneVersPrenomsDefaultValues } from "@pages/requeteDelivrance/saisirRequete/hook/mappingCommun";
import { URL_RECHERCHE_ACTE_INSCRIPTION } from "@router/ReceUrls";
import { logError } from "@util/LogManager";
import { getValeurOuVide } from "@util/Utils";
import messageManager from "@util/messageManager";
import { Formulaire } from "@widget/formulaire/Formulaire";
import { useNavigate } from "react-router-dom";
import useFetchApi from "../../../../hooks/FetchApiHook";
import ModificationAnalyseMarginale from "./ModificationAnalyseMarginale";

interface IMiseAJourAnalyseMarginaleForm {
  idRequete: string;
  derniereAnalyseMarginal?: IDerniereAnalyseMarginalResultat;
  gestionBlocker?: {
    activerBlockerSansConfirmation: () => void;
    activerBlockerAvecConfirmation: () => void;
    desactiverBlocker: () => void;
  };
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
> = ({ idRequete, derniereAnalyseMarginal, gestionBlocker }) => {
  const navigate = useNavigate();
  const { appelApi: appelPatchMiseAJourStatutRequete } = useFetchApi(
    CONFIG_PATCH_MISE_A_JOUR_STATUT_REQUETE
  );

  const onActualiserEtVisualiser = () => {
    gestionBlocker?.activerBlockerAvecConfirmation();
  };

  const onClickValiderEtTerminer = () => {
    appelPatchMiseAJourStatutRequete({
      parametres: {
        path: {
          idRequete: idRequete
        },
        query: {
          estMiseAjourAnalyseMarginale: true
        }
      },
      apresSucces: () => {
        gestionBlocker?.desactiverBlocker();
        navigate(URL_RECHERCHE_ACTE_INSCRIPTION);
        messageManager.showSuccessAndClose(
          "L'analyse marginale a été mise à jour avec succès"
        );
      },
      apresErreur: erreur => {
        logError({
          error: erreur,
          messageUtilisateur: "Impossible de mettre à jour l'analyse marginale"
        });
      }
    });
  };

  return (
    <Formulaire
      formDefaultValues={getValeurParDefaut(derniereAnalyseMarginal)}
      formValidationSchema={undefined}
      onSubmit={() => console.log("Soumission implémentée dans STRECE-3846")}
      className="sans-marge"
    >
      <ModificationAnalyseMarginale
        onValiderEtTerminer={onClickValiderEtTerminer}
        onActualiserEtVisualiser={onActualiserEtVisualiser}
      />
    </Formulaire>
  );
};
