import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { UtilisateurConnecte } from "@model/agent/Utilisateur";
import RequeteAssociee from "@model/rmc/requete/RequeteAssociee";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { IParametresRecherche } from "../../../../composants/commun/tableau/Tableau";
import { useTableauRMCRequetesAssociees } from "../../../../hooks/rmc/requetesAssociees/TableauRMCRequetesAssocieesHook";

const MOCK_REQUETE_DELIVRANCE_ASSOCIEE: RequeteAssociee<"DELIVRANCE"> = {
  id: "62f3b260-0d69-4c4e-8708-3722500b34c3",
  dateCreation: "14/11/2025",
  titulaires: [],
  type: "DELIVRANCE",
  sousType: "RDCSD",
  statut: "À traiter",
  numero: "ER3MKS"
};
const MOCK_REQUETE_INFORMATION_ASSOCIEE: RequeteAssociee<"INFORMATION"> = {
  id: "62f3b260-0d69-4c4e-8708-3722500b34c3",
  dateCreation: "14/11/2025",
  titulaires: [],
  type: "INFORMATION",
  sousType: "INFORMATION",
  statut: "À traiter",
  numero: "ER3MKS"
};
const MOCK_REQUETE_MAJ_ASSOCIEE: RequeteAssociee<"MISE_A_JOUR"> = {
  id: "62f3b260-0d69-4c4e-8708-3722500b34c3",
  dateCreation: "14/11/2025",
  titulaires: [],
  type: "MISE_A_JOUR",
  sousType: "RMRCC",
  statut: "À traiter",
  numero: "ER3MKS"
};
const MOCK_REQUETE_CREATION_ASSOCIEE_RCTC: RequeteAssociee<"CREATION"> = {
  id: "62f3b260-0d69-4c4e-8708-3722500b34c3",
  dateCreation: "14/11/2025",
  titulaires: [],
  type: "CREATION",
  sousType: "RCTC",
  statut: "À traiter",
  numero: "ER3MKS"
};
const MOCK_REQUETE_CREATION_ASSOCIEE_RCTD: RequeteAssociee<"CREATION"> = {
  id: "62f3b260-0d69-4c4e-8708-3722500b34c3",
  dateCreation: "14/11/2025",
  titulaires: [],
  type: "CREATION",
  sousType: "RCTD",
  statut: "À traiter",
  numero: "ER3MKS"
};
const MOCK_REQUETE_CREATION_ASSOCIEE_RCEXR: RequeteAssociee<"CREATION"> = {
  id: "62f3b260-0d69-4c4e-8708-3722500b34c3",
  dateCreation: "14/11/2025",
  titulaires: [],
  type: "CREATION",
  sousType: "RCEXR",
  statut: "À traiter",
  numero: "ER3MKS"
};
const MOCK_REQUETE_CREATION_ASSOCIEE_RCETJC: RequeteAssociee<"CREATION"> = {
  id: "62f3b260-0d69-4c4e-8708-3722500b34c3",
  dateCreation: "14/11/2025",
  titulaires: [],
  type: "CREATION",
  sousType: "RCETJC",
  statut: "À traiter",
  numero: "ER3MKS"
};

const encapsulerAvecUtilisateurConnecte =
  (utilisateurConnecte: UtilisateurConnecte) =>
  ({ children }: { children: React.ReactNode }) => (
    <MockRECEContextProvider utilisateurConnecte={utilisateurConnecte}>{children}</MockRECEContextProvider>
  );
const mockRenderCelluleTitulaires = vi.fn().mockReturnValue(<div />);

