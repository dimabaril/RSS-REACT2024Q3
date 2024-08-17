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

export type FormInputPictureBase64 = Omit<FormInput, "picture"> & {
  picture: string;
};
