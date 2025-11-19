import { CONFIG_GET_RESUME_ACTE } from "@api/configurations/etatCivil/acte/GetResumeActeConfigApi";
import { CONFIG_GET_DETAIL_REQUETE } from "@api/configurations/requete/GetDetailRequeteConfigApi";
import { TRAITEMENT_SANS_ERREUR, TTraitementApi } from "@api/traitements/TTraitementApi";
import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { useContext, useState } from "react";
import { RECEContextData } from "../../../../contexts/RECEContextProvider";
import useFetchApi from "../../../../hooks/api/FetchApiHook";
import { mappingRequeteDelivrance } from "../../../../views/common/hook/requete/DetailRequeteHook";

interface IParamsChargement {
  idRequete: string;
  idActe?: string;
  chargement: "les-deux" | "requete" | "acte";
}

interface IResultat {
  requete: IRequeteDelivrance | null;
  acte: FicheActe | null;
}

const TRAITEMENT_CHARGER_REQUETE_ET_ACTE: TTraitementApi<IParamsChargement, IResultat> = {
  Lancer: terminerTraitement => {
    const { utilisateurs } = useContext(RECEContextData);
    const [resultat, setResultat] = useState<IResultat>({
      requete: null,
      acte: null
    });
    const { appelApi: appelRequete } = useFetchApi(CONFIG_GET_DETAIL_REQUETE);
    const { appelApi: appelActe } = useFetchApi(CONFIG_GET_RESUME_ACTE);

    const lancer = (parametres?: IParamsChargement) => {
      if (!parametres) {
        terminerTraitement();
      }

      switch (parametres?.chargement) {
        case "les-deux":
          appelRequete({
            parametres: { path: { idRequete: parametres.idRequete } },
            apresSucces: requeteDto => {
              const requete = mappingRequeteDelivrance(requeteDto, utilisateurs);
              const idActe = parametres.idActe ?? requete.documentsReponses?.find(documentReponse => documentReponse.idActe)?.idActe;
              if (!idActe) {
                setResultat({ requete: requete, acte: null });
                terminerTraitement();

                return;
              }

              appelActe({
                parametres: { path: { idActe: idActe }, query: { remplaceIdentiteTitulaireParIdentiteTitulaireAM: true } },
                apresSucces: acteDto => setResultat({ requete: requete, acte: FicheActe.depuisDto(acteDto) }),
                finalement: () => terminerTraitement()
              });
            }
          });
          break;
        case "requete":
          appelRequete({
            parametres: { path: { idRequete: parametres.idRequete } },
            apresSucces: requeteDto => setResultat({ requete: mappingRequeteDelivrance(requeteDto), acte: null }),
            finalement: () => terminerTraitement()
          });
          break;
        case "acte":
          if (!parametres.idActe) {
            terminerTraitement();

            break;
          }

          appelActe({
            parametres: { path: { idActe: parametres.idActe }, query: { remplaceIdentiteTitulaireParIdentiteTitulaireAM: true } },
            apresSucces: acteDto => setResultat({ requete: null, acte: FicheActe.depuisDto(acteDto) }),
            finalement: () => terminerTraitement()
          });
      }
    };

    return { lancer, erreurTraitement: TRAITEMENT_SANS_ERREUR, reponseTraitement: resultat };
  }
};

export default TRAITEMENT_CHARGER_REQUETE_ET_ACTE;
