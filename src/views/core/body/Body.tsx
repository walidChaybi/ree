import React, { useEffect, useState } from "react";
import { gestionnaireDoubleOuverture } from "../../common/util/GestionnaireDoubleOuverture";
import { logError } from "../../common/util/LogManager";
import { getLibelle } from "../../common/util/Utils";
import { FilAriane } from "../../common/widget/filAriane/FilAriane";
import { routesRece } from "../../router/ReceRoutes";
import { RouterComponent } from "../../router/RouteComponent";
import {
  OfficierContext,
  OfficierContextProps
} from "../contexts/OfficierContext";
import { PageMessage } from "../login/PageMessage";

export const Body: React.FC = () => {
  const [appliDejaOuverte, setAppliDejaOuverte] = useState<boolean>(false);

  useEffect(() => {
    gestionnaireDoubleOuverture.lancerVerification(() => {
      setAppliDejaOuverte(true);
    });
  }, []);

  return (
    <>
      <main className="AppBody">
        <OfficierContext.Consumer>
          {officier =>
            officier?.officierDataState?.idSSO !== undefined ? (
              appliDejaOuverte ? (
                <PageMessage
                  message={getLibelle(
                    "L'application est déjà ouverte sur cet ordinateur"
                  )}
                />
              ) : (
                <>
                  <FilAriane routes={routesRece} />
                  <RouterComponent />
                </>
              )
            ) : (
              <PageMessage message={getMessageLogin(officier)} />
            )
          }
        </OfficierContext.Consumer>
      </main>
    </>
  );
};

function getMessageLogin(officier: OfficierContextProps) {
  const codeErreurForbidden = 403;
  if (
    officier !== undefined &&
    officier.erreurState !== undefined &&
    officier.erreurState.status === codeErreurForbidden
  ) {
    return getLibelle(
      "Vous n'avez pas les droits pour utiliser RECE, veuillez contacter le service BAG."
    );
  } else if (officier !== undefined && officier.erreurState !== undefined) {
    logError({
      messageUtilisateur:
        "Impossible de récupérer les informations utilisateur via le service de login",
      error: officier.erreurState
    });
    return getLibelle("Erreur Système");
  } else {
    return getLibelle("Connexion en cours ...");
  }
}
