import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";
import type { Account } from "@/features/account/interfaces/account.interfaces";
import { MapPreview } from "@/components/ui/map-view";
import { getGoogleMapsUrl } from "@/lib/utils";

interface ProviderLocationProps {
  provider: Account;
}

export const ProviderLocation = ({ provider }: ProviderLocationProps) => {
  const mapsUrl = getGoogleMapsUrl(provider.coordinates);

  if (!provider.address || !mapsUrl) {
    return null;
  }

  return (
    <Card className="border border-border bg-card shadow-xl">
      <CardHeader className="space-y-2">
        <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
          <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          Location
        </CardTitle>
        <p className="text-sm sm:text-base text-muted-foreground">{provider.address}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="overflow-hidden">
          <MapPreview lat={provider.coordinates.lat} lng={provider.coordinates.lng} />
        </div>
        <Button asChild variant="secondary" className="w-full sm:w-auto">
          <a href={mapsUrl} target="_blank" rel="noreferrer">
            <Navigation className="mr-2 h-4 w-4" />
            Get Directions
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};
