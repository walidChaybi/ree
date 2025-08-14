import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { Perimetre } from "@model/agent/enum/Perimetre";
import { render } from "@testing-library/react";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import ElementPageRECE from "../../router/ElementPageRECE";
import { creerInfoPageRECE } from "../../router/infoPages/InfoPageRECE";
import AfficherMessage from "../../utils/AfficherMessage";

const fauxFFValide = "FF_TEST" as FeatureFlag;
const fauxFFInvalide = "FF_TEST_INVALIDE" as FeatureFlag;
const navigate = vi.fn();
const afficherMessageErreur = vi.fn();

beforeAll(() => {
  vi.mock("react-router", () => ({ useNavigate: () => navigate, useLocation: () => ({ pathname: "/" }) }));
  vi.mock("../../views/common/util/featureFlag/gestionnaireFeatureFlag.ts", () => ({
    gestionnaireFeatureFlag: {
      estActif: (featureFlag: FeatureFlag) => featureFlag === fauxFFValide
    }
  }));
  AfficherMessage.erreur = afficherMessageErreur;
});

afterAll(() => {
  vi.restoreAllMocks();
});

describe("Test du composant ElementPageRECE", () => {
  test("le composant fonctionne correctement", () => {
    const {
      container: { firstChild: snapshot }
    } = render(
      <MockRECEContextProvider
        utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte()
          .avecDroit(Droit.CONSULTER, { perimetres: [Perimetre.TOUS_REGISTRES] })
          .generer()}
      >
        <div>
          <ElementPageRECE
            infoPage={creerInfoPageRECE({
              url: "",
              titre: ""
            })}
          >
            <div>{"Toujours accessible"}</div>
          </ElementPageRECE>

          <ElementPageRECE
            infoPage={creerInfoPageRECE({
              url: "",
              titre: "Accès par FF"
            })}
            featureFlags={[fauxFFValide]}
          >
            <div>{"Accès par FF"}</div>
          </ElementPageRECE>

          <ElementPageRECE
            infoPage={creerInfoPageRECE({
              url: "",
              titre: "Pas de FF"
            })}
            featureFlags={[fauxFFInvalide]}
          >
            <div>{"Pas de FF"}</div>
          </ElementPageRECE>

          <ElementPageRECE
            infoPage={creerInfoPageRECE({
              url: "",
              titre: "Avec tous les droits"
            })}
            tousLesDroits={[Droit.CONSULTER]}
          >
            <div>{"Avec tous les droits"}</div>
          </ElementPageRECE>

          <ElementPageRECE
            infoPage={creerInfoPageRECE({
              url: "",
              titre: "Sans tous les droits"
            })}
            tousLesDroits={[Droit.CONSULTER, Droit.DELIVRER]}
          >
            <div>{"Sans tous les droits"}</div>
          </ElementPageRECE>

          <ElementPageRECE
            infoPage={creerInfoPageRECE({
              url: "",
              titre: "Avec au moins un des droits"
            })}
            auMoinsUnDesDroits={[Droit.CONSULTER, Droit.DELIVRER]}
          >
            <div>{"Avec au moins un des droits"}</div>
          </ElementPageRECE>

          <ElementPageRECE
            infoPage={creerInfoPageRECE({
              url: "",
              titre: "Sans au moins un des droits"
            })}
            auMoinsUnDesDroits={[Droit.DELIVRER]}
          >
            <div>{"Sans au moins un des droits"}</div>
          </ElementPageRECE>

          <ElementPageRECE
            infoPage={creerInfoPageRECE({
              url: "",
              titre: "Avec uniquement les droits"
            })}
            uniquementLesDroits={[Droit.CONSULTER]}
          >
            <div>{"Avec uniquement les droits"}</div>
          </ElementPageRECE>

          <ElementPageRECE
            infoPage={creerInfoPageRECE({
              url: "",
              titre: "Sans uniquement les droits"
            })}
            uniquementLesDroits={[Droit.DELIVRER]}
          >
            <div>{"Sans uniquement les droits"}</div>
          </ElementPageRECE>

          <ElementPageRECE
            infoPage={creerInfoPageRECE({
              url: "",
              titre: "Avec droit sur périmetre"
            })}
            droitSurUnDesPerimetre={{ droit: Droit.CONSULTER, perimetres: [Perimetre.TOUS_REGISTRES] }}
          >
            <div>{"Avec droit sur périmetre"}</div>
          </ElementPageRECE>

          <ElementPageRECE
            infoPage={creerInfoPageRECE({
              url: "",
              titre: "Sans droit sur périmetre"
            })}
            droitSurUnDesPerimetre={{ droit: Droit.CONSULTER, perimetres: ["INCONNU"] }}
          >
            <div>{"Sans droit sur périmetre"}</div>
          </ElementPageRECE>
        </div>
      </MockRECEContextProvider>
    );

    expect(navigate).toHaveBeenCalledTimes(5);
    expect(afficherMessageErreur).toHaveBeenCalledTimes(5);
    expect(snapshot).toMatchSnapshot();
  });
});
