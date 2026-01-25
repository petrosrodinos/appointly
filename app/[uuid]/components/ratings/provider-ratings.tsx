"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StarRating from "@/components/ui/star-rating";
import { Skeleton } from "@/components/ui/skeleton";
import CustomerReviews from "./customer-reviews";
import AiSentiment from "./ai-sentiment";
import { Heart, Clock, Users, Award } from "lucide-react";
import { useGetAverageRating, useGetRatings } from "@/features/ratings/hooks/use-ratings";

interface ProviderRatingsProps {
  provider: {
    uuid: string;
    title: string;
    logo: {
      url: string;
    } | null;
  };
}

interface RatingIndicator {
  id: string;
  label: string;
  icon: React.ReactNode;
  rating: number;
  description: string;
}

const ProviderRatings = ({ provider }: ProviderRatingsProps) => {
  const { data: averageRating, isLoading: isLoadingAverageRating } = useGetAverageRating(provider.uuid);

  const ratingIndicators: RatingIndicator[] = [
    {
      id: "experience",
      label: "Experience",
      icon: <Heart className="w-4 h-4 md:w-5 md:h-5 text-red-500" />,
      rating: averageRating?.ratings_breakdown?.experience || 0,
      description: "How experienced are we",
    },
    {
      id: "punctuality",
      label: "Punctuality",
      icon: <Clock className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />,
      rating: averageRating?.ratings_breakdown?.punctuality || 0,
      description: "How punctual and reliable are we",
    },
    {
      id: "friendliness",
      label: "Friendliness",
      icon: <Users className="w-4 h-4 md:w-5 md:h-5 text-green-500" />,
      rating: averageRating?.ratings_breakdown?.friendliness || 0,
      description: "How friendly and engaging are we",
    },
    {
      id: "professionalism",
      label: "Professionalism",
      icon: <Award className="w-4 h-4 md:w-5 md:h-5 text-purple-500" />,
      rating: averageRating?.ratings_breakdown?.professionalism || 0,
      description: "How professional and skilled are we",
    },
  ];

  const overallRating = averageRating?.average_rating || 0;
  const totalRatings = averageRating?.total_ratings || 0;

  if (isLoadingAverageRating) {
    return (
      <Card className="shadow-xl border border-border">
        <CardHeader>
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-40" />
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
                <Skeleton className="h-8 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if(totalRatings === 0) {
    return null;
  }

  return (
    <Card className="shadow-xl border border-border">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">Ratings</CardTitle>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <StarRating rating={overallRating} size="lg" showValue />
          </div>
          <span className="text-xs sm:text-sm text-muted-foreground">
            Based on {totalRatings} {totalRatings === 1 ? "review" : "reviews"}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
          {ratingIndicators.map((indicator) => (
            <div key={indicator.id} className="flex items-center justify-between p-2 md:p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-1 md:p-2 rounded-lg bg-background shadow-sm">{indicator.icon}</div>
                <div>
                  <h3 className="font-semibold text-sm md:text-base text-foreground">{indicator.label}</h3>
                  <p className="hidden md:block text-sm text-muted-foreground">{indicator.description}</p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <StarRating rating={indicator.rating} size="sm" />
                <span className="text-xs md:text-sm font-medium text-muted-foreground">{indicator.rating.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>

        <AiSentiment sentiment_text={averageRating?.ratings_landing_sentiment || ""} />

        <div className="pt-8 border-t border-border">
          <CustomerReviews provider={provider} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderRatings;
