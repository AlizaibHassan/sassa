'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface RedirectTimerProps {
  message: string;
  redirectTo: string;
}

export default function RedirectTimer({
  message,
  redirectTo
}: RedirectTimerProps) {
  const router = useRouter();
  const [counter, setCounter] = useState(2);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(redirectTo);
    }, 2000); // Match CSS animation duration

    const countInterval = setInterval(() => {
      setCounter(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countInterval);
    };
  }, [redirectTo, router]);

  const handleSkip = () => {
    router.push(redirectTo);
  };

  return (
    <div className="blog-empty">
      <div className="blog-redirect-container">
        <h2 className="blog-empty-title">{message}</h2>
        <p className="blog-redirect-message">
          Redirecting to homepage in {counter} second{counter !== 1 ? 's' : ''}...
        </p>
        <div className="blog-redirect-progress" />
        <button
          onClick={handleSkip}
          className="blog-redirect-skip"
        >
          Skip
        </button>
      </div>
    </div>
  );
}