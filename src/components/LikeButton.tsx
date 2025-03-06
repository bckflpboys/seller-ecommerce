import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

interface LikeButtonProps {
  productId: string;
  initialIsLiked?: boolean;
  onLikeChange?: (isLiked: boolean) => void;
}

export default function LikeButton({ productId, initialIsLiked = false, onLikeChange }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Check if product is liked when session changes
    const checkIfLiked = async () => {
      if (session?.user) {
        console.log('Checking like status for:', { productId, user: session.user.email });
        try {
          // Add timestamp to prevent caching
          const timestamp = new Date().getTime();
          const res = await fetch(
            `/api/users/favorites/check?productId=${productId}&t=${timestamp}`,
            {
              headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache'
              }
            }
          );
          
          if (!res.ok) {
            throw new Error('Failed to check favorite status');
          }

          const data = await res.json();
          console.log('Check response:', data);
          setIsLiked(data.isFavorite);
        } catch (error) {
          console.error('Error checking like status:', error);
        }
      }
    };

    checkIfLiked();
  }, [session, productId]);

  const handleLike = async () => {
    if (!session) {
      console.log('No session, redirecting to signin');
      router.push('/auth/signin');
      return;
    }

    if (!productId) {
      console.error('No product ID provided');
      return;
    }

    setIsLoading(true);
    console.log('Updating like status:', { 
      productId, 
      user: session.user.email, 
      action: isLiked ? 'unlike' : 'like' 
    });

    try {
      const res = await fetch('/api/users/favorites', {
        method: isLiked ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();
      console.log('Update response:', data);

      if (!res.ok) {
        throw new Error(data.message || 'Failed to update favorite');
      }

      if (!data.success) {
        throw new Error(data.message || 'Operation failed');
      }

      const newIsLiked = !isLiked;
      console.log('Setting new like status:', newIsLiked);
      setIsLiked(newIsLiked);
      onLikeChange?.(newIsLiked);
    } catch (error) {
      console.error('Error updating favorite:', error);
      // Don't throw the error, just log it
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={isLoading}
      className={`p-2 rounded-full transition-all duration-200 ${
        isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
      }`}
      aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={`h-6 w-6 transition-colors ${
          isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'
        }`}
      />
    </button>
  );
}
