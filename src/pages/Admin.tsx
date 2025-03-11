
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PropertyForm from '@/components/admin/PropertyForm';
import PropertyList from '@/components/admin/PropertyList';
import RecentlyListedProperties from '@/components/admin/RecentlyListedProperties';

const Admin = () => {
  const { user, isLoading, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is authenticated and admin
    const checkAccess = () => {
      if (!isLoading) {
        if (!isAuthenticated) {
          toast({
            title: 'Access Denied',
            description: 'Please sign in to access the admin area.',
            variant: 'destructive'
          });
          navigate('/auth');
          return;
        }
        
        if (!isAdmin) {
          toast({
            title: 'Access Denied',
            description: 'Only administrators can access this page.',
            variant: 'destructive'
          });
          navigate('/');
          return;
        }
      }
    };
    
    checkAccess();
  }, [isLoading, isAuthenticated, isAdmin, navigate, toast]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!isAdmin) {
    return null; // This will be redirected by the useEffect
  }
  
  return (
    <div className="min-h-screen bg-royal-50/50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-display font-bold text-royal-800">
            Admin <span className="text-gradient">Dashboard</span>
          </h1>
          <p className="text-royal-600 mt-2">
            Manage your property listings here
          </p>
        </div>
        
        {/* Recently Listed Properties Section */}
        <div className="mb-8">
          <RecentlyListedProperties />
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <Tabs defaultValue="properties" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="add">Add New Property</TabsTrigger>
            </TabsList>
            
            <TabsContent value="properties">
              <PropertyList />
            </TabsContent>
            
            <TabsContent value="add">
              <PropertyForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;
