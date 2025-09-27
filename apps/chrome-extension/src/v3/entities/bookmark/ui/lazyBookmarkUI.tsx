import { useEffect, useRef, useState } from 'react';

interface ILazyBookmarkUIProps {
  children: React.ReactNode;
  rootMargin?: string;
}

function LazyBookmarkUI({
  children,
  rootMargin = '50px',
}: ILazyBookmarkUIProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold: 0.1,
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        minHeight: isVisible ? 'auto' : `28px`,
      }}
    >
      {isVisible ? (
        children
      ) : (
        <div
          style={{
            width: '100%',
            height: `28px`,
            backgroundColor: '#f9fafb',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            opacity: 0.6,
          }}
        >
          <div
            style={{
              width: '16px',
              height: '16px',
              backgroundColor: '#e5e7eb',
              borderRadius: '3px',
              marginRight: '12px',
            }}
          />
          <div
            style={{
              flex: 1,
              height: '14px',
              backgroundColor: '#e5e7eb',
              borderRadius: '2px',
            }}
          />
        </div>
      )}
    </div>
  );
}

export default LazyBookmarkUI;
