import { ListePiecesJointes } from "@composant/piecesJointes/ListePiecesJointes";
import { RECEContextData } from "@core/contexts/RECEContext";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IPieceJointe, TypePieceJointe } from "@model/requete/pieceJointe/IPieceJointe";
import { IPieceJustificative } from "@model/requete/pieceJointe/IPieceJustificative";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import React, { useContext, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router";
import FenetreExterne from "../../../../../../../composants/commun/conteneurs/FenetreExterne";
import LiensRECE from "../../../../../../../router/LiensRECE";
import {
  INFO_PAGE_MODIFICATION_REQUETE_DELIVRANCE_CERTIFICAT_SITUATION_COURRIER,
  INFO_PAGE_MODIFICATION_REQUETE_DELIVRANCE_EXTRAIT_COPIE_COURRIER
} from "../../../../../../../router/infoPages/InfoPagesEspaceDelivrance";
import DetailRequetePage from "../../../../detailRequete/DetailRequetePage";
import { ResumeRequetePartieHaute } from "./ResumeRequetePartieHaute";
import { ResumeRequeteType } from "./ResumeRequeteType";
import "./scss/ResumeRequete.scss";

interface ResumeRequeteProps {
  requete: IRequeteDelivrance;
  disabledActions?: boolean;
}

const width = 1100;
const height = 600;

export const ResumeRequete: React.FC<ResumeRequeteProps> = props => {
  const navigate = useNavigate();
  const [fenetreExterne, setFenetreExterne] = useState<boolean>(false);
  const { utilisateurConnecte } = useContext(RECEContextData);

  const onClickNumero = () => {
    setFenetreExterne(true);
  };

  const onClose = () => {
    setFenetreExterne(false);
  };

  const onModificationRequete = () => {
    let url;

    if (SousTypeDelivrance.estRDC(props.requete.sousType)) {
      url = LiensRECE.genererLien(INFO_PAGE_MODIFICATION_REQUETE_DELIVRANCE_EXTRAIT_COPIE_COURRIER.url, {
        idRequeteParam: props.requete.id
      });
    } else {
      url = LiensRECE.genererLien(INFO_PAGE_MODIFICATION_REQUETE_DELIVRANCE_CERTIFICAT_SITUATION_COURRIER.url, {
        idRequeteParam: props.requete.id
      });
    }

    if (url) {
      navigate(getUrlWithParam(url, props.requete.id));
    }
  };

  const afficherBoutonModifierRequete =
    utilisateurConnecte.id === props.requete.idUtilisateur &&
    SousTypeDelivrance.estRDCouRDCSC(props.requete.sousType) &&
    StatutRequete.estPriseEnCharge(props.requete.statutCourant.statut) &&
    !props.disabledActions;

  return (
    <>
      <div className="ResumeRequete Fieldset">
        <div className="ResumeRequeteTitle">
          <span>
            {`Description requête `}
            <span
              className="LinkNumeroRequete"
              onClick={onClickNumero}
            >
              {props.requete.numero}
            </span>
          </span>
        </div>
        {props.requete && (
          <div className="PanelsResumeRequete">
            <ResumeRequetePartieHaute requete={props.requete} />

            <hr className={"separation"} />

            <ListePiecesJointes
              pieces={mapPiecesJustificatives(props.requete.piecesJustificatives)}
              numRequete={props.requete.numero}
              titre="Pièces Justificatives"
            />

            {afficherBoutonModifierRequete && (
              <BoutonDoubleSubmit
                type="button"
                onClick={onModificationRequete}
                aria-label="Modifier"
              >
                <FaEdit
                  className="iconModifierRequete"
                  aria-hidden
                />
                {"Modifier la requête"}
              </BoutonDoubleSubmit>
            )}
          </div>
        )}
      </div>
      <ResumeRequeteType
        provenanceRequete={props.requete.provenanceRequete}
        sousType={props.requete.sousType}
        statut={props.requete.statutCourant.statut}
      />
      {fenetreExterne && (
        <FenetreExterne
          titre={`Détails requête : N°${props.requete.numero}`}
          apresFermeture={onClose}
          hauteur={height}
          largeur={width}
        >
          <DetailRequetePage requete={props.requete} />
        </FenetreExterne>
      )}
    </>
  );
};

function mapPiecesJustificatives(pieces?: IPieceJustificative[]): IPieceJointe[] {
  return pieces
    ? pieces.map(piece => ({
        id: piece.id,
        libelle: piece.typePieceJustificative?.libelle,
        nom: piece.nom,
        typePiece: TypePieceJointe.PIECE_JUSTIFICATIVE
      }))
    : [];
}
