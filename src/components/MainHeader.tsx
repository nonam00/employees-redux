import Header from "./Header.tsx";
import HeaderLink from "./HeaderLink.tsx";

export default function MainHeader(){
  return (
    <Header>
      <HeaderLink title="Главная" href="/" />
      <HeaderLink title="Панель управления" href="/dashboard" />
    </Header>
  )
}