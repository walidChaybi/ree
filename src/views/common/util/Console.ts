/* istanbul ignore next */
export function logInfoDansLaConsole(message: string, ...data: any[]) {
  if (
    process.env.NODE_ENV !== "test" &&
    process.env.NODE_ENV !== "development"
  ) {
    console.info(message, ...data);
  }
}
