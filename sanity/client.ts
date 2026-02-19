import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// IMPORT the keys from the file that already has them
import { projectId, dataset, apiVersion } from "./env"; 

export const client = createClient({
  projectId, 
  dataset,
  apiVersion,
  useCdn: false, // Set to false so updates happen immediately
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}