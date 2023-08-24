// IntersectionObserver isn't available in test environment

const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
Element.prototype.scrollIntoView = jest.fn();
window.IntersectionObserver = mockIntersectionObserver;
