import { sortByDate } from "@/lib/utils/sortFunctions";

// prev/next post
const prevNextPost = (post: any, posts: any) => {
  const sortedPosts = sortByDate(posts);
  const i = sortedPosts.findIndex(p => p.id == post.id);
  return {
    prev: sortedPosts[i - 1],
    next: sortedPosts[i + 1],
  }
};

export default prevNextPost;
