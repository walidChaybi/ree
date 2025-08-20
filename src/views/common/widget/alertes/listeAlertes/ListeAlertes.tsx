import { RECEContextData } from "@core/contexts/RECEContext";
import { Droit } from "@model/agent/enum/Droit";
import { Perimetre } from "@model/agent/enum/Perimetre";
import { Alerte, IAlerte } from "@model/etatcivil/fiche/IAlerte";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import React, { useCallback, useContext, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { ConfirmationPopin } from "../../popin/ConfirmationPopin";
import { PopinSupprimerAlerte } from "./contenu/PopinSupprimerAlerte";
import "./scss/ListeAlertes.scss";

interface PopinSupprimerAlerteState {
  idAlerteActe: string;
  idActe: string;
  isOpen: boolean;
}

interface ListeAlertesProps {
  alertes: IAlerte[];
  idTypeRegistre?: string;
  displayReference: boolean;
  supprimerAlerteCallBack: (idAlerteActe: string, idActe: string) => void;
}

export const ListeAlertes: React.FC<ListeAlertesProps> = ({ alertes, displayReference, idTypeRegistre, supprimerAlerteCallBack }) => {
  const [popinSupprimerAlerteState, setPopinSupprimerAlerteState] = useState<PopinSupprimerAlerteState>({
    idAlerteActe: "",
    idActe: "",
    isOpen: false
  });
  const [hasMessageBloquant, setHasMessageBloquant] = useState<boolean>(false);
  const { utilisateurs, utilisateurConnecte } = useContext(RECEContextData);

  const onClick = (alerte: IAlerte): void => {
    if (
      utilisateurConnecte.estHabilitePour({ unDesDroits: [Droit.DELIVRER, Droit.DELIVRER_COMEDEC], pourIdTypeRegistre: idTypeRegistre }) ||
      utilisateurConnecte.estHabilitePour({
        unDesDroits: [Droit.DELIVRER, Droit.DELIVRER_COMEDEC],
        surLePerimetre: Perimetre.TOUS_REGISTRES
      })
    ) {
      setPopinSupprimerAlerteState({
        idAlerteActe: alerte?.id ?? "",
        idActe: alerte?.idActe ?? "",
        isOpen: true
      });
    } else {
      setHasMessageBloquant(true);
    }
  };

  const onClosePopin = (): void => {
    setPopinSupprimerAlerteState({
      idAlerteActe: "",
      idActe: "",
      isOpen: false
    });
  };

  const onSubmit = useCallback((): void => {
    onClosePopin();
    supprimerAlerteCallBack(popinSupprimerAlerteState?.idAlerteActe, popinSupprimerAlerteState?.idActe);
  }, [popinSupprimerAlerteState, supprimerAlerteCallBack]);

  return (
    <>
      <div className="ListeAlertes">
        {alertes?.map((alerte: IAlerte): JSX.Element => {
          return (
            <div
              key={alerte.id}
              className={alerte?.codeCouleur}
              title={alerte?.complementDescription}
            >
              {displayReference ? Alerte.toReferenceString(alerte, utilisateurs) : Alerte.toAlertString(alerte, utilisateurs)}
              {gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES) && (
                <FaTrashAlt
                  className="IconeBoutonSupprimerAlerte"
                  title="Supprimer l'alerte"
                  aria-label="Supprimer l'alerte"
                  onClick={() => onClick(alerte)}
                />
              )}
            </div>
          );
        })}
      </div>
      <ConfirmationPopin
        disablePortal={true}
        estOuvert={hasMessageBloquant}
        messages={["Vous n'avez pas les droits pour supprimer une alerte."]}
        boutons={[
          {
            label: "OK",
            action: () => {
              setHasMessageBloquant(false);
            }
          }
        ]}
      />
      <PopinSupprimerAlerte
        open={popinSupprimerAlerteState?.isOpen}
        onClosePopin={onClosePopin}
        onSubmit={onSubmit}
      />
    </>
  );
};
