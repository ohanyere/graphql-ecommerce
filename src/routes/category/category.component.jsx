import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import ProductCard from "../../components/product-card/product-card.component";

import { CategoryContainer, Title } from "./category.styles";
import Spinner from "../../components/spinner/spinner.component";

// ✅ lowercase 'query' instead of 'Query'
const GET_COLLECTION_BY_TITLE = gql`
  query ($title: String!) {
    getCollectionsByTitle(title: $title) {
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

const Category = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  const { loading, data } = useQuery(GET_COLLECTION_BY_TITLE, {
    variables: { title: category },
  });

  useEffect(() => {
    if (data?.getCollectionsByTitle?.items) {
      setProducts(data.getCollectionsByTitle.items);
    }
  }, [category, data]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      <CategoryContainer>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;
