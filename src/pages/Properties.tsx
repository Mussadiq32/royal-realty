import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PropertySearch from '@/components/ui/PropertySearch';
import CustomButton from '@/components/ui/CustomButton';
import { MapPin, Home, ArrowUpDown, X, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

const Properties = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('all');
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [type, setType] = useState<'residential' | 'commercial' | 'all'>('all');
  const { toast } = useToast();
  
  const handleGoogleSearch = () => {
    let searchQuery = 'real estate';
    
    if (query) searchQuery += ` ${query}`;
    if (location !== 'all') searchQuery += ` in ${location}`;
    if (type !== 'all') searchQuery += ` ${type}`;
    if (minPrice) searchQuery += ` min price ${minPrice}`;
    if (maxPrice) searchQuery += ` max price ${maxPrice}`;
    
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    window.open(googleSearchUrl, '_blank');
    
    toast({
      title: "Redirecting to Google",
      description: "Searching for properties on Google",
    });
  };

  const handleResetFilters = () => {
    setQuery('');
    setLocation('all');
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setType('all');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-royal-50 pt-28 pb-12">
          <div className="container mx-auto px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl animate-fade-up">
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-royal-800 font-semibold leading-tight mb-6">
                Find Your Perfect <span className="text-gold-500">Property</span>
              </h1>
              <p className="text-royal-600 text-lg mb-8 max-w-2xl">
                Powered by Google Search - find properties across the web with our smart search tools.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-8 border-b">
          <div className="container mx-auto px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
              <div className="lg:col-span-2">
                <PropertySearch 
                  value={query}
                  onChange={setQuery}
                  onSearch={handleGoogleSearch}
                  placeholder="Search properties..."
                  useGoogleRedirect={true}
                />
              </div>
              
              <div className="lg:col-span-1">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-royal-400" size={18} />
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 appearance-none bg-white"
                  >
                    <option value="all">All Locations</option>
                    <option value="Srinagar">Srinagar</option>
                    <option value="Jammu">Jammu</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Gurgaon">Gurgaon</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                  </select>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-royal-400" size={18} />
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as 'residential' | 'commercial' | 'all')}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 appearance-none bg-white"
                  >
                    <option value="all">All Types</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice || ''}
                  onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>
              
              <div className="lg:col-span-1">
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice || ''}
                    onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                  <CustomButton
                    onClick={handleGoogleSearch}
                    className="px-4"
                    icon={<Search size={18} />}
                  >
                    Search
                  </CustomButton>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={handleResetFilters}
                className="flex items-center text-royal-600 hover:text-royal-800 text-sm"
              >
                <X size={16} className="mr-1" />
                Reset Filters
              </button>
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-6 md:px-12 lg:px-24">
            <div className="text-center py-20">
              <div className="mb-4">
                <Search size={50} className="mx-auto text-royal-300" />
              </div>
              <h3 className="text-2xl font-display font-medium text-royal-700 mb-2">Google-Powered Property Search</h3>
              <p className="text-royal-500 max-w-md mx-auto mb-6">
                Use the search form above to find properties on Google. Your search will open in a new tab with relevant results.
              </p>
              <CustomButton onClick={handleGoogleSearch} variant="primary">
                Search on Google
              </CustomButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton phoneNumber="+917006064587" />
    </div>
  );
};

export default Properties;
