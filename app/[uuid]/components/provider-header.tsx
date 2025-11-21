"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { getCategoryLabel } from "@/features/account/utils/account.utils";
import type { Account } from "@/features/account/interfaces/account.interfaces";

interface ProviderHeaderProps {
  provider: Account;
}

const ProviderHeader = ({ provider }: ProviderHeaderProps) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={provider.logo?.url} alt={provider.title} />
              <AvatarFallback className="text-sm font-semibold">
                {provider.first_name[0]}
                {provider.last_name[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-base sm:text-lg font-semibold text-foreground">{provider.title}</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">{getCategoryLabel(provider.category)}</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            <button onClick={() => scrollToSection("profile")} className="text-sm font-medium hover:text-primary transition-colors">
              Profile
            </button>
            <button onClick={() => scrollToSection("gallery")} className="text-sm font-medium hover:text-primary transition-colors">
              Gallery
            </button>
            <button onClick={() => scrollToSection("services")} className="text-sm font-medium hover:text-primary transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection("ratings")} className="text-sm font-medium hover:text-primary transition-colors">
              Ratings
            </button>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default ProviderHeader;
