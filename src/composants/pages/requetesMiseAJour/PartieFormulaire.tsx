import { CONFIG_PATCH_STATUT_REQUETE_MISE_A_JOUR } from "@api/configurations/requete/miseAJour/PatchStatutRequeteMiseAjour";
import { useDerniereAnalyseMarginaleApiHook } from "@hook/requete/miseajour/DerniereAnalyseMarginaleApiHook";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { logError } from "@util/LogManager";
import { getLibelle } from "@util/Utils";
import { useEffect, useState } from "react";
import { useCreateBlocker } from "../../../hooks/CreateBlocker";
import useFetchApi from "../../../hooks/FetchApiHook";
import OngletsBouton from "../../commun/onglets/OngletsBouton";
import OngletsContenu from "../../commun/onglets/OngletsContenu";
import { MiseAJourAnalyseMarginaleForm } from "./miseAJourAnalyseMarginaleForm/MiseAJourAnalyseMarginaleForm";

enum ECleOngletFormulaire {
  ANALYSE_MARGINALE = "analyse-marginale"
}

interface IPartieFormulaireProps {
  idActe: string;
  idRequete: string;
}

export const PartieFormulaire: React.FC<IPartieFormulaireProps> = ({
  idActe,
  idRequete
}) => {
  const [ongletActif, setOngletActif] = useState<ECleOngletFormulaire>(
    ECleOngletFormulaire.ANALYSE_MARGINALE
  );

  const { appelApi: appelApiModifierStatutRequeteMiseAJour } = useFetchApi(
    CONFIG_PATCH_STATUT_REQUETE_MISE_A_JOUR
  );

  const abandonnerRequete = () =>
    appelApiModifierStatutRequeteMiseAJour({
      parametres: {
        path: {
          idRequete: idRequete,
          statut: StatutRequete.getKey(StatutRequete.ABANDONNEE)
        }
      },
      apresSucces: () => {
        gestionBlocker.desactiverBlocker();
      },
      apresErreur: erreurs => {
        logError({
          messageUtilisateur:
            "Impossible de mettre à jour le statut de la requête",
          error: erreurs[0]
        });
      }
    });

  const { gestionBlocker, BlockerNavigation } = useCreateBlocker({
    messages: [
      getLibelle("La saisie en cours sera perdue."),
      getLibelle("Voulez-vous continuer ?")
    ],
    executerApresConfirmation: () => {
      abandonnerRequete();
    },
    titre: getLibelle("Abandon du traitement"),
    executerSiRedirectionAvecBlocageSansPopin: () => {
      abandonnerRequete();
    }
  });

  useEffect(() => {
    gestionBlocker.activerBlockerSansConfirmation();
  }, []);

  const derniereAnalyseMarginaleResultat =
    useDerniereAnalyseMarginaleApiHook(idActe);

  return (
    <div className="partie-formulaire">
      <OngletsBouton
        onglets={[
          {
            cle: ECleOngletFormulaire.ANALYSE_MARGINALE,
            libelle: "Analyse Marginale"
          }
        ]}
        cleOngletActif={ongletActif}
        changerOnglet={(valeur: string) =>
          setOngletActif(valeur as ECleOngletFormulaire)
        }
      />

      <OngletsContenu
        estActif={ongletActif === ECleOngletFormulaire.ANALYSE_MARGINALE}
      >
        <MiseAJourAnalyseMarginaleForm
          idRequete={idRequete}
          derniereAnalyseMarginal={derniereAnalyseMarginaleResultat}
          gestionBlocker={gestionBlocker}
        />
      </OngletsContenu>
      <BlockerNavigation />
    </div>
  );
};

export default PartieFormulaire;
