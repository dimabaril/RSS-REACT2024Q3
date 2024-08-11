import CharacterDetails from "../../../components/characterDetails/CharacterDetails";
import Root from "../../../components/root/Root";

export default function Page({
  searchParams,
  params,
}: {
  searchParams: Record<string, string>;
  params: Record<string, string>;
}) {
  return (
    <>
      <Root searchParams={searchParams} />
      <CharacterDetails params={params} />
    </>
  );
}
