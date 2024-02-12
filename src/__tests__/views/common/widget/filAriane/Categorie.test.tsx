import { URL_REQUETES } from "@api/appels/requeteApi";
import { URL_ACCUEIL } from "@router/ReceUrls";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { Categorie } from "@widget/filAriane/Categorie";
import { RouterProvider } from "react-router-dom";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";

test("renders not last Categorie", async () => {
  await act(async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_REQUETES,
          element: (
            <Categorie
              url={URL_ACCUEIL}
              message={"accueil.test"}
              last={false}
            />
          )
        }
      ],
      [URL_REQUETES]
    );

    const { getByText } = render(<RouterProvider router={router} />);
    await waitFor(() => {
      const linkElement = getByText(/accueil.test/);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement.className).toBe("LinkFilAriane");
      fireEvent.click(linkElement);
    });
  });
});

test("renders not last Categorie and click", async () => {
  await act(async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_REQUETES,
          element: (
            <Categorie
              url={URL_ACCUEIL}
              message={"accueil.test"}
              last={false}
            />
          )
        }
      ],
      [URL_REQUETES]
    );

    const { getByText } = render(<RouterProvider router={router} />);
    await waitFor(() => {
      expect(router.state.historyAction.length).toBe(3);
      const linkElement = getByText("accueil.test");
      fireEvent.click(linkElement);
      expect(router.state.historyAction.length).toBe(4);
    });
  });
});

test("renders last Categorie", async () => {
  await act(async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_REQUETES,
          element: (
            <Categorie
              url={URL_ACCUEIL}
              message={"accueilString"}
              last={true}
            />
          )
        }
      ],
      [URL_REQUETES]
    );

    const { getByText } = render(<RouterProvider router={router} />);
    await waitFor(() => {
      const linkElement = getByText("accueilString");
      expect(linkElement).toBeInTheDocument();
      expect(linkElement.className).toBe("TextFilAriane");
    });
  });
});

test("renders not last Categorie go to accueil", async () => {
  await act(async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_REQUETES,
          element: (
            <Categorie url={URL_ACCUEIL} message={"Accueil"} last={false} />
          )
        }
      ],
      ["/test2", URL_REQUETES]
    );

    const { getAllByText } = render(<RouterProvider router={router} />);
    await waitFor(() => {
      const linkElement = getAllByText("Accueil");
      expect(router.state.historyAction).toHaveLength(3);
      fireEvent.click(linkElement[0]);
      expect(router.state.historyAction).toHaveLength(4);
    });
  });
});
