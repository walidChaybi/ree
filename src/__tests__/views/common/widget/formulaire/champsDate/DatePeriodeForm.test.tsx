import { Periode } from "@model/requete/enum/Periode";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Formulaire } from "@widget/formulaire/Formulaire";
import DatePeriodeForm, {
  DatePeriodeFormProps
} from "@widget/formulaire/champsDate/DatePeriodeForm";
import { expect, test } from "vitest";

const DatePeriodeFormHook: React.FC = () => {
  const valeurFormik = {
    formDefaultValues: {
      dateMariage: {
        periode: Periode.getKey(Periode.ENTRE_LE),
        debut: { jour: "01", mois: "06", annee: "2015" },
        fin: { jour: "20", mois: "12", annee: "2022" }
      }
    },
    formValidationSchema: null,
    onSubmit: () => {}
  };
  const datePeriodeFormProps = {
    label: "Date de mariage",
    nomDate: "dateMariage",
    choixPeriodes: Periode.getDateEnumsAsOptions()
  } as DatePeriodeFormProps;

  return (
    <Formulaire {...valeurFormik}>
      <DatePeriodeForm {...datePeriodeFormProps}></DatePeriodeForm>
    </Formulaire>
  );
};

test("DOIT afficher qu'une seule date QUAND il ne s'agit pas d'une période", () => {
  afficherEtChangerPeriode(Periode.getKey(Periode.EN));
  waitFor(() => {
    expect(screen.queryByLabelText("dateMariage.debut.jour")).toBeDefined();
    expect(screen.queryByLabelText("dateMariage.fin.jour")).not.toBeDefined();
  });
});

test("DOIT afficher les deux dates QUAND il s'agit d'une période", () => {
  afficherEtChangerPeriode(Periode.getKey(Periode.ENTRE));
  waitFor(() => {
    expect(screen.queryByLabelText("dateMariage.debut.jour")).toBeDefined();
    expect(screen.queryByLabelText("dateMariage.fin.jour")).toBeDefined();
  });
});

function afficherEtChangerPeriode(valeur: string) {
  render(<DatePeriodeFormHook />);
  const selectPeriode = screen.getByLabelText("Date de mariage");
  waitFor(() => {
    expect(selectPeriode).toBeDefined();
  });
  fireEvent.change(selectPeriode, { target: { value: valeur } });
}
