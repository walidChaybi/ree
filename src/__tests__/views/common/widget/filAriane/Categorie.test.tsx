import { URL_REQUETES } from "@api/appels/requeteApi";
import { AccueilPage } from "@pages/accueil/AccueilPage";
import { URL_CONTEXT_APP } from "@router/ReceUrls";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { Categorie } from "@widget/filAriane/Categorie";
import { RouterProvider } from "react-router-dom";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";

test("renders pas la dernière categorie et clic sur fil ariane", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_REQUETES,
        element: (
          <Categorie
            url={URL_CONTEXT_APP}
            message={"accueil.test"}
            last={false}
          />
        )
      },
      {
        path: URL_CONTEXT_APP,
        element: <AccueilPage />
      }
    ],
    [URL_REQUETES]
  );
  await act(async () => {
    const { getByText } = render(<RouterProvider router={router} />);
    await waitFor(() => {
      const linkElement = getByText(/accueil.test/);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement.className).toBe("LinkFilAriane");
      fireEvent.click(linkElement);
    });
  });
});

test("renders pas la dernière categorie et clic sur element message", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_REQUETES,
        element: (
          <Categorie
            url={URL_CONTEXT_APP}
            message={"accueil.test"}
            last={false}
          />
        )
      },
      {
        path: URL_CONTEXT_APP,
        element: <AccueilPage />
      }
    ],
    [URL_REQUETES]
  );
  await act(async () => {
    const { getByText } = render(<RouterProvider router={router} />);
    await waitFor(() => {
      expect(router.state.historyAction.length).toBe(3);
      const linkElement = getByText("accueil.test");
      fireEvent.click(linkElement);
      expect(router.state.historyAction.length).toBe(4);
    });
  });
});

test("renders la derniere catégorie", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_REQUETES,
        element: (
          <Categorie
            url={URL_CONTEXT_APP}
            message={"accueilString"}
            last={true}
          />
        )
      },
      {
        path: URL_CONTEXT_APP,
        element: <AccueilPage />
      }
    ],
    [URL_REQUETES]
  );
  await act(async () => {
    const { getByText } = render(<RouterProvider router={router} />);
    await waitFor(() => {
      const linkElement = getByText("accueilString");
      expect(linkElement).toBeInTheDocument();
      expect(linkElement.className).toBe("TextFilAriane");
    });
  });
});

test("renders pas la dernière categorie et clic sur element Accueil", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_REQUETES,
        element: (
          <Categorie url={URL_CONTEXT_APP} message={"Accueil"} last={false} />
        )
      },
      {
        path: URL_CONTEXT_APP,
        element: <AccueilPage />
      }
    ],
    ["/test2", URL_REQUETES]
  );
  await act(async () => {
    const { getAllByText } = render(<RouterProvider router={router} />);
    await waitFor(() => {
      const linkElement = getAllByText("Accueil");
      expect(router.state.historyAction).toHaveLength(3);
      fireEvent.click(linkElement[0]);
      expect(router.state.historyAction).toHaveLength(4);
    });
  });
});
