import type { Document } from "@/features/documents/interfaces/documents.interfaces";
import { Coordinates } from "@/features/google-maps/interfaces/address.interface";
import { Service } from "@/features/services/interfaces/services.interfaces";
import { OpeningHoursResponse } from "@/features/opening-hours/interfaces/opening-hours.interfaces";
import { ClosurePeriod } from "@/features/closure-periods/interfaces/closure-periods.interfaces";
import { AccountTheme } from "@/features/account-themes/interfaces/account-themes.interfaces";

export interface Account {
    id: string;
    uuid: string;
    user_uuid: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    phone_country_code: string;
    account_type: AccountType;
    category: string;
    title: string;
    description: string;
    slug: string;
    country: string;
    city: string;
    address: string;
    zip_code: string;
    coordinates: Coordinates;
    timezone?: string;
    logo_uuid: string;
    banner_uuid: string;
    logo: Document;
    banner: Document;
    active: boolean;
    verified: boolean;
    archived: boolean;
    services: Service[];
    oppening_hours: OpeningHoursResponse;
    closure_periods: ClosurePeriod[];
    images: Document[];
    created_at: string;
    updated_at: string;
    seo: SeoResponse;
    account_theme: AccountTheme;
}


export interface AccountQuery {
    account_type?: AccountType;
    email?: string;
    phone?: string;
    phone_or_email?: string;
    first_name?: string;
    last_name?: string;
    country?: string;
    city?: string;
    address?: string;
    zip_code?: string;
    active?: boolean;
    verified?: boolean;
    archived?: boolean;
}


export interface SeoResponse {
    metatags: MetaTags;
    jsonLd: JsonLd;
}

export interface MetaTags {
    title: string;
    description: string;
    keywords: string;
    authors: { name: string }[];
    openGraph: {
        title: string;
        description: string;
        type: string;
        locale: string;
        siteName: string;
        images: {
            url: string;
            width: number;
            height: number;
            alt: string;
        }[];
    };
    twitter: {
        card: string;
        title: string;
        description: string;
        images: string[];
    };
    alternates: {
        canonical: string;
    };
    other: {
        "business:contact_data:street_address"?: string;
        "business:contact_data:locality"?: string;
        "business:contact_data:postal_code"?: string;
        "business:contact_data:country_name"?: string;
        "business:contact_data:email"?: string;
        "business:contact_data:phone_number"?: string;
    };
}


export interface JsonLd {
    "@context": "https://schema.org";
    "@type": string;
    name: string;
    image?: string;
    address: {
        "@type": "PostalAddress";
        addressLocality?: string;
        addressRegion?: string;
        streetAddress?: string;
        postalCode?: string;
    };
    telephone?: string;
    url: string;
    description?: string;
    priceRange?: string;
    geo?: {
        "@type": "GeoCoordinates";
        latitude: number;
        longitude: number;
    };
    openingHoursSpecification?: {
        "@type": "OpeningHoursSpecification";
        dayOfWeek: string;
        opens: string;
        closes: string;
    }[];
    hasOfferCatalog?: {
        "@type": "OfferCatalog";
        name: string;
        itemListElement: {
            "@type": "Offer";
            itemOffered: {
                "@type": "Service";
                name: string;
                description?: string;
            };
            price?: number;
            priceCurrency?: string;
        }[];
    };
    aggregateRating?: {
        "@type": "AggregateRating";
        ratingValue: number;
        reviewCount: number;
    };
}


export const AccountTypes = {
    CLIENT: 'CLIENT',
    PROVIDER: 'PROVIDER',
    EMPLOYEE: 'EMPLOYEE',
} as const;

export type AccountType = (typeof AccountTypes)[keyof typeof AccountTypes];
