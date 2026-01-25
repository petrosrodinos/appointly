"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";
import ImageModal from "./services/image-modal";
import type { Document } from "@/features/documents/interfaces/documents.interfaces";

interface AccountImageGalleryProps {
  images: Document[];
  providerTitle: string;
}

const AccountImageGallery = ({ images, providerTitle }: AccountImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const previewLayout = ["sm:col-span-3 sm:row-span-2", "sm:col-span-2 sm:row-span-1", "sm:col-span-2 sm:row-span-1"];

  const modalImages = images.map((image) => ({
    url: image.url,
    alt: `${providerTitle}`,
  }));

  const getPreviewClass = (index: number) => previewLayout[index % previewLayout.length];

  if (images.length === 0) {
    return null;
  }

  return (
    <section>
      <Card className="border-0 bg-transparent shadow-none">
        <CardHeader className="px-4 sm:px-0">
          <h2 className="text-2xl md:text-3xl font-bold  flex items-center gap-3">Gallery</h2>
        </CardHeader>
        <CardContent className="relative px-0">
          <div className="grid auto-rows-[180px] grid-cols-1 gap-4 sm:auto-rows-[120px] sm:grid-cols-5 sm:gap-5 lg:auto-rows-[160px]">
            {images.slice(0, 3).map((image, index) => (
              <Card key={image.uuid} className={`group relative flex cursor-pointer overflow-hidden border-0 shadow-lg transition-all duration-500 hover:shadow-2xl ${getPreviewClass(index)} bg-white dark:bg-slate-900`} onClick={() => handleImageClick(index)}>
                <div className="relative h-full w-full">
                  <Image src={image.url} alt={`${providerTitle} portfolio image`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white text-slate-900 shadow-lg border-0 p-2 rounded-full" onClick={() => handleImageClick(index)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="pointer-events-none absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
            <Button
              variant="secondary"
              className="pointer-events-auto rounded-full bg-slate-900 px-6 text-white hover:bg-slate-800 shadow-lg dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200"
              onClick={() => {
                setSelectedImageIndex(0);
                setIsModalOpen(true);
              }}
            >
              Show all photos
            </Button>
          </div>
        </CardContent>
      </Card>

      <ImageModal images={modalImages} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialIndex={selectedImageIndex} />
    </section>
  );
};

export default AccountImageGallery;
