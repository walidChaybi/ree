import { getCodeCtv, saveCodeCtv } from "@api/appels/televerificationApi";
import { describe, expect, test, vi } from "vitest";

describe("Test des appels API mail", () => {
  test("Couverture en attendant le passage a useFetch", async () => {
    const { ApiManager } = await import("../../../api/ApiManager");

    const manager = ApiManager.getInstance("rece-televerification-api", "v1");
    const spyFetch = vi.fn();
    manager.fetch = spyFetch;

    getCodeCtv();
    saveCodeCtv("test", "test");

    expect(spyFetch).toHaveBeenCalled();
    vi.resetAllMocks();
  });
});
