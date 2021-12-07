import {
  descendingComparator,
  descendingDateComparator,
  getComparator,
  getPaginatedData,
  processDataStorting,
  stableSort
} from "../../../../views/common/widget/tableau/TableUtils";

interface IData {
  id: number;
  prenom: string;
  dateNaissance: string;
}

const data: IData[] = [
  {
    id: 1,
    prenom: "Diego",
    dateNaissance: "26/03/1986"
  },
  {
    id: 2,
    prenom: "Thiago",
    dateNaissance: "26/03/1986"
  },
  {
    id: 11,
    prenom: "Roger",
    dateNaissance: "07/11/1972"
  },
  {
    id: 3,
    prenom: "Virginie",
    dateNaissance: "17/07/1971"
  }
];

const bigData: IData[] = [
  {
    id: 1,
    prenom: "Diego",
    dateNaissance: "26/03/1986"
  },
  {
    id: 2,
    prenom: "Thiago",
    dateNaissance: "26/03/1986"
  },
  {
    id: 11,
    prenom: "Roger",
    dateNaissance: "07/11/1972"
  },
  {
    id: 3,
    prenom: "Virginie",
    dateNaissance: "17/07/1971"
  },
  {
    id: 4,
    prenom: "Mélodie",
    dateNaissance: "17/07/2004"
  },
  {
    id: 5,
    prenom: "Francis",
    dateNaissance: "23/11/1954"
  },
  {
    id: 6,
    prenom: "André",
    dateNaissance: "23/11/1951"
  },
  {
    id: 7,
    prenom: "Michel",
    dateNaissance: "08/07/1964"
  },
  {
    id: 8,
    prenom: "Fabienne",
    dateNaissance: "14/08/1974"
  },
  {
    id: 9,
    prenom: "Hector",
    dateNaissance: "04/01/1999"
  },
  {
    id: 10,
    prenom: "Paris",
    dateNaissance: "04/03/2008"
  }
];

test("Comparaison de deux objets par date", () => {
  expect(
    descendingDateComparator<IData>(
      data[0],
      data[1],
      "dateNaissance" as keyof IData
    )
  ).toBe(0);
  expect(
    descendingDateComparator<IData>(
      data[0],
      data[2],
      "dateNaissance" as keyof IData
    )
  ).toBe(-1);
  expect(
    descendingDateComparator<IData>(
      data[3],
      data[2],
      "dateNaissance" as keyof IData
    )
  ).toBe(1);
});

test("Comparaison de deux objets par date par verif type", () => {
  expect(
    descendingComparator<IData>(
      data[0],
      data[1],
      "dateNaissance" as keyof IData
    )
  ).toBe(0);
  expect(
    descendingComparator<IData>(
      data[0],
      data[2],
      "dateNaissance" as keyof IData
    )
  ).toBe(-1);
  expect(
    descendingComparator<IData>(
      data[3],
      data[2],
      "dateNaissance" as keyof IData
    )
  ).toBe(1);
});

test("Comparaison de deux objets par nombre par verif type", () => {
  expect(
    descendingComparator<IData>(data[0], data[1], "id" as keyof IData)
  ).toBe(1);
  expect(
    descendingComparator<IData>(data[3], data[0], "id" as keyof IData)
  ).toBe(-1);
  expect(
    descendingComparator<IData>(data[0], data[2], "id" as keyof IData)
  ).toBe(1);
  expect(
    descendingComparator<IData>(data[3], data[2], "id" as keyof IData)
  ).toBe(1);
  expect(
    descendingComparator<IData>(data[0], data[0], "id" as keyof IData)
  ).toBe(0);
});

test("Comparaison de deux objets par string par verif type", () => {
  expect(
    descendingComparator<IData>(data[0], data[1], "prenom" as keyof IData)
  ).toBe(1);
  expect(
    descendingComparator<IData>(data[0], data[2], "prenom" as keyof IData)
  ).toBe(1);
  expect(
    descendingComparator<IData>(data[0], data[3], "prenom" as keyof IData)
  ).toBe(1);
  expect(
    descendingComparator<IData>(data[1], data[0], "prenom" as keyof IData)
  ).toBe(-1);
  expect(
    descendingComparator<IData>(data[2], data[0], "prenom" as keyof IData)
  ).toBe(-1);
  expect(
    descendingComparator<IData>(data[3], data[0], "prenom" as keyof IData)
  ).toBe(-1);
  expect(
    descendingComparator<IData>(data[0], data[0], "prenom" as keyof IData)
  ).toBe(0);
  expect(
    descendingComparator<IData>(data[3], data[3], "prenom" as keyof IData)
  ).toBe(0);
});

