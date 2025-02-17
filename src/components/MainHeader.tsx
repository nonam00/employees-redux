import Header from "./Header";
import HeaderLink from "./HeaderLink";

export default function MainHeader(){
  return (
    <Header>
      <HeaderLink title="Главная" href="/" />
      <HeaderLink title="Панель управления" href="/dashboard" />
    </Header>
  )
}