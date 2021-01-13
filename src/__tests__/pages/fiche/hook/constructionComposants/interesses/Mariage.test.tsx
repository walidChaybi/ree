import React from "react";
import { mount } from "enzyme";
import { Mariage } from "../../../../../../views/pages/fiche/hook/constructionComposants/interesses/Mariage";
import { render } from "@testing-library/react";

test("renders mariage field render correcty", () => {
  const component = mount(
    <Mariage
      villeMariage={"villeMariage"}
      arrondissementMariage={"arrondissementMariage"}
      regionMariage={"regionMariage"}
      paysMariage={"paysMariage"}
      dateMariage={{ annee: "2020", mois: "12", jour: "24" }}
      aletranger={true}
    />
  );
  expect(component).toMatchSnapshot();
});

test("renders mariage : non marié à l'étranger mais avec un pays qui n'est pas la France", () => {
  const { getByText } = render(
    <Mariage
      villeMariage={"villeMariage"}
      arrondissementMariage={"arrondissementMariage"}
      regionMariage={"regionMariage"}
      paysMariage={"paysMariage"}
      dateMariage={{ annee: "2020", mois: "12", jour: "24" }}
      aletranger={false}
    />
  );
  expect(getByText("Mariés")).toBeDefined();

  expect(
    getByText(/devant les autorités consulaires de PaysMariage/i)
  ).toBeDefined();
});
test("renders mariage : la date du mariage est complète", () => {
  const { getByText } = render(
    <Mariage
      villeMariage={"villeMariage"}
      arrondissementMariage={"arrondissementMariage"}
      regionMariage={"regionMariage"}
      paysMariage={"paysMariage"}
      dateMariage={{ annee: "2020", mois: "12", jour: "24" }}
      aletranger={false}
    />
  );
  expect(getByText("24/12/2020")).toBeDefined();
  expect(getByText("Le")).toBeDefined();
});

test("renders mariage : l'arondissement n'est pas donné mais le mariage a lieu en france", () => {
  const { getByText } = render(
    <Mariage
      villeMariage={"villeMariage"}
      arrondissementMariage={""}
      regionMariage={"regionMariage"}
      paysMariage={"france"}
      dateMariage={{ annee: "2020", mois: "12", jour: "24" }}
      aletranger={false}
    />
  );
  expect(getByText("VilleMariage (RegionMariage)")).toBeDefined();
});

test("renders mariage : l'arondissement est donné et le mariage a lieu en france", () => {
  const { getByText } = render(
    <Mariage
      villeMariage={"villeMariage"}
      arrondissementMariage={"08"}
      regionMariage={"regionMariage"}
      paysMariage={"france"}
      dateMariage={{ annee: "2020", mois: "12", jour: "24" }}
      aletranger={false}
    />
  );
  expect(getByText("VilleMariage (Arr.08 RegionMariage)")).toBeDefined();
});

test("renders mariage : le mariage a lieu à l'étranger", () => {
  const { getByText } = render(
    <Mariage
      villeMariage={"Berlin"}
      arrondissementMariage={"08"}
      regionMariage={"regionBerlin"}
      paysMariage={"Allemagne"}
      dateMariage={{ annee: "2020", mois: "12", jour: "24" }}
      aletranger={true}
    />
  );
  expect(getByText("Berlin - RegionBerlin (Allemagne)")).toBeDefined();
});

test("renders mariage : le mariage a lieu à l'étranger mais on ne connais pas pas la région", () => {
  const { getByText } = render(
    <Mariage
      villeMariage={"Berlin"}
      arrondissementMariage={"08"}
      paysMariage={"Allemagne"}
      dateMariage={{ annee: "2020", mois: "12", jour: "24" }}
      aletranger={true}
    />
  );
  expect(getByText("Berlin (Allemagne)")).toBeDefined();
});

test("renders mariage : il n'y a pas le jour de la date", () => {
  const { getByText } = render(
    <Mariage
      villeMariage={"Berlin"}
      arrondissementMariage={"08"}
      paysMariage={"Allemagne"}
      dateMariage={{ annee: "2020", mois: "12" }}
      aletranger={true}
    />
  );
  expect(getByText("12/2020")).toBeDefined();
  expect(getByText("En")).toBeDefined();
});

test("renders mariage : il n'y a pas le jour et le mois de la date", () => {
  const { getByText } = render(
    <Mariage
      villeMariage={"Berlin"}
      arrondissementMariage={"08"}
      paysMariage={"Allemagne"}
      dateMariage={{ annee: "2020" }}
      aletranger={true}
    />
  );
  expect(getByText("2020")).toBeDefined();
  expect(getByText("En")).toBeDefined();
});
