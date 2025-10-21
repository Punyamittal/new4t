import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  MapPin,
  Calendar as CalendarIcon,
  Users,
  Search,
  Plus,
  Minus,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DestinationPickerProps {
  value: string;
  onChange: (value: string) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DestinationPicker = ({
  value,
  onChange,
  isOpen,
  onOpenChange,
}: DestinationPickerProps) => {
  const [inputValue, setInputValue] = useState(value);

  const popularDestinations = [
    { name: "Riyadh", country: "Saudi Arabia" },
    { name: "Jeddah", country: "Saudi Arabia" },
    { name: "Dubai", country: "UAE" },
    { name: "Abu Dhabi", country: "UAE" },
    { name: "Doha", country: "Qatar" },
    { name: "Mecca", country: "Saudi Arabia" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  const handleDestinationSelect = (destination: string) => {
    setInputValue(destination);
    onChange(destination);
    onOpenChange(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <div className="flex flex-col items-start space-y-1 cursor-pointer p-4 hover:bg-muted/50 rounded-lg transition-all duration-200 min-w-[200px] group">
          <Label className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
            Where
          </Label>
          <div
            className={cn(
              "text-base font-normal transition-colors truncate w-full",
              value ? "text-foreground font-medium" : "text-muted-foreground"
            )}
          >
            {value || "Search destinations"}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-80 p-0 pointer-events-auto"
        side="bottom"
      >
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Search destinations</h4>
                <Input
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Where to?"
                  className="border border-border focus-visible:ring-1 focus-visible:ring-ring"
                  autoFocus
                />
              </div>
              <div className="space-y-1">
                <h4 className="font-medium text-sm">Popular destinations</h4>
                {popularDestinations.map((dest) => (
                  <button
                    key={dest.name}
                    onClick={() => handleDestinationSelect(dest.name)}
                    className="flex items-center space-x-3 w-full p-3 hover:bg-muted/50 rounded-lg transition-colors text-left"
                  >
                    <div className="h-10 w-10 bg-muted rounded-lg flex items-center justify-center">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-base font-medium">{dest.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {dest.country}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

interface DatePickerProps {
  startDate?: Date;
  endDate?: Date;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  type: "checkin" | "checkout";
}

export const DatePicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  isOpen,
  onOpenChange,
  type,
}: DatePickerProps) => {
  const currentDate = type === "checkin" ? startDate : endDate;

  const handleDateSelect = (date: Date | undefined) => {
    if (type === "checkin") {
      onStartDateChange(date);
      // If start date is after end date, reset end date
      if (date && endDate && date > endDate) {
        onEndDateChange(undefined);
      }
    } else {
      onEndDateChange(date);
    }
    onOpenChange(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <div className="flex flex-col items-start space-y-1 cursor-pointer p-4 hover:bg-muted/50 rounded-lg transition-all duration-200 min-w-[140px] group">
          <Label className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
            {type === "checkin" ? "Check in" : "Check out"}
          </Label>
          <div
            className={cn(
              "text-base font-normal transition-colors",
              currentDate
                ? "text-foreground font-medium"
                : "text-muted-foreground"
            )}
          >
            {currentDate ? format(currentDate, "MMM d, yyyy") : "Add dates"}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-auto p-0 pointer-events-auto"
        side="bottom"
      >
        <Calendar
          mode="single"
          selected={currentDate}
          onSelect={handleDateSelect}
          disabled={(date) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (date < today) return true;

            // For checkout, disable dates before checkin date
            if (type === "checkout" && startDate) {
              return date <= startDate;
            }

            return false;
          }}
          initialFocus
          className="rounded-lg border-0 shadow-lg pointer-events-auto"
        />
      </PopoverContent>
    </Popover>
  );
};

interface GuestSelectorProps {
  adults: number;
  children: number;
  onAdultsChange: (count: number) => void;
  onChildrenChange: (count: number) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const GuestSelector = ({
  adults,
  children,
  onAdultsChange,
  onChildrenChange,
  isOpen,
  onOpenChange,
}: GuestSelectorProps) => {
  const totalGuests = adults + children;

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <div className="flex flex-col items-start space-y-1 cursor-pointer p-4 hover:bg-muted/50 rounded-lg transition-all duration-200 min-w-[140px] group">
          <Label className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
            Guests
          </Label>
          <div
            className={cn(
              "text-base font-normal transition-colors",
              totalGuests > 0
                ? "text-foreground font-medium"
                : "text-muted-foreground"
            )}
          >
            {totalGuests > 0
              ? `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`
              : "Add guests"}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-80 p-0 pointer-events-auto"
        side="bottom"
      >
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">Adults</div>
                  <div className="text-xs text-muted-foreground">
                    Ages 13 or above
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:scale-110 transition-transform duration-200"
                    onClick={() => onAdultsChange(Math.max(1, adults - 1))}
                    disabled={adults <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm font-medium">
                    {adults}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:scale-110 transition-transform duration-200"
                    onClick={() => onAdultsChange(adults + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">Children</div>
                  <div className="text-xs text-muted-foreground">Ages 2-12</div>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:scale-110 transition-transform duration-200"
                    onClick={() => onChildrenChange(Math.max(0, children - 1))}
                    disabled={children <= 0}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm font-medium">
                    {children}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:scale-110 transition-transform duration-200"
                    onClick={() => onChildrenChange(children + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

interface SearchButtonProps {
  onSearch: () => void;
  expanded: boolean;
}

export const SearchButton = ({ onSearch, expanded }: SearchButtonProps) => {
  return (
    <Button
      onClick={onSearch}
      className={cn(
        "bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105",
        expanded
          ? "px-12 py-8 rounded-[2rem] text-lg font-semibold h-auto min-w-[120px]"
          : "p-6 rounded-[2rem] h-auto min-w-[60px]"
      )}
    >
      <Search
        className={cn("transition-all", expanded ? "h-6 w-6 mr-3" : "h-6 w-6")}
      />
      {expanded && "Search"}
    </Button>
  );
};
