import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import PropertyManagement from '@/components/admin/PropertyManagement';

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
        <PropertyManagement />
      </div>
    </div>
  );
};

export default Admin;
