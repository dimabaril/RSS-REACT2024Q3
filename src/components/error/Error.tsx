import { useRouteError } from "react-router-dom";

import "./Error.scss";

interface RouteError extends Error {
  statusText?: string;
}

export default function Error() {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <div className="error">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message || "Damn"}</i>
      </p>
    </div>
  );
}
