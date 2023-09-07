export class DoubleClicUtil {
  public static reactiveOnClick(element: any) {
    if (element) {
      element.onclick = null;
    }
  }

  public static desactiveOnClick(element: any) {
    if (element) {
      element.onclick = function (event: any) {
        event.stopPropagation();
      };
    }
  }
}
