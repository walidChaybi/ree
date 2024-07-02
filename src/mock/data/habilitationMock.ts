export const MockHabilitation = {
  habilitations: [
    {
      idHabilitation: "idHabilitation",
      profil: {
        idProfil: "idProfil",
        nom: "nom",
        profilDroit: [
          {
            droit: {
              idDroit: "idDroit",
              nom: "CONSULTER"
            }
          },
          {
            droit: {
              idDroit: "idDroit",
              nom: "ATTRIBUER"
            }
          }
        ]
      },
      perimetre: {
        id: "idPerimetre",
        description: "descPérimètre",
        estActif: true,
        listePays: "paysPérimètre",
        nom: "TOUS_REGISTRES",
        type: ["idlisteIdTypeRegistre"]
      }
    }
  ]
};
