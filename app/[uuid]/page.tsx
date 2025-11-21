import React from "react";
import { getProviderAccount } from "@/features/account/services/account.services";
import type { Account } from "@/features/account/interfaces/account.interfaces";
import { notFound } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";
import ProviderHeader from "./components/provider-header";
import ProviderProfile from "./components/provider-profile";
import ProviderServices from "./components/provider-services";
import ProviderRatings from "./components/ratings/provider-ratings";
import { BookingSidebar } from "./components/booking-sidebar";
import AccountImageGallery from "./components/account-image-gallery";
import { ProviderFooter } from "./components/provider-footer";
import { ChatBubble } from "./components/chat-bubble";
import ProviderFaqs from "./components/provider-faqs";
import { ProviderLocation } from "./components/provider-location";

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
    <TooltipProvider>
      <div className="min-h-screen">
        <div className="relative">
          <div className="relative">
            <ProviderHeader provider={provider} />

            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-4">
                  <div id="profile">
                    <ProviderProfile provider={provider} />
                  </div>
                  <div id="services">
                    <ProviderServices provider={provider} />
                  </div>
                  <div id="gallery">
                    <AccountImageGallery images={provider.images} providerTitle={provider.title} />
                  </div>
                  <div id="ratings">
                    <ProviderRatings provider={provider} />
                  </div>
                  <div id="faqs">
                    <ProviderFaqs provider={provider} />
                  </div>
                  <div id="location">
                    <ProviderLocation provider={provider} />
                  </div>
                </div>
                <BookingSidebar provider={provider} />
              </div>
            </div>
          </div>
        </div>
        <ProviderFooter provider={provider} />
        <ChatBubble provider={provider} />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(provider?.seo?.jsonLd || {}) }} />
    </TooltipProvider>
  );
};

export default ProviderProfilePage;
