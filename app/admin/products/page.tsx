import EmptyList from "@/components/global/EmptyList";
import { fetchAdminProducts } from "@/utils/actions";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/utils/format";
import Link from "next/link";
import { DeleteButtonIcon, EditButtonIcon } from "@/components/form/Buttons";

async function AdminProducts() {
  const products = await fetchAdminProducts();

  if (!products) return <EmptyList></EmptyList>;
  return (
    <Table>
      <TableCaption className="capitalize">
        total products : {products.length}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Product Name</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-left">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">
              <Link
                href={`/products/${product.id}`}
                className="underline text-muted-foreground tracking-wide capitalize"
              >
                {product.name}
              </Link>
            </TableCell>
            <TableCell>{product.company}</TableCell>
            <TableCell>{formatCurrency(product.price)}</TableCell>
            <TableCell className="flex items-center gap-x-2">
              <Link href={`/admin/products/${product.id}/edit`}>
                <EditButtonIcon id={product.id}></EditButtonIcon>
              </Link>
              {/* <input type="text" name="image" value={product.image} hidden /> */}
              <DeleteButtonIcon
                id={product.id}
                url={product.image}
              ></DeleteButtonIcon>
            </TableCell>
            {/* <TableCell className="text-right">
              {formatCurrency(product.price)}
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-left">TBC</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
export default AdminProducts;
