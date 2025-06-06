import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import PropertyForm from './PropertyForm';
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Star,
  MapPin,
  Calendar,
  DollarSign,
  Home,
  Building,
  MoreHorizontal,
  Download,
  Upload
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price: string;
  type: 'residential' | 'commercial';
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  featured: boolean;
  status: 'active' | 'sold' | 'pending' | 'draft';
  views: number;
  inquiries: number;
  created_at: string;
  updated_at: string;
  agent_id?: string;
}

const PropertyManagement = () => {
  const [properties, setProperties] = useState<Property[]>([
    {
      id: '1',
      title: 'Luxury Villa with Dal Lake View',
      description: 'Stunning 4-bedroom villa with panoramic views of Dal Lake. Perfect for luxury living.',
      location: 'Srinagar, Jammu & Kashmir',
      price: '2.5 Cr',
      type: 'residential',
      bedrooms: 4,
      bathrooms: 3,
      area: '3,200 sq.ft',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      featured: true,
      status: 'active',
      views: 2450,
      inquiries: 24,
      created_at: '2024-01-15',
      updated_at: '2024-01-20'
    },
    {
      id: '2',
      title: 'Modern 3BHK Apartment',
      description: 'Contemporary apartment in prime location with excellent connectivity.',
      location: 'Delhi, India',
      price: '85 Lac',
      type: 'residential',
      bedrooms: 3,
      bathrooms: 2,
      area: '1,800 sq.ft',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      featured: false,
      status: 'active',
      views: 1890,
      inquiries: 18,
      created_at: '2024-01-14',
      updated_at: '2024-01-19'
    },
    {
      id: '3',
      title: 'Commercial Space in IT Hub',
      description: 'Prime commercial space in the heart of IT corridor.',
      location: 'Bangalore, Karnataka',
      price: '1.2 Cr',
      type: 'commercial',
      bedrooms: 0,
      bathrooms: 2,
      area: '2,500 sq.ft',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      featured: true,
      status: 'pending',
      views: 1650,
      inquiries: 15,
      created_at: '2024-01-13',
      updated_at: '2024-01-18'
    }
  ]);

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterLocation, setFilterLocation] = useState<string>('all');
  const { toast } = useToast();

  const cities = ['Srinagar', 'Delhi', 'Bangalore', 'Chandigarh', 'Gurgaon', 'Jammu', 'Hyderabad', 'Ahmedabad'];

  const handleEdit = (property: Property) => {
    console.log('Edit clicked', property);
    setSelectedProperty(property);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    console.log('Delete clicked', id);
    setProperties(properties.filter(p => p.id !== id));
    toast({
      title: "Property Deleted",
      description: "Property has been successfully deleted.",
    });
  };

  const handleStatusChange = (id: string, newStatus: Property['status']) => {
    console.log('Status change', id, newStatus);
    setProperties(properties.map(p => 
      p.id === id ? { ...p, status: newStatus, updated_at: new Date().toISOString().split('T')[0] } : p
    ));
    toast({
      title: "Status Updated",
      description: `Property status changed to ${newStatus}`,
    });
  };

  const toggleFeatured = (id: string) => {
    console.log('Feature toggle', id);
    setProperties(properties.map(p => 
      p.id === id ? { ...p, featured: !p.featured, updated_at: new Date().toISOString().split('T')[0] } : p
    ));
    toast({
      title: "Featured Status Updated",
      description: "Property featured status has been updated.",
    });
  };

  const handleFormSuccess = () => {
    console.log('Form success');
    setShowForm(false);
    setSelectedProperty(null);
    // Refresh properties list here
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || property.type === filterType;
    const matchesStatus = filterStatus === 'all' || property.status === filterStatus;
    const matchesLocation = filterLocation === 'all' || property.location.toLowerCase().includes(filterLocation.toLowerCase());
    return matchesSearch && matchesType && matchesStatus && matchesLocation;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'sold': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const PropertyCard = ({ property }: { property: Property }) => (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {property.featured && (
          <Badge className="absolute top-2 left-2 bg-gold-500">
            <Star className="h-3 w-3 mr-1" />
            Featured
          </Badge>
        )}
        <Badge className={`absolute top-2 right-2 ${getStatusColor(property.status)}`}>
          {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
        </Badge>
      </div>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-2">{property.title}</h3>
            <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {property.location}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="font-bold text-xl text-gold-600">{property.price}</div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              {property.type === 'residential' && (
                <>
                  <span>{property.bedrooms} BHK</span>
                  <span>•</span>
                </>
              )}
              <span>{property.area}</span>
            </div>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                {property.views}
              </div>
              <div>{property.inquiries} inquiries</div>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {property.updated_at}
            </div>
          </div>
          <div className="flex gap-2 pt-2 border-t">
            <Button variant="outline" size="sm" onClick={() => handleEdit(property)}>
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toggleFeatured(property.id)}
            >
              <Star className={`h-4 w-4 mr-1 ${property.featured ? 'fill-current' : ''}`} />
              {property.featured ? 'Unfeature' : 'Feature'}
            </Button>
            <Select onValueChange={(value) => handleStatusChange(property.id, value as Property['status'])}>
              <SelectTrigger className="w-24 h-8">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Property</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{property.title}"? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(property.id)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedProperty ? 'Edit Property' : 'Add New Property'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {selectedProperty ? 'Update property details' : 'Create a new property listing'}
            </p>
          </div>
          <Button variant="outline" onClick={() => setShowForm(false)}>
            Back to Properties
          </Button>
        </div>
        <PropertyForm 
          property={selectedProperty} 
          onSuccess={handleFormSuccess} 
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Property Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your property listings</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Properties</p>
                <p className="text-2xl font-bold">{properties.length}</p>
              </div>
              <Home className="h-8 w-8 text-gold-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Listings</p>
                <p className="text-2xl font-bold">{properties.filter(p => p.status === 'active').length}</p>
              </div>
              <Building className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Featured Properties</p>
                <p className="text-2xl font-bold">{properties.filter(p => p.featured).length}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Views</p>
                <p className="text-2xl font-bold">{properties.reduce((sum, p) => sum + p.views, 0).toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterLocation} onValueChange={setFilterLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {cities.map(city => (
                  <SelectItem key={city} value={city.toLowerCase()}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
      {filteredProperties.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-500 dark:text-gray-400">
              <Home className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No properties found</h3>
              <p>Try adjusting your search criteria or add a new property.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PropertyManagement; 