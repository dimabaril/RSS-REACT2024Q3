import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import "./ControlledForm.scss";

interface IFormInput {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: "male" | "female" | "other";
  acceptTermsConditions: boolean;
  picture: FileList;
  country: string;
}

const FILE_SIZE = 1024 * 1024; // Максимальный размер файла - 1MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const firstUppercaseLetterSchema = yup
  .string()
  .required("Name is required")
  .test(
    "first-uppercase-letter",
    "The first letter must be uppercase",
    (value) => {
      if (!value) return false;
      return /^[A-Z]/.test(value);
    },
  );

const passwordSchema = yup
  .string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters long")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/\d/, "Password must contain at least one number")
  .matches(/[@$!%*?&]/, "Password must contain at least one special character");

const schema = yup.object().shape({
  name: firstUppercaseLetterSchema,
  age: yup
    .number()
    .typeError("Age is required")
    .required("Age is required")
    .max(100, "Age must be less than 100")
    .positive()
    .integer(),
  email: yup.string().required("Email is required").email(),
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  gender: yup
    .mixed<"male" | "female" | "other">()
    .required("Gender is required")
    .oneOf(["male", "female", "other"]),
  acceptTermsConditions: yup
    .boolean()
    .required("Accept T&C is required")
    .oneOf([true], "Accept T&C is required"),
  picture: yup
    .mixed<FileList>()
    .required("File is required")
    .test("required", "File is required", (files) => {
      return files && files.length > 0;
    })
    .test(
      "fileSize",
      `File size must not be more than ${FILE_SIZE}`,
      (files) => {
        if (files[0]) {
          return files[0].size <= FILE_SIZE;
        }
        return true;
      },
    )
    .test("fileFormat", "Only jpeg and png files are allowed", (files) => {
      if (files[0]) {
        return SUPPORTED_FORMATS.includes(files[0].type);
      }
      return true;
    }),
  country: yup.string().required("Country is required"),
});

export default function ControlledForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">
        Name
        <input placeholder="name" {...register("name")} />
      </label>
      {errors.name && <p>{errors.name.message}</p>}
      <label htmlFor="age">
        Age
        <input placeholder="35" type="number" {...register("age")} />
      </label>
      {errors.age && <p>{errors.age.message}</p>}
      <label htmlFor="email">
        Email
        <input
          placeholder="yourmail@mail.com"
          type="email"
          {...register("email")}
        />
      </label>
      {errors.email && <p>{errors.email.message}</p>}
      <label htmlFor="password">
        Password
        <input
          placeholder="password"
          type="password"
          {...register("password")}
        />
      </label>
      {errors.password && <p>{errors.password.message}</p>}
      <label htmlFor="confirmPassword">
        Confirm Password
        <input
          placeholder="password"
          type="password"
          {...register("confirmPassword")}
        />
      </label>
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      <label htmlFor="gender">
        Gender
        <select {...register("gender")}>
          <option value="">select...</option>
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="other">other</option>
        </select>
      </label>
      {errors.gender && <p>{errors.gender.message}</p>}
      <label>
        <input type="checkbox" {...register("acceptTermsConditions")} />
        Accept Terms and Conditions
      </label>
      {errors.acceptTermsConditions && (
        <p>{errors.acceptTermsConditions.message}</p>
      )}
      <label htmlFor="picture">
        Picture
        <input type="file" {...register("picture")} />
      </label>
      {errors.picture && <p>{errors.picture.message}</p>}
      <label htmlFor="country">
        Country
        <input {...register("country")} />
      </label>
      {errors.country && <p>{errors.country.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}
