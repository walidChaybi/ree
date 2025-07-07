import { CONFIG_POST_RMC_ACTE } from "@api/configurations/etatCivil/acte/PostRMCActeConfigApi";
import { MockApi } from "@mock/appelsApi/MockApi";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { PageRMCActeInscription } from "../../../pages/rmc/PageRMCActeInscription";

test("Le formulaire s'affiche correctement", async () => {
  const { container } = render(<PageRMCActeInscription dansFenetreExterne={false}></PageRMCActeInscription>);

  expect(container).toMatchSnapshot();
});

describe("Le bloc titulaire fonctionne correctement ", () => {
  test("La validation du nom et prénom titulaire fonctionne correctement", async () => {
    render(<PageRMCActeInscription dansFenetreExterne={false}></PageRMCActeInscription>);

    const InputNom: HTMLInputElement = await screen.findByLabelText("Nom");
    const InputPrenom: HTMLInputElement = await screen.findByLabelText("Prénom");

    fireEvent.change(InputPrenom, { target: { value: "Goku" } });
    fireEvent.blur(InputPrenom);
    fireEvent.blur(InputNom);

    await waitFor(() => {
      expect(screen.getByText("⚠ La saisie du champ est obligatoire")).toBeDefined();
    });

    fireEvent.change(InputNom, { target: { value: "$" } });
    fireEvent.change(InputPrenom, { target: { value: "$" } });
    fireEvent.blur(InputNom);
    fireEvent.blur(InputPrenom);

    await waitFor(() => {
      expect(screen.getAllByText("⚠ Le champ contient des caractères interdits dans l'état civil").length).toBe(2);
    });

    fireEvent.change(InputNom, { target: { value: "*" } });
    fireEvent.change(InputPrenom, { target: { value: "*" } });
    fireEvent.blur(InputNom);
    fireEvent.blur(InputPrenom);

    await waitFor(() => {
      expect(screen.getByText("⚠ L'astérisque doit être précédé d'au moins un caractère")).toBeDefined();
      expect(screen.getByText("⚠ L'astérisque doit être précédé d'au moins deux caractères")).toBeDefined();
    });

    fireEvent.change(InputNom, { target: { value: "pi*" } });
    fireEvent.change(InputPrenom, { target: { value: "p*" } });
    fireEvent.blur(InputNom);
    fireEvent.blur(InputPrenom);

    await waitFor(() => {
      expect(screen.queryByText("⚠")).toBeNull();
    });

    fireEvent.change(InputNom, { target: { value: "pi*x" } });
    fireEvent.change(InputPrenom, { target: { value: "p*x" } });
    fireEvent.blur(InputNom);
    fireEvent.blur(InputPrenom);

    await waitFor(() => {
      expect(screen.getAllByText("⚠ L'astérisque ne doit être suivi d'aucun caractère").length).toBe(2);
    });
  });

  test("La validation de la date titulaire fonctionne correctement", async () => {
    render(<PageRMCActeInscription dansFenetreExterne={false}></PageRMCActeInscription>);

    const InputJour = (await screen.findAllByPlaceholderText("JJ")).find(input => input.id === "titulaire.dateNaissance.jour")!;
    const InputAnnee = (await screen.findAllByPlaceholderText("AAAA")).find(input => input.id === "titulaire.dateNaissance.annee")!;

    fireEvent.change(InputJour, { target: { value: "01" } });
    fireEvent.blur(InputAnnee);

    await waitFor(() => {
      expect(screen.getByText("⚠ La date est incomplète")).toBeDefined();
    });

    fireEvent.change(InputJour, { target: { value: "" } });
    fireEvent.change(InputAnnee, { target: { value: "4000" } });
    fireEvent.blur(InputAnnee);

    await waitFor(() => {
      expect(screen.getByText("⚠ La date ne peut pas être supérieure à la date du jour")).toBeDefined();
    });

    fireEvent.change(InputAnnee, { target: { value: "2000" } });

    fireEvent.blur(InputAnnee);

    await waitFor(() => {
      expect(screen.getByText("⚠ Le champ ne peut être utilisé sans au moins un autre critère du titulaire")).toBeDefined();
    });

    const InputNom: HTMLInputElement = await screen.findByLabelText("Nom");

    fireEvent.change(InputNom, { target: { value: "Goku" } });

    await waitFor(() => {
      expect(screen.queryByText("⚠")).toBeNull();
    });
  });
});

