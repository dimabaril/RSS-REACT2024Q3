import { countries } from "countries-list";
import * as yup from "yup";

import { FILE_SIZE, SUPPORTED_FORMATS } from "../const/const";

const firstUppercaseLetterSchema = yup
  .string()
  .required("name is required")
  .test(
    "first-uppercase-letter",
    "the first letter must be uppercase",
    (value) => {
      if (!value) return false;
      return /^\p{Lu}/u.test(value);
    },
  );

const passwordSchema = yup
  .string()
  .required("password is required")
  .matches(/[a-z]/, "password must contain at least one lowercase letter")
  .matches(/[A-Z]/, "password must contain at least one uppercase letter")
  .matches(/\d/, "password must contain at least one number")
  .matches(
    /[~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]/,
    "password must contain at least one special character",
  )
  .min(8, "password must be at least 8 characters long");

export const schema = yup.object().shape({
  name: firstUppercaseLetterSchema,
  age: yup
    .number()
    .required("age is required")
    .typeError("age must be a number")
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