describe("TableauRMCRequetesAssocieesHook", () => {
  const utilisateurAvecDroitDelivrance = MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.DELIVRER).generer();
  const utilisateurAvecDroitInformerUsager = MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.INFORMER_USAGER).generer();
  const utilisateurSansDroit = MockUtilisateurBuilder.utilisateurConnecte().generer();
  const utilisateurAvecDroitCreationProjetActe = MockUtilisateurBuilder.utilisateurConnecte()
    .avecDroit(Droit.TRANSCRIPTION_CREER_PROJET_ACTE)
    .generer();
  const utilisateurAvecDroitCreationProjetActeEtActeEtabli = MockUtilisateurBuilder.utilisateurConnecte()
    .avecDroits([Droit.TRANSCRIPTION_CREER_PROJET_ACTE, Droit.CREER_ACTE_ETABLI])
    .generer();

  test("DOIT mettre à jour les paramètres de recherche", () => {
    const { result } = renderHook(() => useTableauRMCRequetesAssociees(), {
      wrapper: encapsulerAvecUtilisateurConnecte(utilisateurAvecDroitCreationProjetActe)
    });

    const parametreRecherche: IParametresRecherche = { tri: "n", sens: "ASC" };

    act(() => {
      result.current.setParametresRecherche(parametreRecherche);
    });

    expect(result.current.parametresRecherche).toEqual(parametreRecherche);
  });

  test("DOIT ne pas permettre de sélectionner une requête QUAND l'utilisateur n'a pas les droits", () => {
    const { result } = renderHook(() => useTableauRMCRequetesAssociees(), {
      wrapper: encapsulerAvecUtilisateurConnecte(utilisateurSansDroit)
    });

    const ligneTableau = result.current.mapRequetesAssocieesCommeLignesTableau(
      [MOCK_REQUETE_DELIVRANCE_ASSOCIEE],
      mockRenderCelluleTitulaires
    )[0];

    expect(ligneTableau.onClick).not.toBeUndefined();
    const onClickLigne = ligneTableau.onClick!;
    act(() => {
      onClickLigne();
    });

    expect(result.current.requeteSelectionnee).toBeNull();
  });

  test("DOIT remettre la sélection de requête à null QUAND on ferme la fenêtre externe", () => {
    const { result } = renderHook(() => useTableauRMCRequetesAssociees(), {
      wrapper: encapsulerAvecUtilisateurConnecte(utilisateurAvecDroitDelivrance)
    });

    const ligneTableau = result.current.mapRequetesAssocieesCommeLignesTableau(
      [MOCK_REQUETE_DELIVRANCE_ASSOCIEE],
      mockRenderCelluleTitulaires
    )[0];
    expect(ligneTableau.onClick).not.toBeUndefined();
    const onClickLigne = ligneTableau.onClick!;
    act(() => {
      onClickLigne();
    });

    expect(result.current.requeteSelectionnee).not.toBeNull();

    act(() => {
      result.current.onFermetureFenetreExterne();
    });
    expect(result.current.requeteSelectionnee).toBeNull();
  });

  test("DOIT sélectionner une requête délivrance QUAND l'utilisateur a les droits et clique sur une ligne", async () => {
    const { result } = renderHook(() => useTableauRMCRequetesAssociees(), {
      wrapper: encapsulerAvecUtilisateurConnecte(utilisateurAvecDroitDelivrance)
    });
    const ligneTableau = result.current.mapRequetesAssocieesCommeLignesTableau(
      [MOCK_REQUETE_DELIVRANCE_ASSOCIEE],
      mockRenderCelluleTitulaires
    )[0];

    expect(ligneTableau.onClick).not.toBeUndefined();
    const onClickLigne = ligneTableau.onClick!;
    act(() => {
      onClickLigne();
    });

    expect(result.current.requeteSelectionnee).toEqual(MOCK_REQUETE_DELIVRANCE_ASSOCIEE);
  });

  test("DOIT sélectionner une requête information QUAND l'utilisateur a les droits et clique sur une ligne", async () => {
    const { result } = renderHook(() => useTableauRMCRequetesAssociees(), {
      wrapper: encapsulerAvecUtilisateurConnecte(utilisateurAvecDroitInformerUsager)
    });
    const ligneTableau = result.current.mapRequetesAssocieesCommeLignesTableau(
      [MOCK_REQUETE_INFORMATION_ASSOCIEE],
      mockRenderCelluleTitulaires
    )[0];

    expect(ligneTableau.onClick).not.toBeUndefined();
    const onClickLigne = ligneTableau.onClick!;
    act(() => {
      onClickLigne();
    });

    expect(result.current.requeteSelectionnee).toEqual(MOCK_REQUETE_INFORMATION_ASSOCIEE);
  });

  test("DOIT sélectionner une requête création RCTC QUAND l'utilisateur a les droits et clique sur une ligne", async () => {
    const { result } = renderHook(() => useTableauRMCRequetesAssociees(), {
      wrapper: encapsulerAvecUtilisateurConnecte(utilisateurAvecDroitCreationProjetActe)
    });
    const ligneTableau = result.current.mapRequetesAssocieesCommeLignesTableau(
      [MOCK_REQUETE_CREATION_ASSOCIEE_RCTC],
      mockRenderCelluleTitulaires
    )[0];

    expect(ligneTableau.onClick).not.toBeUndefined();
    const onClickLigne = ligneTableau.onClick!;
    act(() => {
      onClickLigne();
    });

    expect(result.current.requeteSelectionnee).toEqual(MOCK_REQUETE_CREATION_ASSOCIEE_RCTC);
  });

  test("DOIT sélectionner une requête création RCTD QUAND l'utilisateur a les droits et clique sur une ligne", async () => {
    const { result } = renderHook(() => useTableauRMCRequetesAssociees(), {
      wrapper: encapsulerAvecUtilisateurConnecte(utilisateurAvecDroitCreationProjetActe)
    });
    const ligneTableau = result.current.mapRequetesAssocieesCommeLignesTableau(
      [MOCK_REQUETE_CREATION_ASSOCIEE_RCTD],
      mockRenderCelluleTitulaires
    )[0];

    expect(ligneTableau.onClick).not.toBeUndefined();
    const onClickLigne = ligneTableau.onClick!;
    act(() => {
      onClickLigne();
    });

    expect(result.current.requeteSelectionnee).toEqual(MOCK_REQUETE_CREATION_ASSOCIEE_RCTD);
  });

  test("DOIT sélectionner une requête création RCEXR QUAND l'utilisateur a les droits et clique sur une ligne", async () => {
    const { result } = renderHook(() => useTableauRMCRequetesAssociees(), {
      wrapper: encapsulerAvecUtilisateurConnecte(utilisateurAvecDroitCreationProjetActeEtActeEtabli)
    });
    const ligneTableau = result.current.mapRequetesAssocieesCommeLignesTableau(
      [MOCK_REQUETE_CREATION_ASSOCIEE_RCEXR],
      mockRenderCelluleTitulaires
    )[0];

    expect(ligneTableau.onClick).not.toBeUndefined();
    const onClickLigne = ligneTableau.onClick!;
    act(() => {
      onClickLigne();
    });

    expect(result.current.requeteSelectionnee).toEqual(MOCK_REQUETE_CREATION_ASSOCIEE_RCEXR);
  });

  test("DOIT ne pas permettre de sélectionner une requete QUAND clique sur une ligne requete creation autre que RCEXR, RCTC et RCTD", async () => {
    const { result } = renderHook(() => useTableauRMCRequetesAssociees(), {
      wrapper: encapsulerAvecUtilisateurConnecte(utilisateurAvecDroitCreationProjetActeEtActeEtabli)
    });
    const ligneTableau = result.current.mapRequetesAssocieesCommeLignesTableau([MOCK_REQUETE_MAJ_ASSOCIEE], mockRenderCelluleTitulaires)[0];

    expect(ligneTableau.onClick).not.toBeUndefined();
    const onClickLigne = ligneTableau.onClick!;
    act(() => {
      onClickLigne();
    });

    expect(result.current.requeteSelectionnee).toBeNull();
  });

  test("DOIT ne pas permettre de sélectionner une requete QUAND clique sur une ligne requete mise à jour", async () => {
    const { result } = renderHook(() => useTableauRMCRequetesAssociees(), {
      wrapper: encapsulerAvecUtilisateurConnecte(utilisateurAvecDroitCreationProjetActe)
    });
    const ligneTableau = result.current.mapRequetesAssocieesCommeLignesTableau(
      [MOCK_REQUETE_CREATION_ASSOCIEE_RCETJC],
      mockRenderCelluleTitulaires
    )[0];

    expect(ligneTableau.onClick).not.toBeUndefined();
    const onClickLigne = ligneTableau.onClick!;
    act(() => {
      onClickLigne();
    });

    expect(result.current.requeteSelectionnee).toBeNull();
  });
});
