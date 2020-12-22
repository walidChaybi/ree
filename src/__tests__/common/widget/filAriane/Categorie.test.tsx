import { Categorie } from "../../../../views/common/widget/filAriane/Categorie";
import React from "react";
import { createMemoryHistory } from "history";
import { render, waitFor, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { URL_REQUETES } from "../../../../api/appels/requeteApi";
import { URL_ACCUEIL } from "../../../../views/router/ReceUrls";

test("renders not last Categorie", async () => {
  const history = createMemoryHistory();
  history.push(URL_REQUETES);
  const { getByText } = render(
    <Router history={history}>
      <Categorie url={URL_ACCUEIL} messageId={"accueil.test"} last={false} />
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
      <Categorie url={URL_ACCUEIL} messageId={"accueil.test"} last={false} />
    </Router>
  );
  await waitFor(() => {
    expect(history.length).toBe(2);
    const linkElement = getByText(/accueil.test/);
    fireEvent.click(linkElement);
    expect(history.length).toBe(3);
  });
});

test("renders last Categorie", async () => {
  const history = createMemoryHistory();
  history.push(URL_REQUETES);
  const { getByText } = render(
    <Router history={history}>
      <Categorie url={URL_ACCUEIL} messageId={"accueilString"} last={true} />
    </Router>
  );
  await waitFor(() => {
    const linkElement = getByText(/fildariane.accueilString/);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.className).toBe("TextFilAriane");
  });
});

test("renders last Categorie and apercu requete", async () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <Categorie
        url={URL_ACCUEIL}
        messageId={"204b8563-c7f8-4748-9daa-f26558985894"}
        last={true}
      />
    </Router>
  );
  await waitFor(() => {
    const linkElement = getByText(/Aperçu de requête/);
    expect(linkElement).toBeInTheDocument();
  });
});

test("renders not last Categorie go to accueil", async () => {
  const history = createMemoryHistory();
  history.push(URL_REQUETES);
  history.push("test2");
  const { getAllByText } = render(
    <Router history={history}>
      <Categorie url={URL_ACCUEIL} messageId={"accueil"} last={false} />
    </Router>
  );
  await waitFor(() => {
    const linkElement = getAllByText(/Accueil/);
    expect(history).toHaveLength(3);
    fireEvent.click(linkElement[0]);
    expect(history).toHaveLength(4);
  });
});
