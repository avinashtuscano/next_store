"use server";
import { currentUser } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";
import postgres from "postgres";
import { v4 as uuidv4 } from "uuid";
import { imageSchema, productSchema } from "./schemas";
import { deleteImage, uploadImage } from "./supabase";
import { revalidatePath } from "next/cache";
import { State } from "./types";

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

export type Favourite = {
  id: string;
  clerkId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
};

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

export const fetchAdminProducts = async () => {
  const products = await sql<
    Product[]
  >`SELECT * FROM "Product" ORDER BY "createdAt" DESC`;
  return products;
};

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    redirect("/");
  }
  return user;
};

export const createProductAction = async (
  prevState: unknown,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const user = getAuthUser();
    //const uuid = uuidv4();
    const clerkId = (await user).id;

    const validatedFields = productSchema.safeParse({
      id: uuidv4(),
      name: formData.get("name"),
      company: formData.get("company"),
      price: formData.get("price"),
      featured: formData.get("featured"),
      description: formData.get("description"),
    });

    const validateImageMaxSize = imageSchema
      .max(1_000_000)
      .safeParse(formData.get("image") as File); // maximum .size (bytes)
    // console.log(validateImageMaxSize);

    if (!validateImageMaxSize.success) {
      throw new Error("The size of image should be less than 1MB");
    }
    const validateImageType = imageSchema
      .mime(["image/png", "image/jpeg"])
      .safeParse(formData.get("image") as File); // multiple MIME types

    if (!validateImageType.success) {
      throw new Error("The image type should either be png or jpeg");
    }

    if (!validatedFields.success) {
      const errors = validatedFields.error.issues.map((error) => error.message);
      throw new Error(errors.join(", "));
    }

    const { id, name, company, price, featured, description } =
      validatedFields.data;

    const fullPath = await uploadImage(validateImageType.data);

    // const image = `/images/${validateImageType.data.name}`;
    // const image = "/images/product-1.jpg"
    const image = fullPath;

    await sql`INSERT INTO "Product" (id, name, company, description, featured, image, price, "createdAt", "updatedAt", "clerkId" ) VALUES (${id}, ${name}, ${company},${description},${featured}, ${image}, ${price}, NOW(), NOW(), ${clerkId})`;

    // return { message: "product created" };
  } catch (error) {
    console.log(error);
    return {
      message:
        error instanceof Error ? error.message : "An error was encountred",
    };
  }
  redirect("/admin/products");
};

export async function deleteProduct(id: string, url: string) {
  try {
    await sql`DELETE FROM "Product" WHERE id = ${id}`;

    deleteImage(url);
  } catch (error) {
    console.log(error);
    throw new Error("Unable to delete product");
  }
  revalidatePath("/admin/products");
}

