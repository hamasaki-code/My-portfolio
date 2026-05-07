import type { Metadata } from "next";

import HomePageClient from "./components/HomePageClient";
import { createHomeMetadata } from "../lib/seo";

export const metadata: Metadata = createHomeMetadata();

export default function Home() {
  return <HomePageClient />;
}
