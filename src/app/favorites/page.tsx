import PostList from "@/components/PostList";

export default function FavoritesPage() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Favorite Posts</h1>
      <PostList initialPosts={[]} showFavoritesOnly={true} />
    </div>
  );
}