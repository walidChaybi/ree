import {
    estSuperieurA500Caracteres,
    getPrenomEtNom
} from "@pages/requeteCreation/apercuRequete/etablissement/composants/action/ListeActions";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { ConfirmationPopinAvecMessage } from "@widget/popin/ConfirmationPopinAvecMessage";
import React, { useEffect, useState } from "react";
import { userDroitnonCOMEDEC } from "../../../../mock/data/connectedUserAvecDroit";
import { LISTE_UTILISATEURS } from "../../../../mock/data/ListeUtilisateurs";
beforeAll(() => {
  storeRece.listeUtilisateurs = LISTE_UTILISATEURS;
});

interface HookConsummerConfirmationPopinAvecMessageProps {
  valider?: any;
  fermerPopin?: any;
  title?: string;
  messageErreur?: string;
  message?: string;
  nomPrenom?: any;
}
const HookConsummerConfirmationPopin: React.FC<
  HookConsummerConfirmationPopinAvecMessageProps
> = (props: any) => {
  const [display, setDisplay] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState(props.message);
  const [messageErreur, setMessageErreur] = useState<string>(
    props.messageErreur
  );

  useEffect(() => {
    if (message === "") setDisabled(true);
    else setDisabled(false);
  }, [message]);

  const handleChangeText = (e: any) => {
    if (estSuperieurA500Caracteres(e.target.value)) {
      return setMessageErreur("500 caractères maximum");
    }
    setMessage(e.target.value);
  };

  const fermerPopin = () => {
    setDisplay(false);
    setMessage("");
    setDisabled(true);
  };

  return (
    <ConfirmationPopinAvecMessage
      isOpen={display}
      handleChangeText={handleChangeText}
      title={props.title}
      message={message}
      messageErreur={messageErreur}
      boutons={[
        {
          label: "Annuler",
          action: () => {
            fermerPopin();
            props.fermerPopin();
          }
        },
        {
          disabled: disabled,
          isDisabled: true,
          label: "Valider",
          action: () => {
            props.valider();
            setDisplay(false);
            setMessage("");
            setDisabled(true);
          }
        }
      ]}
    />
  );
};

describe("Popin avec confirmation et message", () => {
  test("Doit désactiver le bouton d'envoi si le message est vide et activer si le message n'est pas vide", async () => {
    const valider = jest.fn();

    render(<HookConsummerConfirmationPopin valider={valider} message={""} />);

    let boutonValiderMessage;
    await waitFor(() => {
      boutonValiderMessage = screen.getByText("Valider");

      expect(boutonValiderMessage).toBeDisabled();
    });

    const textArea = screen.getByPlaceholderText("Saisir un message");
    fireEvent.change(textArea, {
      target: { value: "Je suis un message" }
    });

    expect(boutonValiderMessage).not.toBeDisabled();
  });

  test("Attendu la popin ConfirmationPopinAvecMessage, le bouton 'Annuler' fonctionne correctement", async () => {
    const fermerPopin = jest.fn();

    render(<HookConsummerConfirmationPopin fermerPopin={fermerPopin} />);

    let boutonAnnuler: HTMLElement;
    await waitFor(() => {
      boutonAnnuler = screen.getByText("Annuler");
      expect(boutonAnnuler).toBeInTheDocument();
    });

    fireEvent.click(boutonAnnuler!);

    await waitFor(() => {
      expect(fermerPopin).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      //   expect(setState).toHaveBeenCalledWith(false);
    });

    await waitFor(() => {
      expect(boutonAnnuler).not.toBeInTheDocument();
    });
  });

  test("Attendu la popin ConfirmationPopinAvecMessage, le bouton 'Valider' fonctionne correctement", async () => {
    const envoyerMessageRetourSDANF = jest.fn();

    render(
      <HookConsummerConfirmationPopin valider={envoyerMessageRetourSDANF} />
    );

    let boutonValider: HTMLElement;
    await waitFor(() => {
      boutonValider = screen.getByText("Valider");
      expect(boutonValider).toBeInTheDocument();
    });

    await waitFor(() => {
      const textArea = screen.getByPlaceholderText("Saisir un message");
      fireEvent.change(textArea, {
        target: { value: "Je suis un message" }
      });
    });

    fireEvent.click(boutonValider!);

    await waitFor(() => {
      expect(envoyerMessageRetourSDANF).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(boutonValider).not.toBeInTheDocument();
    });
  });

  test("Doit afficher le titre quand il est présent dans les props", async () => {
    render(<HookConsummerConfirmationPopin title={"Je suis un titre"} />);

    await waitFor(() => {
      expect(screen.getByText("Je suis un titre")).toBeDefined();
    });
  });

  test("Doit afficher le message d'erreur quand il est présent", async () => {
    render(
      <HookConsummerConfirmationPopin
        messageErreur={"Je suis un message d'erreur"}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("Je suis un message d'erreur")).toBeDefined();
    });
  });

  test("Doit afficher un message d'erreur si le message est supérieur à 500 caractères", async () => {
    render(<HookConsummerConfirmationPopin />);

    const message =
      "Lorem Ipsum is simply dummy text of the printing and typesddetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was populardddd";

    await waitFor(() => {
      const textArea = screen.getByPlaceholderText("Saisir un message");
      fireEvent.change(textArea, {
        target: { value: message }
      });
    });

    await waitFor(() => {
      expect(screen.getByText("500 caractères maximum")).toBeDefined();
    });
  });

  test("Doit activer le bouton de soumission si le message SDANF n'est pas vide", async () => {
    render(<HookConsummerConfirmationPopin message={"Message"} />);

    let boutonValiderMessage: HTMLElement;
    await waitFor(() => {
      boutonValiderMessage = screen.getByText("Valider");
    });

    await waitFor(() => {
      expect(boutonValiderMessage).not.toBeDisabled();
    });
  });

  test("Doit vider l'area après l'envoi d'un message", async () => {
    const envoyerMessageRetourSDANF = jest.fn();

    render(
      <HookConsummerConfirmationPopin valider={envoyerMessageRetourSDANF} />
    );

    let boutonValider: HTMLElement;
    let textArea: HTMLAreaElement;
    await waitFor(() => {
      boutonValider = screen.getByText("Valider");
      expect(boutonValider).toBeInTheDocument();
    });

    await waitFor(() => {
      textArea = screen.getByPlaceholderText("Saisir un message");
      fireEvent.change(textArea, {
        target: { value: "Je suis un message" }
      });
    });

    fireEvent.click(boutonValider!);

    await waitFor(() => {
      expect(envoyerMessageRetourSDANF).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(textArea).toHaveValue("");
      expect(boutonValider).toBeDisabled();
    });
  });

  test("Doit retourner le nom et pronom de l'OEC", async () => {
    storeRece.utilisateurCourant = userDroitnonCOMEDEC;
    // jest.mock(
    //   "../../../../views/pages/requeteCreation/EspaceCreation/apercuReqCreation/components/ListeActions",
    //   () => ({
    //     getPrenomEtNom: jest.fn()
    //   })
    // );

    render(<HookConsummerConfirmationPopin />);

    await waitFor(() => {
      expect(storeRece.utilisateurCourant?.prenom).toBe("prenomConnectedUser");
      expect(storeRece.utilisateurCourant?.nom).toBe("nomConnectedUser");
      expect(getPrenomEtNom()).toBe("prenomConnectedUser nomConnectedUser");
    });
  });
});


