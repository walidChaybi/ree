import CONFIG_GET_MES_REQUETES_INFORMATION from "@api/configurations/requete/information/GetMesRequetesInformationConfigApi";
import { RequeteInformationTableau } from "@model/requete/IRequeteTableauInformation";
import {
  INavigationApercuReqInfoParams,
  useNavigationApercuInformation
} from "@views/common/hook/navigationApercuRequeteInformation/NavigationApercuInformationHook";
import { NB_LIGNES_PAR_APPEL_DEFAUT, NB_LIGNES_PAR_PAGE_DEFAUT } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import React, { useEffect, useState } from "react";
import useFetchApi from "../../../../hooks/api/FetchApiHook";
import AfficherMessage from "../../../../utils/AfficherMessage";
import ComposantChargeur from "../../../commun/chargeurs/ComposantChargeur";
import PageChargeur from "../../../commun/chargeurs/PageChargeur";
import Tableau, { IEnTeteTableau, IParametresRecherche, TLigneTableau } from "../../../commun/tableau/Tableau";

const EN_TETE_MES_REQUETES_INFORMATION: IEnTeteTableau[] = [
  {
    cle: "numero",
    libelle: "N° requête"
  },
  {
    cle: "sousType",
    libelle: "Sous-type"
  },
  {
    cle: "objet",
    libelle: "Objet"
  },
  {
    cle: "dateCreation",
    libelle: "Date création",
    triable: true
  },
  {
    cle: "statut",
    libelle: "Statut"
  },
  {
    cle: "typeRequerant",
    libelle: "Type requérant"
  },
  {
    cle: "nomCompletRequerant",
    libelle: "Prénom / Nom requérant"
  },
  {
    cle: "nomsTitulaires",
    libelle: "Prénom / Nom de naissance titulaire"
  }
];

export const TableauMesRequetesInformation: React.FC = () => {
  const [parametresRecherche, setParametresRecherche] = useState<IParametresRecherche>({
    tri: "dateCreation",
    sens: "ASC",
    range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
  });

  const [nombreTotalLignes, setNombreTotalLignes] = useState<number>(0);
  const [lignesTableau, setLignesTableau] = useState<TLigneTableau[] | null>(null);

  const { appelApi: getMesRequetesInformation, enAttenteDeReponseApi } = useFetchApi(CONFIG_GET_MES_REQUETES_INFORMATION);

  useEffect(() => {
    const requeteVersLigneTableau = (requete: RequeteInformationTableau): TLigneTableau => ({
      cle: requete.id,
      onClick: () =>
        setParamsNavReqInfo({
          requete
        }),
      donnees: requete.versLigneTableauMesRequetes()
    });

    getMesRequetesInformation({
      parametres: { query: { range: parametresRecherche.range ?? "", sens: parametresRecherche.sens, tri: parametresRecherche.tri } },
      apresSucces: (requetesDto, headers) => {
        setLignesTableau(
          requetesDto
            .map(RequeteInformationTableau.depuisDto)
            .filter((requete): requete is RequeteInformationTableau => requete !== null)
            .map(requeteVersLigneTableau)
        );

        setNombreTotalLignes(parseInt((headers["content-range"] ?? "").split("/")[1] ?? ""));
      },
      apresErreur: erreurs =>
        AfficherMessage.erreur("Impossible de récupérer les requêtes d'information", {
          erreurs
        })
    });
  }, [parametresRecherche]);

  const [paramsNavReqInfo, setParamsNavReqInfo] = useState<INavigationApercuReqInfoParams | undefined>();

  useNavigationApercuInformation(paramsNavReqInfo);

  return (
    <>
      <Tableau
        enTetes={EN_TETE_MES_REQUETES_INFORMATION}
        lignes={lignesTableau}
        nombreTotalLignes={nombreTotalLignes}
        parametresRecherche={parametresRecherche}
        setParametresRecherche={setParametresRecherche}
        nombreElementsParPlage={NB_LIGNES_PAR_APPEL_DEFAUT}
        nombreLignesParPage={NB_LIGNES_PAR_PAGE_DEFAUT}
        messageAucuneLigne="Aucune requête n'a été trouvée."
      />
      {paramsNavReqInfo && <PageChargeur />}
      {enAttenteDeReponseApi && <ComposantChargeur />}
    </>
  );
};
