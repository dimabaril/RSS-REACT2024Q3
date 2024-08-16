import { Link, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to={`uncontrolled`}>Uncontrolled</Link>
          </li>
          <li>
            <Link to={`controlled`}>Controlled</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
