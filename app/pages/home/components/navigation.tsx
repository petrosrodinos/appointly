import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { environments } from "@/config/environments";

export const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg  flex items-center justify-center">
              <img src="/favicon.ico" alt={`${environments.APP_NAME} logo`} className="h-7 w-7" />
            </div>
            <span className="text-xl font-bold">{environments.APP_NAME}</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
              Testimonials
            </a>
            <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">
              FAQ
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button asChild variant="ghost" size="sm">
              <a href={`${environments.APP_URL}/auth/sign-in`} target="_blank" rel="noopener noreferrer">
                Sign In
              </a>
            </Button>
            <Button asChild size="sm">
              <a href={`${environments.APP_URL}/auth/sign-up`} target="_blank" rel="noopener noreferrer">
                Start Free Trial
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
