// Composant à supprimer en délivrance cible
import { EStatutRequete } from "@model/requete/enum/StatutRequete";
import { GestionnaireARetraiterDansSaga } from "@util/migration/GestionnaireARetraiterDansSaga";
import { goBack } from "@util/route/UrlUtil";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  ICreationActionEtMiseAjourStatutParams,
  usePostCreationActionEtMiseAjourStatutApi
} from "../../../../../common/hook/requete/ActionHook";
import "./scss/BoutonARetraiterSaga.scss";

interface BoutonARetraiterSagaProps {
  idRequete: string;
}

export const BoutonARetraiterSaga: React.FC<BoutonARetraiterSagaProps> = ({ idRequete }) => {
  const navigate = useNavigate();
  const [creationActionEtMiseAjourStatutParams, setCreationActionEtMiseAjourStatutParams] =
    useState<ICreationActionEtMiseAjourStatutParams>();

  const idActionCreee = usePostCreationActionEtMiseAjourStatutApi(creationActionEtMiseAjourStatutParams);

  useEffect(() => {
    if (idActionCreee) {
      goBack(navigate);
    }
  }, [idActionCreee]);

  const handleClickARetraiterSaga = () => {
    setCreationActionEtMiseAjourStatutParams({
      requeteId: idRequete,
      statutRequete: GestionnaireARetraiterDansSaga.getStatutARetraiter().nom as keyof typeof EStatutRequete,
      libelleAction: "À retraiter dans Saga"
    });
  };

  return (
    <BoutonDoubleSubmit
      className="boutonARetraiterSaga"
      onClick={handleClickARetraiterSaga}
    >
      {"À retraiter dans SAGA"}
    </BoutonDoubleSubmit>
  );
};
