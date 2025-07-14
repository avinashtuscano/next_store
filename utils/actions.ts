import { redirect } from "next/navigation";
import postgres from "postgres";

export type Product = {
  id: string;
  name: string;
  company: string;
  description: string;
  featured: boolean;
  image: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
};

// import prisma from "./db";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export const fetchFeaturedProducts = async () => {
  try {
    console.log("fetching featured products");
    const products = await sql<
      Product[]
    >`SELECT * FROM "Product" where featured=true`;

    return products;
  } catch (error) {
    console.log("Database Error", error);
    throw new Error("Failed to fetch featured products.");
  }
};

export const fetchAllProducts = async (search: string) => {
  try {
    let products;
    if (!search) {
      products = await sql<Product[]>`SELECT * FROM "Product"  `;
    } else {
      console.log(`${search}`);
      products = await sql<
        Product[]
      >`SELECT * FROM "Product" WHERE name ILIKE ${`%${search}%`} OR company ILIKE ${`%${search}%`}`; //using LIKE or ILIKE seems to be ok. ILIKE is case insensitive
    }

    return products;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("failed to fetch products");
  }
};

export const fetchSingleProduct = async (productId: string) => {
  try {
    const product = await sql<
      Product[]
    >`SELECT * FROM "Product" WHERE id=${productId} `;
    if (!product) {
      redirect("/products");
    }
    return product[0];
  } catch (error) {
    console.log("Database error", error);
    throw new Error("failed to fetch product");
  }
};
