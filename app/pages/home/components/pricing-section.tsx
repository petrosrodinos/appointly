import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <header className="text-center mb-20">
          <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium border-primary/20">
            Pricing
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">Choose the perfect plan for your business. No hidden fees, no surprises. Start free and scale as you grow.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <article>
            <Card className="relative border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
              <CardHeader className="p-8">
                <CardTitle className="text-2xl font-bold mb-2">Starter</CardTitle>
                <CardDescription className="text-muted-foreground mb-6">Perfect for small businesses getting started</CardDescription>
                <div className="mb-6">
                  <span className="text-5xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">$29</span>
                  <span className="text-muted-foreground text-lg">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    Up to 100 appointments/month
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    Basic booking site
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    Email support
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    Basic analytics
                  </li>
                </ul>
                <Button className="w-full">Get Started</Button>
              </CardContent>
            </Card>
          </article>

          <article>
            <Card className="relative border-2 border-primary bg-gradient-to-br from-primary/5 to-purple-500/5 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-primary to-purple-600 text-white px-6 py-2 text-sm font-medium shadow-lg">Most Popular</Badge>
              </div>
              <CardHeader className="p-8">
                <CardTitle className="text-2xl font-bold mb-2">Professional</CardTitle>
                <CardDescription className="text-muted-foreground mb-6">Ideal for growing businesses</CardDescription>
                <div className="mb-6">
                  <span className="text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">$79</span>
                  <span className="text-muted-foreground text-lg">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    Up to 1,000 appointments/month
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    Custom branded site
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    In-app messaging
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    Automated reminders
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    Advanced analytics
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    Priority support
                  </li>
                </ul>
                <Button className="w-full">Get Started</Button>
              </CardContent>
            </Card>
          </article>

          <article>
            <Card className="relative border-0">
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>For large businesses with advanced needs</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$199</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    Unlimited appointments
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    White-label solution
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    Advanced automation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    Marketing campaigns
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    API access
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    Dedicated support
                  </li>
                </ul>
                <Button className="w-full">Contact Sales</Button>
              </CardContent>
            </Card>
          </article>
        </div>
      </div>
    </section>
  );
};
