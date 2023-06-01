export async function getDescription(post) {
  const { remarkPluginFrontmatter } = await post.render();
  return remarkPluginFrontmatter.description;
}

export async function getDescriptions(posts) {
  return Promise.all(posts.map(getDescription));
}
