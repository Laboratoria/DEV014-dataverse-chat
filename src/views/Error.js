import { notFound } from "../components/NotFound.js";

export const error = () => {
  const errorView = document.createElement("div");
  errorView.className = "viewError";

  const notFoundElement = notFound();
  errorView.appendChild(notFoundElement);

  return errorView;
};
