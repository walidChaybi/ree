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
