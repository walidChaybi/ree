import { ACQUISITION } from "@composant/formulaire/ConstantesNomsForm";
import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import { requeteCreationEtablissementSaisieProjet } from "@mock/data/requeteCreationEtablissement";
import AcquisitionForm from "@pages/requeteCreation/apercuRequete/etablissement/apercuSaisieDeProjet/contenu/saisiePostulantForm/form/AcquisitionForm";
import { mappingTitulairesVersFormulairePostulant } from "@pages/requeteCreation/apercuRequete/etablissement/apercuSaisieDeProjet/contenu/saisiePostulantForm/mapping/mappingTitulaireVersFormulairePostulant";
import { PostulantValidationSchema } from "@pages/requeteCreation/apercuRequete/etablissement/apercuSaisieDeProjet/contenu/saisiePostulantForm/validation/PostulantValidationSchema";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Formulaire } from "@widget/formulaire/Formulaire";

function afficheComposantAcquisitionSaisieDeProjet(
  afficherDateDecret: boolean
) {
  const requete = mappingRequeteCreation(
    requeteCreationEtablissementSaisieProjet
  );
  const titulaires = requete.titulaires;

  render(
    <Formulaire
      formDefaultValues={mappingTitulairesVersFormulairePostulant(
        titulaires![0],
        titulaires![1],
        titulaires![2],
        requeteCreationEtablissementSaisieProjet.nature
      )}
      formValidationSchema={PostulantValidationSchema}
      onSubmit={() => {}}
    >
      <AcquisitionForm
        nom={ACQUISITION}
        afficherDateDecret={afficherDateDecret}
      />
    </Formulaire>
  );
}

test("DOIT afficher la nature et la date decret QUAND on affiche tous les champs", async () => {
  afficheComposantAcquisitionSaisieDeProjet(true);

  const champNature = screen.getByLabelText("Nature") as HTMLInputElement;
  const champJourDecret = screen.getByText("Date du décret")
    .nextElementSibling as HTMLInputElement;
  const champMoisDecret = champJourDecret.nextElementSibling
    ?.nextElementSibling as HTMLInputElement;
  const champAnneeDecret = champMoisDecret.nextElementSibling
    ?.nextElementSibling as HTMLInputElement;

  await waitFor(() => {
    expect(champNature.value).toBe("NATURALISATION");
    expect(champJourDecret.value).toBe("14");
    expect(champMoisDecret.value).toBe("07");
    expect(champAnneeDecret.value).toBe("2017");
    expect(screen.queryByLabelText("Ajouter date de décret")).toBeNull();
  });
});

test("DOIT afficher le champ date du decret QUAND on clique sur le bouton ajouter une date", async () => {
  afficheComposantAcquisitionSaisieDeProjet(false);

  await waitFor(() => {
    expect(screen.queryByText("Date du décret")).toBeNull();
  });

  fireEvent.click(screen.getByText("Ajouter date de décret"));

  await waitFor(() => {
    expect(screen.getByText("Date du décret")).toBeDefined();
    expect(screen.queryByLabelText("Ajouter date de décret")).toBeNull();
  });
});
