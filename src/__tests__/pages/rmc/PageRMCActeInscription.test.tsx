import { CONFIG_POST_RMC_ACTE } from "@api/configurations/etatCivil/acte/PostRMCActeConfigApi";
import { CONFIG_POST_RMC_INSCRIPTION } from "@api/configurations/etatCivil/acte/PostRMCInscriptionConfigApi";
import { MockApi } from "@mock/appelsApi/MockApi";
import { MOCK_RESULTAT_RMC_INSCRIPTION_RC } from "@mock/data/RMCInscription";
import { NatureRc } from "@model/etatcivil/enum/NatureRc";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { PageRMCActeInscription } from "../../../pages/rmc/PageRMCActeInscription";

test("Le formulaire s'affiche correctement", async () => {
  const { container } = render(<PageRMCActeInscription></PageRMCActeInscription>);

  expect(container).toMatchSnapshot();
});

describe("Le bloc titulaire fonctionne correctement ", () => {
  test("La validation du nom et prénom titulaire fonctionne correctement", async () => {
    render(<PageRMCActeInscription></PageRMCActeInscription>);

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
    render(<PageRMCActeInscription></PageRMCActeInscription>);

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
    render(<PageRMCActeInscription></PageRMCActeInscription>);

    const InputEvenement: HTMLInputElement = await screen.findByLabelText("Pays de l'évènement");

    fireEvent.change(InputEvenement, { target: { value: "$" } });
    fireEvent.blur(InputEvenement);

    await waitFor(() => {
      expect(screen.getByText("⚠ Les caractères spéciaux autorisés sont l'espace et les suivants : ' -")).toBeDefined();
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
    render(<PageRMCActeInscription></PageRMCActeInscription>);

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

describe("Le bloc RC/RCA/PAC fonctionne correctement ", () => {
  test("La Nature de l'inscription est grisée tant que RC ou RCA ne sont pas selectionnes", async () => {
    render(<PageRMCActeInscription></PageRMCActeInscription>);

    const InputNatureInscription: HTMLInputElement = await screen.findByLabelText("Nature de l'inscription");

    await waitFor(() => {
      expect(InputNatureInscription.disabled).toBeTruthy();
    });

    const InputTypeRepertoire: HTMLSelectElement = await screen.findByLabelText("Type de répertoire");

    fireEvent.change(InputTypeRepertoire, { target: { value: "RC" } });

    await waitFor(() => {
      expect(InputNatureInscription.disabled).toBeFalsy();
    });

    fireEvent.change(InputTypeRepertoire, { target: { value: "PACS" } });

    await waitFor(() => {
      expect(InputNatureInscription.disabled).toBeTruthy();
    });
  });

  test("La Nature de l'inscription et le Type de registre ne sont pas utilisables sans un autre champ", async () => {
    vi.spyOn(NatureRc, "versOptions").mockReturnValue([
      {
        cle: "curatelle",
        libelle: "curatelle"
      }
    ]);

    render(<PageRMCActeInscription></PageRMCActeInscription>);

    const InputNatureInscription: HTMLInputElement = await screen.findByLabelText("Nature de l'inscription");
    const InputTypeRepertoire: HTMLSelectElement = await screen.findByLabelText("Type de répertoire");

    fireEvent.change(InputTypeRepertoire, { target: { value: "RC" } });
    fireEvent.blur(InputTypeRepertoire);

    await waitFor(() => {
      expect(
        screen.getByText("⚠ Le champ ne peut être utilisé seul, ni être le seul champ renseigné avec Nature de l'inscription")
      ).toBeDefined();
    });

    fireEvent.change(InputNatureInscription, { target: { value: "curatelle" } });
    fireEvent.blur(InputNatureInscription);

    await waitFor(() => {
      expect(
        screen.getByText("⚠ Le champ ne peut être utilisé seul, ni être le seul champ renseigné avec Nature de l'inscription")
      ).toBeDefined();
      expect(
        screen.getByText("⚠ Le champ ne peut être utilisé seul, ni être le seul champ renseigné avec Type de répertoire")
      ).toBeDefined();
    });

    const InputPrenom: HTMLInputElement = await screen.findByLabelText("Prénom");

    fireEvent.change(InputPrenom, { target: { value: "Goku" } });
    fireEvent.blur(InputPrenom);

    await waitFor(() => {
      expect(
        screen.queryByText("⚠ Le champ ne peut être utilisé seul, ni être le seul champ renseigné avec Nature de l'inscription")
      ).toBeNull();
      expect(
        screen.queryByText("⚠ Le champ ne peut être utilisé seul, ni être le seul champ renseigné avec Type de répertoire")
      ).toBeNull();
    });
  });

  test("Le N° de l'inscription / N° du PACS fonctionnent correctement", async () => {
    render(<PageRMCActeInscription></PageRMCActeInscription>);

    const InputAnnee = (await screen.findAllByPlaceholderText("AAAA")).find(
      input => input.id === "registreRepertoire.repertoire.numeroInscription.anneeInscription"
    )!;
    const InputNumero = (await screen.findAllByPlaceholderText("XXXXX")).find(
      input => input.id === "registreRepertoire.repertoire.numeroInscription.numero"
    )!;

    fireEvent.change(InputAnnee, { target: { value: "1234" } });
    fireEvent.blur(InputAnnee);

    await waitFor(() => {
      expect(screen.getByText("⚠ Le champ ne peut être utilisé seul")).toBeDefined();
    });

    const InputNom: HTMLInputElement = await screen.findByLabelText("Nom");

    fireEvent.change(InputNom, { target: { value: "Goku" } });
    fireEvent.blur(InputNom);
    fireEvent.blur(InputNumero);

    await waitFor(() => {
      expect(screen.getByText("⚠ Le champ est incomplet")).toBeDefined();
    });

    fireEvent.change(InputAnnee, { target: { value: "" } });
    fireEvent.change(InputNumero, { target: { value: "1" } });
    fireEvent.blur(InputNumero);

    await waitFor(() => {
      expect(screen.getByText("⚠ Le champ est incomplet")).toBeDefined();
    });
    fireEvent.change(InputAnnee, { target: { value: "1234" } });
    fireEvent.blur(InputAnnee);

    expect(screen.queryByText("⚠")).toBeNull();
  });

  test("La recherche d'inscriptions à partir d'un numéro fonctionne correctement", async () => {
    render(<PageRMCActeInscription></PageRMCActeInscription>);
    const checkboxInscriptionSuivantes: HTMLInputElement = await screen.findByLabelText("Et les inscriptions/PACS suivants du répertoire");

    const InputAnnee = (await screen.findAllByPlaceholderText("AAAA")).find(
      input => input.id === "registreRepertoire.repertoire.numeroInscription.anneeInscription"
    )!;
    const InputNumero = (await screen.findAllByPlaceholderText("XXXXX")).find(
      input => input.id === "registreRepertoire.repertoire.numeroInscription.numero"
    )!;

    expect(checkboxInscriptionSuivantes.disabled).toBe(true);

    fireEvent.change(InputAnnee, { target: { value: "2010" } });
    fireEvent.change(InputNumero, { target: { value: "123456" } });

    expect(checkboxInscriptionSuivantes.disabled).toBe(false);

    fireEvent.click(checkboxInscriptionSuivantes);
    expect(checkboxInscriptionSuivantes.value).toBe("true");

    fireEvent.change(InputNumero, { target: { value: "" } });

    expect(checkboxInscriptionSuivantes.disabled).toBe(true);
    expect(checkboxInscriptionSuivantes.value).toBe("false");
  });
});

describe("Les boutons du formulaire fonctionnent correctement ", () => {
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

    MockApi.deployer(
      CONFIG_POST_RMC_INSCRIPTION,
      { query: { range: "0-105" } },
      {
        data: [MOCK_RESULTAT_RMC_INSCRIPTION_RC],
        codeHttp: 200
      }
    );

    MockApi.deployer(
      CONFIG_POST_RMC_INSCRIPTION,
      { query: { range: "0-105" } },
      {
        data: [MOCK_RESULTAT_RMC_INSCRIPTION_RC],
        codeHttp: 200
      }
    );

    render(<PageRMCActeInscription></PageRMCActeInscription>);

    const InputNom: HTMLInputElement = await screen.findByLabelText("Nom");
    const BoutonRechercher = screen.getByRole("button", { name: "Rechercher" });

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
    render(<PageRMCActeInscription></PageRMCActeInscription>);

    const InputNom: HTMLInputElement = await screen.findByLabelText("Nom");
    const BoutonRappelCriteres = screen.getByRole("button", { name: "Rappel critères" });

    fireEvent.click(BoutonRappelCriteres);

    await waitFor(() => {
      expect(InputNom.value).equals("Goku");
    });
  });
});
