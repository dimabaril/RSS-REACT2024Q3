import { NavLink } from "react-router-dom";

import "./Header.scss";

export default function Header() {
  return (
    <header>
      <nav>
        <ul className="nav-list">
          <li>
            <NavLink className="nav-list__item" to={`/`}>
              Main
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-list__item" to={`/controlled`}>
              Controlled form
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-list__item" to={`/uncontrolled`}>
              Uncontrolled form
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
