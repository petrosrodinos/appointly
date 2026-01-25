"use client";

import { useState, useEffect, type MouseEvent as ReactMouseEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Clock, ChevronRight, MapPin, CreditCard } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { Account } from "@/features/account/interfaces/account.interfaces";
import { formatPrice, formatDuration, getLocationTypeLabel, getLocationTypeDescription, getPaymentTypeLabel, getPaymentTypeDescription } from "../utils/provider.utils";
import { environments } from "@/config/environments";
import Image from "next/image";
import ImageModal from "./image-modal";
import { sendEvent } from "@/features/analytics-events/services/analytics-events.services";
import { AnalyticsEventsTypes } from "@/features/analytics-events/interfaces/analytics-events.interfaces";

interface ProviderServicesProps {
  provider: Account;
}

const ProviderServices = ({ provider }: ProviderServicesProps) => {
  const searchParams = useSearchParams();
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<Array<{ url: string; alt?: string }>>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [expandedServices, setExpandedServices] = useState<Record<string, boolean>>({});
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const utmCampaign = searchParams.get("utm_campaign");

    sendEvent({
      type: AnalyticsEventsTypes.PROVIDER_PAGE_VIEW,
      provider_uuid: provider.uuid,
    });

    if (utmCampaign) {
      sendEvent({
        type: AnalyticsEventsTypes.CAMPAIGN_PROVIDER_PAGE_VIEW,
        provider_uuid: provider.uuid,
        campaign_uuid: utmCampaign,
      });
    }
  }, [provider, searchParams]);

  if (!provider.services || provider.services.length === 0) {
    return null;
  }

  const handleServiceClick = (serviceUuid: string) => {
    const serviceUrl = `${environments.APP_URL}/book?service_uuid=${serviceUuid}`;
    window.open(serviceUrl, "_blank", "noopener,noreferrer");
  };

  const handleImageClick = (images: Array<{ url: string; alt?: string }>, index: number) => {
    setSelectedImages(images);
    setSelectedImageIndex(index);
    setImageModalOpen(true);
  };

  const toggleServiceDetails = (event: ReactMouseEvent<HTMLButtonElement>, serviceUuid: string) => {
    event.stopPropagation();
    setExpandedServices((previous) => ({
      ...previous,
      [serviceUuid]: !previous[serviceUuid],
    }));
  };

  const toggleDescription = (event: ReactMouseEvent<HTMLButtonElement>, serviceUuid: string) => {
    event.stopPropagation();
    setExpandedDescriptions((previous) => ({
      ...previous,
      [serviceUuid]: !previous[serviceUuid],
    }));
  };

  const shouldShowMoreButton = (description: string | null | undefined) => {
    return description && description.length > 150;
  };

  return (
    <section className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
      <div className="p-6 md:p-8 border-b border-border">
        <h2 className="text-2xl md:text-3xl font-bold  flex items-center gap-3">Our Services</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm md:text-base">Choose from our professional services and book your appointment</p>
      </div>

      <div className="p-4 md:p-6 bg-muted/30">
        <div className="space-y-4">
          {provider.services.map((service) => {
            const isExpanded = !!expandedServices[service.uuid];
            const isDescriptionExpanded = !!expandedDescriptions[service.uuid];
            const showDescriptionMore = shouldShowMoreButton(service.description);

            return (
              <article key={service.uuid}>
                <Card className="group hover:shadow-xl transition-all duration-300 border-border hover:border-blue-400 dark:hover:border-blue-500 overflow-hidden bg-card shadow-md hover:shadow-lg cursor-pointer" onClick={() => handleServiceClick(service.uuid)}>
                  <div className="flex flex-col lg:flex-row">
                    {service.images && service.images.length > 0 && (
                      <div
                        className="relative w-full lg:w-64 h-48 lg:h-40 flex-shrink-0 cursor-pointer group"
                        onClick={(event) => {
                          event.stopPropagation();
                          if (service.images) {
                            handleImageClick(
                              service.images.map((img) => ({ url: img.url, alt: service.name })),
                              0
                            );
                          }
                        }}
                      >
                        <Image src={service.images[0].url || "/placeholder-service.jpg"} alt={service.name} fill sizes="(max-width: 1024px) 100vw, 256px" className="object-cover rounded-l-lg lg:rounded-l-lg lg:rounded-r-none group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-l-lg lg:rounded-l-lg lg:rounded-r-none group-hover:from-black/20 transition-colors duration-300" />
                        {service.images.length > 1 && <div className="absolute top-3 right-3 bg-card/90 rounded-full px-2 py-1 text-xs font-medium text-card-foreground shadow-md">+{service.images.length - 1}</div>}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-black/50 rounded-full p-2">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}

                    <CardContent className="p-4 md:p-6 flex-1">
                      <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                          <div className="flex-1">
                            <h3 className="text-lg md:text-xl font-semibold text-card-foreground group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors line-clamp-2">{service.name}</h3>
                            {service.description && (
                              <div className="mt-1">
                                <p className={`text-muted-foreground text-sm md:text-base ${!isDescriptionExpanded && showDescriptionMore ? "line-clamp-2" : ""}`}>{service.description}</p>
                                {showDescriptionMore && (
                                  <Button variant="ghost" size="sm" className="mt-1 h-auto p-0 text-xs text-primary hover:text-primary" onClick={(event) => toggleDescription(event, service.uuid)}>
                                    {isDescriptionExpanded ? "Show less" : "Show more"}
                                  </Button>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span>{formatDuration(service.duration)}</span>
                            </div>
                            <span className="text-base font-semibold text-card-foreground">{formatPrice(service.price)}</span>
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-sm text-primary hover:text-primary" onClick={(event) => toggleServiceDetails(event, service.uuid)}>
                            <span>{isExpanded ? "Show less" : "Show more"}</span>
                            <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                          </Button>
                        </div>
                        {isExpanded && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground">
                                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>Service Locations</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {service.location_types.map((type) => (
                                  <Tooltip key={type}>
                                    <TooltipTrigger asChild>
                                      <Badge variant="secondary" className="text-xs px-2 py-1 cursor-help bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-slate-800 dark:text-slate-200">
                                        <MapPin className="w-3 h-3 mr-1" />
                                        {getLocationTypeLabel(type)}
                                      </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{getLocationTypeDescription(type)}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                ))}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground">
                                <CreditCard className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>Pay With</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {service.payment_types.map((type) => (
                                  <Tooltip key={type}>
                                    <TooltipTrigger asChild>
                                      <Badge variant="secondary" className="text-xs px-2 py-1 cursor-help bg-green-200 dark:bg-green-900/40 hover:bg-green-300 dark:hover:bg-green-900/60 transition-colors text-green-900 dark:text-green-100">
                                        <CreditCard className="w-3 h-3 mr-1" />
                                        {getPaymentTypeLabel(type)}
                                      </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{getPaymentTypeDescription(type)}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </article>
            );
          })}
        </div>
      </div>

      <ImageModal images={selectedImages} isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)} initialIndex={selectedImageIndex} />
    </section>
  );
};

export default ProviderServices;
