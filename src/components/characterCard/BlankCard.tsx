import { matchPath, useNavigation } from "react-router-dom";

import Loader from "../loader/Loader";

export default function BlankCard() {
  const navigation = useNavigation();

  const isLoading =
    navigation.state === "loading" &&
    matchPath("/people/:id", navigation.location.pathname);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="character-card">
          <div>Select some persona, for details</div>
        </section>
      )}
    </>
  );
}
