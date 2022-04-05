import { IResultatRMCActe } from "../../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IChoixActionDelivranceProps } from "../../../../../../views/pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/actions/ChoixAction";
import { controleCoherenceUnActeSelectionne } from "../../../../../../views/pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/actions/MenuDelivrerUtil";

test("controleCoherenceUnActeSelectionne", () => {
  const liste = [
    {
      idActe: "1",
      type: "INCONNU"
    } as unknown as IResultatRMCActe
  ];
  const mapTitu = new Map<string, number>([["1", 1]]);

  expect(
    controleCoherenceUnActeSelectionne(
      0,
      liste,
      {
        requete: {},
        nbrTitulairesActe: mapTitu
      } as React.PropsWithChildren<IChoixActionDelivranceProps>,
      jest.fn(),
      [{}],
      [{}]
    )
  ).toStrictEqual([
    "Il n'y a pas de corps disponible pour l'acte sélectionné, sa délivrance n'est pas possible à ce jour."
  ]);
});
