import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, Play, Zap } from "lucide-react";
import { environments } from "@/config/environments";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <header className="text-center max-w-5xl mx-auto">
          <Badge variant="secondary" className="mb-8 px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
            <Zap className="h-3 w-3 mr-2" />
            Trusted by 10,000+ businesses worldwide
          </Badge>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
            Transform Your Business with
            <span className="block bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Smart Appointment Booking</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">Create stunning branded booking sites, manage customers with AI-powered insights, automate communications, and grow your business with our multi-channel campaign creation system.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button asChild size="lg" className="text-lg px-10 py-4 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300">
              <a href={`${environments.APP_URL}/auth/sign-up`} target="_blank" rel="noopener noreferrer">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-10 py-4 border-2 hover:bg-primary/5 transition-all duration-300">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
          <ul className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <li className="flex items-center bg-card/50 px-4 py-2 rounded-full">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              14-day free trial
            </li>
            <li className="flex items-center bg-card/50 px-4 py-2 rounded-full">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Cancel anytime
            </li>
          </ul>
        </header>
      </div>
    </section>
  );
};
