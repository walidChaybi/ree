import { vi } from "vitest";

// IntersectionObserver isn't available in test environment

const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
Element.prototype.scrollIntoView = vi.fn();
window.IntersectionObserver = mockIntersectionObserver;
