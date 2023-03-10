import React from "react";
import { api } from "~/utils/api";

const Test = () => {
  const userQuery = api.user.all.useQuery(undefined, { enabled: false });
  const productsQuery = api.products.all.useQuery(undefined, {
    enabled: false,
  });
  const categoryQuery = api.categories.all.useQuery(undefined, {
    enabled: false,
  });

  const users = async () => {
    const d = await userQuery.refetch();
  };
  const products = async () => {
    const d = await productsQuery.refetch();
  };
  const category = async () => {
    const d = await categoryQuery.refetch();
  };

  return (
    <div className="flex min-h-screen justify-center py-10">
      <div className="flex items-center gap-4">
        <button onClick={() => void users()} className="btn-primary">
          Get users
        </button>
        <button onClick={() => void products()} className="btn-primary">
          Get Products
        </button>
        <button onClick={() => void category()} className="btn-primary">
          Get Categories
        </button>
      </div>
    </div>
  );
};

export default Test;
