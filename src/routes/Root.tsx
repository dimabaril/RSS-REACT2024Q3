import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import FormData from "../components/FormData";
import Header from "../components/Header";

export default function Root() {
  const formData = useAppSelector((state: RootState) => state.formData);

  return (
    <>
      <Header />
      {formData.length === 0 && <h2>No data to display</h2>}
      {formData.map((data, index) => (
        <FormData {...data} key={index} />
      ))}
    </>
  );
}
