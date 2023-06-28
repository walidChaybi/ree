import { Periode } from "@model/requete/enum/Periode";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Formulaire } from "@widget/formulaire/Formulaire";
import DatePeriodeForm, {
  DatePeriodeFormProps
} from "@widget/formulaire/champsDate/DatePeriodeForm";

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

test("DOIT afficher qu'une seule date QUAND il ne s'agit pas d'une période", async () => {
  await afficherEtChangerPeriode(Periode.getKey(Periode.EN));
  await waitFor(() => {
    expect(
      screen.queryByLabelText("dateMariage.debut.jour")
    ).toBeInTheDocument();
    expect(
      screen.queryByLabelText("dateMariage.fin.jour")
    ).not.toBeInTheDocument();
  });
});

test("DOIT afficher les deux dates QUAND il s'agit d'une période", async () => {
  await afficherEtChangerPeriode(Periode.getKey(Periode.ENTRE));
  await waitFor(() => {
    expect(
      screen.queryByLabelText("dateMariage.debut.jour")
    ).toBeInTheDocument();
    expect(screen.queryByLabelText("dateMariage.fin.jour")).toBeInTheDocument();
  });
});

async function afficherEtChangerPeriode(valeur: string) {
  render(<DatePeriodeFormHook />);
  const selectPeriode = screen.getByLabelText("Date de mariage");
  await waitFor(() => {
    expect(selectPeriode).toBeDefined();
  });
  fireEvent.change(selectPeriode, { target: { value: valeur } });
}
