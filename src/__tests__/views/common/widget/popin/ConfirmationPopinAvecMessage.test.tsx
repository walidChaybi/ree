import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { estSuperieurA500Caracteres } from "@util/Utils";
import { ConfirmationPopinAvecMessage } from "@widget/popin/ConfirmationPopinAvecMessage";
import React, { useEffect, useState } from "react";
import { describe, expect, test, vi } from "vitest";

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
  test("Doit désactiver le bouton d'envoi si le message est vide et activer si le message n'est pas vide", () => {
    const valider = vi.fn();

    render(<HookConsummerConfirmationPopin valider={valider} message={""} />);

    let boutonValiderMessage = screen.getByText("Valider") as HTMLButtonElement;
    waitFor(() => {
      expect(boutonValiderMessage.disabled).toBeTruthy();
    });

    const textArea = screen.getByPlaceholderText("Saisir un message");
    fireEvent.change(textArea, {
      target: { value: "Je suis un message" }
    });

    expect(boutonValiderMessage.disabled).not.toBeTruthy();
  });

  test("Attendu la popin ConfirmationPopinAvecMessage, le bouton 'Annuler' fonctionne correctement", () => {
    const fermerPopin = vi.fn();

    render(<HookConsummerConfirmationPopin fermerPopin={fermerPopin} />);

    let boutonAnnuler: HTMLElement;
    waitFor(() => {
      boutonAnnuler = screen.getByText("Annuler");
      expect(boutonAnnuler).toBeDefined();
    });

    fireEvent.click(boutonAnnuler!);

    waitFor(() => {
      expect(fermerPopin).toHaveBeenCalledTimes(1);
    });

    waitFor(() => {
      expect(boutonAnnuler).not.toBeDefined();
    });
  });

  test("Attendu la popin ConfirmationPopinAvecMessage, le bouton 'Valider' fonctionne correctement", () => {
    const envoyerMessageRetourSDANF = vi.fn();

    render(
      <HookConsummerConfirmationPopin valider={envoyerMessageRetourSDANF} />
    );

    let boutonValider = screen.getByText("Valider");
    waitFor(() => {
      expect(boutonValider).toBeDefined();
    });

    const textArea = screen.getByPlaceholderText("Saisir un message");
    fireEvent.change(textArea, {
      target: { value: "Je suis un message" }
    });

    fireEvent.click(boutonValider);

    waitFor(() => {
      expect(envoyerMessageRetourSDANF).toHaveBeenCalledTimes(1);
    });

    waitFor(() => {
      expect(boutonValider).not.toBeDefined();
    });
  });

  test("Doit afficher le titre quand il est présent dans les props", () => {
    render(<HookConsummerConfirmationPopin title={"Je suis un titre"} />);

    waitFor(() => {
      expect(screen.getByText("Je suis un titre")).toBeDefined();
    });
  });

  test("Doit afficher le message d'erreur quand il est présent", () => {
    render(
      <HookConsummerConfirmationPopin
        messageErreur={"Je suis un message d'erreur"}
      />
    );

    waitFor(() => {
      expect(screen.getByText("Je suis un message d'erreur")).toBeDefined();
    });
  });

  test("Doit afficher un message d'erreur si le message est supérieur à 500 caractères", () => {
    render(<HookConsummerConfirmationPopin />);

    const message =
      "Lorem Ipsum is simply dummy text of the printing and typesddetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was populardddd";

    const textArea = screen.getByPlaceholderText("Saisir un message");
    fireEvent.change(textArea, {
      target: { value: message }
    });

    waitFor(() => {
      expect(screen.getByText("500 caractères maximum")).toBeDefined();
    });
  });

  test("Doit activer le bouton de soumission si le message SDANF n'est pas vide", () => {
    render(<HookConsummerConfirmationPopin message={"Message"} />);

    let boutonValiderMessage = screen.getByText("Valider") as HTMLButtonElement;

    waitFor(() => {
      expect(boutonValiderMessage.disabled).not.toBeTruthy();
    });
  });

  test("Doit vider l'area après l'envoi d'un message", () => {
    const envoyerMessageRetourSDANF = vi.fn();

    render(
      <HookConsummerConfirmationPopin valider={envoyerMessageRetourSDANF} />
    );

    let boutonValider = screen.getByText("Valider") as HTMLButtonElement;
    let textArea: HTMLAreaElement;

    waitFor(() => {
      expect(boutonValider).toBeDefined();
    });

    textArea = screen.getByPlaceholderText("Saisir un message");
    fireEvent.change(textArea, {
      target: { value: "Je suis un message" }
    });

    fireEvent.click(boutonValider);

    waitFor(() => {
      expect(envoyerMessageRetourSDANF).toHaveBeenCalledTimes(1);
    });

    waitFor(() => {
      expect(textArea).toBe("");
      expect(boutonValider.disabled).toBeTruthy();
    });
  });
});
