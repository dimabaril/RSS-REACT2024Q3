import { countries } from "countries-list";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { addFormData } from "../../app/formDataSlice";
import { fileToBase64 } from "../../app/helpers/fileToBase64";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import Header from "../../components/Header";
import PasswordStrengthMeter from "../../components/PasswordStrengthMeter";
import { UncontrolledFormInput } from "../../types/types";

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
  .matches(/[a-z]/, "password must contain at least one lowercase letter")
  .matches(/[A-Z]/, "password must contain at least one uppercase letter")
  .matches(/\d/, "password must contain at least one number")
  .matches(
    /[~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]/,
    "password must contain at least one special character",
  )
  .min(8, "password must be at least 8 characters long");

const schema = yup.object().shape({
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

export default function UnControlledForm() {
  const [errors, setErrors] = useState<{ [key: string]: { message: string } }>(
    {},
  );

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const acceptTermsConditionsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const countries = useAppSelector((state: RootState) => state.countries);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validate = async (data: UncontrolledFormInput) => {
    try {
      await schema.validate(data, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: { [key: string]: { message: string } } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = { message: error.message };
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      gender: genderRef.current?.value,
      acceptTermsConditions: acceptTermsConditionsRef.current?.checked,
      picture: pictureRef.current?.files,
      country: countryRef.current?.value,
    };
    console.log(data);

    if (!(await validate(data))) {
      return;
    }

    if (!pictureRef.current?.files) return;
    const base64Picture = await fileToBase64(pictureRef.current?.files[0]);
    dispatch(addFormData({ ...data, picture: base64Picture }));
    navigate("/");
  };

  return (
    <>
      <Header />

      <form className="form" onSubmit={onSubmit}>
        <label htmlFor="name">
          Name:
          <input name="name" placeholder="name" ref={nameRef} />
        </label>
        <span className="error">{errors.name?.message}</span>

        <label htmlFor="age">
          Age:
          <input name="age" placeholder="age" type="number" ref={ageRef} />
        </label>
        <span className="error">{errors.age?.message}</span>

        <label htmlFor="email">
          Email:
          <input
            name="email"
            placeholder="yourmail@mail.com"
            type="email"
            ref={emailRef}
          />
        </label>
        <span className="error">{errors.email?.message}</span>

        <label htmlFor="password">
          Password:
          <input
            name="password"
            placeholder="password"
            type="password"
            ref={passwordRef}
          />
        </label>
        <label>
          Password strength:
          <PasswordStrengthMeter password={passwordRef.current?.value || ""} />
        </label>
        <span className="error">{errors.password?.message}</span>

        <label htmlFor="confirmPassword">
          Confirm Password:
          <input
            name="confirmPassword"
            placeholder="password"
            type="password"
            ref={confirmPasswordRef}
          />
        </label>
        <span className="error">{errors.confirmPassword?.message}</span>

        <label htmlFor="gender">
          Gender:
          <select name="gender" ref={genderRef}>
            <option value="">select...</option>
            {GENDER.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </label>
        <span className="error">{errors.gender?.message}</span>

        <label htmlFor="acceptTermsConditions">
          <input
            name="acceptTermsConditions"
            type="checkbox"
            ref={acceptTermsConditionsRef}
          />
          Accept Terms and Conditions
        </label>
        <span className="error">{errors.acceptTermsConditions?.message}</span>

        <label htmlFor="picture">
          Picture:
          <input name="picture" type="file" ref={pictureRef} />
        </label>
        <span className="error">{errors.picture?.message}</span>

        <label htmlFor="country">
          Country:
          <input
            name="country"
            list="countries"
            placeholder="country"
            ref={countryRef}
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
    </>
  );
}
