import { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  return null;
}

export default function Index() {
  return (
    <>
      <section className=" posts overflow-hidden">posts</section>
    </>
  );
}
