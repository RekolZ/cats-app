import { useState } from "react";
import DeleteIcon from "./assets/icons/DeleteIcon";
import HeartIcon from "./assets/icons/HeartIcon";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteProduct, Cat, deleteProduct } from "../store/productsSlice";
import { RootState } from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "./assets/icons/EditIcon";

interface Props {
  id: string;
  name: string;
  origin: string;
  refImgId: string;
  imgUrl?: string;
}
export interface SVGIconProps {
  onClick: (e: React.MouseEvent<SVGSVGElement>) => void;
  color?: string;
}

export const ProductItem: React.FC<Props> = ({
  id,
  name,
  origin,
  refImgId,
  imgUrl,
}) => {
  const [color, setColor] = useState("#fff");

  const dispatch = useDispatch();
  const { items, favoriteItems } = useSelector(
    (state: RootState) => state.products
  );

  const navigate = useNavigate()

  const isFavorite = favoriteItems.some((obj) => obj.id === id);

  const heartClickHandler = (event: React.MouseEvent<SVGSVGElement>): void => {
    event.preventDefault();
    color == "#fff" ? setColor("#f93f93") : setColor("#fff");
    const favoriteProduct: Cat | undefined = items.find((obj) => obj.id === id);
    if (favoriteProduct) dispatch(addFavoriteProduct(favoriteProduct));
  };

  const deleteClickHandler = (event: React.MouseEvent<SVGSVGElement>): void => {
    event.preventDefault();
    const product: Cat | undefined = items.find((obj) => obj.id === id);
    if (product) dispatch(deleteProduct(product));
  };

  const editClickHandler = (event: React.MouseEvent<SVGSVGElement>): void => {
    event.preventDefault();
    navigate(`/edit-product/${id}`);
  };

  return (
    <Link to={`/products/${id}`} style={{ textDecoration: "none" }}>
      <div className="card">
        <img
          src={
            imgUrl || "https://cdn2.thecatapi.com/images/" + refImgId + ".jpg"
          }
          alt={imgUrl + ".png"}
        />
        <div>
          <p>{name}</p>
          <p>{origin}</p>
        </div>
        <div>
          <HeartIcon
            onClick={heartClickHandler}
            color={isFavorite ? "#f93f93" : "#fff"}
          />
          <EditIcon onClick={editClickHandler} />
          <DeleteIcon onClick={deleteClickHandler} />
        </div>
      </div>
    </Link>
  );
};
