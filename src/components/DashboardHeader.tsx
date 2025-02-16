import Header from "@/components/Header.tsx";
import HeaderLink from "@/components/HeaderLink.tsx";

export default function DashboardHeader() {
  return (
    <Header>
      <HeaderLink href="/dashboard/employees" title="Employees" />
      <HeaderLink href="/dashboard/companies" title="Companies" />
      <HeaderLink href="/dashboard/positions" title="Positions" />
    </Header>
  )
}