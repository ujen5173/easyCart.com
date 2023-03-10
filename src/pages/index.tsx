/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Banner, Header } from "~/components";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { prisma } from "~/server/db";
import { type Category } from "~/types/categories";
import type { HomePageServerSideProps } from "~/types/serversideprops";
import Head from "next/head";

const Homepage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
  return (
    <>
      <Head>
        <title>Home - EasyCart</title>
      </Head>
      <Header notice={true} categories={data} />
      <Banner />
    </>
  );
};

export default Homepage;

export const getServerSideProps: GetServerSideProps<
  HomePageServerSideProps
> = async () => {
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
    take: 10,
  });

  return {
    props: {
      data: JSON.parse(JSON.stringify(data)) as Category[],
    },
  };
};
