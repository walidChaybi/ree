import { PARENT1, PARENTS } from "@composant/formulaire/ConstantesNomsForm";
import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import { requeteCreationEtablissementSaisieProjet } from "@mock/data/requeteCreationEtablissement";
import ParentForm from "@pages/requeteCreation/apercuRequete/etablissement/apercuSaisieDeProjet/contenu/saisiePostulantForm/form/ParentForm";
import { mappingTitulairesVersSaisieProjetPostulant } from "@pages/requeteCreation/apercuRequete/etablissement/apercuSaisieDeProjet/contenu/saisiePostulantForm/mapping/mappingTitulaireVersFormulairePostulant";
import { PostulantValidationSchema } from "@pages/requeteCreation/apercuRequete/etablissement/apercuSaisieDeProjet/contenu/saisiePostulantForm/validation/PostulantValidationSchema";
import { render, screen, waitFor } from "@testing-library/react";
import { Formulaire } from "@widget/formulaire/Formulaire";

const titulaires = mappingRequeteCreation(
  requeteCreationEtablissementSaisieProjet
).titulaires;

function afficheComposantSaisiePostulantForm(): void {
  render(
    <Formulaire
      formDefaultValues={mappingTitulairesVersSaisieProjetPostulant(
        titulaires![0],
        titulaires![1],
        titulaires![2]
      )}
      formValidationSchema={PostulantValidationSchema}
      onSubmit={() => {}}
      className="FormulairePostulant"
    >
      <ParentForm nom={`${PARENTS}.${PARENT1}`} parent={titulaires![1]} />
    </Formulaire>
  );
}

describe("Test du bloc Parent de l'onglet Postulant", () => {
  test("DOIT afficher et reseigner les champs des blocs Parent QUAND le formulaire est affiché", async () => {
    afficheComposantSaisiePostulantForm();

    const champNomParent = screen.getByLabelText("Nom") as HTMLInputElement;
    const champPrenomParent = screen.getByLabelText(
      "Prénom"
    ) as HTMLInputElement;
    const champSexeParent = screen.getByLabelText(
      "Masculin"
    ) as HTMLInputElement;
    const champJourNaissanceParent = screen.getByText("Date de naissance")
      .nextElementSibling as HTMLInputElement;
    const champMoisNaissanceParent = champJourNaissanceParent.nextElementSibling
      ?.nextElementSibling as HTMLInputElement;
    const champAnneeNaissanceParent = champMoisNaissanceParent
      .nextElementSibling?.nextElementSibling as HTMLInputElement;
    const champVilleParent = screen.getByLabelText("Ville") as HTMLInputElement;

    const champEtatRegionParent = screen.getByLabelText(
      "Etat, canton, province"
    ) as HTMLInputElement;

    const champPaysParent = screen.getByLabelText("Pays") as HTMLInputElement;

    await waitFor(() => {
      expect(champNomParent.value).toBe("CHAMPNOMNAISSANCEPARENT1");
      expect(champPrenomParent.value).toBe("Champprenomparent1");
      expect(champSexeParent.checked).toBeTruthy();
      expect(champJourNaissanceParent.value).toBe("01");
      expect(champMoisNaissanceParent.value).toBe("01");
      expect(champAnneeNaissanceParent.value).toBe("2001");
      expect(champVilleParent.value).toBe("Champvillenaissanceparent1");
      expect(champEtatRegionParent.value).toBe("");
      expect(champPaysParent.value).toBe("Champpaysnaissanceparent1");
    });
  });
});
