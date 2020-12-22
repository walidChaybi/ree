export function getFicheTitle(
  categorie: string,
  annee: string,
  numero: string,
  nom1: string,
  nom2?: string
) {
  return `${categorie.toLocaleUpperCase()} - ${getNom(
    nom1,
    nom2
  )} - N° ${annee} - ${numero}`;
}

function getNom(nom1: string, nom2?: string) {
  let nom = `${nom1.toLocaleUpperCase()}`;
  if (nom2 != null && nom2 !== "") {
    nom += ` et ${nom2.toLocaleUpperCase()}`;
  }
  return nom;
}
