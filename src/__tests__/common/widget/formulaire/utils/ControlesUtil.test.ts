import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import {
  traiteCarAutorises,
  digitSeulement,
  traiteDepassement,
  traiteDepassementJour,
  traiteDepassementMois,
  focusApresProchainChamps,
  traiteZeroAGauche,
  traiteEspace
} from "../../../../../views/common/widget/formulaire/utils/ControlesUtil";
import { FormikProps, FormikValues } from "formik";

test("traiteCarAutorises", async () => {
  const element = {
    value: "1",
    oldValue: "",
    setSelectionRange: jest.fn()
  };
  traiteCarAutorises(element, digitSeulement);
  expect(element.value).toBe("1");
  expect(element.oldValue).toBe("1");
  element.value = "1A";
  traiteCarAutorises(element, digitSeulement);
  expect(element.oldValue).toBe("1");
  expect(element.value).toBe("1");
});

test("traiteCarAutorises", async () => {
  const element = {
    value: "1",
    oldValue: "",
    setSelectionRange: jest.fn()
  };
  traiteCarAutorises(element, digitSeulement);
  expect(element.value).toBe("1");
});

test("traiteDepassement", async () => {
  const element = {
    value: "13"
  };
  traiteDepassement(element, 12);
  expect(element.value).toBe("12");
});

test("traiteDepassementJour", async () => {
  const element = {
    value: "32"
  };
  traiteDepassementJour(element);
  expect(element.value).toBe("31");
});

test("traiteDepassementMois", async () => {
  const element = {
    value: "13"
  };
  traiteDepassementMois(element);
  expect(element.value).toBe("12");
});

test("focusApresProchainChamps", async () => {
  const element = {
    target: {
      value: "01",
      getAttribute: function (attr: string) {
        return 2;
      },
      nextElementSibling: {
        nextElementSibling: {
          focus: jest.fn()
        }
      }
    }
  };
  focusApresProchainChamps(
    (element as any) as React.ChangeEvent<HTMLInputElement>
  );
  expect(
    element.target.nextElementSibling.nextElementSibling.focus
  ).toHaveBeenCalledTimes(1);
});

test("traiteZeroAGauche", async () => {
  const element = {
    target: {
      value: "1"
    }
  };

  const formik = ({
    handleChange: jest.fn(),
    handleBlur: jest.fn()
  } as any) as FormikProps<FormikValues>;

  traiteZeroAGauche(element, formik);
  expect(element.target.value).toBe("01");
  expect(formik.handleChange).toHaveBeenCalledTimes(1);
  expect(formik.handleBlur).toHaveBeenCalledTimes(1);
});

test("traiteEspace", async () => {
  const element = {
    target: {
      value: " te  st "
    }
  };
  traiteEspace(element, digitSeulement);
  expect(element.target.value).toBe("te st");
});
