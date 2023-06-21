export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatBlogPosts(
  posts,
  {
    filterOutDrafts = true,
    filterOutFuturePosts = true,
    sortByDate = true,
    limit = undefined,
  } = {}
) {
  const filteredPosts = posts.reduce((acc, post) => {
    const { date, draft } = post.frontmatter;

    if (filterOutDrafts && draft) {
      return acc;
    }

    if (filterOutFuturePosts && new Date(date) > new Date()) {
      return acc;
    }

    acc.push(post);

    return acc;
  }, []);

  if (sortByDate) {
    filteredPosts.sort((a, b) => {
      const aDate = new Date(a.frontmatter.date);
      const bDate = new Date(b.frontmatter.date);

      return bDate - aDate;
    });
  } else {
    filteredPosts.sort(() => Math.random() - 0.5);
  }

  if (typeof limit === "number") {
    return filteredPosts.slice(0, limit);
  }

  return filteredPosts;
}
