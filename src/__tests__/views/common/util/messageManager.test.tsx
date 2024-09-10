import { render, waitFor } from "@testing-library/react";
import messageManager from "@util/messageManager";
import { ToastContainer } from "react-toastify";
import { expect, test } from "vitest";

test("renders all types of error popin", () => {
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

  waitFor(() => {
    const errorAndCloseElement = getByText(/ErrorAndClose/i);
    expect(errorAndCloseElement).toBeDefined();

    const errors1 = getByText(/error1/i);
    expect(errors1).toBeDefined();

    const errors2 = getByText(/error2/i);
    expect(errors2).toBeDefined();

    const errorElement = getByText(/SimpleError/i);
    expect(errorElement).toBeDefined();
  });
});

test("renders all types of success popin", () => {
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

  waitFor(() => {
    const successAndCloseElement = getByText(/SuccessAndClose/i);
    expect(successAndCloseElement).toBeDefined();

    const successes1 = getByText(/success1/i);
    expect(successes1).toBeDefined();

    const successes2 = getByText(/success2/i);
    expect(successes2).toBeDefined();

    const successElement = getByText(/SimpleSuccess/i);
    expect(successElement).toBeDefined();
  });
});

test("renders all types of information popin", () => {
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

  waitFor(() => {
    const InfoAndCloseElement = getByText(/InfoAndClose/i);
    expect(InfoAndCloseElement).toBeDefined();

    const Infos1 = getByText(/Info1/i);
    expect(Infos1).toBeDefined();

    const Infos2 = getByText(/Info2/i);
    expect(Infos2).toBeDefined();

    const InfoElement = getByText(/SimpleInfo/i);
    expect(InfoElement).toBeDefined();
  });
});

test("renders all types of warning popin", () => {
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

  waitFor(() => {
    const WarningAndCloseElement = getByText(/WarningAndClose/i);
    expect(WarningAndCloseElement).toBeDefined();

    const Warnings1 = getByText(/Warning1/i);
    expect(Warnings1).toBeDefined();

    const Warnings2 = getByText(/Warning2/i);
    expect(Warnings2).toBeDefined();

    const WarningElement = getByText(/SimpleWarning/i);
    expect(WarningElement).toBeDefined();
  });
});
