"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { RatingQuery } from "@/features/ratings/interfaces/ratings.interfaces";
import StarRating from "@/components/ui/star-rating";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetRatings } from "@/features/ratings/hooks/use-ratings";

interface CustomerReviewsProps {
  provider: {
    uuid: string;
    title: string;
    logo: {
      url: string;
    } | null;
  };
}

const CustomerReviews = ({ provider }: CustomerReviewsProps) => {
  const pageSize = 5;
  const [page, setPage] = React.useState(1);
  const ratingsQuery = React.useMemo<RatingQuery>(
    () => ({
      provider_uuid: provider.uuid,
      limit: pageSize,
      page,
      order_by: "created_at",
      order_direction: "desc",
    }),
    [page, provider.uuid]
  );
  const { data: ratingsData, isLoading } = useGetRatings(ratingsQuery);
  React.useEffect(() => {
    setPage(1);
  }, [provider.uuid]);

  const reviews = ratingsData?.data || [];
  const totalReviews = ratingsData?.pagination?.total || 0;
  const totalPages = ratingsData?.pagination?.total_pages || 1;
  const hasNext = ratingsData?.pagination?.has_next || false;
  const hasPrev = ratingsData?.pagination?.has_prev || false;
  const showingStart = reviews.length > 0 ? (page - 1) * pageSize + 1 : 0;
  const showingEnd = reviews.length > 0 ? showingStart + reviews.length - 1 : 0;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (firstName: string, lastName: string) => {
    const firstInitial = firstName?.charAt(0) || "";
    const lastInitial = lastName?.charAt(0) || "";
    return (firstInitial + lastInitial).toUpperCase();
  };

  if (isLoading) {
    return null;
  }

  if (reviews.length === 0) {
    return null;
  }

  return (
    <>
      <div className="mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-foreground">Reviews</h3>
        <p className="text-xs sm:text-sm text-muted-foreground">What our customers are saying</p>
      </div>

      <ScrollArea className="w-full max-h-96">
        <div className="space-y-4 pr-4">
          {reviews.map((review) => (
            <div key={review.uuid} className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="text-sm font-medium">{getInitials(review.client.first_name, review.client.last_name)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {review.client.first_name} {review.client.last_name}
                      </h4>
                    </div>
                    <div className="flex flex-col sm:items-end gap-1">
                      <StarRating rating={review.total} size="sm" />
                      <p className="text-xs text-muted-foreground">{formatDate(review.created_at)}</p>
                    </div>
                  </div>

                  {review.comment && <p className="text-sm text-foreground leading-relaxed">{review.comment}</p>}

                  {review.response && (
                    <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={provider.logo?.url} alt={provider.title} />
                          <AvatarFallback className="text-xs font-medium bg-primary text-primary-foreground">{provider.title?.charAt(0).toUpperCase() || "P"}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-semibold text-foreground">{provider.title}</span>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed ml-8">{review.response}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 text-xs text-muted-foreground">
                    <span className="whitespace-nowrap">Experience: {review.experience}/5</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="whitespace-nowrap">Punctuality: {review.punctuality}/5</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="whitespace-nowrap">Friendliness: {review.friendliness}/5</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="whitespace-nowrap">Professionalism: {review.professionalism}/5</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {totalPages > 1 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-center text-muted-foreground sm:text-left">
              Showing {showingStart}-{showingEnd} of {totalReviews} reviews
            </p>
            <div className="flex items-center justify-center gap-2 sm:justify-end">
              <Button variant="outline" size="sm" onClick={() => hasPrev && setPage((prev) => Math.max(prev - 1, 1))} disabled={!hasPrev}>
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <Button variant="outline" size="sm" onClick={() => hasNext && setPage((prev) => prev + 1)} disabled={!hasNext}>
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerReviews;
