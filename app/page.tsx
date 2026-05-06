import type { Metadata } from "next";

import JsonLd from "./components/JsonLd";
import HomePageClient from "./components/HomePageClient";
import { createHomeMetadata, createHomeStructuredData } from "../lib/seo";

export const metadata: Metadata = createHomeMetadata();

export default function Home() {
  return (
    <>
      <JsonLd data={createHomeStructuredData()} />
      <HomePageClient />
    </>
  );
}
