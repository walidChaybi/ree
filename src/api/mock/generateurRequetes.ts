const mockRequetes = require("./requetes.json");

export function generateurRequetes() {
  const newDatas = [];
  const model = mockRequetes.data[0];
  for (let i = 4; i < 250; i++) {
    const dataRequete = { ...model };
    let code = "";
    if (i < 10) {
      code = "00";
    } else if (i >= 10 && i < 100) {
      code = "0";
    }
    code = code + i;
    dataRequete.idRequete = "104b8563-c7f8-4748-9daa-f26558985" + code;
    dataRequete.idSagaDila = 11000 + i;
    newDatas.push(dataRequete);
  }
  mockRequetes.data = mockRequetes.data.concat(newDatas);
  return mockRequetes;
}
