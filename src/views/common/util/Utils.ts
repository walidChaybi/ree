export function sortObjectWithNumeroOrdre(
  o1: any,
  o2: any,
  propertyName: string
) {
  if (o1[propertyName] < o2[propertyName]) {
    return -1;
  } else if (o1[propertyName] > o2[propertyName]) {
    return 1;
  } else {
    return 0;
  }
}

export function normaliserNomOec(nom: string) {
  let result = nom;
  result = result.normalize("NFC");
  result = result.replace(/[\u0300-\u036F]/g, "");
  result = result.replace(/\s\s/g, " ");
  result = result.replace(/ -/g, "-");
  result = result.replace(/- /g, "-");
  result = result.replace(/\s'/g, "'");
  result = result.replace(/'\s/g, "'");
  result = result.replace("æ", "ae");
  result = result.replace("Æ", "ae");
  result = result.replace("œ", "oe");
  result = result.replace("Œ", "oe");
  result = result.toLowerCase().trim();
  return result;
}
