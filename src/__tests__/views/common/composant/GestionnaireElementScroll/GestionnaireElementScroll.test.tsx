import { GestionnaireElementScroll } from "@composant/GestionnaireElementScroll/GestionnaireElementScroll";
import { fireEvent, waitFor } from "@testing-library/dom";
import { render, screen } from "@testing-library/react";
import { getLibelle } from "@util/Utils";
import React from "react";
import { act } from "react-test-renderer";

beforeEach(() => {
  // IntersectionObserver isn't available in test environment
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
  });
  window.IntersectionObserver = mockIntersectionObserver;

  // mock scrollIntoView element function
  const scrollIntoViewMock = jest.fn();
  Element.prototype.scrollIntoView = scrollIntoViewMock();
  // Element.prototype.scrollIntoView = jest.fn();
});

const getDiv = (index: number) => {
  return (
    <div
      style={{ height: "500px" }}
      data-testid={`div${index}`}
    >{`div ${index}`}</div>
  );
};

const blocsForm: { element: JSX.Element; libelle: string }[] = [
  {
    element: getDiv(1),
    libelle: getLibelle("1")
  },
  {
    element: getDiv(2),
    libelle: getLibelle("2")
  },
  {
    element: getDiv(3),
    libelle: getLibelle("3")
  },
  {
    element: getDiv(4),
    libelle: getLibelle("4")
  }
];

test("l'ensemble des elements s'affiche correctement via les props.", async () => {
  await act(async () => {
    render(<GestionnaireElementScroll elementListe={blocsForm} />);
  });

  await waitFor(() => {
    // scrollBoutton from GestionnaireElementScroll
    expect(screen.getByTestId("scrollBouton1")).toBeInTheDocument();
    expect(screen.getByTestId("scrollBouton2")).toBeInTheDocument();
    expect(screen.getByTestId("scrollBouton3")).toBeInTheDocument();
    expect(screen.getByTestId("scrollBouton4")).toBeInTheDocument();

    // JSX element passed down from props
    expect(screen.getByTestId("div1")).toBeInTheDocument();
    expect(screen.getByTestId("div2")).toBeInTheDocument();
    expect(screen.getByTestId("div3")).toBeInTheDocument();
    expect(screen.getByTestId("div4")).toBeInTheDocument();
  });
});

test("clique sur un bouton scroll vers la bonne section et change l'index du stepper", async () => {
  await act(async () => {
    render(<GestionnaireElementScroll elementListe={blocsForm} />);
  });

  const scrollIntoViewMock = jest.fn();
  Element.prototype.scrollIntoView = scrollIntoViewMock();

  act(() => {
    fireEvent.click(screen.getByTestId("scrollBouton1"));
    fireEvent.click(screen.getByTestId("scrollBouton2"));
    fireEvent.click(screen.getByTestId("scrollBouton3"));
    fireEvent.click(screen.getByTestId("scrollBouton4"));
  });
  await waitFor(() => {
    expect(scrollIntoViewMock).toBeCalled();
    expect(screen.getByTestId("div4")).toBeVisible();
  });
});