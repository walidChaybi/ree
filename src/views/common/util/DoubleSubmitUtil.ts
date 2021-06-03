export class DoubleSubmitUtil {
  public static remetPossibiliteDoubleSubmit(element: any) {
    if (element) {
      element.onclick = null;
    }
  }

  public static eviteDoubleSubmit(element: any) {
    if (element) {
      element.onclick = function (event: any) {
        event.stopPropagation();
      };
    }
  }
}
