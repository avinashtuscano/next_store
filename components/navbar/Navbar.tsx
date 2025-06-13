import Container from "../global/Container";
import CartButton from "./CartButton";
import DarkMode from "./DarkMode";
import LinksDropdown from "./LinksDropdown";
import Logo from "./Logo";
import NavSearch from "./NavSearch";

function Navbar() {
  return (
    <nav className="border-b">
      <Container className="flex flex-col sm:flex-row sm:justify-between py-8 gap-4 sm:items-center">
        <Logo></Logo>
        <div>
          <NavSearch></NavSearch>
        </div>
        <div className="flex gap-4 items-center">
          <CartButton></CartButton>
          <DarkMode></DarkMode>
          <LinksDropdown></LinksDropdown>
        </div>
      </Container>
    </nav>
  );
}
export default Navbar;
