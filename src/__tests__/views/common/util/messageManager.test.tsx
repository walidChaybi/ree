import { render, waitFor } from "@testing-library/react";
import messageManager from "@util/messageManager";
import { ToastContainer } from "react-toastify";

test("renders all types of error popin", async () => {
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

  messageManager.showErrorAndClose("ErrorAndClose", "1000");
  messageManager.showErrors(["error1", "error2"]);
  messageManager.showError("SimpleError");

  await waitFor(() => {
    const errorAndCloseElement = getByText(/ErrorAndClose/i);
    expect(errorAndCloseElement).toBeInTheDocument();

    const errors1 = getByText(/error1/i);
    expect(errors1).toBeInTheDocument();

    const errors2 = getByText(/error2/i);
    expect(errors2).toBeInTheDocument();

    const errorElement = getByText(/SimpleError/i);
    expect(errorElement).toBeInTheDocument();
  });
});

test("renders all types of success popin", async () => {
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

  messageManager.showSuccessAndClose("SuccessAndClose", "1000");
  messageManager.showSuccesses(["success1", "success2"]);
  messageManager.showSuccess("SimpleSuccess");

  await waitFor(() => {
    const successAndCloseElement = getByText(/SuccessAndClose/i);
    expect(successAndCloseElement).toBeInTheDocument();

    const successes1 = getByText(/success1/i);
    expect(successes1).toBeInTheDocument();

    const successes2 = getByText(/success2/i);
    expect(successes2).toBeInTheDocument();

    const successElement = getByText(/SimpleSuccess/i);
    expect(successElement).toBeInTheDocument();
  });
});

test("renders all types of information popin", async () => {
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

  messageManager.showInfoAndClose("InfoAndClose", "1000");
  messageManager.showInfos(["Info1", "Info2"]);
  messageManager.showInfo("SimpleInfo");

  await waitFor(() => {
    const InfoAndCloseElement = getByText(/InfoAndClose/i);
    expect(InfoAndCloseElement).toBeInTheDocument();

    const Infos1 = getByText(/Info1/i);
    expect(Infos1).toBeInTheDocument();

    const Infos2 = getByText(/Info2/i);
    expect(Infos2).toBeInTheDocument();

    const InfoElement = getByText(/SimpleInfo/i);
    expect(InfoElement).toBeInTheDocument();
  });
});

test("renders all types of warning popin", async () => {
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

  messageManager.showWarningAndClose("WarningAndClose", "1000");
  messageManager.showWarnings(["Warning1", "Warning2"]);
  messageManager.showWarning("SimpleWarning");

  await waitFor(() => {
    const WarningAndCloseElement = getByText(/WarningAndClose/i);
    expect(WarningAndCloseElement).toBeInTheDocument();

    const Warnings1 = getByText(/Warning1/i);
    expect(Warnings1).toBeInTheDocument();

    const Warnings2 = getByText(/Warning2/i);
    expect(Warnings2).toBeInTheDocument();

    const WarningElement = getByText(/SimpleWarning/i);
    expect(WarningElement).toBeInTheDocument();
  });
});
