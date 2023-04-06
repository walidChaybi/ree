import {
  getLogin,
  getTousLesUtilisateurs,
  getToutesLesEntiteRattachement,
  getUtilisateurs
} from "@api/appels/agentApi";

test("getLogin utilisateur", () => {
  getLogin().then((result: any) => {
    expect(result).toBeDefined();
    expect(result.body.headers.id_sso).toBe("idSSOConnectedUser");
  });
});

test("getUtilisateur", () => {
  getUtilisateurs().then((result: any) => {
    expect(result).toBeDefined();
  });
});

test("getTousLesUtilisateurs", () => {
  getTousLesUtilisateurs("0-200").then((result: any) => {
    expect(result).toBeDefined();
  });
});

test("getToutesLesEntiteRattachement", () => {
  getToutesLesEntiteRattachement().then((result: any) => {
    expect(result).toBeDefined();
  });
});


