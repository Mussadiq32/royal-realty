
import React, { useState, useEffect } from 'react';
import PropertyCard from './ui/PropertyCard';
import PropertySearch from './ui/PropertySearch';
import CustomButton from './ui/CustomButton';
import { Search, Loader2 } from 'lucide-react';

const PropertyList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // This is just to simulate loading for better UX
  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <PropertySearch
          value={searchTerm}
          onChange={setSearchTerm}
          onSearch={handleSearch}
          placeholder="Search for properties (redirects to Google)..."
          useGoogleRedirect={true}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 size={40} className="animate-spin text-gold-500" />
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="mb-4">
            <Search size={50} className="mx-auto text-royal-300" />
          </div>
          <h3 className="text-2xl font-display font-medium text-royal-700 mb-2">Google-Powered Search</h3>
          <p className="text-royal-500 max-w-md mx-auto mb-6">
            Enter your search terms above and click to search properties on Google.
          </p>
        </div>
      )}
    </div>
  );
};

export default PropertyList;