export const updateProductAction = async (
  prevState: State,
  formData: FormData
): Promise<{ message: string }> => {
  // await getAdminUser();
  const productId = formData.get("id") as string;

  try {
    console.log(productId);

    const validatedFields = productSchema.safeParse({
      id: productId,
      name: formData.get("name"),
      company: formData.get("company"),
      price: formData.get("price"),
      featured: formData.get("featured"),
      description: formData.get("description"),
    });
    if (!validatedFields.success) {
      const errors = validatedFields.error.issues.map((error) => error.message);
      throw new Error(errors.join(", "));
    }

    const { id, name, company, price, featured, description } =
      validatedFields.data;

    await sql`UPDATE "Product" SET name = ${name}, company = ${company}, price=${price}, featured=${featured}, description = ${description} WHERE id = ${id}`;

    console.log("Product Updated");
    // renderMessage("Product updated successfully");
    // return { message: "Product updated successfully" };
  } catch (error) {
    console.log(error);
    return {
      message:
        error instanceof Error ? error.message : "An error was encountred",
    };
  }
  revalidatePath(`/admin/products/${productId}/edit`);
  return {
    message: "Product updated successfully",
  };
};
export async function updateProductImageAction(
  prevState: State,
  formData: FormData
): Promise<{ message: string }> {
  const id = formData.get("id") as string;

  try {
    const validateImageMaxSize = imageSchema
      .max(1_000_000)
      .safeParse(formData.get("image") as File); // maximum .size (bytes)
    // console.log(validateImageMaxSize);

    if (!validateImageMaxSize.success) {
      throw new Error("The size of image should be less than 1MB");
    }
    const validateImageType = imageSchema
      .mime(["image/png", "image/jpeg"])
      .safeParse(formData.get("image") as File); // multiple MIME types

    if (!validateImageType.success) {
      throw new Error("The image type should either be png or jpeg");
    }

    console.log(validateImageType.data);

    const oldImageURL = formData.get("url") as string;

    deleteImage(oldImageURL);
    const neeImagePath = await uploadImage(validateImageType.data);

    await sql`UPDATE "Product" SET image=${neeImagePath} WHERE id=${id}`;
  } catch (error) {
    console.log(error);
    return {
      message:
        error instanceof Error ? error.message : "An error was encountred",
    };
  }
  revalidatePath(`/admin/products/${id}/edit`);
  return {
    message: "Product image updated successfully",
  };
}

export async function fetchAdminProductDetails(id: string) {
  const product = await sql<
    Product[]
  >`SELECT * FROM "Product" WHERE id = ${id} ORDER BY "createdAt" DESC`;
  if (!product) redirect("/admin/products");
  return product;
}

export async function isProductFavourite(id: string) {
  const user = await currentUser();
  if (!user) {
    fetchFeaturedProducts();
    return null;
  } else {
    const user = getAuthUser();
    const clerkId = (await user).id;

    const favouriteProduct = await sql<
      Favourite[]
    >`SELECT * FROM "favourites" where productId=${id} and clerkId=${clerkId}`;

    if (favouriteProduct.length === 0) return null;
    return favouriteProduct[0].id;
  }
}

export async function addToFavorites(
  prevState: State,
  formData: FormData
): Promise<{ message: string }> {
  const user = getAuthUser();
  //const uuid = uuidv4();
  const id = formData.get("productId") as string;
  const clerkId = (await user).id;

  const isFavourite = await isProductFavourite(id);

  if (isFavourite) {
    try {
      await sql`DELETE FROM "favourites" WHERE productId = ${id} and clerkId=${clerkId}`;
    } catch (error) {
      console.log(error);
      return {
        message:
          error instanceof Error ? error.message : "An error was encountred",
      };
    }
    revalidatePath(`/`);
    return { message: "Removed from Favourites" };
  } else {
    try {
      await sql`INSERT INTO "favourites" (clerkid, productid, createdAt, updatedAt) VALUES (${clerkId}, ${id}, NOW(), NOW())`;
    } catch (error) {
      console.log(error);
      return {
        message:
          error instanceof Error ? error.message : "An error was encountred",
      };
    }
    revalidatePath(`/`);
    return { message: "Added to Favourites" };
  }
}

export async function fetchUserFavourites() {
  try {
    const user = getAuthUser();
    const clerkId = (await user).id;
    const userFavs = await sql<
      Product[]
    >`SELECT p.id, p.name, p.company, p.description, p.featured, p.image, p.price, p."createdAt", p."updatedAt", p."clerkId" FROM "Product" p JOIN favourites f ON p.id = f.productid and f.clerkId = ${clerkId}`;

    return userFavs;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("failed to fetch products");
  }
}

// SELECT p.id, p.name, p.company, p.description, p.featured, p.image, p.price, p."createdAt", p."updatedAt", p."clerkId" FROM "Product" p JOIN favourites f ON p.id = f.productid and f.clerkId = 'user_2zuO3ZDtkOQEZcAFsa2Jsw7ikGL'
