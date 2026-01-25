"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface ImageModalProps {
  images: Array<{ url: string; alt?: string }>;
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

const ImageModal = ({ images, isOpen, onClose, initialIndex = 0 }: ImageModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          event.preventDefault();
          goToPrevious();
          break;
        case "ArrowRight":
          event.preventDefault();
          goToNext();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[90vh] p-0 bg-background border-border">
        <div className="relative w-full h-full flex flex-col">
          <div className="flex items-center justify-center p-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">
              {currentImage.alt || "Service Image"} ({currentIndex + 1} of {images.length})
            </h3>
          </div>

          <div className="relative flex-1 flex items-center justify-center p-4">
            <div className="relative w-full h-full max-w-3xl max-h-[calc(90vh-120px)]">
              <Image src={currentImage.url} alt={currentImage.alt || "Service Image"} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw" className="object-contain rounded-lg" priority />
            </div>

            {images.length > 1 && (
              <>
                <Button variant="outline" size="icon" onClick={goToPrevious} className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background border-border">
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" onClick={goToNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background border-border">
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="p-4 border-t border-border">
              <div className="flex justify-center gap-2">
                {images.map((_, index) => (
                  <button key={index} onClick={() => setCurrentIndex(index)} className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? "bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"}`} />
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
