import Link from "next/link";
import { Button } from "../ui/button";
import HeroCarousel from "./HeroCarousel";

function Hero() {
  return (
    <section className="grid md:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="text-6xl max-w-3xl font-bold m-4">
          We are changing the way people shop
        </h1>
        <p className="m-4 max-w-3xl text-muted-foreground mt-8">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Reprehenderit enim aperiam repellat quisquam. Totam deserunt tenetur
          voluptas beatae molestiae! Corrupti?
        </p>
        <Button className="m-4">
          <Link href="/products">Our Products</Link>
        </Button>
      </div>
      <div className="xs: hidden sm:block">
        <HeroCarousel></HeroCarousel>
      </div>
    </section>
  );
}
export default Hero;
