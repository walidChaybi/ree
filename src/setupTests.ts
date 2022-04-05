// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

if (window.document) {
  window.document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    // @ts-ignore
    commonAncestorContainer: {
      nodeName: "BODY",
      ownerDocument: document
    }
  });
}

const TIME_OUT_MS = 30000;
jest.setTimeout(TIME_OUT_MS);

// process.env.DEBUG_PRINT_LIMIT = "1000000"; // Pour debug
