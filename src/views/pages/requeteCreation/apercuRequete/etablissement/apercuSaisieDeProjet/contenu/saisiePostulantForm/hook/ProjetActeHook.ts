import { useEnregistrerProjetActeApiHook } from "@hook/acte/EnregistrerProjetActeApiHook";
import { useModifierProjetActeApiHook } from "@hook/acte/ModifierProjetActeApiHook";
import { useRecupererProjetActeApiHook } from "@hook/acte/RecupererProjetActeApiHook";
import { IMiseAJourSuiviDossierParams, useMiseAJourSuiviDossierApiHook } from "@hook/requete/MiseAJourSuiviDossierApiHook";
import { IProjetActe } from "@model/etatcivil/acte/projetActe/IProjetActe";
import { AvancementProjetActe } from "@model/requete/enum/AvancementProjetActe";
import { useEffect, useState } from "react";

interface IProjetActeHookResultat<TValeursForm> {
  projetActe?: IProjetActe;
  onClickActualiserProjet: (valeurs: TValeursForm) => void;
}

export const useProjetActeHook = <TValeursForm>(
  mappingSaisieProjetFormVersProjetActe: (
    valeurs: TValeursForm,
    numeroDossierNational?: string,
    projetActeExistant?: IProjetActe
  ) => IProjetActe,
  idSuiviDossier?: string,
  avancementProjetActe?: AvancementProjetActe,
  idActe?: string,
  numeroDossierNational?: string
): IProjetActeHookResultat<TValeursForm> => {
  const [projetActe, setProjetActe] = useState<IProjetActe>();
  const [projetActeAEnregistrer, setProjetActeAEnregistrer] = useState<IProjetActe>();
  const [projetActeAModifier, setProjetActeAModifier] = useState<IProjetActe>();
  const [miseAJourSuiviDossierParams, setMiseAJourSuiviDossierParams] = useState<IMiseAJourSuiviDossierParams>();

  const projetActeResultat = useRecupererProjetActeApiHook(idActe);
  const projetActeEnregistre = useEnregistrerProjetActeApiHook(projetActeAEnregistrer);
  const projetActeModife = useModifierProjetActeApiHook(projetActeAModifier);
  useMiseAJourSuiviDossierApiHook(miseAJourSuiviDossierParams);

  // Une fois que le projet est récupéré depuis etatcivil.
  useEffect(() => {
    if (projetActeResultat) {
      setProjetActe(projetActeResultat);
    }
  }, [projetActeResultat]);

  // Une fois que le projet est enregistré sur etatcivil.
  useEffect(() => {
    if (projetActeEnregistre) {
      setProjetActe(projetActeEnregistre);
      idSuiviDossier &&
        setMiseAJourSuiviDossierParams({
          idSuiviDossier,
          idActe: projetActeEnregistre.id
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projetActeEnregistre]);

  // Une fois que le projet est modifié sur etatcivil.
  useEffect(() => {
    if (projetActeModife) {
      setProjetActe(projetActeModife);
    }
  }, [projetActeModife]);

  const onClickActualiserProjet = (valeurs: TValeursForm) => {
    avancementProjetActe &&
      (AvancementProjetActe.estASaisir(avancementProjetActe) ? setProjetActeAEnregistrer : setProjetActeAModifier)(
        mappingSaisieProjetFormVersProjetActe(valeurs, numeroDossierNational, projetActe)
      );
  };

  return { projetActe, onClickActualiserProjet };
};
