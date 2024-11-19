'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Post } from '@/types';
import { Star } from 'lucide-react';

interface PostListProps {
  posts?: Post[];
  initialPosts?: Post[];
  showFavoritesOnly?: boolean;
}

export default function PostList({ 
  posts: serverPosts,
  initialPosts = [],
  showFavoritesOnly = false 
}: PostListProps) {
    
    const [posts, setPosts] = useState<Post[]>(serverPosts || initialPosts);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [loading, setLoading] = useState(showFavoritesOnly);
    
    useEffect(() => {
        console.log("post ---",posts);
    const fetchFavorites = async () => {
      try {
        const response = await fetch('http://localhost:3001/favorites');
        const data = await response.json();
        if (showFavoritesOnly) {
          setPosts(data);
        }
        setFavorites(data.map((post: Post) => post.id));
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [showFavoritesOnly]);

  const toggleFavorite = async (post: Post) => {
    try {
      if (favorites.includes(post.id)) {
        await fetch(`http://localhost:3001/favorites/${post.id}`, {
          method: 'DELETE',
        });
        setFavorites(favorites.filter(id => id !== post.id));
        if (showFavoritesOnly) {
          setPosts(posts.filter(p => p.id !== post.id));
        }
      } else {
        await fetch('http://localhost:3001/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ postId: post.id, post }),
        });
        setFavorites([...favorites, post.id]);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px] text-gray-500 animate-fade-in">
        No posts found
      </div>
    );
  }

  return (
    <div className="blog-grid">
      {posts.map((post, index) => (
        <div
          key={post.id}
          className="blog-card"
          style={{ animationDelay: `${index * 0.1}s` }}
          onAnimationEnd={(e) => e.currentTarget.classList.remove('opacity-0')}
        >
          <div className="blog-card-content">
            <div className="flex justify-between items-start gap-4">
              <Link href={`/post/${post.id}`} className="flex-1">
                <h2 className="blog-title text-black">{post.title}</h2>
              </Link>
              <button
                onClick={() => toggleFavorite(post)}
                className="favorite-button"
                aria-label={favorites.includes(post.id) ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Star
                  size={24}
                  className={`transition-colors duration-300 ${
                    favorites.includes(post.id) 
                      ? 'text-yellow-500 fill-yellow-500' 
                      : 'text-gray-400 hover:text-yellow-500'
                  }`}
                />
              </button>
            </div>
            <p className="blog-body">{post.body}</p>
            <div className="pt-4 flex justify-between items-center text-sm text-gray-500">
              <span>User {post.userId}</span>
              <Link 
                href={`/post/${post.id}`}
                className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
              >
                Read more →
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}