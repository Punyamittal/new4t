import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

interface MobileSearchBarProps {
  className?: string;
}

const MobileSearchBar: React.FC<MobileSearchBarProps> = ({ className = "" }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    adults: 2,
    children: 0,
    rooms: 1
  });

  // Popular destinations
  const destinations = [
    'Riyadh, Saudi Arabia',
    'Jeddah, Saudi Arabia',
    'Dubai, UAE',
    'Abu Dhabi, UAE',
    'Kuwait City, Kuwait',
    'Doha, Qatar',
    'Manama, Bahrain',
    'Muscat, Oman',
    'Cairo, Egypt',
    'Amman, Jordan'
  ];

  // Guest options
  const guestOptions = [
    { adults: 1, children: 0, rooms: 1, label: '1 Guest, 1 Room' },
    { adults: 2, children: 0, rooms: 1, label: '2 Guests, 1 Room' },
    { adults: 2, children: 1, rooms: 1, label: '3 Guests, 1 Room' },
    { adults: 2, children: 2, rooms: 1, label: '4 Guests, 1 Room' },
    { adults: 4, children: 0, rooms: 2, label: '4 Guests, 2 Rooms' },
    { adults: 6, children: 0, rooms: 3, label: '6 Guests, 3 Rooms' },
  ];

  const handleSearch = () => {
    const params = new URLSearchParams({
      destination: searchData.destination || 'Riyadh',
      guests: searchData.guests.toString(),
      adults: searchData.adults.toString(),
      children: searchData.children.toString(),
      rooms: searchData.rooms.toString(),
      checkIn: searchData.checkIn || new Date().toISOString().split('T')[0],
      checkOut: searchData.checkOut || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });

    navigate(`/search?${params.toString()}`);
    setIsOpen(false);
  };

  const handleGuestSelect = (option: typeof guestOptions[0]) => {
    setSearchData(prev => ({
      ...prev,
      adults: option.adults,
      children: option.children,
      rooms: option.rooms,
      guests: option.adults + option.children
    }));
  };

  const getGuestLabel = () => {
    const option = guestOptions.find(opt => 
      opt.adults === searchData.adults && 
      opt.children === searchData.children && 
      opt.rooms === searchData.rooms
    );
    return option ? option.label : `${searchData.guests} Guests, ${searchData.rooms} Room${searchData.rooms > 1 ? 's' : ''}`;
  };

  return (
    <div className={`mobile-search-bar ${className}`}>
      {/* Mobile Search Trigger Button */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full justify-between h-14 px-4 text-left font-normal bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center space-x-3">
              <Search className="h-5 w-5 text-gray-600" />
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-900 font-medium">
                  {searchData.destination || 'Where are you going?'}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {searchData.checkIn && searchData.checkOut 
                    ? `${searchData.checkIn} • ${searchData.checkOut} • ${getGuestLabel()}`
                    : 'Enter details'
                  }
                </div>
              </div>
            </div>
            <Search className="h-5 w-5 text-primary" />
          </Button>
        </SheetTrigger>

        <SheetContent 
          side="bottom" 
          className="h-[90vh] bg-white rounded-t-2xl border-0 shadow-2xl"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-center p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Search Hotels</h2>
            </div>

            {/* Search Form */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Destination */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Search destinations
                </Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-between h-12 px-4 text-left font-normal bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <span className={searchData.destination ? 'text-gray-900' : 'text-gray-500'}>
                        {searchData.destination || 'Where are you going?'}
                      </span>
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full max-h-60 overflow-y-auto">
                    {destinations.map((dest, index) => (
                      <DropdownMenuItem
                        key={index}
                        onClick={() => setSearchData(prev => ({ ...prev, destination: dest }))}
                        className="cursor-pointer"
                      >
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        {dest}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Check-in Date */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Check in
                </Label>
                <Input
                  type="date"
                  value={searchData.checkIn}
                  onChange={(e) => setSearchData(prev => ({ ...prev, checkIn: e.target.value }))}
                  className="h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Check-out Date */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Check out
                </Label>
                <Input
                  type="date"
                  value={searchData.checkOut}
                  onChange={(e) => setSearchData(prev => ({ ...prev, checkOut: e.target.value }))}
                  className="h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  min={searchData.checkIn || new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Guests */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Guests
                </Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-between h-12 px-4 text-left font-normal bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <span className="text-gray-900">{getGuestLabel()}</span>
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    {guestOptions.map((option, index) => (
                      <DropdownMenuItem
                        key={index}
                        onClick={() => handleGuestSelect(option)}
                        className="cursor-pointer"
                      >
                        <Users className="h-4 w-4 mr-2 text-gray-400" />
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Search Button */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <Button 
                onClick={handleSearch}
                className="search-button w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Search className="h-5 w-5 mr-2" />
                Search Hotels
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSearchBar;
