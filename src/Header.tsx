import {NavLink} from "react-router";

function HeaderLink({title, href} : { title: string, href: string }) {
  return (
    <li className="relative group">
      <NavLink
          to={href}
          className="text-base text-dark py-2 mx-8"
      >
        {title}
      </NavLink>
    </li>
  );
}

function Header(){
  return (
    <div
      className="
            ud-header
            bg-transparent
            top-0
            left-0
            z-40
            w-full
            flex
            items-center">
      <div className="container">
        <div className="flex -mx-4 items-center justify-between relative">
          <div className="px-4 w-60 max-w-full">
            <a href="index.html" className="navbar-logo w-full block py-5">
              <img
                src="assets/images/logo/logo-white.svg"
                alt="logo"
                className="w-full header-logo"
              />
            </a>
          </div>
          <div className="flex px-4 justify-between items-center w-full">
            <div>
              <nav
                id="navbarCollapse"
                className="
                      absolute
                      py-5
                      lg:py-0 lg:px-4
                      xl:px-6
                      bg-white
                      lg:bg-transparent
                      shadow-lg
                      rounded-lg
                      max-w-[250px]
                      w-full
                      lg:max-w-full lg:w-full
                      right-4
                      top-full
                      hidden
                      lg:block lg:static lg:shadow-none">
                <ul className="blcok lg:flex">
                  <HeaderLink title="Главная" href="/" />
                  <HeaderLink title="Панель управления" href="/dashboard" />
                </ul>
              </nav>
            </div>

          </div>
        </div>
      </div>
    </div>

  );
}

export default Header;