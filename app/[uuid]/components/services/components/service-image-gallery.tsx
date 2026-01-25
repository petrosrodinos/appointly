"use client";

import { useState } from "react";
import Image from "next/image";
import ImageModal from "../image-modal";

interface ServiceImageGalleryProps {
  images: Array<{ url: string; alt?: string }>;
  service_name: string;
}

export const ServiceImageGallery = ({ images, service_name: serviceName }: ServiceImageGalleryProps) => {
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setImageModalOpen(true);
  };

  return (
    <>
      <div className="relative w-full lg:w-64 h-48 lg:h-40 flex-shrink-0 cursor-pointer group" onClick={() => handleImageClick(0)}>
        <Image src={images[0].url || "/placeholder-service.jpg"} alt={serviceName} fill sizes="(max-width: 1024px) 100vw, 256px" className="object-cover rounded-l-lg lg:rounded-l-lg lg:rounded-r-none group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-l-lg lg:rounded-l-lg lg:rounded-r-none group-hover:from-black/20 transition-colors duration-300" />
        {images.length > 1 && <div className="absolute top-3 right-3 bg-card/90 rounded-full px-2 py-1 text-xs font-medium text-card-foreground shadow-md">+{images.length - 1}</div>}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/50 rounded-full p-2">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>
      </div>
      <ImageModal images={images} isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)} initialIndex={selectedImageIndex} />
    </>
  );
};
