import PostList from "@/components/PostList";

async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <PostList posts={posts} />
    </div>
  );
}
