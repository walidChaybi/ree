import {
  NOM,
  PRENOM,
  RAISON_SOCIALE
} from "@composant/formulaire/ConstantesNomsForm";
import { IQualiteRequerant } from "@model/requete/IQualiteRequerant";
import { Qualite } from "@model/requete/enum/Qualite";
import { TypeInstitutionnel } from "@model/requete/enum/TypeInstitutionnel";
import { TypeMandataireReq } from "@model/requete/enum/TypeMandataireReq";
import RequerantCourrierForm, {
  IRequerantCourrierFormProps,
  RequerantCourrierFormValidationSchema
} from "@pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/contenuForm/sousFormulaires/RequerantCourrierForm";
import { render, screen, waitFor } from "@testing-library/react";
import { getLibelle } from "@util/Utils";
import { Formulaire } from "@widget/formulaire/Formulaire";
import { SubFormProps } from "@widget/formulaire/utils/FormUtil";
import React from "react";
import { expect, test, vi } from "vitest";

const HookRequerantCourrierForm: React.FC<{
  qualiteRequerant: IQualiteRequerant;
}> = props => {
  const requerantCourrierFormProps = {
    requerant: {
      id: "a048f5c3-c8a4-4690-be31-ddf3171d7b34",
      qualiteRequerant: props.qualiteRequerant
    },
    titre: getLibelle("Identité du requérant"),
    formulaireReduit: true
  } as SubFormProps & IRequerantCourrierFormProps;

  const requerantCourrierFormDefaultValues = {
    [RAISON_SOCIALE]: "",
    [NOM]: "",
    [PRENOM]: ""
  };

  return (
    <Formulaire
      formDefaultValues={requerantCourrierFormDefaultValues}
      formValidationSchema={RequerantCourrierFormValidationSchema}
      onSubmit={vi.fn()}
    >
      <RequerantCourrierForm {...requerantCourrierFormProps} />
    </Formulaire>
  );
};

test("DOIT rendre les champs 'Nom' et 'Prenom' QUAND le requerant est de qualite 'PARTICULIER'", () => {
  render(
    <HookRequerantCourrierForm
      qualiteRequerant={{
        qualite: Qualite.PARTICULIER,
        particulier: { nomUsage: "nomUsage" }
      }}
    />
  );

  waitFor(() => {
    expect(screen.queryByText("Nom")).toBeDefined();
    expect(screen.queryByText("Prénom")).toBeDefined();
    expect(screen.queryByText("Raison sociale")).not.toBeDefined();
  });
});

test("DOIT rendre les champs 'Raison sociale', 'Nom' et 'Prenom' QUAND le requerant est de qualite 'MANDATAIRE_HABILITE'", () => {
  render(
    <HookRequerantCourrierForm
      qualiteRequerant={{
        qualite: Qualite.MANDATAIRE_HABILITE,
        mandataireHabilite: {
          type: TypeMandataireReq.AVOCAT,
          raisonSociale: "raisonSociale"
        }
      }}
    />
  );

  waitFor(() => {
    expect(screen.queryByText("Nom")).toBeDefined();
    expect(screen.queryByText("Prénom")).toBeDefined();
    expect(screen.queryByText("Raison sociale")).toBeDefined();
  });
});

test("DOIT rendre les champs 'Raison sociale', 'Nom' et 'Prenom' QUAND le requerant est de qualite 'INSTITUTIONNEL'", () => {
  render(
    <HookRequerantCourrierForm
      qualiteRequerant={{
        qualite: Qualite.INSTITUTIONNEL,
        institutionnel: {
          type: TypeInstitutionnel.AMBASSADE,
          nomInstitution: "nomInstitution"
        }
      }}
    />
  );

  waitFor(() => {
    expect(screen.queryByText("Nom")).toBeDefined();
    expect(screen.queryByText("Prénom")).toBeDefined();
    expect(screen.queryByText("Raison sociale")).toBeDefined();
  });
});

test("DOIT rendre les champs 'Raison sociale', 'Nom' et 'Prenom' QUAND le requerant est de qualite 'AUTRE_PROFESSIONNEL'", () => {
  render(
    <HookRequerantCourrierForm
      qualiteRequerant={{
        qualite: Qualite.AUTRE_PROFESSIONNEL,
        autreProfessionnel: {
          nature: "autreProfessionnel",
          raisonSociale: "raisonSociale"
        }
      }}
    />
  );

  waitFor(() => {
    expect(screen.queryByText("Nom")).toBeDefined();
    expect(screen.queryByText("Prénom")).toBeDefined();
    expect(screen.queryByText("Raison sociale")).toBeDefined();
  });
});
