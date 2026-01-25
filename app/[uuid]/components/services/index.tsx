import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ChevronRight, MapPin, CreditCard } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { Account } from "@/features/account/interfaces/account.interfaces";
import { formatPrice, formatDuration, getLocationTypeLabel, getLocationTypeDescription, getPaymentTypeLabel, getPaymentTypeDescription } from "../../utils/provider.utils";
import { ProviderServicesAnalytics } from "./components/provider-services-analytics";
import { ServiceImageGallery } from "./components/service-image-gallery";
import { ServiceBookingButton } from "./components/service-booking-button";

interface ProviderServicesProps {
  provider: Account;
}

const ProviderServices = ({ provider }: ProviderServicesProps) => {
  if (!provider.services || provider.services.length === 0) {
    return null;
  }

  return (
    <section className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
      <ProviderServicesAnalytics provider_uuid={provider.uuid} />
      <header className="p-6 md:p-8 border-b border-border">
        <h2 className="text-2xl md:text-3xl font-bold  flex items-center gap-3">Our Services</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm md:text-base">Choose from our professional services and book your appointment</p>
      </header>

      <div className="p-4 md:p-6 bg-muted/30">
        <div className="space-y-4">
          {provider.services.map((service) => {
            return (
              <article key={service.uuid}>
                <Card className="group hover:shadow-xl transition-all duration-300 border-border hover:border-blue-400 dark:hover:border-blue-500 overflow-hidden bg-card shadow-md hover:shadow-lg">
                  <div className="flex flex-col lg:flex-row">
                    {service.images && service.images.length > 0 && (
                      <ServiceImageGallery
                        images={service.images.map((img) => ({ url: img.url, alt: service.name }))}
                        service_name={service.name}
                      />
                    )}

                    <CardContent className="p-4 md:p-6 flex-1">
                      <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <h3 className="text-lg md:text-xl font-semibold text-card-foreground group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors line-clamp-2">{service.name}</h3>
                              <ServiceBookingButton service_uuid={service.uuid} />
                            </div>
                            {service.description && service.description.length > 150 ? (
                              <details className="mt-1 group">
                                <summary className="list-none cursor-pointer space-y-1">
                                  <p className="text-muted-foreground text-sm md:text-base line-clamp-2 group-open:line-clamp-none">{service.description}</p>
                                  <span className="text-xs text-primary group-open:hidden">Show more</span>
                                  <span className="hidden text-xs text-primary group-open:inline">Show less</span>
                                </summary>
                              </details>
                            ) : (
                              service.description && <p className="mt-1 text-muted-foreground text-sm md:text-base">{service.description}</p>
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
                        <details className="group">
                          <summary className="list-none cursor-pointer">
                            <div className="flex items-center gap-1 text-sm text-primary">
                              <span className="group-open:hidden">Show more</span>
                              <span className="hidden group-open:inline">Show less</span>
                              <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90" />
                            </div>
                          </summary>
                          <div className="mt-4 space-y-4">
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
                        </details>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProviderServices;
