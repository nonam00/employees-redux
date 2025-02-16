import {memo} from "react";
import {NavLink} from "react-router";

const HeaderLink = memo(function HeaderLink({
  title,
  href
} : {
  title: string,
  href: string
}) {
  return (
    <li className="group">
      <NavLink to={href}>
        <h2 className="text-xl text-dark py-2 mx-8">
          {title}
        </h2>
      </NavLink>
    </li>
  );
});

export default HeaderLink;