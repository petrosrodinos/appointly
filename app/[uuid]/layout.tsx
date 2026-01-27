import type { Metadata } from "next";
import { getAccountSeo } from "@/features/account/services/account.services";
import { getAccountTheme } from "@/features/account-themes/services/account-themes.services";
import { CustomThemeStyles } from "./components/custom-theme-styles";

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
      console.log(accountSeo);
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

  return (
    <>
      {children}
    </>
  );
}
