import { getCollection } from "astro:content";

export const getSinglePage = async (collection: any) => {
  const allPage = await getCollection(collection);
  const removeIndex = allPage.filter((data) => data.id.match(/^(?!-)/));
  const removeDrafts = removeIndex.filter((data) => !data.draft);
  return removeDrafts.map(item => {
    const matched = item.slug?.match(/^\d{4}\/(\d{4})-(\d{2})-(\d{2})-(.*)$/)
    return {
      ...item,
      slug: matched ? matched.slice(1,5).join("/") + "/" : item.slug,
    }
  })
};