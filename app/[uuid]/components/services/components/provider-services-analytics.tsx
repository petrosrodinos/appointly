"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { sendEvent } from "@/features/analytics-events/services/analytics-events.services";
import { AnalyticsEventsTypes } from "@/features/analytics-events/interfaces/analytics-events.interfaces";

interface ProviderServicesAnalyticsProps {
  provider_uuid: string;
}

export const ProviderServicesAnalytics = ({ provider_uuid: providerUuid }: ProviderServicesAnalyticsProps) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const utmCampaign = searchParams.get("utm_campaign");

    sendEvent({
      type: AnalyticsEventsTypes.PROVIDER_PAGE_VIEW,
      provider_uuid: providerUuid,
    });

    if (utmCampaign) {
      sendEvent({
        type: AnalyticsEventsTypes.CAMPAIGN_PROVIDER_PAGE_VIEW,
        provider_uuid: providerUuid,
        campaign_uuid: utmCampaign,
      });
    }
  }, [providerUuid, searchParams]);

  return null;
};
