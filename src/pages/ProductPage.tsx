import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { Cat } from "../../store/productsSlice";
import { getProductById } from "../api/api";

const ProductPage = () => {
  const { items } = useSelector((state: RootState) => state.products);

  const { id } = useParams();

  const [product, setProduct] = useState<Cat | null>(null);

  useEffect(() => {
    if (!id) return;

    if (items.length === 0) {
      getProductById(id).then(setProduct);
    } else {
      setProduct(items.find((obj) => obj.id === id) || null);
    }
  }, [items, id]);

  if (product)
    return (
      <>
        <Link to={"/products"}>
          <button className="back">Вернуться назад</button>
        </Link>
        <p>
          <img
            className="product-img"
            src={
              product.imgUrl ||
              "https://cdn2.thecatapi.com/images/" +
                product.reference_image_id +
                ".jpg"
            }
            alt=""
          />
        </p>
        <div>{product.name}</div>
        <div>{product.origin}</div>
        <div>{product.description}</div>
      </>
    );
};

export default ProductPage;
