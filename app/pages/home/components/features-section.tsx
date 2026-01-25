import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Globe, Settings, Users, MessageSquare, Mail, BarChart3, CreditCard, Star, Target } from "lucide-react";

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <header className="text-center mb-20">
          <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium border-primary/20">
            Features
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">Everything You Need to Grow Your Business</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">Powerful features designed to streamline your operations and delight your customers with modern, intuitive tools</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article className="h-full">
            <Card className="group h-full flex flex-col hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
              <CardHeader className="p-8">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold mb-3">Branded Booking Sites</CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed">Create stunning, fully customizable booking websites that reflect your brand identity with modern design tools</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Custom domains & branding
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Mobile-responsive design
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    SEO optimized
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Google business listing integration
                  </li>
                </ul>
              </CardContent>
            </Card>
          </article>

          <article className="h-full">
            <Card className="group h-full flex flex-col hover:shadow-lg transition-all duration-300 border-0">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Service Management</CardTitle>
                <CardDescription>Easily manage your services, pricing, availability, and staff schedules</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Flexible pricing models
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Staff scheduling
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Online and offline promotion coupons
                  </li>
                </ul>
              </CardContent>
            </Card>
          </article>

          <article className="h-full">
            <Card className="group h-full flex flex-col hover:shadow-lg transition-all duration-300 border-0">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Customer Management</CardTitle>
                <CardDescription>Track customer history, notes, preferences, and build lasting relationships</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Customer profiles & analytics
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Notes & preferences
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Loyalty programs
                  </li>
                </ul>
              </CardContent>
            </Card>
          </article>

          <article className="h-full">
            <Card className="group h-full flex flex-col hover:shadow-lg transition-all duration-300 border-0">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>In-App Communication</CardTitle>
                <CardDescription>Built-in chat system for seamless communication with your customers</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    AI-powered chatbot support
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Real-time messaging
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    In-app Email & SMS sender
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    File sharing
                  </li>
                </ul>
              </CardContent>
            </Card>
          </article>

          <article className="h-full">
            <Card className="group h-full flex flex-col hover:shadow-lg transition-all duration-300 border-0">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Automated Messaging</CardTitle>
                <CardDescription>Send automated reminders, follow-ups, and personalized messages</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Email & SMS automation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Custom templates
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Smart scheduling
                  </li>
                </ul>
              </CardContent>
            </Card>
          </article>

          <article className="h-full">
            <Card className="group h-full flex flex-col hover:shadow-lg transition-all duration-300 border-0">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>Comprehensive insights to help you make data-driven decisions</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Revenue tracking
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Customer insights
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Performance metrics
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    AI-powered insights and recommendations
                  </li>
                </ul>
              </CardContent>
            </Card>
          </article>

          <article className="h-full">
            <Card className="group h-full flex flex-col hover:shadow-lg transition-all duration-300 border-0">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Payment Processing</CardTitle>
                <CardDescription>Secure payment processing with multiple payment methods</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Multiple payment methods
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Secure transactions
                  </li>
                </ul>
              </CardContent>
            </Card>
          </article>

          <article className="h-full">
            <Card className="group h-full flex flex-col hover:shadow-lg transition-all duration-300 border-0">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Review System</CardTitle>
                <CardDescription>Collect and manage customer reviews to build trust and credibility</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Automated review requests
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Review management
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Social proof display
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    AI-powered review analysis
                  </li>
                </ul>
              </CardContent>
            </Card>
          </article>

          <article className="h-full">
            <Card className="group h-full flex flex-col hover:shadow-lg transition-all duration-300 border-0">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Marketing Campaigns</CardTitle>
                <CardDescription>Create targeted email and SMS campaigns to engage your customers</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Email campaigns
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    SMS marketing
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Customer segmentation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    AI-powered campaign content generation
                  </li>
                </ul>
              </CardContent>
            </Card>
          </article>
        </div>
      </div>
    </section>
  );
};
