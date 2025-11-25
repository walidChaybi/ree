import {
  CONFIG_POST_RMC_AUTO_REQUETE,
  ICritereRMCAutoRequete,
  IEnveloppeCriteresRMCAutoRequete
} from "@api/configurations/requete/rmc/PostRMCAutoRequeteConfigApi";
import { ITitulaireRequete, TitulaireRequete } from "@model/requete/ITitulaireRequete";
import { ITableauRMC } from "@model/rmc/ITableauRMC";
import RequeteAssociee, { TRequeteAssociee } from "@model/rmc/requete/RequeteAssociee";
import { SNP } from "@util/Utils";
import { NB_LIGNES_PAR_APPEL_REQUETE_ASSOCIEES } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { useEffect } from "react";
import AfficherMessage from "../../../utils/AfficherMessage";
import TableauUtils from "../../../utils/TableauUtils";
import useFetchApi from "../../api/FetchApiHook";

interface IUseRMCAutoRequetesAssocieesParams {
  titulairesRequete?: ITitulaireRequete[];
  setTableauRMC: React.Dispatch<React.SetStateAction<ITableauRMC | null>>;
}

const determinerCriteresRMCAutoRequeteDepuisTitulaire = (titulairesRequete?: ITitulaireRequete[]): IEnveloppeCriteresRMCAutoRequete => ({
  criteres:
    titulairesRequete?.map((titulaire: ITitulaireRequete) => ({
      nomTitulaire: titulaire.nomNaissance,
      prenomTitulaire: TitulaireRequete.getPrenom1(titulaire),
      jourNaissance: titulaire.jourNaissance?.toString(),
      moisNaissance: titulaire.moisNaissance?.toString(),
      anneeNaissance: titulaire.anneeNaissance?.toString()
    })) ?? []
});

const estCritereRMCAutoRequeteInsuffisant = ({
  nomTitulaire,
  prenomTitulaire,
  anneeNaissance,
  moisNaissance,
  jourNaissance
}: ICritereRMCAutoRequete) => !(nomTitulaire !== SNP || (prenomTitulaire && anneeNaissance && moisNaissance && jourNaissance));

export const useRMCAutoRequetesAssociees = ({ titulairesRequete, setTableauRMC }: IUseRMCAutoRequetesAssocieesParams) => {
  const { appelApi: postRmcAutoRequete, enAttenteDeReponseApi: enAttenteDeReponseApiRmcAutoRequete } =
    useFetchApi(CONFIG_POST_RMC_AUTO_REQUETE);

  useEffect(() => {
    if (!titulairesRequete) return;
    const enveloppeCriteresRMCAutoRequete = determinerCriteresRMCAutoRequeteDepuisTitulaire(titulairesRequete);
    const premierCritereEnveloppe = enveloppeCriteresRMCAutoRequete.criteres?.[0];

    if (!premierCritereEnveloppe || estCritereRMCAutoRequeteInsuffisant(premierCritereEnveloppe)) {
      setTableauRMC({ requetesAssociees: [], nombreTotalLignes: 0 });
      return;
    }

    postRmcAutoRequete({
      parametres: { body: enveloppeCriteresRMCAutoRequete, query: { range: `0-${NB_LIGNES_PAR_APPEL_REQUETE_ASSOCIEES}` } },
      apresSucces: (requetes, headers) => {
        setTableauRMC({
          requetesAssociees: requetes.map(RequeteAssociee.depuisDto).filter((requete): requete is TRequeteAssociee => requete !== null),
          nombreTotalLignes: TableauUtils.recupererNombreTotalLignesDepuisHeaders(headers)
        });
      },
      apresErreur: erreurs => {
        AfficherMessage.erreur("Une erreur est survenue lors de la RMC automatique de requêtes", { erreurs });
      }
    });
  }, [titulairesRequete]);

  return { enAttenteDeReponseApiRmcAutoRequete };
};
