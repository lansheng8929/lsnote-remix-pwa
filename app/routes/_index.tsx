import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import React from "react";

export async function loader({ request }: LoaderFunctionArgs) {
  return null;
}

export default function Index() {
  return <>index</>;
}
