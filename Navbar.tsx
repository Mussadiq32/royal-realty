import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import CustomButton from '../ui/CustomButton';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const { user, isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'auto';
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-sm ${isScrolled ? 'bg-white/90 dark:bg-royal-900/90 shadow-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center transition-transform hover:scale-105">
          <img 
            src={isScrolled ? "https://iili.io/2mPx3rP.png" : "https://iili.io/2mPxFWb.png"} 
            alt="Royal Group of Real Estates Logo" 
            className="h-10 md:h-12"
          />
        </Link>
        
        <nav className={`hidden lg:flex space-x-8 ${isScrolled ? 'text-royal-800 dark:text-white' : 'text-white'}`}>
          <Link 
            to="/" 
            className="relative font-medium hover:text-gold-500 transition-all duration-300 hover:-translate-y-0.5"
          >
            Home
          </Link>
          <Link 
            to="/properties" 
            className="relative font-medium hover:text-gold-500 transition-all duration-300 hover:-translate-y-0.5"
          >
            Properties
          </Link>
          <div className="relative group">
            <button 
              onClick={toggleDropdown}
              className="flex items-center font-medium group-hover:text-gold-500 transition-all duration-300 hover:-translate-y-0.5"
            >
              Services
              <ChevronDown size={16} className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white/95 dark:bg-royal-900/95 backdrop-blur-sm rounded-lg shadow-xl py-2 z-20 animate-in fade-in-0 zoom-in-95 duration-200">
                <Link 
                  to="/services/buying" 
                  className="block px-4 py-2 text-royal-800 dark:text-white hover:bg-gold-50 dark:hover:bg-royal-800/50 hover:text-gold-500 transition-colors duration-300"
                >
                  Buying Property
                </Link>
                <Link 
                  to="/services/selling" 
                  className="block px-4 py-2 text-royal-800 dark:text-white hover:bg-gold-50 dark:hover:bg-royal-800/50 hover:text-gold-500 transition-colors duration-300"
                >
                  Selling Property
                </Link>
                <Link 
                  to="/services/renting" 
                  className="block px-4 py-2 text-royal-800 dark:text-white hover:bg-gold-50 dark:hover:bg-royal-800/50 hover:text-gold-500 transition-colors duration-300"
                >
                  Renting Property
                </Link>
                <Link 
                  to="/services/investment" 
                  className="block px-4 py-2 text-royal-800 dark:text-white hover:bg-gold-50 dark:hover:bg-royal-800/50 hover:text-gold-500 transition-colors duration-300"
                >
                  Investment Advisory
                </Link>
              </div>
            )}
          </div>
          <div className="relative group">
            <button 
              onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
              className="flex items-center font-medium group-hover:text-gold-500 transition-all duration-300 hover:-translate-y-0.5"
            >
              Tools
              <ChevronDown size={16} className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            {isToolsDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white/95 dark:bg-royal-900/95 backdrop-blur-sm rounded-lg shadow-xl py-2 z-20 animate-in fade-in-0 zoom-in-95 duration-200">
                <a 
                  href="https://www.99acres.com/property-rates-and-price-trends-prffid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-royal-800 dark:text-white hover:bg-gold-50 dark:hover:bg-royal-800/50 hover:text-gold-500 transition-colors duration-300"
                >
                  Property Rates & Trends
                </a>
                <a 
                  href="https://www.99acres.com/real-estate-insights-irffid?referrer_section=SIDE_MENU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-royal-800 dark:text-white hover:bg-gold-50 dark:hover:bg-royal-800/50 hover:text-gold-500 transition-colors duration-300"
                >
                  Property News
                </a>
              </div>
            )}
          </div>
          <Link 
            to="/about" 
            className="relative font-medium hover:text-gold-500 transition-all duration-300 hover:-translate-y-0.5"
          >
            About Us
          </Link>
          <Link 
            to="/contact" 
            className="relative font-medium hover:text-gold-500 transition-all duration-300 hover:-translate-y-0.5"
          >
            Contact
          </Link>
          
          {isAuthenticated && isAdmin && (
            <Link 
              to="/admin" 
              className="relative font-medium hover:text-gold-500 transition-all duration-300 hover:-translate-y-0.5"
            >
              Admin
            </Link>
          )}
        </nav>
        
        <div className="flex items-center space-x-4">
          <a 
            href="tel:7006064587" 
            className={cn(
              "hidden md:flex items-center font-medium transition-all duration-300 hover:-translate-y-0.5",
              isScrolled ? "text-royal-800 dark:text-white hover:text-gold-500" : "text-white hover:text-gold-300"
            )}
          >
            <Phone size={18} className="mr-2" />
            Contact Us
          </a>
          
          <ThemeToggle iconOnly className="hidden md:block transition-transform hover:scale-110" />
          
          <Link to="/auth">
            <CustomButton 
              variant={isScrolled ? "primary" : "outline"} 
              size="sm"
              className={!isScrolled ? "border-white text-white hover:bg-white hover:text-royal-800 transition-transform hover:scale-105" : "transition-transform hover:scale-105"}
            >
              {isAuthenticated ? 'Dashboard' : 'Sign In'}
            </CustomButton>
          </Link>
          
          <button 
            className="lg:hidden text-2xl focus:outline-none transition-transform hover:scale-110 bg-gold-500 text-white p-2 rounded-full"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="text-white" />
            ) : (
              <Menu className="text-white" />
            )}
          </button>
        </div>
      </div>
      
      <div
        className={`lg:hidden fixed inset-0 bg-royal-900 z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="mobile-menu-container h-full flex flex-col">
          <div className="flex justify-between items-center p-6 border-b border-royal-700/50">
            <Link to="/" onClick={toggleMobileMenu}>
              <img 
                src="https://iili.io/2mPxFWb.png" 
                alt="Royal Group of Real Estates Logo" 
                className="h-10 transition-transform hover:scale-105"
              />
            </Link>
            <div className="flex items-center gap-4">
              <ThemeToggle iconOnly className="transition-transform hover:scale-110" />
              <button 
                onClick={toggleMobileMenu}
                className="text-white text-2xl focus:outline-none transition-transform hover:scale-110"
                aria-label="Close menu"
              >
                <X />
              </button>
            </div>
          </div>
          
          <div className="px-8 py-4 space-y-4 text-gray-200 opacity-100">
            <Link
              to="/"
              className="block text-lg font-medium text-white hover:text-gold-500 transition-all duration-300 hover:translate-x-2"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/properties"
              className="block text-lg font-medium text-white hover:text-gold-500 transition-all duration-300 hover:translate-x-2"
              onClick={toggleMobileMenu}
            >
              Properties
            </Link>
            
            <div className="py-2">
              <p className="text-lg font-medium text-white mb-2">Services</p>
              <div className="pl-4 space-y-2">
                <Link
                  to="/services/buying"
                  className="block text-lg font-medium text-white hover:text-gold-500 transition-all duration-300 hover:translate-x-2"
                  onClick={toggleMobileMenu}
                >
                  Buying Property
                </Link>
                <Link
                  to="/services/selling"
                  className="block text-lg font-medium text-white hover:text-gold-500 transition-all duration-300 hover:translate-x-2"
                  onClick={toggleMobileMenu}
                >
                  Selling Property
                </Link>
                <Link
                  to="/services/renting"
                  className="block text-lg font-medium text-white hover:text-gold-500 transition-all duration-300 hover:translate-x-2"
                  onClick={toggleMobileMenu}
                >
                  Renting Property
                </Link>
                <Link
                  to="/services/investment"
                  className="block text-lg font-medium text-white hover:text-gold-500 transition-all duration-300 hover:translate-x-2"
                  onClick={toggleMobileMenu}
                >
                  Investment Advisory
                </Link>
              </div>
            </div>
            
            <Link
              to="/about"
              className="block text-lg font-medium text-white hover:text-gold-500 transition-all duration-300 hover:translate-x-2"
              onClick={toggleMobileMenu}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="block text-lg font-medium text-white hover:text-gold-500 transition-all duration-300 hover:translate-x-2"
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>
            
            {isAuthenticated && isAdmin && (
              <Link
                to="/admin"
                className="block text-lg font-medium text-white hover:text-gold-500 transition-all duration-300 hover:translate-x-2"
                onClick={toggleMobileMenu}
              >
                Admin
              </Link>
            )}
          </div>
          
          <div className="mt-auto p-8 border-t border-royal-700/50">
            <a 
              href="tel:7006064587" 
              className="flex items-center text-white hover:text-gold-500 transition-all duration-300 mb-4"
              onClick={toggleMobileMenu}
            >
              <Phone size={18} className="mr-2" />
              Contact Us
            </a>
            
            <Link to="/auth" onClick={toggleMobileMenu}>
              <CustomButton 
                variant="outline" 
                className="w-full border-white text-white hover:bg-white hover:text-royal-800 transition-transform hover:scale-105"
              >
                {isAuthenticated ? 'Dashboard' : 'Sign In'}
              </CustomButton>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
