import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { addFormData } from "../../app/formDataSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import Header from "../../components/Header";
import PasswordStrengthMeter from "../../components/PasswordStrengthMeter";
import { GENDER } from "../../const/const";
import { fileToBase64 } from "../../helpers/fileToBase64";
import { UncontrolledFormInput } from "../../types/types";
import { schema } from "../../validation/validation";

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

        <label>
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
