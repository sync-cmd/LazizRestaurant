import Image from "next/image";
import Price from "@/components/Price";
import { ProductType } from "@/types/types";
import DeleteButton from "@/components/DeleteButton";

const getData = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store",
  })
  console.log("Status:", res.status);
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
};

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const singleProduct: ProductType = await getData(id);


  return (
    <div className="p-10 lg:-mt-16 md:-mt-16 lg:px-15 xl:px-30 h-screen flex flex-col justify-around md:flex-row md:gap-8 md:items-center">
      {singleProduct.img && (
        <div className="relative w-full h-1/2 md:h-[70%] xl:w-[50vw]">
          <Image
            src={singleProduct.img}
            alt={singleProduct.title}
            fill
            className="object-contain"
          />
        </div>
      )}

      <div className="h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="text-3xl text-[#7a2e0e] font-bold uppercase xl:text-5xl">
          {singleProduct.title}
        </h1>

        <p className="text-[#6b4a32]">
          {singleProduct.desc}
        </p>

        <Price product={singleProduct} />
      </div>
      <DeleteButton id={singleProduct.id}/>
    </div>
  );
};

export default SingleProductPage;