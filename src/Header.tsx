import {NavLink} from "react-router";

function HeaderLink({title, href} : { title: string, href: string }) {
  return (
    <li className="group">
      <NavLink to={href}>
        <h2 className="text-xl text-dark py-2 mx-8">
          {title}
        </h2>
      </NavLink>
    </li>
  );
}

export default function Header(){
  return (
    <div
      className="bg-transparent w-full flex">
        <div className="flex items-center justify-between relative">
          <div className="flex px-4 justify-between items-center w-full">
            <div>
              <nav className="py-2 lg:px-4 xl:px-6 bg-transparent shadow-lg rounded-lg w-full">
                <ul className="lg:flex">
                  <HeaderLink title="Главная" href="/" />
                  <HeaderLink title="Панель управления" href="/dashboard" />
                </ul>
              </nav>
            </div>
          </div>
      </div>
    </div>
  );
}