import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { Cat, editProduct, fetchProducts } from "../../store/productsSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

interface FormData {
  name: string;
  origin: string;
  description: string;
  imgUrl: string;
}

const EditProductPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { items } = useSelector((state: RootState) => state.products);
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Cat | null>(null);

  useEffect(() => {
    if (!id) return;

    if (items.length === 0) {
      dispatch(fetchProducts());
    }

    const foundProduct = items.find((obj) => obj.id === id);
    setProduct(foundProduct || null);
  }, [id, items, dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
    imgUrl: product?.imgUrl ||  "",
      name: product?.name || "",
      origin: product?.origin || "",
      description: product?.description || "",
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        imgUrl: product.imgUrl,
        name: product.name,
        origin: product.origin,
        description: product.description,
      });
    }
  }, [product, reset]);

  const validateImgUrl = (value: string) => {
    return value.length > 0 || "Image url is required";
  };

  const validateName = (value: string) => {
    return value.length > 0 || "Name is required";
  };

  const validateOrigin = (value: string) => {
    return value.length > 0 || "Origin is required";
  };

  const validateDescription = (value: string) => {
    return value.length > 0 || "Description is required";
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (!id) return;

    const updatedProduct: Cat = {
      id: id,
      imgUrl: data.imgUrl,
      name: data.name,
      origin: data.origin,
      description: data.description,
      reference_image_id: "123",
    };

    dispatch(editProduct(updatedProduct));
    navigate("/products");
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Link to={"/products"}>
        <button>Вернуться назад</button>
      </Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="imgUrl">Img url</label>
          <input
            {...register("imgUrl", { validate: validateImgUrl })}
            id="imgUrl"
            type="text"
          />
          {errors.imgUrl && <div>{errors.imgUrl.message}</div>}
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            {...register("name", { validate: validateName })}
            id="name"
            type="text"
          />
          {errors.name && <div>{errors.name.message}</div>}
        </div>

        <div>
          <label htmlFor="origin">Origin</label>
          <input
            {...register("origin", { validate: validateOrigin })}
            id="origin"
            type="text"
          />
          {errors.origin && <div>{errors.origin.message}</div>}
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <input
            {...register("description", { validate: validateDescription })}
            id="description"
            type="text"
          />
          {errors.description && <div>{errors.description.message}</div>}
        </div>

        <button type="submit">Edit</button>
      </form>
    </>
  );
};

export default EditProductPage;