test("tri d'un array par prenom asc", () => {
  const dataTriee = stableSort(data, getComparator("ASC", "prenom"));
  expect(dataTriee[0].prenom).toBe("Diego");
  expect(dataTriee[1].prenom).toBe("Roger");
  expect(dataTriee[2].prenom).toBe("Thiago");
  expect(dataTriee[3].prenom).toBe("Virginie");
});

test("tri d'un array par prenom desc", () => {
  const dataTriee = stableSort(data, getComparator("DESC", "prenom"));
  expect(dataTriee[0].prenom).toBe("Virginie");
  expect(dataTriee[1].prenom).toBe("Thiago");
  expect(dataTriee[2].prenom).toBe("Roger");
  expect(dataTriee[3].prenom).toBe("Diego");
});

test("tri d'un array par id asc", () => {
  const dataTriee = stableSort(data, getComparator("ASC", "id"));
  expect(dataTriee[0].id).toBe(1);
  expect(dataTriee[1].id).toBe(2);
  expect(dataTriee[2].id).toBe(3);
  expect(dataTriee[3].id).toBe(11);
});

test("tri d'un array par id desc", () => {
  const dataTriee = stableSort(data, getComparator("DESC", "id"));
  expect(dataTriee[0].id).toBe(11);
  expect(dataTriee[1].id).toBe(3);
  expect(dataTriee[2].id).toBe(2);
  expect(dataTriee[3].id).toBe(1);
});

test("tri d'un array par dateNaissance asc", () => {
  const dataTriee = stableSort(data, getComparator("ASC", "dateNaissance"));
  expect(dataTriee[0].dateNaissance).toBe("17/07/1971");
  expect(dataTriee[1].dateNaissance).toBe("07/11/1972");
  expect(dataTriee[2].dateNaissance).toBe("26/03/1986");
  expect(dataTriee[3].dateNaissance).toBe("26/03/1986");
});

test("tri d'un array par dateNaissance desc", () => {
  const dataTriee = stableSort(data, getComparator("DESC", "dateNaissance"));
  expect(dataTriee[0].dateNaissance).toBe("26/03/1986");
  expect(dataTriee[1].dateNaissance).toBe("26/03/1986");
  expect(dataTriee[2].dateNaissance).toBe("07/11/1972");
  expect(dataTriee[3].dateNaissance).toBe("17/07/1971");
});

test("tri d'un array par dateNaissance desc - processDataSorting", () => {
  const dataTriee = processDataStorting(data, "DESC", "dateNaissance");
  expect(dataTriee[0].dateNaissance).toBe("26/03/1986");
  expect(dataTriee[1].dateNaissance).toBe("26/03/1986");
  expect(dataTriee[2].dateNaissance).toBe("07/11/1972");
  expect(dataTriee[3].dateNaissance).toBe("17/07/1971");
});

test("tri d'un array par dateNaissance asc - processDataSorting", () => {
  const dataTriee = processDataStorting(data, "ASC", "dateNaissance");
  expect(dataTriee[3].dateNaissance).toBe("26/03/1986");
  expect(dataTriee[2].dateNaissance).toBe("26/03/1986");
  expect(dataTriee[1].dateNaissance).toBe("07/11/1972");
  expect(dataTriee[0].dateNaissance).toBe("17/07/1971");
});

test("tri et pagination d'un array par prenom asc", () => {
  const dataTriee = processDataStorting(bigData, "ASC", "prenom");
  let paginatedData = getPaginatedData<IData>(dataTriee, 0, 2, 100);
  expect(paginatedData[0].prenom).toBe("André");
  expect(paginatedData[1].prenom).toBe("Diego");
  paginatedData = getPaginatedData<IData>(dataTriee, 1, 2, 100);
  expect(paginatedData[0].prenom).toBe("Fabienne");
  expect(paginatedData[1].prenom).toBe("Francis");
});
