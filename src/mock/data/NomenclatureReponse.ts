export const NOMENCLATURE_REPONSE = [
  {
    id: "de21aede-3fe9-4c65-8c55-ee68c1d33d5d",
    objet: "DIVORCE",
    complementObjet: "MISE_A_JOUR_ETAT_CIVIL",
    libelle: "Séparation de corps/Divorce par jugement en France",
    corpsMail: "Corps Séparation de corps/Divorce par jugement en France"
  },
  {
    id: "da27bb9d-1e08-45da-a0d4-caf11fe64ace",
    objet: "DIVORCE",
    complementObjet: "MISE_A_JOUR_ETAT_CIVIL",
    libelle:
      "Séparation de corps/Divorce enregistré(e) par un notaire français",
    corpsMail:
      "Corps Séparation de corps/Divorce enregistré(e) par un notaire français"
  }
];

export const ReponseAppelNomenclatureReponse = {
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-requete-api/v2/nomenclature/reponse",
  data: NOMENCLATURE_REPONSE,
  errors: []
};
