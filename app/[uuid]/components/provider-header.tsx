"use client";

import { Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
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
            <div className="md:-mt-4">
              <p className="text-base sm:text-lg font-semibold text-foreground">{provider.title}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">{getCategoryLabel(provider.category)}</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            <button onClick={() => scrollToSection("profile")} className="text-sm font-medium hover:text-primary transition-colors">
              Profile
            </button>
            <button onClick={() => scrollToSection("services")} className="text-sm font-medium hover:text-primary transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection("gallery")} className="text-sm font-medium hover:text-primary transition-colors">
              Gallery
            </button>
            <button onClick={() => scrollToSection("ratings")} className="text-sm font-medium hover:text-primary transition-colors">
              Ratings
            </button>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="flex flex-col gap-6">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4">
                  <SheetClose asChild>
                    <button onClick={() => scrollToSection("profile")} className="text-left text-sm font-medium hover:text-primary transition-colors">
                      Profile
                    </button>
                  </SheetClose>
                  <SheetClose asChild>
                  <SheetClose asChild>
                    <button onClick={() => scrollToSection("services")} className="text-left text-sm font-medium hover:text-primary transition-colors">
                      Services
                    </button>
                  </SheetClose>
                    <button onClick={() => scrollToSection("gallery")} className="text-left text-sm font-medium hover:text-primary transition-colors">
                      Gallery
                    </button>
                  </SheetClose>
                  <SheetClose asChild>
                    <button onClick={() => scrollToSection("ratings")} className="text-left text-sm font-medium hover:text-primary transition-colors">
                      Ratings
                    </button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProviderHeader;
