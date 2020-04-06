export const host =
  process.env.NODE_ENV === "development"
    ? "localhost:8080"
    : window.location.host;
