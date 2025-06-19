import { RECEContextData } from "@core/contexts/RECEContext";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { officierDroitDelivrerSurLeTypeRegistreOuDroitMEAE } from "@model/agent/IOfficier";
import { Alerte, IAlerte } from "@model/etatcivil/fiche/IAlerte";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import React, { useCallback, useContext, useState } from "react";
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
    if (officierDroitDelivrerSurLeTypeRegistreOuDroitMEAE(utilisateurConnecte, idTypeRegistre)) {
      setPopinSupprimerAlerteState({
        idAlerteActe: alerte?.id || "",
        idActe: alerte?.idActe || "",
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
        {alertes?.map((alerte: IAlerte, idx: number): JSX.Element => {
          return (
            <div
              key={`alerte-${idx}`}
              className={alerte?.codeCouleur}
              title={alerte?.complementDescription}
            >
              {displayReference ? Alerte.toReferenceString(alerte, utilisateurs) : Alerte.toAlertString(alerte, utilisateurs)}
              {gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES) && (
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className="IconeBoutonSupprimerAlerte"
                  title={"Supprimer l'alerte"}
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
