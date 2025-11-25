export const getIdentifiantsDeLaPageCourante = <TData, TIdentifiant>(
  datasDeLaPageCourante: TData[],
  getIdentifiant: (data: TData) => TIdentifiant,
  handleEstDesactive?: (data: TData) => boolean
): TIdentifiant[] => {
  const identifiants: TIdentifiant[] = [];
  if (handleEstDesactive) {
    identifiants.push(
      ...datasDeLaPageCourante.reduce((acc, current) => {
        !handleEstDesactive(current) && acc.push(getIdentifiant(current));
        return acc;
      }, [] as TIdentifiant[])
    );
  } else {
    identifiants.push(...datasDeLaPageCourante.map(data => getIdentifiant(data)));
  }
  return identifiants;
};
