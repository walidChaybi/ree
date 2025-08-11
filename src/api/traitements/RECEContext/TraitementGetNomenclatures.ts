import CONFIG_GET_NOMENCLATURES_ETAT_CIVIL from "@api/configurations/etatCivil/nomenclature/GetNomenclaturesEtatCivilConfigApi";
import CONFIG_GET_TYPES_MENTION from "@api/configurations/etatCivil/nomenclature/GetTypesMentionConfigApi";
import CONFIG_GET_NOMENCLATURES_REQUETE from "@api/configurations/requete/nomenclature/GetNomenclaturesRequeteConfigApi";
import CONFIG_GET_PARAMETRES_BASE_REQUETE from "@api/configurations/requete/nomenclature/GetParametresBaseRequete";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { IMandataire, MandataireRc } from "@model/etatcivil/enum/MandataireRc";
import { INatureMention, NatureMention } from "@model/etatcivil/enum/NatureMention";
import { INatureRc, NatureRc } from "@model/etatcivil/enum/NatureRc";
import { INatureRca, NatureRca } from "@model/etatcivil/enum/NatureRca";
import { ITypeAlerte, TypeAlerte } from "@model/etatcivil/enum/TypeAlerte";
import CLES from "@model/parametres/clesParametres";
import { ParametreBaseRequete } from "@model/parametres/enum/ParametresBaseRequete";
import { DocumentDelivrance, IDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { IPaysSecabilite, PaysSecabilite } from "@model/requete/enum/PaysSecabilite";
import { ITypePieceJustificative, TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { ITypePopinSignature, TypePopinSignature } from "@model/signature/ITypePopinSignature";
import { useEffect, useState } from "react";
import useFetchApi from "../../../hooks/api/FetchApiHook";
import AfficherMessage from "../../../utils/AfficherMessage";
import { TRAITEMENT_SANS_ERREUR, TRAITEMENT_SANS_REPONSE, TTraitementApi } from "../TTraitementApi";

interface IAppelsNomenclatures {
  // Nomenclatures EtatCivil
  etatCivil: boolean;
  typeMention: boolean;
  // Nomenclatures Requete
  requete: boolean;
  // Parametre Base Requete
  parametreBaseRequete: boolean;
}

enum ENomenclatureEtatCivil {
  NATURE_RC = "NATURE_RC",
  NATURE_RCA = "NATURE_RCA",
  NATURE_MENTION = "NATURE_MENTION",
  MANDATAIRE = "MANDATAIRE",
  TYPE_ALERTE = "TYPE_ALERTE",
  POPIN_SIGNATURE = "POPIN_SIGNATURE"
}

enum ENomenclatureRequete {
  DOCUMENT_DELIVRANCE = "DOCUMENT_DELIVRANCE",
  TYPE_PIECE_JUSTIFICATIVE = "TYPE_PIECE_JUSTIFICATIVE",
  PAYS_SECABILITE = "PAYS_SECABILITE"
}

export const TRAITEMENT_GET_NOMENCLATURES: TTraitementApi = {
  Lancer: terminerTraitement => {
    const [appelsTermines, setAppelsTermines] = useState<IAppelsNomenclatures>({
      // Nomenclatures EtatCivil
      etatCivil: false,
      typeMention: false,
      // Nomenclatures Requete
      requete: false,
      // Parametre Base Requete
      parametreBaseRequete: false
    });

    const { appelApi: appelNomenclaturesEtatCivil } = useFetchApi(CONFIG_GET_NOMENCLATURES_ETAT_CIVIL);
    const { appelApi: appelNomenclaturesTypeMention } = useFetchApi(CONFIG_GET_TYPES_MENTION);
    const { appelApi: appelNomenclaturesRequete } = useFetchApi(CONFIG_GET_NOMENCLATURES_REQUETE);
    const { appelApi: appelParametreBaseRequete } = useFetchApi(CONFIG_GET_PARAMETRES_BASE_REQUETE);

    const finAppel = (nomenclature: keyof IAppelsNomenclatures) =>
      setAppelsTermines(etatPrecedent => ({ ...etatPrecedent, [nomenclature]: true }));

    const lancer = () => {
      appelNomenclaturesEtatCivil({
        parametres: { path: { nomsNomenclatures: Object.values(ENomenclatureEtatCivil).join(",") } },
        apresSucces: nomenclatures => {
          const nomenclaturesEtatCivil = nomenclatures.reduce(
            (nomenclaturesTriees, nomenclature) => {
              switch (nomenclature.nom) {
                case ENomenclatureEtatCivil.NATURE_RC:
                  nomenclaturesTriees.naturesRc.push(nomenclature as INatureRc);
                  break;
                case ENomenclatureEtatCivil.NATURE_RCA:
                  nomenclaturesTriees.naturesRca.push(nomenclature as INatureRca);
                  break;
                case ENomenclatureEtatCivil.NATURE_MENTION:
                  nomenclaturesTriees.naturesMentions.push(nomenclature as INatureMention);
                  break;
                case ENomenclatureEtatCivil.MANDATAIRE:
                  nomenclaturesTriees.mandataires.push(nomenclature as IMandataire);
                  break;
                case ENomenclatureEtatCivil.TYPE_ALERTE:
                  nomenclaturesTriees.typesAlerte.push(nomenclature as ITypeAlerte);
                  break;
                case ENomenclatureEtatCivil.POPIN_SIGNATURE:
                  nomenclaturesTriees.popinsSignatures.push(nomenclature as ITypePopinSignature);
                  break;
              }

              return nomenclaturesTriees;
            },
            {
              naturesRc: [] as INatureRc[],
              naturesRca: [] as INatureRca[],
              naturesMentions: [] as INatureMention[],
              mandataires: [] as IMandataire[],
              typesAlerte: [] as ITypeAlerte[],
              popinsSignatures: [] as ITypePopinSignature[]
            }
          );
          NatureRc.init(nomenclaturesEtatCivil.naturesRc);
          NatureRca.init(nomenclaturesEtatCivil.naturesRca);
          NatureMention.init(nomenclaturesEtatCivil.naturesMentions);
          MandataireRc.init(nomenclaturesEtatCivil.mandataires);
          TypeAlerte.init(nomenclaturesEtatCivil.typesAlerte);
          TypePopinSignature.init(nomenclaturesEtatCivil.popinsSignatures);
        },
        apresErreur: erreurs =>
          AfficherMessage.erreur("Erreur lors de la récupération des nomenclatures État Civil", { erreurs, fermetureAuto: true }),
        finalement: () => {
          finAppel("etatCivil");
          appelNomenclaturesTypeMention({
            apresSucces: typeMentionDtos => {
              TypeMention.init(typeMentionDtos);
            },
            apresErreur: erreurs =>
              AfficherMessage.erreur("Erreur lors de la récupération des types mention", { erreurs, fermetureAuto: true }),
            finalement: () => finAppel("typeMention")
          });
        }
      });

      appelNomenclaturesRequete({
        parametres: { path: { nomsNomenclatures: Object.values(ENomenclatureRequete).join(",") } },
        apresSucces: nomenclatures => {
          const nomenclaturesRequete = nomenclatures.reduce(
            (nomenclaturesTriees, nomenclature) => {
              switch (nomenclature.categorie) {
                case ENomenclatureRequete.DOCUMENT_DELIVRANCE:
                  nomenclaturesTriees.documentsDelivrance.push(nomenclature as IDocumentDelivrance);
                  break;
                case ENomenclatureRequete.TYPE_PIECE_JUSTIFICATIVE:
                  nomenclaturesTriees.typesPieceJustificative.push(nomenclature as ITypePieceJustificative);
                  break;
                case ENomenclatureRequete.PAYS_SECABILITE:
                  nomenclaturesTriees.paysSecabilite.push(nomenclature as IPaysSecabilite);
                  break;
              }

              return nomenclaturesTriees;
            },
            {
              documentsDelivrance: [] as IDocumentDelivrance[],
              typesPieceJustificative: [] as ITypePieceJustificative[],
              paysSecabilite: [] as IPaysSecabilite[]
            }
          );
          TypePieceJustificative.init(nomenclaturesRequete.typesPieceJustificative);
          DocumentDelivrance.init(nomenclaturesRequete.documentsDelivrance);
          PaysSecabilite.init(nomenclaturesRequete.paysSecabilite);
        },
        apresErreur: erreurs => AfficherMessage.erreur("Erreur lors de la récupération des nomenclatures Requête", { erreurs }),
        finalement: () => {
          finAppel("requete");
        }
      });

      appelParametreBaseRequete({
        parametres: { body: CLES },
        apresSucces: ParametreBaseRequete.init,
        apresErreur: erreurs => AfficherMessage.erreur("Erreur lors de la récupération des paramètres de la base requête", { erreurs }),
        finalement: () => {
          finAppel("parametreBaseRequete");
        }
      });
    };

    useEffect(() => {
      const traitementEnCours = Object.values(appelsTermines).some(appelTermine => appelTermine === false);
      if (traitementEnCours) {
        return;
      }

      terminerTraitement();
    }, [appelsTermines]);

    return { lancer, erreurTraitement: TRAITEMENT_SANS_ERREUR, reponseTraitement: TRAITEMENT_SANS_REPONSE };
  }
};
