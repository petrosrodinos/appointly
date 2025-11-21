import type { Metadata } from "next";
import { getAccountSeo } from "@/features/account/services/account.services";
import { getAccountTheme } from "@/features/account-themes/services/account-themes.services";

interface ProviderProfilePageProps {
  params: Promise<{
    uuid: string;
  }>;
}

export const generateMetadata = async ({ params }: ProviderProfilePageProps): Promise<Metadata> => {
  try {
    const { uuid } = await params;
    const accountSeo = await getAccountSeo(uuid);

    if (accountSeo) {
      return accountSeo.metatags;
    }

    return {
      title: "Provider",
      description: "Provider profile page.",
    };
  } catch (error) {
    return {
      title: "Provider Not Found",
      description: "The requested provider could not be found.",
    };
  }
};

export default async function ProviderLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{
    uuid: string;
  }>;
}>) {
  const { uuid } = await params;
  const theme = await getAccountTheme(uuid);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        style={{
          ["--color-primary" as any]: theme?.primary,
          ["--color-secondary" as any]: theme?.secondary,
          ["--color-background" as any]: theme?.background,
          ["--color-foreground" as any]: theme?.foreground,
          ["--color-muted" as any]: theme?.muted,
          ["--color-accent" as any]: theme?.accent,
          ["--font-family" as any]: theme?.font_family,
          ["--font-size" as any]: theme?.font_size,
          ["--line-height" as any]: theme?.line_height,
          ["--letter-spacing" as any]: theme?.letter_spacing,
        }}
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
