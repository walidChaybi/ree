import { getEnvoyerMail } from "@api/appels/mailApi";
import { describe, expect, test, vi } from "vitest";

describe("Test des appels API mail", () => {
  test("Couverture en attendant le passage a useFetch", async () => {
    const { ApiManager } = await import("../../../api/ApiManager");

    const manager = ApiManager.getInstance("rece-mail-api", "v1");
    const spyFetch = vi.fn();
    manager.fetch = spyFetch;

    getEnvoyerMail("test");
    expect(spyFetch).toHaveBeenCalled();
    vi.resetAllMocks();
  });
});
