import mockRequetes from "../data/requetes.json";

export function generateurRequetes() {
  const newDatas = [];
  const model = mockRequetes.data[0];

  const indexDebut = 4;
  const nBMaxRequete = 250;
  const dix = 10;
  const cent = 100;
  const preIdSagaDila = 11000;

  for (let i = indexDebut; i < nBMaxRequete; i++) {
    const dataRequete = { ...model };
    let code = "";
    if (i < dix) {
      code = "00";
    } else if (i >= dix && i < cent) {
      code = "0";
    }

    dataRequete.idRequete = `104b8563-c7f8-4748-9daa-f26558985"${code}${i}`;
    dataRequete.idSagaDila = preIdSagaDila + i;
    newDatas.push(dataRequete);
  }
  mockRequetes.data = mockRequetes.data.concat(newDatas);
  return mockRequetes;
}
