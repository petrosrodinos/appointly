"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock3, AlertTriangle, ChevronDown, ChevronUp, Star, MapPin, Phone, Mail } from "lucide-react";
import type { Account } from "@/features/account/interfaces/account.interfaces";
import { formatTime, getDayName, getClosurePeriodMessage } from "../utils/provider.utils";
import { getWeeklyHours, getProviderDateTime, getStatusLabel, getTodayStatus } from "../utils/booking-sidebar.utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetAverageRating } from "@/features/ratings/hooks/use-ratings";
import { getGoogleMapsUrl } from "@/lib/utils";

interface BookingSidebarProps {
  provider: Account;
}

export const BookingSidebar = ({ provider }: BookingSidebarProps) => {
  const closureMessage = getClosurePeriodMessage(provider.closure_periods);
  const [showAllHours, setShowAllHours] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const timezone = provider.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
  const { data: averageRating } = useGetAverageRating(provider.uuid);

  const providerDateTime = useMemo(() => getProviderDateTime(timezone), [timezone]);
  const todayStatus = useMemo(() => getTodayStatus(provider.oppening_hours, providerDateTime), [provider.oppening_hours, providerDateTime]);
  const statusLabel = useMemo(() => getStatusLabel(todayStatus, Boolean(provider.oppening_hours)), [todayStatus, provider.oppening_hours]);
  const weeklyHours = useMemo(() => getWeeklyHours(provider.oppening_hours, todayStatus.current_day_key), [provider.oppening_hours, todayStatus.current_day_key]);

  const statusColor = "text-foreground";
  const ratingValue = averageRating?.average_rating || 0;
  const totalRatings = averageRating?.total_ratings || 0;
  const fallbackInitials = provider.title ? provider.title.slice(0, 2).toUpperCase() : "";

  return (
    <div className="space-y-6 xl:sticky xl:top-24 xl:self-start xl:max-w-sm w-full">
      {closureMessage && (
        <Card className="bg-yellow-400 dark:bg-yellow-900 shadow-xl border-0">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-800 dark:text-yellow-200 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-yellow-900 dark:text-yellow-100 mb-1">Closure Notice</h3>
                <p className="text-yellow-800 dark:text-yellow-50 text-xs sm:text-sm">{closureMessage}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      <Card className="bg-card shadow-xl border border-border">
        <CardHeader className="pb-4 space-y-6">
          <div className="flex flex-col items-center text-center gap-4">
            <Avatar className="w-20 h-20 rounded-xl border border-border bg-background">
              <AvatarImage src={provider.logo?.url} alt={provider.title} />
              <AvatarFallback className="text-base font-semibold uppercase">{fallbackInitials}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <p className="text-xl sm:text-2xl font-bold text-foreground tracking-wide">{provider.title}</p>
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <span className="text-base sm:text-lg font-semibold text-foreground">{ratingValue.toFixed(1)}</span>
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>
                  {totalRatings} {totalRatings === 1 ? "review" : "reviews"}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {provider.oppening_hours ? (
              <div className="space-y-4">
                <Button variant="ghost" className="w-full px-0 hover:bg-transparent" onClick={() => setShowAllHours((prev) => !prev)}>
                  <div className="flex w-full items-center justify-center gap-2">
                    <Clock3 className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                    <span className={`text-base sm:text-lg font-semibold ${statusColor}`}>{statusLabel}</span>
                    {showAllHours ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
                  </div>
                </Button>

                {showAllHours && (
                  <div className="space-y-3">
                    {weeklyHours.map(({ day, hours, is_current_day }) => (
                      <div key={day} className={`flex justify-between items-center py-2.5 px-3 rounded-lg border ${is_current_day ? "border-foreground" : "border-border"}`}>
                        <span className={`font-medium ${is_current_day ? "text-foreground" : "text-muted-foreground"}`}>{getDayName(day)}</span>
                        <div className="flex flex-col items-end space-y-1">
                          {hours.length > 0 ? (
                            hours.map((slot, index) => (
                              <span key={`${day}-${index}`} className="text-foreground text-sm">
                                {formatTime(slot.open_time)} - {formatTime(slot.close_time)}
                              </span>
                            ))
                          ) : (
                            <span className="text-foreground text-sm">Closed</span>
                          )}
                        </div>
                      </div>
                    ))}
                    <p className="text-sm text-muted-foreground text-center pt-2">{timezone}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No opening hours available</p>
            )}
          </div>
          <div className="border-t border-border pt-6 space-y-4 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MapPin className="w-5 h-5" />
              </div>
              <address className="text-sm text-muted-foreground not-italic">
                <a href={getGoogleMapsUrl(provider.coordinates) ?? ""} target="_blank" className="hover:text-primary transition-colors">
                  {provider.address}
                </a>
              </address>
            </div>
            <div className="space-y-3">
              <Button variant="ghost" className="w-full px-0 hover:bg-transparent" onClick={() => setShowContact((prev) => !prev)}>
                <div className="flex w-full items-center justify-center gap-2">
                  <span className="text-sm sm:text-base font-semibold text-foreground">Contact us</span>
                  {showContact ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
                </div>
              </Button>
              {showContact && (
                <div className="flex flex-wrap justify-center gap-3">
                  {provider.phone ? (
                    <Button asChild variant="secondary" className="gap-2 px-4">
                      <a href={`tel:${provider.phone}`}>
                        <Phone className="w-4 h-4" />
                        Phone
                      </a>
                    </Button>
                  ) : (
                    <Button variant="secondary" className="gap-2 px-4" disabled>
                      <Phone className="w-4 h-4" />
                      Phone
                    </Button>
                  )}
                  {provider.email ? (
                    <Button asChild variant="secondary" className="gap-2 px-4">
                      <a href={`mailto:${provider.email}`}>
                        <Mail className="w-4 h-4" />
                        Email
                      </a>
                    </Button>
                  ) : (
                    <Button variant="secondary" className="gap-2 px-4" disabled>
                      <Mail className="w-4 h-4" />
                      Email
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
