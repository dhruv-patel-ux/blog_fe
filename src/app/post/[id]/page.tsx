import { notFound } from "next/navigation";
import PostDetail from "@/components/PostDetail";

async function getPost(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 3600 },
  });
  
  if (!res.ok) {
    return null;
  }

  return res.json();
}

async function getComments(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`, {
    next: { revalidate: 3600 },
  });
  
  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const [post, comments] = await Promise.all([
    getPost(params.id),
    getComments(params.id),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <div className="p-4">
      <PostDetail post={post} comments={comments} />
    </div>
  );
}
