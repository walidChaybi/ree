/* istanbul ignore next */
export function logInfoDansLaConsole(message: string, ...data: any[]) {
  if (process.env.NODE_ENV !== "test") {
    console.info(message, ...data);
  }
}
