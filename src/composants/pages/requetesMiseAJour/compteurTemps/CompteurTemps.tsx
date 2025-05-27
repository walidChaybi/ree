import { CONFIG_GET_DELAI_MISE_A_JOUR_RESTANT } from "@api/configurations/requete/miseAJour/GetDelaiMiseAJourRestantConfigApi";
import { URL_RECHERCHE_ACTE_INSCRIPTION } from "@router/ReceUrls";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useFetchApi from "../../../../hooks/api/FetchApiHook";
import Bouton from "../../../commun/bouton/Bouton";
import ConteneurModale from "../../../commun/conteneurs/modale/ConteneurModale";

interface ICompteurTempsProps {
  idRequete: string;
  abandonnerRequete: () => void;
}

const UNE_MINUTE = 60000;

const CompteurTemps: React.FC<ICompteurTempsProps> = memo(({ idRequete, abandonnerRequete }) => {
  const navigate = useNavigate();
  const [minutesRestantes, setMinutesRestantes] = useState<number | null>(null);
  const [prevenirRedirection, setPrevenirRedirection] = useState<boolean>(false);
  const { appelApi: getDelaiRestant } = useFetchApi(CONFIG_GET_DELAI_MISE_A_JOUR_RESTANT);

  useEffect(() => {
    if (minutesRestantes === null) {
      getDelaiRestant({
        parametres: { path: { idRequete } },
        apresSucces: delaiRestant => setMinutesRestantes(delaiRestant),
        apresErreur: () => {
          setMinutesRestantes(0);
        }
      });
      return;
    }

    if (minutesRestantes <= 0) {
      abandonnerRequete();
      setPrevenirRedirection(true);

      return;
    }

    setTimeout(() => setMinutesRestantes(minutesRestantes - 1), UNE_MINUTE);
  }, [minutesRestantes]);

  return prevenirRedirection ? (
    <ConteneurModale>
      <div className="max-w-[40rem] rounded-xl bg-blanc p-5 text-center shadow-xl">
        <div className="mb-6 text-xl">
          {"Le délai de traitement de la requête de mise à jour est dépassé. Vous allez être redirigé vers la page de recherche d'un acte."}
        </div>
        <Bouton
          type="button"
          title="OK"
          onClick={() => navigate(URL_RECHERCHE_ACTE_INSCRIPTION, { replace: true })}
        >
          {"OK"}
        </Bouton>
      </div>
    </ConteneurModale>
  ) : (
    <></>
  );
});

export default CompteurTemps;
