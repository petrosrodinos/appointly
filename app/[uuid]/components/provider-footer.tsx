import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, MapPin } from "lucide-react";
import type { Account } from "@/features/account/interfaces/account.interfaces";
import { getCategoryLabel } from "@/features/account/utils/account.utils";
import Link from "next/link";
import { environments } from "@/config/environments/index";
import { getGoogleMapsUrl } from "@/lib/utils";

interface ProviderFooterProps {
  provider: Account;
}

export const ProviderFooter = ({ provider }: ProviderFooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={provider.logo?.url} alt={provider.title} />
                <AvatarFallback className="text-sm font-semibold">
                  {provider.first_name[0]}
                  {provider.last_name[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-base sm:text-lg font-bold">{provider.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{getCategoryLabel(provider.category)}</p>
              </div>
            </div>
            {provider.description && <p className="text-sm text-muted-foreground line-clamp-3">{provider.description}</p>}
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold mb-4">Contact Information</h3>
            <address className="not-italic">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {provider.email && (
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <a href={`mailto:${provider.email}`} className="hover:text-primary transition-colors">
                      {provider.email}
                    </a>
                  </li>
                )}
                {provider.phone && (
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <a href={`tel:${provider.phone}`} className="hover:text-primary transition-colors">
                      {provider.phone}
                    </a>
                  </li>
                )}
                {provider.address && (
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <a href={getGoogleMapsUrl(provider.coordinates) ?? ""} target="_blank" className="hover:text-primary transition-colors">
                      {provider.address}
                    </a>
                  </li>
                )}
              </ul>
            </address>
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#profile" className="hover:text-primary transition-colors">
                  Profile
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-primary transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-primary transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#ratings" className="hover:text-primary transition-colors">
                  Ratings
                </a>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {provider.title}. All rights reserved.
          </p>
          <Link href={environments.LANDING_URL || ""} target="_blank" className="text-sm text-foreground font-medium mt-4 md:mt-0 hover:text-primary transition-colors">
            Powered by {environments.APP_NAME}
          </Link>
        </div>
      </div>
    </footer>
  );
};
