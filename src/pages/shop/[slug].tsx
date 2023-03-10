/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { Header, ProductGrid, FilterArea } from "~/components";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { prisma } from "~/server/db";
import Head from "next/head";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import type { Category } from "~/types/categories";
import { useState } from "react";
import { CategoriesServerSideProps } from "~/types/serversideprops";

const CategoryParent: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ category, data, categoryData }) => {
  const slug = useRouter().query.slug as string;
  const [minMax, setMinMax] = useState<{ min: number; max: number }>({
    min: 0,
    max: 50000,
  });
  const {
    data: responseData,
    isLoading,
    refetch,
  } = api.products.allFromCategory.useQuery(
    {
      slug: `/shop/${slug}`,
      filter: {
        price: {
          gte: minMax.min,
          lte: minMax.max,
        },
      },
    },
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (slug) {
      const res = refetch();
    }
  }, []);

  return (
    <>
      <Head>
        <title>{category?.name} For Sale | EasyCart</title>
      </Head>

      <Header categories={data} />

      <main className="w-full bg-white">
        <div className="container mx-auto flex gap-6 py-6 px-4">
          <FilterArea
            minMax={minMax}
            setMinMax={setMinMax}
            categoryData={categoryData}
            refetch={refetch}
          />
          <ProductGrid
            isLoading={isLoading}
            responseData={responseData}
            category={category}
          />
        </div>
      </main>
    </>
  );
};

export default CategoryParent;

export const getServerSideProps: GetServerSideProps<
  CategoriesServerSideProps
> = async (context) => {
  const data = await prisma.category.findMany({
    where: {
      parentId: null,
    },
    include: {
      children: true,
    },
    orderBy: {
      created_at: "asc",
    },
  });

  if (context.params?.slug === undefined) {
    return {
      props: {
        data: JSON.parse(JSON.stringify(data)) as Category[],
      },
    };
  }

  const category = await prisma.category.findUnique({
    where: {
      slug: `/shop/${context.params?.slug as string}`,
    },
  });

  if (!category) {
    return {
      props: {
        category: {},
        data: JSON.parse(JSON.stringify(data)) as Category[],
        categoryData: {},
      },
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  const filterCategories = await prisma.category.findFirst({
    where: {
      slug: `/shop/${context.params?.slug as string}`,
    },
    include: {
      children: true,
      parent: {
        include: {
          children: true,
        },
      },
    },
  });

  return {
    props: {
      data: JSON.parse(JSON.stringify(data)) as Category[],
      category: JSON.parse(JSON.stringify(category)) as Category,
      categoryData: JSON.parse(JSON.stringify(filterCategories)) as Category,
    },
  };
};
