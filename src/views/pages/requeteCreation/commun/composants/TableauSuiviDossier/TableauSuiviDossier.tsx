import { RECEContextData } from "@core/contexts/RECEContext";
import { ETypeFiche } from "@model/etatcivil/enum/ETypeFiche";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { AvancementProjetActe } from "@model/requete/enum/AvancementProjetActe";
import { NatureProjetEtablissement } from "@model/requete/enum/NatureProjetEtablissement";
import { QualiteFamille } from "@model/requete/enum/QualiteFamille";
import { FenetreFiche } from "@pages/fiche/FenetreFiche";
import { IFenetreFicheActe } from "@pages/rechercheMultiCriteres/common/IFenetreFicheActeInscription";
import DateUtils from "@util/DateUtils";
import { getValeurOuVide, supprimeElement } from "@util/Utils";
import { replaceUrl } from "@util/route/UrlUtil";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { getLigneTableauVide } from "@widget/tableau/TableUtils";
import {
  NB_LIGNES_PAR_APPEL_PERSONNE,
  NB_LIGNES_PAR_PAGE_ACTE,
  NB_LIGNES_PAR_PAGE_PERSONNE
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import {
  IColonneFontAwesomeIcone,
  getColonneFontAwesomeIcone
} from "@widget/tableau/TableauRece/colonneElements/fontAwesomeIcon/ColonneFontAwesomeIcone";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import LiensRECE from "../../../../../../router/LiensRECE";
import { INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_SAISIE_PROJET } from "../../../../../../router/infoPages/InfoPagesEspaceEtablissement";
import ModalBulletinIdentification from "./ModalBulletinIdentification";
import { IDataBulletinIdentificationResultat } from "./ModalBulletinIdentificationApiHook";
import { ILigneTableauSuiviDossier, ITableauSuiviDossierParams, useTableauSuiviDossierHook } from "./TableauSuiviDossierHook";
import { getColonnesTableauSuiviDossier } from "./TableauSuiviDossierUtils";
import "./scss/TableauSuiviDossier.scss";

const TableauSuiviDossier: React.FC<ITableauSuiviDossierParams> = props => {
  const { utilisateurConnecte } = useContext(RECEContextData);
  const [idBIAAfficher, setIdBIAAfficher] = useState<string>("");
  const [isModalOuverte, setIsModalOuverte] = useState<boolean>(false);
  const [dataFromRequete, setDataFromRequete] = useState<IDataBulletinIdentificationResultat>();
  const [etatFenetres, setEtatFenetres] = useState<IFenetreFicheActe[]>([]);

  const navigate = useNavigate();

  const { dataTableau } = useTableauSuiviDossierHook(utilisateurConnecte.id === props.requete.idUtilisateur, props.requete.titulaires);

  // |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

  // TODO: GESTION SUPPRESSION DES PROJETS D ACTES ET AJOUT DES ICONES POUBELLES (RETIRER OPACITY: 0)

  const colonneIconeRetirerProjetActeParams: IColonneFontAwesomeIcone<ILigneTableauSuiviDossier, string> = {
    getIdentifiant: data => data.idSuiviDossier,
    style: {
      width: "3rem",
      opacity: 0
    }
  };

  const columnHeaderTableauSuiviDossier: TableauTypeColumn[] = [
    ...getColonnesTableauSuiviDossier(),
    getColonneFontAwesomeIcone(colonneIconeRetirerProjetActeParams)
  ];

  // |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

  function onClickOnLine(id: string, data: ILigneTableauSuiviDossier[], idxGlobal: number) {
    const ligneSelectionnee = data[idxGlobal];
    if (!ligneSelectionnee.evenement) {
      const titulaire = props.requete.titulaires?.find(titulaireCourant => titulaireCourant.id === data[idxGlobal].id);

      const dataSdanf = titulaire?.retenueSdanf;
      setDataFromRequete({
        nom: data[idxGlobal].nom,
        prenoms: data[idxGlobal].prenoms,
        sexe: Sexe.getEnumFor(getValeurOuVide(titulaire?.sexe)).libelle,
        dateNaissance: DateUtils.getDateStringFromDateCompose({
          jour: getValeurOuVide(dataSdanf?.jourNaissance?.toString()),
          mois: getValeurOuVide(dataSdanf?.moisNaissance?.toString()),
          annee: getValeurOuVide(dataSdanf?.anneeNaissance?.toString())
        }),
        lieuNaissance: LieuxUtils.getVillePays(dataSdanf?.villeNaissance, dataSdanf?.paysNaissance)
      });
      setIdBIAAfficher(ligneSelectionnee.idActe || "");
      setIsModalOuverte(true);
    } else if (NatureProjetEtablissement.estNaissance(NatureProjetEtablissement.getEnumFromLibelle(ligneSelectionnee?.evenement || ""))) {
      /* v8 ignore start */
      // on ignore les lignes ci dessous du coverage car elle nous obligerait a tester la fenetre externe
      // la fenetre externe etant compliqué a tester via le portal + fonction global.document a mocker
      const ligneTitulaire = data.find(ligne => ligne.id === ligneSelectionnee.id);

      if (AvancementProjetActe.estSigne(AvancementProjetActe.getEnumFromLibelle(ligneSelectionnee.avancement))) {
        const etatFenetreTrouve = etatFenetres.find(etatFenetre => etatFenetre.idActe === ligneSelectionnee.idActe);

        if (!etatFenetreTrouve) {
          const nouvelEtatFenetre: IFenetreFicheActe = {
            index: { value: idxGlobal },
            idActe: ligneSelectionnee.idActe || "",
            datasFiches: [
              {
                identifiant: ligneSelectionnee.idActe || "",
                categorie: ETypeFiche.ACTE
              }
            ]
          };
          setEtatFenetres([...etatFenetres, nouvelEtatFenetre]);
        }
      } else if (QualiteFamille.estPostulant(QualiteFamille.getEnumFromLibelle(ligneTitulaire?.qualite || ""))) {
        /* v8 ignore end */
        replaceUrl(
          navigate,
          LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_SAISIE_PROJET.url, {
            idRequeteParam: props.requete.id,
            idSuiviDossierParam: id
          })
        );
      }
    }
  }

  const onClose = () => {
    setIsModalOuverte(false);
    setIdBIAAfficher("");
    setDataFromRequete(undefined);
  };

  /* v8 ignore start */
  const closeFenetre = (idActe: string, idx: number) => {
    const nouvelEtatFenetres = supprimeElement(etatFenetres, (etatFenetre: IFenetreFicheActe) => etatFenetre.idActe === idActe);
    setEtatFenetres(nouvelEtatFenetres);
  };
  /* v8 ignore end */

  return (
    <div className="TableauSuiviDossier">
      <TableauRece
        idKey={"idSuiviDossier"}
        columnHeaders={columnHeaderTableauSuiviDossier}
        dataState={dataTableau}
        onClickOnLine={onClickOnLine}
        paramsTableau={{}}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_PERSONNE}
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_PERSONNE}
        getRowClassName={getLigneClassName}
        messageAucunResultat={getLigneTableauVide("Aucun projet d'acte n'a été trouvé.")}
      />
      <ModalBulletinIdentification
        dataFromRequete={dataFromRequete || ({} as IDataBulletinIdentificationResultat)}
        open={isModalOuverte}
        onClose={onClose}
        idActe={idBIAAfficher}
      />

      {
        /* v8 ignore start */
        etatFenetres && etatFenetres.length > 0 && (
          <>
            {etatFenetres.map((fenetreFicheActe: IFenetreFicheActe) => {
              return (
                fenetreFicheActe && (
                  <FenetreFiche
                    key={`fiche${fenetreFicheActe.idActe}${fenetreFicheActe.index}`}
                    identifiant={fenetreFicheActe.idActe}
                    datasFiches={fenetreFicheActe.datasFiches}
                    numeroRequete={fenetreFicheActe.numeroRequete}
                    onClose={closeFenetre}
                    index={fenetreFicheActe.index}
                    nbLignesTotales={NB_LIGNES_PAR_PAGE_ACTE || 0}
                    nbLignesParAppel={1}
                  />
                )
              );
            })}
          </>
        )
        /* v8 ignore end */
      }
    </div>
  );
};

export default TableauSuiviDossier;

function getLigneClassName(data: ILigneTableauSuiviDossier): string {
  if (!data.cliquable) return "ligneProjetActeDesactive";
  return data.prenoms ? "lignePersonne" : "ligneProjetActe";
}
