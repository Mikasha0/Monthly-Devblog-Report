import { NavLink } from "@remix-run/react";

export default function MainNavigation() {
  return (
    <nav id="main-navigation">
      <ul>
        <li className="nav-item">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/blog">Blog</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/monthlyLog">Monthly Log</NavLink>
        </li>
      </ul>
    </nav>
  );
}
