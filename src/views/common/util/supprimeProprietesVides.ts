export function supprimeProprietesVides(objet: any) {
  let res: any;
  let indiceTableau = 0;
  if (Array.isArray(objet)) {
    res = [];
  } else {
    res = {};
  }
  for (const key in objet) {
    if (typeof objet[key] === "object") {
      indiceTableau = traiterObjet(objet, key, indiceTableau, res);
    } else if (objet[key] !== "") {
      indiceTableau = traiterNonVide(objet, key, indiceTableau, res);
    }
  }
  if (
    typeof res === "object" &&
    !Array.isArray(res) &&
    Object.keys(res).length === 0
  ) {
    res = null;
  }
  return res;
}

function traiterObjet(objet: any, key: any, indiceTableau: number, res: any) {
  const sub = supprimeProprietesVides(objet[key]);
  if (sub) {
    if (Array.isArray(objet)) {
      res[indiceTableau] = sub;
      indiceTableau++;
    } else res[key] = sub;
  }
  return indiceTableau;
}

function traiterNonVide(objet: any, key: any, indiceTableau: number, res: any) {
  if (Array.isArray(objet)) {
    res[indiceTableau] = objet[key];
    indiceTableau++;
  } else {
    res[key] = objet[key];
  }
  return indiceTableau;
}
