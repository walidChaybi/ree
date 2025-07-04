import { CONFIG_GET_NOMBRE_REQUETE } from "@api/configurations/requete/compteur/GetNombreRequeteConfigApi";
import { RECEContextData } from "@core/contexts/RECEContext";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import Close from "@mui/icons-material/Close";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import Logout from "@mui/icons-material/Logout";
import { URL_DECONNEXION, URL_MES_REQUETES_DELIVRANCE } from "@router/ReceUrls";
import { gestionnaireDoubleOuverture } from "@util/GestionnaireDoubleOuverture";
import { logError } from "@util/LogManager";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useFetchApi from "../../../hooks/api/FetchApiHook";
import Texte from "../../../utils/Texte";
import Bouton from "../../commun/bouton/Bouton";
import ConteneurModale from "../../commun/conteneurs/modale/ConteneurModale";

const MenuUtilisateur: React.FC = () => {
  const navigate = useNavigate();
  const { utilisateurConnecte, erreurConnexion } = useContext(RECEContextData);
  const [menuOuvert, setMenuOuvert] = useState<boolean>(false);
  const [nombreRequeteASigner, setNombreRequeteASigner] = useState<number>(0);
  const { appelApi: appelNombreRequete, enAttenteDeReponseApi: enAttenteNombreRequete } = useFetchApi(CONFIG_GET_NOMBRE_REQUETE);

  const deconnexion = useCallback(() => {
    gestionnaireDoubleOuverture.arreterVerification();
    navigate(URL_DECONNEXION);
  }, []);

  useEffect(() => {
    const fermerMenu = () => setMenuOuvert(false);
    document.addEventListener("click", fermerMenu);

    return () => {
      document.removeEventListener("click", fermerMenu);
      if (window.location.pathname.includes(URL_DECONNEXION)) navigate(0);
    };
  }, []);

  if (!utilisateurConnecte.idArobas && !erreurConnexion?.avecErreur) {
    return <></>;
  }

  return utilisateurConnecte.idArobas ? (
    <>
      <button
        className="h-12 min-w-0 bg-transparent pl-4 pr-2"
        type="button"
        title="Menu utilisateur"
        onClick={event => {
          event.stopPropagation();
          setMenuOuvert(true);
        }}
      >
        <AccountCircleOutlined fontSize="large" />
      </button>

      <aside
        onClick={event => event.stopPropagation()}
        className={`fixed top-0 z-10 flex h-screen w-[350px] flex-col justify-between bg-bleu pl-4 shadow-md transition-[right] ${menuOuvert ? "right-0" : "-right-full"}`}
      >
        <div className="grid gap-6">
          <div className="flex justify-between">
            <div className="flex gap-4 pt-3.5">
              <AccountCircleOutlined fontSize="large" />
              <div className="text-start">
                <div className="text-2xl font-bold">{utilisateurConnecte.prenomNom}</div>
                {utilisateurConnecte.fonction && (
                  <div className="italic">{Texte.premiereLettreMajuscule(utilisateurConnecte.fonction)}</div>
                )}
              </div>
            </div>
            <button
              className="h-12 w-12 min-w-0 bg-transparent"
              onClick={() => setMenuOuvert(false)}
            >
              <Close fontSize="large" />
            </button>
          </div>

          <button
            className="m-0 mr-4 flex min-w-0 items-center justify-center gap-4 rounded-lg bg-bleu-sombre px-4 py-3 transition-colors hover:bg-opacity-75"
            title="Déconnexion"
            disabled={enAttenteNombreRequete}
            onClick={() =>
              appelNombreRequete({
                parametres: { query: { statuts: StatutRequete.A_SIGNER.nom } },
                apresSucces: nombreRequete => (nombreRequete > 0 ? setNombreRequeteASigner(nombreRequete) : deconnexion()),
                apresErreur: erreur => {
                  logError({
                    error: erreur[0].message ?? ""
                  });

                  deconnexion();
                }
              })
            }
          >
            <span>{"Déconnexion"}</span>
            <Logout />
          </button>
        </div>

        <div className="grid gap-4 pb-4">
          <a
            href={`${import.meta.env.BASE_URL}/nouveautes-RECE.html`}
            title="Nouveautés du RECE"
            className="mx-auto flex w-fit items-center gap-2 text-blanc"
            target="__blank"
            rel="noopener"
          >
            <InfoOutlined />
            <span>{"Nouveautés du RECE"}</span>
          </a>
          <div className="text-center italic">{`RECE - version ${process.env.VERSION ?? ""} - ${process.env.DATE_BUILD ?? ""}`}</div>
        </div>
      </aside>

      {nombreRequeteASigner > 0 && (
        <ConteneurModale>
          <div className="border-1 rounded-xl border-solid border-bleu-sombre bg-blanc p-5">
            <div>{`Il vous reste ${nombreRequeteASigner} requête(s) à signer, êtes-vous sûr de vouloir vous déconnecter ?`}</div>
            <div className="flex items-center justify-center gap-6 pt-6">
              <Bouton
                styleBouton="secondaire"
                title="Non, voir les requêtes à signer"
                onClick={() => {
                  setNombreRequeteASigner(0);
                  setMenuOuvert(false);
                  navigate(URL_MES_REQUETES_DELIVRANCE);
                }}
              >
                {"Non"}
              </Bouton>

              <Bouton
                styleBouton="principal"
                title="Oui, me déconnecter"
                onClick={() => {
                  setNombreRequeteASigner(0);
                  deconnexion();
                }}
              >
                {"Oui"}
              </Bouton>
            </div>
          </div>
        </ConteneurModale>
      )}
    </>
  ) : (
    <button
      className="m-0 flex min-w-0 items-center justify-center gap-4 rounded-lg bg-transparent px-4 py-3"
      onClick={deconnexion}
      title="Déconnexion"
    >
      <span>{"Déconnexion"}</span>
      <Logout />
    </button>
  );
};

export default MenuUtilisateur;
