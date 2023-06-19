import { URL_REQUETES } from "@api/appels/requeteApi";
import { URL_ACCUEIL } from "@router/ReceUrls";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { Categorie } from "@widget/filAriane/Categorie";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

const setIsDirty = (isDirty = false) => {};

test("renders not last Categorie", async () => {
  const history = createMemoryHistory();
  history.push(URL_REQUETES);
  const { getByText } = render(
    <Router history={history}>
      <Categorie
        url={URL_ACCUEIL}
        message={"accueil.test"}
        last={false}
        isDirty={false}
        setIsDirty={setIsDirty}
      />
    </Router>
  );
  await waitFor(() => {
    const linkElement = getByText(/accueil.test/);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.className).toBe("LinkFilAriane");
    fireEvent.click(linkElement);
  });
});

test("renders not last Categorie and click", async () => {
  const history = createMemoryHistory();
  history.push(URL_REQUETES);
  const { getByText } = render(
    <Router history={history}>
      <Categorie
        url={URL_ACCUEIL}
        message={"accueil.test"}
        last={false}
        isDirty={false}
        setIsDirty={setIsDirty}
      />
    </Router>
  );
  await waitFor(() => {
    expect(history.length).toBe(2);
    const linkElement = getByText("accueil.test");
    fireEvent.click(linkElement);
    expect(history.length).toBe(3);
  });
});

test("renders last Categorie", async () => {
  const history = createMemoryHistory();
  history.push(URL_REQUETES);
  const { getByText } = render(
    <Router history={history}>
      <Categorie
        url={URL_ACCUEIL}
        message={"accueilString"}
        last={true}
        isDirty={false}
        setIsDirty={setIsDirty}
      />
    </Router>
  );
  await waitFor(() => {
    const linkElement = getByText("accueilString");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.className).toBe("TextFilAriane");
  });
});

test("renders not last Categorie go to accueil", async () => {
  const history = createMemoryHistory();
  history.push(URL_REQUETES);
  history.push("test2");
  const { getAllByText } = render(
    <Router history={history}>
      <Categorie
        url={URL_ACCUEIL}
        message={"Accueil"}
        last={false}
        isDirty={false}
        setIsDirty={setIsDirty}
      />
    </Router>
  );
  await waitFor(() => {
    const linkElement = getAllByText("Accueil");
    expect(history).toHaveLength(3);
    fireEvent.click(linkElement[0]);
    expect(history).toHaveLength(4);
  });
});
