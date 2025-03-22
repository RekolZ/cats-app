import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { Cat, createProduct } from "../../store/productsSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid"; 

interface FormData {
  imgUrl: string;
  name: string;
  origin: string;
  description: string;
}

const CreateProductPage = () => {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()

  const generateUniqueId = () => uuidv4();

  const { register, handleSubmit, formState: {errors}} = useForm<FormData>()

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
    const product: Cat = {
      id: generateUniqueId(),
      name: data.name,
      origin: data.origin,
      description: data.description,
      reference_image_id: "",
      imgUrl: data.imgUrl
    };
    dispatch(createProduct(product));
    navigate('/products')
  };

  return (
    <>
      <Link to={"/products"}><button>Вернуться назад</button></Link>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <div>
          <label htmlFor="imgUrl">Image Url</label>
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
            id="name"
            type="text"
          />
          {errors.origin && <div>{errors.origin.message}</div>}
        </div>
        <div>
          <label htmlFor="description">Descriprion</label>
          <input
            {...register("description", { validate: validateDescription })}
            id="name"
            type="text"
          />
          {errors.description && <div>{errors.description.message}</div>}
        </div>

        <button type="submit">Create</button>
      </form>
    </>
  );
};

export default CreateProductPage;
