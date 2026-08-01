/**
 * Route constants, kept separate from `@/data/opportunities` so that the
 * navbar, hero and footer can link to Get Involved without pulling the full
 * 17 KB opportunity dataset into the entry chunk.
 */
export const GET_INVOLVED_PATH = "/get-involved";

export function opportunityPath(slug: string): string {
  return `${GET_INVOLVED_PATH}/${slug}`;
}
