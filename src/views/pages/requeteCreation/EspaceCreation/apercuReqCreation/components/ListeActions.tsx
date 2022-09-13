import {
  RetourSDANFParams,
  useEnvoyerMessageRetourSDANFEtMiseAJourStatutApiHook
} from "@hook/requete/creation/EnvoyerMessageSdanfEtMiseAJourStatutApiHook";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IEchange, IEchangeServeur } from "@model/requete/IEchange";
import { getFormatDateFromTimestamp } from "@util/DateUtils";
import { storeRece } from "@util/storeRece";
import { getLibelle } from "@util/Utils";
import { GroupeBouton } from "@widget/menu/GroupeBouton";
import { ConfirmationPopinAvecMessage } from "@widget/popin/ConfirmationPopinAvecMessage";
import React, { useEffect, useState } from "react";
interface ListeActionsRetourSDANFProps {
  statusRequete: any;
  idRequeteCorbeilleAgent: string;
  setEchanges: any;
  echanges?: IEchange[];
  idRequeteParam: string;
}

export const estSuperieurA500Caracteres = (texte: string) => {
  const maxTexte = 500;
  if (texte.length > maxTexte) {
    return true;
  } else {
    return false;
  }
};

export const getPrenomEtNom = () => {
  let nomPrenom;
  const prenom = storeRece.utilisateurCourant?.prenom || "";
  const nom = storeRece.utilisateurCourant?.nom || "";
  nomPrenom = `${prenom} ${nom}`;
  return nomPrenom;
};

export const ListeActionsRetourSDANF: React.FC<
  ListeActionsRetourSDANFProps
> = props => {
  const [param, setParam] = useState<RetourSDANFParams>();
  const messageRetourSDANFAPI: IEchangeServeur =
    useEnvoyerMessageRetourSDANFEtMiseAJourStatutApiHook(param);

  const [isOpen, setIsOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [buttonValidateDisabled, setButtonValidateDisabled] = useState(true);
  const [messageSDANF, setMessageSDANF] = useState("");
  const [messageErreur, setMessageErreur] = useState("");
  const [disabledActions, setDisabledActions] = useState(false);

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
    if (
      props.statusRequete.statut !== StatutRequete.PRISE_EN_CHARGE ||
      props.idRequeteCorbeilleAgent !==
        storeRece.utilisateurCourant?.idUtilisateur
    ) {
      setDisabledActions(true);
    }
  }, [props.statusRequete.statut, props.idRequeteCorbeilleAgent]);

  useEffect(() => {
    if (messageSDANF === "") setButtonValidateDisabled(true);
    else setButtonValidateDisabled(false);
  }, [messageSDANF]);

  useEffect(() => {
    if (messageRetourSDANFAPI) {
      const { dateMessage, ...reste } = messageRetourSDANFAPI;

      const messageRetourSDANFMapped: IEchange = {
        date: getFormatDateFromTimestamp(dateMessage),
        ...reste
      };

      props.setEchanges([...(props.echanges ?? []), messageRetourSDANFMapped]);

      setIsOpen(false);
      setDisabledActions(true);
      setMessageSDANF("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageRetourSDANFAPI]);

  const handleChangeText = (e: any) => {
    if (estSuperieurA500Caracteres(e.target.value)) {
      return setMessageErreur(getLibelle("500 caractères maximum"));
    }

    setMessageErreur("");
    setMessageSDANF(e.target.value);
  };

  const fermerPopin = () => {
    setIsOpen(false);
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
    const message = `${title} - ${messageSDANF} - ${getPrenomEtNom()}`;
    setParam({
      idRequete: props.idRequeteParam,
      message: {
        emetteur: "SCEC",
        destinataire: "SDANF",
        nature: "REPONSE_SCEC",
        message: message,
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
