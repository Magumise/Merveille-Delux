import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FiZoomIn, FiZoomOut, FiDownload, FiShare2 } from 'react-icons/fi';

interface LightboxGalleryProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export default function LightboxGallery({ images, initialIndex, onClose }: LightboxGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation and zoom
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
      if (e.key === '+' || e.key === '=') {
        setScale(prev => Math.min(prev + 0.25, 3));
      }
      if (e.key === '-') {
        setScale(prev => Math.max(prev - 0.25, 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length, onClose]);

  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Reset position and scale when changing images
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [currentIndex]);

  // Handle mouse/touch events for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle touch events for swiping and panning
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    if (scale > 1) {
      setIsDragging(true);
      setStartPos({ x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;

    if (isDragging && scale > 1) {
      // Handle panning when zoomed in
      setPosition({
        x: e.touches[0].clientX - startPos.x,
        y: e.touches[0].clientY - startPos.y
      });
    } else {
      // Handle swiping between images when not zoomed
      const currentTouch = e.touches[0].clientX;
      const diff = touchStart - currentTouch;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          // Swipe left
          setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        } else {
          // Swipe right
          setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
        }
        setTouchStart(null);
      }
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
    setIsDragging(false);
  };

  // Handle image download
  const handleDownload = async () => {
    try {
      const response = await fetch(images[currentIndex]);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `property-image-${currentIndex + 1}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  // Handle image sharing
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Property Image',
          text: 'Check out this property image!',
          url: images[currentIndex]
        });
      } else {
        // Fallback to copying link to clipboard
        await navigator.clipboard.writeText(images[currentIndex]);
        alert('Image URL copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing image:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
      {/* Controls */}
      <div className="absolute top-4 right-4 flex items-center gap-4 z-50">
        <button
          onClick={() => setScale(prev => (prev === 1 ? 2 : 1))}
          className="text-white hover:text-gray-300 p-2"
          aria-label={scale === 1 ? "Zoom in" : "Zoom out"}
        >
          {scale === 1 ? <FiZoomIn size={24} /> : <FiZoomOut size={24} />}
        </button>
        <button
          onClick={handleDownload}
          className="text-white hover:text-gray-300 p-2"
          aria-label="Download image"
        >
          <FiDownload size={24} />
        </button>
        <button
          onClick={handleShare}
          className="text-white hover:text-gray-300 p-2"
          aria-label="Share image"
        >
          <FiShare2 size={24} />
        </button>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-300 text-4xl p-2"
          aria-label="Close lightbox"
        >
          ×
        </button>
      </div>

      {/* Image counter */}
      <div className="absolute top-4 left-4 text-white z-50">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Main image */}
      <div 
        className="relative w-full h-full flex items-center justify-center"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: isDragging ? 'grabbing' : scale > 1 ? 'grab' : 'default' }}
      >
        <div 
          className="relative w-[90vw] h-[90vh] transition-transform duration-200"
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
          }}
        >
          <Image
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            layout="fill"
            objectFit="contain"
            quality={100}
            priority
          />
        </div>

        {/* Navigation buttons */}
        {images.length > 1 && scale === 1 && (
          <>
            <button
              onClick={() => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
              className="absolute left-4 text-white hover:text-gray-300 text-6xl font-light"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
              className="absolute right-4 text-white hover:text-gray-300 text-6xl font-light"
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex justify-center gap-2 px-4 overflow-x-auto">
          {images.map((url, index) => (
            <button
              key={url}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden transition-opacity ${
                currentIndex === index ? 'ring-2 ring-white opacity-100' : 'opacity-50 hover:opacity-100'
              }`}
            >
              <Image
                src={url}
                alt={`Thumbnail ${index + 1}`}
                layout="fill"
                objectFit="cover"
                priority
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 