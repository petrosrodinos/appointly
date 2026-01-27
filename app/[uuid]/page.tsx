import React from "react";
import { getProviderAccount } from "@/features/account/services/account.services";
import type { Account } from "@/features/account/interfaces/account.interfaces";
import { notFound } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";
import ProviderHeader from "./components/provider-header";
import ProviderProfile from "./components/profile";
import ProviderServices from "./components/services";
import ProviderRatings from "./components/ratings/provider-ratings";
import { BookingSidebar } from "./components/booking-sidebar";
import AccountImageGallery from "./components/account-image-gallery";
import { ProviderFooter } from "./components/provider-footer";
import { ChatBubble } from "./components/chat";
import ProviderFaqs from "./components/provider-faqs";
import { ProviderLocation } from "./components/provider-location";
import { CustomThemeStyles } from "./components/custom-theme-styles";

interface ProviderProfilePageProps {
  params: Promise<{
    uuid: string;
  }>;
}

const ProviderProfilePage = async ({ params }: ProviderProfilePageProps) => {
  let provider: Account | null = null;
  let error: string | null = null;

  try {
    const { uuid } = await params;
    provider = await getProviderAccount(uuid);
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to fetch provider";
  }

  if (error || !provider) {
    notFound();
  }

  return (
   <>
    <CustomThemeStyles theme={provider.account_theme} />
  <TooltipProvider>
    <div className="min-h-screen">
      <ProviderHeader provider={provider} />
      <main className="relative">
        <div className="relative">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 space-y-4">
                <section id="profile">
                  <ProviderProfile provider={provider} />
                </section>
                <section id="services">
                  <ProviderServices provider={provider} />
                </section>
                <section id="gallery">
                  <AccountImageGallery images={provider.images} providerTitle={provider.title} />
                </section>
                <section id="ratings">
                  <ProviderRatings provider={provider} />
                </section>
                <section id="faqs">
                  <ProviderFaqs provider={provider} />
                </section>
                <section id="location">
                  <ProviderLocation provider={provider} />
                </section>
              </div>
              <aside>
                <BookingSidebar provider={provider} />
              </aside>
            </div>
          </div>
        </div>
      </main>
      <ProviderFooter provider={provider} />
      <ChatBubble provider={provider} />
    </div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(provider?.seo?.jsonLd || {}) }} />
  </TooltipProvider>
   </>
  );
};

export default ProviderProfilePage;
