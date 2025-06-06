import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import PropertyCard from '@/components/ui/PropertyCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Eye, Plus } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  type: 'residential' | 'commercial';
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  featured: boolean;
  created_at: string;
}

const RecentlyListedProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const fetchRecentProperties = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      
      setProperties(data as Property[]);
    } catch (error: any) {
      console.error('Error fetching recent properties:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to fetch recent properties",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchRecentProperties();
    
    // Set up realtime subscription to refresh properties when changes occur
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'properties' },
        () => {
          console.log('Property table change detected, refreshing data...');
          fetchRecentProperties();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleViewAllProperties = () => {
    navigate('/properties');
  };

  const handleAddNewProperty = () => {
    // This could navigate to a property form or open a modal
    toast({
      title: "Add New Property",
      description: "Use the Property Management tab to add new listings",
    });
  };
  
  return (
    <div className="bg-white dark:bg-royal-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-royal-800 dark:text-royal-200">
          Recently Listed Properties
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleViewAllProperties}>
            <Eye className="h-4 w-4 mr-2" />
            View All
          </Button>
          <Button variant="default" size="sm" onClick={handleAddNewProperty}>
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </div>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="h-[200px] w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-6 w-1/4" />
            </div>
          ))}
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-royal-600 dark:text-royal-300 mb-4">
            No properties found. Add some new listings!
          </p>
          <Button onClick={handleAddNewProperty}>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Property
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="transition-transform hover:scale-105">
              <PropertyCard
                id={property.id}
                title={property.title}
                location={property.location}
                price={property.price}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                area={property.area}
                image={property.image || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'}
                featured={property.featured}
                type={property.type}
              />
            </div>
          ))}
        </div>
      )}
      
      {properties.length > 0 && (
        <div className="mt-6 text-center">
          <Button variant="outline" onClick={handleViewAllProperties}>
            View All Properties ({properties.length > 3 ? 'More Available' : `${properties.length} Total`})
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentlyListedProperties;
