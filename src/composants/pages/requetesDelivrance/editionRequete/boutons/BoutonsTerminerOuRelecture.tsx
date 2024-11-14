import {
  ITransfertPopinForm,
  TransfertPopin,
} from "@composant/menuTransfert/TransfertPopin";
import {
  ICreationActionMiseAjourStatutHookParams,
  useCreationActionMiseAjourStatut,
} from "@hook/requete/CreationActionMiseAjourStatutHook";
import {
  IRegenerationDocumentsParams,
  useRegenerationDocumentsHook,
} from "@hook/requete/RegenerationDocumentsHook";
import {
  IRetourValideurParams,
  useRetourValideurApiHook,
} from "@hook/requete/RetourValideur";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { getDefaultValuesCourrier } from "@pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/contenuForm/CourrierFonctions";
import { mappingRequeteDelivranceToRequeteTableau } from "@pages/requeteDelivrance/apercuRequete/mapping/ReqDelivranceToReqTableau";
import { EditionExtraitCopiePageContext } from "@pages/requeteDelivrance/editionExtraitCopie/EditionExtraitCopiePage";
import { getValeurOuVide } from "@util/Utils";
import { getUrlPrecedente, replaceUrl } from "@util/route/UrlUtil";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Bouton from "../../../../commun/bouton/Bouton";
import BoutonListeDeroulante from "../../../../commun/bouton/BoutonListeDeroulante";
import { BoutonsTerminer } from "./BoutonsTerminer";

interface BoutonsTerminerOuRelectureProps {
  requete: IRequeteDelivrance;
  acte?: IFicheActe;
}

export const BoutonsTerminerOuRelecture: React.FC<
  BoutonsTerminerOuRelectureProps
> = ({ requete, acte }) => {
  const [retourParams, setRetourParams] = useState<IRetourValideurParams>();
  const [majStatutParams, setMajStatutParams] =
    useState<ICreationActionMiseAjourStatutHookParams>();
  const [regenerationParams, setRegenerationParams] =
    useState<IRegenerationDocumentsParams>();
  const [open, setOpen] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { rafraichirRequete, setOperationEnCours } = useContext(
    EditionExtraitCopiePageContext,
  );

  useRegenerationDocumentsHook(regenerationParams);

  useCreationActionMiseAjourStatut(majStatutParams);

  function onClickValidate(statut: StatutRequete, texte?: string) {
    setRetourParams({
      libelleAction:
        statut === StatutRequete.A_REVOIR
          ? statut.libelle
          : `Requête approuvée - ${statut.libelle}`,
      statutDemande: statut.nom,
      requeteId: requete.id,
      texteObservation:
        statut === StatutRequete.A_REVOIR
          ? `Requête relue - ${getValeurOuVide(texte)}`
          : "Requête approuvée",
    });
  }

  const idActionRetour = useRetourValideurApiHook(retourParams);

  useEffect(() => {
    if (idActionRetour) {
      replaceUrl(navigate, getUrlPrecedente(location.pathname));
    }
  }, [idActionRetour]);

  function onClickReprise(statut: StatutRequete) {
    setOperationEnCours(true);
    setRegenerationParams({
      requete: requete,
      regenererCourrier: true,
      acte: acte,
      valeursCourrierParDefaut: getDefaultValuesCourrier(requete),
      callBack: () =>
        setMajStatutParams({
          libelleAction: "Requête reprise",
          statutRequete: statut,
          requete: mappingRequeteDelivranceToRequeteTableau(requete),
          callback: rafraichirRequete,
        }),
    });
  }

  return (
    <>
      {requete.statutCourant.statut === StatutRequete.TRANSMISE_A_VALIDEUR ? (
        <>
          {!SousTypeDelivrance.estRDCSDouRDCSC(requete.sousType) && (
            <Bouton
              styleBouton="secondaire"
              onClick={() =>
                onClickReprise(
                  requete.documentsReponses.some((document) => document.avecCtv)
                    ? StatutRequete.A_SIGNER
                    : StatutRequete.A_VALIDER,
                )
              }
            >
              Reprendre le traitement
            </Bouton>
          )}
          <BoutonListeDeroulante titre="Relecture" pointAncrageMenu="droite">
            <Bouton
              onClick={() =>
                onClickValidate(
                  requete.documentsReponses.some((document) => document.avecCtv)
                    ? StatutRequete.A_SIGNER
                    : StatutRequete.A_VALIDER,
                )
              }
            >
              Relecture approuvée
            </Bouton>
            <Bouton onClick={() => setOpen(true)}>Relecture commentée</Bouton>
          </BoutonListeDeroulante>
        </>
      ) : (
        <BoutonsTerminer requete={requete} acte={acte} />
      )}
      <TransfertPopin
        onValidate={(valeurs: ITransfertPopinForm) =>
          onClickValidate(StatutRequete.A_REVOIR, valeurs.texte)
        }
        open={open}
        onClose={() => setOpen(false)}
        titre={"Commentaire pour agent requérant"}
        placeholder={"En retour"}
      />
    </>
  );
};
