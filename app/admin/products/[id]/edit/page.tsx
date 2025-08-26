import { fetchAdminProductDetails } from "@/utils/actions";

import EditForm from "@/components/form/EditForm";
import ImageInputContainer from "@/components/form/ImageInputContainer";

async function EditProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const product = await fetchAdminProductDetails(id);
  // const { name, company, description, featured, price } = product[0];

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">update product</h1>

      <div className="border p-8 rounded-md">
        {/* Image Input Container */}

        <ImageInputContainer id={id} product={product[0]}></ImageInputContainer>
        <EditForm id={id} product={product[0]}></EditForm>
      </div>
    </section>
  );
}
export default EditProductPage;
