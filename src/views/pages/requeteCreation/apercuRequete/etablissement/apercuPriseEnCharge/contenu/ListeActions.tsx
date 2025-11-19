import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IEchange } from "@model/requete/IEchange";
import { estSuperieurA500Caracteres, getLibelle } from "@util/Utils";
import {
  RetourSDANFParams,
  useEnvoyerMessageRetourSDANFEtMiseAJourStatutApiHook
} from "@views/common/hook/requete/creation/EnvoyerMessageSdanfEtMiseAJourStatutApiHook";
import { GroupeBouton } from "@widget/menu/GroupeBouton";
import { ConfirmationPopinAvecMessage } from "@widget/popin/ConfirmationPopinAvecMessage";
import React, { useContext, useEffect, useState } from "react";
import { RECEContextData } from "../../../../../../../contexts/RECEContextProvider";
interface ListeActionsRetourSDANFProps {
  statusRequete: any;
  idRequeteCorbeilleAgent?: string;
  setEchanges: any;
  echanges?: IEchange[];
  idRequeteParam: string;
  modeConsultation?: boolean;
}

export const ListeActionsRetourSDANF: React.FC<ListeActionsRetourSDANFProps> = props => {
  const [param, setParam] = useState<RetourSDANFParams>();
  const messageRetourSDANFAPI: IEchange = useEnvoyerMessageRetourSDANFEtMiseAJourStatutApiHook(param);
  const { utilisateurConnecte } = useContext(RECEContextData);
  const [isOpen, setIsOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [buttonValidateDisabled, setButtonValidateDisabled] = useState(true);
  const [messageSDANF, setMessageSDANF] = useState("");
  const [messageErreur, setMessageErreur] = useState("");
  const [disabledActions, setDisabledActions] = useState(estPasStatutPriseEnChargeOuMAppartientPasOuModeConsultation());

  const ACTE_IRRECEVABLE = 0;
  const ELEMENT_MANQUANT = 1;
  const SUSPICION_DE_FRAUDE = 2;

  const listeActions = [
    {
      value: 0,
      label: "Acte irrecevable"
    },
    {
      value: 1,
      label: "Élément manquant"
    },
    {
      value: 2,
      label: "Suspicion de fraude / nouvel élément"
    }
  ];

  useEffect(() => {
    if (messageSDANF === "") setButtonValidateDisabled(true);
    else setButtonValidateDisabled(false);
  }, [messageSDANF]);

  useEffect(() => {
    if (messageRetourSDANFAPI) {
      props.setEchanges([...(props.echanges ?? []), messageRetourSDANFAPI]);

      setIsOpen(false);
      setDisabledActions(true);
      setMessageSDANF("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageRetourSDANFAPI]);

  function estPasStatutPriseEnChargeOuMAppartientPasOuModeConsultation(): boolean | undefined {
    return (
      StatutRequete.getEnumFor(props.statusRequete) !== StatutRequete.PRISE_EN_CHARGE ||
      props.idRequeteCorbeilleAgent !== utilisateurConnecte?.id ||
      props.modeConsultation
    );
  }

  const handleChangeText = (e: any) => {
    if (estSuperieurA500Caracteres(e.target.value)) {
      return setMessageErreur(getLibelle("500 caractères maximum"));
    }

    setMessageErreur("");
    setMessageSDANF(e.target.value);
  };

  const fermerPopin = () => {
    /* istanbul ignore next */
    setIsOpen(false);
    /* istanbul ignore next */
    setButtonValidateDisabled(true);
    setMessageSDANF("");
  };

  const handleReponseActionRetourSDANF = (indexMenu: number) => {
    switch (indexMenu) {
      case ACTE_IRRECEVABLE:
        setTitle(getLibelle("Acte irrecevable"));
        break;
      case ELEMENT_MANQUANT:
        setTitle(getLibelle("Élément manquant"));
        break;
      case SUSPICION_DE_FRAUDE:
        setTitle(getLibelle("Suspicion de fraude / nouvel élément"));
        break;
      default:
        break;
    }

    return setIsOpen(true);
  };

  const envoyerMessageRetourSDANF = () => {
    const message = `${title} - ${messageSDANF} - ${utilisateurConnecte.prenomNom}`;
    setParam({
      idRequete: props.idRequeteParam,
      message: {
        emetteur: "SCEC",
        destinataire: "SDANF",
        nature: "REPONSE_SCEC",
        message,
        pieceJustificativeRequeteCreation: []
      }
    });
  };

  return (
    <div className="ListeActionsRetourSDANF">
      <GroupeBouton
        titre={getLibelle("Actions")}
        listeActions={listeActions}
        onSelect={handleReponseActionRetourSDANF}
        disabled={disabledActions}
      />

      <ConfirmationPopinAvecMessage
        isOpen={isOpen}
        title={title}
        handleChangeText={handleChangeText}
        message={messageSDANF}
        messageErreur={messageErreur}
        boutons={[
          {
            label: getLibelle("Annuler"),
            action: () => fermerPopin()
          },
          {
            label: getLibelle("Valider"),
            isDisabled: true,
            disabled: buttonValidateDisabled,
            action: () => envoyerMessageRetourSDANF()
          }
        ]}
      />
    </div>
  );
};
