'use client';

import { Post, Comment } from '@/types';
import { Star } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PostDetailProps {
  post: Post;
  comments: Comment[];
}

export default function PostDetail({ post, comments }: PostDetailProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const response = await fetch('http://localhost:3001/favorites');
        const favorites = await response.json();
        setIsFavorite(favorites.some((fav: Post) => fav.id === post.id));
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };

    checkFavoriteStatus();
  }, [post.id]);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await fetch(`http://localhost:3001/favorites/${post.id}`, {
          method: 'DELETE',
        });
        setIsFavorite(false);
      } else {
        await fetch('http://localhost:3001/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ postId: post.id, post }),
        });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-start gap-4">
            <h1 className="text-3xl font-bold text-gray-900 animate-slide-in">
              {post.title}
            </h1>
            <button
              onClick={toggleFavorite}
              className="favorite-button animate-scale-in"
            >
              <Star
                size={28}
                className={`transition-colors duration-300 ${
                  isFavorite 
                    ? 'text-yellow-500 fill-yellow-500' 
                    : 'text-gray-400 hover:text-yellow-500'
                }`}
              />
            </button>
          </div>
          <div className="mt-6 text-gray-700 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {post.body}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 animate-slide-in" style={{ animationDelay: '0.3s' }}>
            Comments
          </h2>
          <div className="space-y-6">
            {comments.map((comment, index) => (
              <div
                key={comment.id}
                className="border-b border-gray-100 last:border-0 pb-6 last:pb-0 opacity-0 animate-fade-in"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                onAnimationEnd={(e) => e.currentTarget.classList.remove('opacity-0')}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{comment.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{comment.email}</p>
                    <p className="mt-3 text-gray-700">{comment.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}