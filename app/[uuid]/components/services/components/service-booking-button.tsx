"use client";

import { Button } from "@/components/ui/button";
import { environments } from "@/config/environments";

interface ServiceBookingButtonProps {
  service_uuid: string;
}

export const ServiceBookingButton = ({ service_uuid: serviceUuid }: ServiceBookingButtonProps) => {
  const handleServiceClick = () => {
    const serviceUrl = `${environments.APP_URL}/book?service_uuid=${serviceUuid}`;
    window.open(serviceUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Button variant="secondary" size="sm" className="shrink-0" onClick={handleServiceClick}>
      Book now
    </Button>
  );
};
