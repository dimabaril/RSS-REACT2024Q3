import type { FormInputPictureBase64 } from "../types/types";
import "./FormData.scss";

export default function FormData(data: FormInputPictureBase64) {
  return (
    <>
      <h2>Submitted form data:</h2>
      <ul className="form-data">
        <li className="form-data__name">Name: {data.name}</li>
        <li className="form-data__age">Age: {data.age}</li>
        <li className="form-data__email">Email: {data.email}</li>
        <li className="form-data__password">Password: {data.password}</li>
        <li className="form-data__gender">Gender: {data.gender}</li>
        <li className="form-data__picture">
          Picture: <img src={data.picture} alt="img" />
        </li>
        <li className="form-data__country">Country: {data.country}</li>
      </ul>
    </>
  );
}
