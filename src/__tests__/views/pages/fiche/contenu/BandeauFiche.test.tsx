import { IBandeauFiche } from "@model/etatcivil/fiche/IBandeauFiche";
import { BandeauFiche } from "@pages/fiche/contenu/BandeauFiche";
import { BandeauFicheActeNumero } from "@pages/fiche/contenu/BandeauFicheActeNumero";
import { BandeauFicheRcRcaPacsNumero } from "@pages/fiche/contenu/BandeauFicheRcRcaPacsNumero";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { bandeauActe } from "../../../../mock/data/ficheEtBandeau/ficheActe";
import DATA_FICHE from "../../../../mock/data/ficheEtBandeau/ficheRC";

test("renders du bandeau d'une fiche RC", () => {
  function getElementNumeroLigne() {
    return <BandeauFicheRcRcaPacsNumero dataBandeau={DATA_FICHE.dataBandeau}></BandeauFicheRcRcaPacsNumero>;
  }
  const component = render(
    <>
      <BandeauFiche
        dataBandeau={DATA_FICHE.dataBandeau as IBandeauFiche}
        elementNumeroLigne={getElementNumeroLigne()}
      ></BandeauFiche>
    </>
  );
  expect(component.getByText("RC N° 2018 - 56533"));
});

test("renders du bandeau d'une fiche Acte", () => {
  function getElementNumeroLigne() {
    return <BandeauFicheActeNumero dataBandeau={DATA_FICHE.dataBandeau}></BandeauFicheActeNumero>;
  }

  const component = render(
    <BandeauFiche
      dataBandeau={bandeauActe}
      elementNumeroLigne={getElementNumeroLigne()}
    ></BandeauFiche>
  );

  expect(component.getByText("CSL.DX.NA.T.414.681"));
});
