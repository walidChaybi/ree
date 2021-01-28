import React from "react";
import { render, waitFor } from "@testing-library/react";
import { logError } from "../../../views/common/util/LogManager";
import { ToastContainer } from "react-toastify";

test("renders error msg", async () => {
  const { getByText } = render(
    <div>
      <ToastContainer
        className={"toast-container"}
        position="top-center"
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        draggable={true}
        pauseOnHover={true}
      />
    </div>
  );

  logError({
    messageUtilisateur: "testmessageUtilisateur",
    error: "testeerror",
    errorInfo: "testerrorInfo"
  });
  await waitFor(() => {
    expect(getByText(/testmessageUtilisateur/)).toBeDefined();
  });
});
