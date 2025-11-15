import { createContext, useMemo } from "react";
import { gql, useQuery } from "@apollo/client";

const COLLECTIONS = gql`
  query GetCollections {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

export const CategoriesContext = createContext({
  categoriesMap: {},
  loading: false,
  error: null,
});

export const CategoriesProvider = ({ children }) => {
  const { loading, data, error } = useQuery(COLLECTIONS);

  const categoriesMap = useMemo(() => {
    if (!data || !data.collections) return {};
    return data.collections.reduce((acc, collection) => {
      acc[collection.title.toLowerCase()] = collection.items;
      return acc;
    }, {});
  }, [data]);

  const value = { categoriesMap, loading, error };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
