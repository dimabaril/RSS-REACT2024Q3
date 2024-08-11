import Root from "../components/root/Root";

export default function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return (
    <>
      <Root searchParams={searchParams} />
    </>
  );
}
