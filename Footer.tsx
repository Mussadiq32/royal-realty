import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ChevronRight, Send } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { cn } from '@/lib/utils';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { name: 'Home', link: '/' },
    { name: 'About Us', link: '#about' },
    { name: 'Properties', link: '#featured' },
    { name: 'Services', link: '#services' },
    { name: 'Contact', link: '#contact' }
  ];
  
  const services = [
    { name: 'Residential Properties', link: '#' },
    { name: 'Commercial Properties', link: '#' },
    { name: 'Property Management', link: '#' },
    { name: 'Investment Advisory', link: '#' },
    { name: 'Legal Assistance', link: '#' }
  ];
  
  const cities = [
    { name: 'Srinagar', link: '#' },
    { name: 'Jammu', link: '#' },
    { name: 'Chandigarh', link: '#' },
    { name: 'Delhi', link: '#' },
    { name: 'Bangalore', link: '#' }
  ];
  
  const socialLinks = [
    { name: 'Facebook', icon: <FaFacebookF size={16} />, link: '#' },
    { name: 'Twitter', icon: <FaTwitter size={16} />, link: '#' },
    { name: 'Instagram', icon: <FaInstagram size={16} />, link: '#' },
    { name: 'LinkedIn', icon: <FaLinkedinIn size={16} />, link: '#' }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="bg-gradient-to-br from-royal-900 via-royal-800 to-royal-900 text-white relative overflow-hidden backdrop-blur-md">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,#1f2937_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-5" />
      <motion.div 
        className="container mx-auto section-padding relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div 
            variants={itemVariants} 
            className="backdrop-blur-lg bg-white/5 p-8 rounded-2xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/10"
          >
            <a href="/" className="flex items-center group">
              <span className="font-display text-3xl font-bold tracking-tight text-white group-hover:text-gold-400 transition-all duration-300 transform group-hover:scale-105">Royal<span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">Group</span></span>
            </a>
            <p className="mt-6 text-royal-100/90 leading-relaxed">
              Premium real estate solutions across India's major cities. Building excellence in real estate since 2012.
            </p>
            <div className="mt-8 space-y-5">
              <motion.div whileHover={{ x: 8 }} className="flex items-center group cursor-pointer transform hover:scale-105 transition-all duration-300">
                <Mail className="w-5 h-5 mr-4 text-gold-400 group-hover:text-gold-300 transition-colors duration-300" />
                <a href="mailto:info@royalgroupofrealestates.com" className="text-royal-100 group-hover:text-white transition-colors duration-300 text-sm">
                  info@royalgroupofrealestates.com
                </a>
              </motion.div>
              <motion.div whileHover={{ x: 8 }} className="flex items-center group cursor-pointer transform hover:scale-105 transition-all duration-300">
                <Phone className="w-5 h-5 mr-4 text-gold-400 group-hover:text-gold-300 transition-colors duration-300" />
                <a href="tel:+917006064587" className="text-royal-100 group-hover:text-white transition-colors duration-300 text-sm">
                  +91 700-606-4587
                </a>
              </motion.div>
              <motion.div whileHover={{ x: 8 }} className="flex items-start group cursor-pointer transform hover:scale-105 transition-all duration-300">
                <MapPin className="w-5 h-5 mr-4 text-gold-400 group-hover:text-gold-300 transition-colors duration-300 mt-1" />
                <span className="text-royal-100 group-hover:text-white transition-colors duration-300 text-sm">
                  Residency Road_190001 Srinagar, Jammu and Kashmir, India
                </span>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div variants={itemVariants} className="backdrop-blur-lg bg-white/5 p-8 rounded-2xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/10">
            <h3 className="text-xl font-semibold mb-6 text-white relative inline-block">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-3/4 h-0.5 bg-gradient-to-r from-gold-400 to-transparent"></div>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 8 }} className="transform hover:scale-105 transition-all duration-300">
                  <a href={link.link} className="flex items-center text-royal-100 hover:text-white transition-colors duration-300 text-sm group">
                    <ChevronRight className="w-4 h-4 mr-2 text-gold-400 group-hover:text-gold-300 transition-colors duration-300" />
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Our Services */}
          <motion.div variants={itemVariants} className="backdrop-blur-lg bg-white/5 p-8 rounded-2xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/10">
            <h3 className="text-xl font-semibold mb-6 text-white relative inline-block">
              Our Services
              <div className="absolute -bottom-2 left-0 w-3/4 h-0.5 bg-gradient-to-r from-gold-400 to-transparent"></div>
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li key={index} whileHover={{ x: 8 }} className="transform hover:scale-105 transition-all duration-300">
                  <a href={service.link} className="flex items-center text-royal-100 hover:text-white transition-colors duration-300 text-sm group">
                    <ChevronRight className="w-4 h-4 mr-2 text-gold-400 group-hover:text-gold-300 transition-colors duration-300" />
                    {service.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Newsletter */}
          <motion.div variants={itemVariants} className="backdrop-blur-lg bg-white/5 p-8 rounded-2xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/10">
            <h3 className="text-xl font-semibold mb-6 text-white relative inline-block">
              Newsletter
              <div className="absolute -bottom-2 left-0 w-3/4 h-0.5 bg-gradient-to-r from-gold-400 to-transparent"></div>
            </h3>
            <p className="text-royal-100/90 mb-6 text-sm">
              Subscribe to our newsletter for the latest updates and exclusive offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-l-lg focus:outline-none focus:border-gold-400 text-white placeholder-royal-100/50 text-sm"
              />
              <button type="submit" className="px-4 py-2 bg-gold-500 hover:bg-gold-600 rounded-r-lg transition-colors duration-300 flex items-center justify-center group">
                <Send className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </form>
          </motion.div>
          
          {/* Cities */}
          <motion.div variants={itemVariants} className="backdrop-blur-lg bg-white/5 p-8 rounded-2xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/10">
            <h3 className="text-xl font-semibold mb-6 text-white relative inline-block">
              Cities
              <div className="absolute -bottom-2 left-0 w-3/4 h-0.5 bg-gradient-to-r from-gold-400 to-transparent"></div>
            </h3>
            <ul className="space-y-3">
              {cities.map((city, index) => (
                <motion.li key={index} whileHover={{ x: 8 }} className="transform hover:scale-105 transition-all duration-300">
                  <a href={city.link} className="flex items-center text-royal-100 hover:text-white transition-colors duration-300 text-sm group">
                    <ChevronRight className="w-4 h-4 mr-2 text-gold-400 group-hover:text-gold-300 transition-colors duration-300" />
                    {city.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Copyright Section */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-royal-100/70 text-sm">
            © {currentYear} Royal Group of Real Estates. All rights reserved.
          </p>
          <p className="text-royal-100/70 text-sm mt-2">
            Developed by Mussadiq Wani Inc
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
