import React from "react";
import ReactDOM from "react-dom";
import { screen, fireEvent } from "@testing-library/react";
import { MessagePopin, PopinMessageType } from "../MessagePopin";
import { useState } from "react";
import { act } from "react-dom/test-utils";

let containerSuccess: Element | null;
let containerError: Element | null;
let containerInfo: Element | null;
let containerWarning: Element | null;

const HookConsummerSuccess: React.FC = () => {
  const [display, setDisplay] = useState(true);

  return (
    <>
      <MessagePopin
        message={"Test message success"}
        messageType={PopinMessageType.Success}
        isOpen={display}
        setIsOpen={setDisplay}
      />
    </>
  );
};

const HookConsummerError: React.FC = () => {
  const [display, setDisplay] = useState(true);

  return (
    <>
      <MessagePopin
        message={"Test message error"}
        messageType={PopinMessageType.Error}
        isOpen={display}
        setIsOpen={setDisplay}
      />
    </>
  );
};

const HookConsummerInfo: React.FC = () => {
  const [display, setDisplay] = useState(true);

  return (
    <>
      <MessagePopin
        message={"Test message info"}
        messageType={PopinMessageType.Info}
        isOpen={display}
        setIsOpen={setDisplay}
      />
    </>
  );
};

const HookConsummerWarning: React.FC = () => {
  const [display, setDisplay] = useState(true);

  return (
    <>
      <MessagePopin
        message={"Test message warning"}
        messageType={PopinMessageType.Warning}
        isOpen={display}
        setIsOpen={setDisplay}
      />
    </>
  );
};

beforeEach(() => {
  containerSuccess = document.createElement("div");
  document.body.appendChild(containerSuccess);
  containerError = document.createElement("div");
  document.body.appendChild(containerError);
  containerInfo = document.createElement("div");
  document.body.appendChild(containerInfo);
  containerWarning = document.createElement("div");
  document.body.appendChild(containerWarning);

  act(() => {
    ReactDOM.render(<HookConsummerSuccess />, containerSuccess);
    ReactDOM.render(<HookConsummerError />, containerError);
    ReactDOM.render(<HookConsummerInfo />, containerWarning);
    ReactDOM.render(<HookConsummerWarning />, containerInfo);
  });
});

afterEach(() => {
  if (containerSuccess instanceof Element) {
    document.body.removeChild<Element>(containerSuccess);
  }

  if (containerError instanceof Element) {
    document.body.removeChild<Element>(containerError);
  }

  if (containerWarning instanceof Element) {
    document.body.removeChild<Element>(containerWarning);
  }

  if (containerInfo instanceof Element) {
    document.body.removeChild<Element>(containerInfo);
  }

  containerSuccess = null;
  containerError = null;
  containerWarning = null;
  containerInfo = null;
});

test("renders composant MessagePopin with a success message", () => {
  act(() => {
    const popinMessage = screen.getByText("Test message success");
    const popin = screen.getByTestId("popin-success");

    expect(popinMessage).toBeInTheDocument();
    expect(popin.getElementsByClassName("SuccessPopin")).toBeDefined();
  });
});

test("renders composant MessagePopin with an error message", () => {
  act(() => {
    const popin = screen.getByTestId("popin-error");

    expect(popin.getElementsByClassName("ErrorPopin")).toBeDefined();
  });
});

test("renders composant MessagePopin with an info message", () => {
  act(() => {
    const popin = screen.getByTestId("popin-info");

    expect(popin.getElementsByClassName("InfoPopin")).toBeDefined();
  });
});

test("renders composant MessagePopin with a warning message", () => {
  act(() => {
    const popin = screen.getByTestId("popin-warning");

    expect(popin.getElementsByClassName("WarningPopin")).toBeDefined();
  });
});

test("renders composant MessagePopin, close a popin work on click", () => {
  act(() => {
    fireEvent.click(document);

    const popin = screen.queryAllByAltText(/Test/i);

    expect(popin).toHaveLength(0);
  });
});
