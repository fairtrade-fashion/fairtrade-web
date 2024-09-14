import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { imageUrl?: string }
>(({ className, imageUrl, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      "w-full h-96",
      className
    )}
    {...props}
  >
    {imageUrl && (
      <img
        src={imageUrl}
        alt="Card Image"
        className="rounded-lg w-full h-full object-cover"
      />
    )}
  </div>
));
Card.displayName = "Card";

export {
  Card
};