describe("Le bloc evenement fonctionne correctement ", () => {
  test("La validation du pays de l'évènement fonctionne correctement", async () => {
    render(<PageRMCActeInscription dansFenetreExterne={false}></PageRMCActeInscription>);

    const InputEvenement: HTMLInputElement = await screen.findByLabelText("Pays de l'évènement");

    fireEvent.change(InputEvenement, { target: { value: "$" } });
    fireEvent.blur(InputEvenement);

    await waitFor(() => {
      expect(screen.getByText("⚠ Le champ contient des caractères interdits dans l'état civil")).toBeDefined();
    });

    fireEvent.change(InputEvenement, { target: { value: "Capsule Corp" } });
    fireEvent.blur(InputEvenement);

    await waitFor(() => {
      expect(screen.getByText("⚠ Le champ ne peut être utilisé seul")).toBeDefined();
    });
    const InputAnnee = (await screen.findAllByPlaceholderText("AAAA")).find(input => input.id === "titulaire.dateNaissance.annee")!;

    fireEvent.change(InputAnnee, { target: { value: "2000" } });
    fireEvent.blur(InputAnnee);
    await waitFor(() => {
      expect(screen.queryByText("⚠")).toBeNull();
    });
  });

  test("La validation de la date d'évènement fonctionne correctement", async () => {
    render(<PageRMCActeInscription dansFenetreExterne={false}></PageRMCActeInscription>);

    const InputJour = (await screen.findAllByPlaceholderText("JJ")).find(input => input.id === "titulaire.dateNaissance.jour")!;
    const InputAnnee = (await screen.findAllByPlaceholderText("AAAA")).find(input => input.id === "titulaire.dateNaissance.annee")!;

    fireEvent.change(InputJour, { target: { value: "01" } });
    fireEvent.blur(InputAnnee);

    await waitFor(() => {
      expect(screen.getByText("⚠ La date est incomplète")).toBeDefined();
    });

    fireEvent.change(InputJour, { target: { value: "" } });
    fireEvent.change(InputAnnee, { target: { value: "4000" } });
    fireEvent.blur(InputAnnee);

    await waitFor(() => {
      expect(screen.getByText("⚠ La date ne peut pas être supérieure à la date du jour")).toBeDefined();
    });

    fireEvent.change(InputAnnee, { target: { value: "2000" } });

    fireEvent.blur(InputAnnee);

    await waitFor(() => {
      expect(screen.getByText("⚠ Le champ ne peut être utilisé sans au moins un autre critère du titulaire")).toBeDefined();
    });

    const InputNom: HTMLInputElement = await screen.findByLabelText("Nom");

    fireEvent.change(InputNom, { target: { value: "Goku" } });

    await waitFor(() => {
      expect(screen.queryByText("⚠")).toBeNull();
    });
  });
});

describe("La boutons du formulaire fonctionne correctement ", () => {
  test("LORSQUE l'utilisateur clique sur le bouton RECHERCHER, ALORS la soumission du formulaire s'effectue correctement", async () => {
    MockApi.deployer(
      CONFIG_POST_RMC_ACTE,
      { body: {}, query: { range: "0-100" } },
      {
        codeHttp: 200,
        data: [
          {
            id: "3740f6c0-3e4c-410d-b223-5ce92e392572",
            nom: "Schlosser",
            autresNoms: ["GREENWALD"],
            prenoms: [
              {
                numeroOrdre: 1,
                prenom: "Cassandra"
              },
              {
                numeroOrdre: 2,
                prenom: "Clara"
              },
              {
                numeroOrdre: 3,
                prenom: "Angela"
              }
            ],
            dateEvenement: {},
            dateNaissance: {
              jour: 5,
              mois: 3,
              annee: 2002
            },
            paysNaissance: "Italie",
            nature: "NAISSANCE",
            referenceRegistre: "ACQ.X.2022.442",
            referenceRece: "RECE.2022.000001",
            familleRegistre: "ACQ",
            type: "TEXTE"
          }
        ]
      }
    );

    render(<PageRMCActeInscription dansFenetreExterne={false}></PageRMCActeInscription>);

    const InputNom: HTMLInputElement = await screen.findByLabelText("Nom");
    const BoutonRechercher = await screen.getByRole("button", { name: "Rechercher" });

    fireEvent.change(InputNom, { target: { value: "Goku" } });
    fireEvent.click(BoutonRechercher);

    await waitFor(() => {
      expect(screen.getByText("Recherche dans les registres d'état civil")).toBeDefined();
      expect(
        screen.getByText("Recherche dans les répertoires de greffe et registre des PACS des étrangers nés à l'étranger")
      ).toBeDefined();
      expect(screen.getByText("RECE.2022.000001")).toBeDefined();
    });

    MockApi.stopMock();
  });
  test("LORSQUE l'utilisateur clique sur le bouton RAPPEL DES CRITERES, ALORS la récdupération de données pour le formulaire s'effectue correctement", async () => {
    render(<PageRMCActeInscription dansFenetreExterne={false}></PageRMCActeInscription>);

    const InputNom: HTMLInputElement = await screen.findByLabelText("Nom");
    const BoutonRappelCriteres = await screen.getByRole("button", { name: "Rappel critères" });

    fireEvent.click(BoutonRappelCriteres);

    await waitFor(() => {
      expect(InputNom.value).equals("Goku");
    });
  });
});
