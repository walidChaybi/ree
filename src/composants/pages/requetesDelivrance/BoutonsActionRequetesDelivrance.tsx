import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { memo, useMemo, useState } from "react";
import { Link } from "react-router";
import "./BoutonsActionRequetesDelivrance.scss";

const BoutonsActionMesRequetesDelivrance = memo(() => {
  const boutonsDisponibles = useMemo<boolean>(
    () => gestionnaireFeatureFlag.auMoinUnEstActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES, FeatureFlag.FF_DELIV_CS),
    []
  );

  const [menuSaisieOuvert, setMenuSaisieOuvert] = useState<boolean>(false);

  return boutonsDisponibles ? (
    <div className="boutons-action-mes-requetes-delivrance">
      <div
        className="bouton-saisir-requete"
        onMouseLeave={() => setMenuSaisieOuvert(false)}
      >
        <button
          onClick={() => setMenuSaisieOuvert(!menuSaisieOuvert)}
          onMouseEnter={() => setMenuSaisieOuvert(true)}
        >
          Saisir requête courrier
        </button>
        {menuSaisieOuvert && (
          <div className="menu-saisir-requete">
            <div>
              <Link to="/rece/rece-ui/mes-requetes/saisir-extrait-copie">Délivrance Extrait/Copie courrier</Link>
            </div>

            <div>
              <Link to="">Délivrance Certificat & Attestation RC/RCA/PACS courrier</Link>
            </div>
            <div>
              <Link to="">Délivrance Livret de famille courrier</Link>
            </div>
          </div>
        )}
      </div>
      <button
        className="bouton-requete-suivante"
        type="button"
      >
        Prendre en charge requête suivante
      </button>
    </div>
  ) : (
    <></>
  );
});

export default BoutonsActionMesRequetesDelivrance;
