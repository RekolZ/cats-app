import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { ProductItem } from "../ProductItem";
import { Cat, fetchProducts } from "../../store/productsSlice";
import { Link } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { items, favoriteItems } = useSelector(
    (state: RootState) => state.products
  );

  const [isFavorite, setIsFavorite] = useState(false);
  const [value, setValue] = useState("");
  const [products, setProducts] = useState<Cat[]>([]);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items]);

  useEffect(() => {
    if (value) {
      const filtered = isFavorite
        ? favoriteItems.filter((product) =>
            product.name.toLowerCase().includes(value)
          )
        : items.filter((product) => product.name.toLowerCase().includes(value));
      setProducts(filtered);
    } else {
      setProducts(isFavorite ? favoriteItems : items);
    }
  }, [value, items, isFavorite, favoriteItems]);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.toLowerCase());
  };

  return (
    <>
      <div className="header">
        <Link to={"/create-product"}>
          <button>Создать</button>
        </Link>
        <input
          type="text"
          placeholder="Поиск"
          onChange={inputHandler}
          value={value}
        />
      </div>
      <div>
        <button onClick={() => setIsFavorite(!isFavorite)}>
          {isFavorite ? "Показать все" : "Отфильтровать избранное"}
        </button>
      </div>
      {products.map((obj) => (
        <ProductItem
          key={obj.id}
          id={obj.id}
          name={obj.name}
          origin={obj.origin}
          refImgId={obj.reference_image_id}
          imgUrl={obj.imgUrl}
        />
      ))}
    </>
  );
};

export default HomePage;
