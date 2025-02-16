import {ReactNode} from "react";

export default function Header({
  children,
}: {
  children: ReactNode;
}){
  return (
    <div className="bg-transparent w-full flex justify-center">
        <div className="flex items-center justify-between relative">
          <div className="flex px-4 justify-between items-center w-full">
            <div>
              <nav className="py-2 lg:px-4 xl:px-6 bg-transparent shadow-lg rounded-lg w-full">
                <ul className="lg:flex">{children}</ul>
              </nav>
            </div>
          </div>
      </div>
    </div>
  );
}