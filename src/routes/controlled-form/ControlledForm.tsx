import { yupResolver } from "@hookform/resolvers/yup";
import { countries } from "countries-list";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { addFormData } from "../../app/formDataSlice";
import { fileToBase64 } from "../../app/helpers/fileToBase64";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { FormInput } from "../../types/types";
import "./ControlledForm.scss";

const FILE_SIZE = 1024 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
const GENDER = ["male", "female", "other"];

const firstUppercaseLetterSchema = yup
  .string()
  .required("name is required")
  .test(
    "first-uppercase-letter",
    "the first letter must be uppercase",
    (value) => {
      if (!value) return false;
      return /^[A-Z]/.test(value);
    },
  );

const passwordSchema = yup
  .string()
  .required("password is required")
  .min(8, "password must be at least 8 characters long")
  .matches(/[a-z]/, "password must contain at least one lowercase letter")
  .matches(/[A-Z]/, "password must contain at least one uppercase letter")
  .matches(/\d/, "password must contain at least one number")
  .matches(/[@$!%*?&]/, "password must contain at least one special character");

const schema = yup.object().shape({
  name: firstUppercaseLetterSchema,
  age: yup
    .number()
    .typeError("age must be a number")
    .required("age is required")
    .max(100, "age must be less than 100")
    .positive()
    .integer(),
  email: yup.string().required("email is required").email(),
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .required("confirm Password is required")
    .oneOf([yup.ref("password")], "passwords must match"),
  gender: yup
    .mixed<"male" | "female" | "other">()
    .required("gender is required")
    .oneOf(["male", "female", "other"]),
  acceptTermsConditions: yup
    .boolean()
    .required("accept T&C is required")
    .oneOf([true], "accept T&C is required"),
  picture: yup
    .mixed<FileList>()
    .required("file is required")
    .test("required", "file is required", (files) => {
      return files && files.length > 0;
    })
    .test(
      "fileSize",
      `file size must not be more than ${FILE_SIZE}`,
      (files) => {
        if (files[0]) {
          return files[0].size <= FILE_SIZE;
        }
        return true;
      },
    )
    .test("fileFormat", "only jpeg and png files are allowed", (files) => {
      if (files[0]) {
        return SUPPORTED_FORMATS.includes(files[0].type);
      }
      return true;
    }),
  country: yup
    .string()
    .required("country is required")
    .oneOf(
      Object.values(countries).map((country) => country.name),
      "invalid country",
    ),
});

export default function ControlledForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const countries = useAppSelector((state: RootState) => state.countries);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    console.log(data);
    const base64Picture = await fileToBase64(data.picture[0]);
    dispatch(addFormData({ ...data, picture: base64Picture }));
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">
        Name:
        <input placeholder="name" {...register("name")} />
      </label>
      <span className="error">{errors.name?.message}</span>

      <label htmlFor="age">
        Age:
        <input placeholder="35" type="number" {...register("age")} />
      </label>
      <span className="error">{errors.age?.message}</span>

      <label htmlFor="email">
        Email:
        <input
          placeholder="yourmail@mail.com"
          type="email"
          {...register("email")}
        />
      </label>
      <span className="error">{errors.email?.message}</span>

      <label htmlFor="password">
        Password:
        <input
          placeholder="password"
          type="password"
          {...register("password")}
        />
      </label>
      <span className="error">{errors.password?.message}</span>

      <label htmlFor="confirmPassword">
        Confirm Password:
        <input
          placeholder="password"
          type="password"
          {...register("confirmPassword")}
        />
      </label>
      <span className="error">{errors.confirmPassword?.message}</span>

      <label htmlFor="gender">
        Gender:
        <select {...register("gender")}>
          <option value="">select...</option>
          {GENDER.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
      </label>
      <span className="error">{errors.gender?.message}</span>

      <label>
        <input type="checkbox" {...register("acceptTermsConditions")} />
        Accept Terms and Conditions
      </label>
      <span className="error">{errors.acceptTermsConditions?.message}</span>

      <label htmlFor="picture">
        Picture:
        <input type="file" {...register("picture")} />
      </label>
      <span className="error">{errors.picture?.message}</span>

      <label htmlFor="country">
        Country:
        <input
          list="countries"
          placeholder="country"
          {...register("country")}
        />
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
      </label>
      <span className="error">{errors.country?.message}</span>

      <button type="submit">Submit</button>
    </form>
  );
}
