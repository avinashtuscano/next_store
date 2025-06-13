type NavLinks = {
  href: string;
  label: string;
};

export const links: NavLinks[] = [
  { label: "home", href: "/" },
  { label: "about", href: "/about" },
  { href: "/products", label: "products" },
  { href: "/favorites", label: "favorites" },
  { href: "/cart", label: "cart" },
  { href: "/orders", label: "orders" },
];
