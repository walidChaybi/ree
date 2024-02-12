import { TransfertPopin } from "@composant/menuTransfert/TransfertPopin";
import {
  ICreationActionMiseAjourStatutHookParams,
  useCreationActionMiseAjourStatut
} from "@hook/requete/CreationActionMiseAjourStatutHook";
import {
  IRegenerationDocumentsParams,
  useRegenerationDocumentsHook
} from "@hook/requete/RegenerationDocumentsHook";
import {
  IRetourValideurParams,
  useRetourValideurApiHook
} from "@hook/requete/RetourValideur";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { EditionExtraitCopiePageContext } from "@pages/requeteDelivrance/editionExtraitCopie/EditionExtraitCopiePage";
import { getUrlPrecedente, replaceUrl } from "@util/route/UrlUtil";
import { Option } from "@util/Type";
import { getLibelle, getValeurOuVide } from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getDefaultValuesCourrier } from "../../apercuCourrier/contenu/contenuForm/CourrierFonctions";
import { mappingRequeteDelivranceToRequeteTableau } from "../../mapping/ReqDelivranceToReqTableau";
import { BoutonsTerminer } from "./BoutonsTerminer";

interface BoutonsTerminerOuRelectureProps {
  requete: IRequeteDelivrance;
  acte?: IFicheActe;
}

export const BoutonsTerminerOuRelecture: React.FC<
  BoutonsTerminerOuRelectureProps
> = props => {
  const [retourParams, setRetourParams] = useState<IRetourValideurParams>();
  const [majStatutParams, setMajStatutParams] =
    useState<ICreationActionMiseAjourStatutHookParams>();
  const [regenerationParams, setRegenerationParams] =
    useState<IRegenerationDocumentsParams>();
  const [open, setOpen] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { rafraichirRequete, setOperationEnCours } = useContext(
    EditionExtraitCopiePageContext
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
      requeteId: props.requete.id,
      texteObservation:
        statut === StatutRequete.A_REVOIR
          ? `Requête relue - ${getValeurOuVide(texte)}`
          : getLibelle("Requête approuvée")
    });
  }

  const idActionRetour = useRetourValideurApiHook(retourParams);

  useEffect(() => {
    if (idActionRetour) {
      replaceUrl(navigate, getUrlPrecedente(location.pathname));
    }
  }, [idActionRetour, navigate, location]);

  function onClickReprise(statut: StatutRequete) {
    setOperationEnCours(true);
    setRegenerationParams({
      requete: props.requete,
      regenererCourrier: true,
      acte: props.acte,
      valeursCourrierParDefaut: getDefaultValuesCourrier(props.requete),
      callBack: () =>
        setMajStatutParams({
          libelleAction: "Requête reprise",
          statutRequete: statut,
          requete: mappingRequeteDelivranceToRequeteTableau(props.requete),
          callback: rafraichirRequete
        })
    });
  }

  return (
    <>
      {props.requete.statutCourant.statut ===
      StatutRequete.TRANSMISE_A_VALIDEUR ? (
        <>
          {!SousTypeDelivrance.estRDCSDouRDCSC(props.requete.sousType) && (
            <Bouton
              onClick={() =>
                onClickReprise(
                  props.requete.documentsReponses.some(
                    document => document.avecCtv
                  )
                    ? StatutRequete.A_SIGNER
                    : StatutRequete.A_VALIDER
                )
              }
            >
              {getLibelle("Reprendre le traitement")}
            </Bouton>
          )}
          <Bouton
            onClick={() =>
              onClickValidate(
                props.requete.documentsReponses.some(
                  document => document.avecCtv
                )
                  ? StatutRequete.A_SIGNER
                  : StatutRequete.A_VALIDER
              )
            }
          >
            {getLibelle("Relecture approuvée")}
          </Bouton>
          <Bouton onClick={() => setOpen(true)}>
            {getLibelle("Relecture commentée")}
          </Bouton>
        </>
      ) : (
        <BoutonsTerminer requete={props.requete} acte={props.acte} />
      )}
      <TransfertPopin
        onValidate={(optionUtilisateur?: Option, texte?: string) =>
          onClickValidate(StatutRequete.A_REVOIR, texte)
        }
        open={open}
        onClose={() => setOpen(false)}
        titre={getLibelle("Commentaire pour agent requérant")}
        placeholder={getLibelle("En retour")}
      />
    </>
  );
};
