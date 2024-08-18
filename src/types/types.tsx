export type FormInput = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: "male" | "female" | "other";
  acceptTermsConditions: boolean;
  picture: FileList;
  country: string;
};

export type UncontrolledFormInput = {
  name: string | undefined;
  age: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
  gender: string | undefined;
  acceptTermsConditions: boolean | undefined;
  picture: FileList | null | undefined;
  country: string | undefined;
};

export type FormInputPictureBase64 =
  | (Omit<FormInput, "picture"> & {
      picture: string;
    })
  | (Omit<UncontrolledFormInput, "picture"> & {
      picture: string;
    });
