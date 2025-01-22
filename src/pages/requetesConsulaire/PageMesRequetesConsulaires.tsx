import { RECEContextData } from "@core/contexts/RECEContext";
import MenuSaisirRequeteCreation from "@pages/requeteCreation/espaceCreation/contenu/MenuSaisirRequeteCreation";
import { URL_REQUETES_CONSULAIRE_SERVICE } from "@router/ReceUrls";
import { useContext } from "react";
import PageChargeur from "../../composants/commun/chargeurs/PageChargeur";
import OngletsLien from "../../composants/commun/onglets/OngletsLien";

interface IPageMesRequetesConsulairesProps {
  query: any;
}

const PageMesRequetesConsulaires: React.FC<IPageMesRequetesConsulairesProps> = () => {
  const { utilisateurConnecte, utilisateurs } = useContext(RECEContextData);

  return (
    <div>
      {utilisateurConnecte && (
        <>
          {!utilisateurs && <PageChargeur />}
          <OngletsLien
            liens={[
              {
                libelle: "Mes requêtes consulaires"
              },
              {
                libelle: "Les requêtes consulaires de mon service",
                url: URL_REQUETES_CONSULAIRE_SERVICE
              }
            ]}
          />
          <div className="BlocBoutons">
            <MenuSaisirRequeteCreation indexTabPanel={1} />
          </div>
          <div>MesRequetesConsulaires</div>
        </>
      )}
    </div>
  );
};

export default PageMesRequetesConsulaires;
