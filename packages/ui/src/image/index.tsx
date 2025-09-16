import React, { useState } from 'react';

interface IImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  fallbackComponent?: React.ReactNode;
}

function Image({
  src,
  alt,
  fallbackSrc,
  fallbackComponent,
  onError,
  ...props
}: IImageProps) {
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    setHasError(true);

    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
      return;
    }

    if (onError) {
      onError(event);
    }
  };

  if (hasError && fallbackComponent) {
    return <>{fallbackComponent}</>;
  }

  // 기본 에러 이미지
  if (hasError) {
    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f3f4f6',
          color: '#9ca3af',
          fontSize: '12px',
          fontWeight: '500',
          ...props.style,
        }}
        {...props}
      >
        🖼️ {/* 에러 시 대체 이미지는 미정 */}
      </div>
    );
  }

  return <img src={currentSrc} alt={alt} onError={handleError} {...props} />;
}

export default Image;
