import type { Category } from "~/types/categories";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { Header, SingleProductComponent } from "~/components";
import { prisma } from "~/server/db";
import type { Product } from "~/types/products";
import type { SinglePageServerSideProps } from "~/types/serversideprops";

const ProductPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ product, categories }) => {
  return (
    <>
      <Head>
        <title>{product?.title || "Product Not Found"} - easyCart</title>
      </Head>

      <Header notice={true} category={true} categories={categories} />

      <SingleProductComponent product={product} />
    </>
  );
};

export default ProductPage;

export const getServerSideProps: GetServerSideProps<
  SinglePageServerSideProps
> = async (context) => {
  const slug = context.params?.slug;

  if (!slug) {
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const product = await prisma.product.findUnique({
    where: {
      slug: slug as string,
    },
    include: {
      category: true,
      seller_store: true,
      reviews: true,
    },
  });

  const categories = await prisma.category.findMany({
    where: {
      parent: null,
    },
    include: {
      children: true,
    },
  });

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)) as Product,
      categories: JSON.parse(JSON.stringify(categories)) as Category[],
    },
  };
};
