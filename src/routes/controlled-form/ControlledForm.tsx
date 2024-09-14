import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { addFormData } from "../../app/formDataSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import Header from "../../components/Header";
import PasswordStrengthMeter from "../../components/PasswordStrengthMeter";
import { GENDER } from "../../const/const";
import { fileToBase64 } from "../../helpers/fileToBase64";
import { FormInput } from "../../types/types";
import { schema } from "../../validation/validation";
import "./ControlledForm.scss";

export default function ControlledForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const countries = useAppSelector((state: RootState) => state.countries);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const password = watch("password", "");

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const base64Picture = await fileToBase64(data.picture[0]);
    dispatch(addFormData({ ...data, picture: base64Picture }));
    navigate("/");
  };

  return (
    <>
      <Header />

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">
          Name:
          <input placeholder="name" {...register("name")} />
        </label>
        <span className="error">{errors.name?.message}</span>

        <label htmlFor="age">
          Age:
          <input placeholder="age" type="number" {...register("age")} />
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
        <label>
          Password strength:
          <PasswordStrengthMeter password={password} />
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

        <button type="submit" disabled={Object.keys(errors).length > 0}>
          Submit
        </button>
      </form>
    </>
  );
}
