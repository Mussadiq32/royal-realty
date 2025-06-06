import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
}

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Ritu Patel",
      location: "Mumbai",
      rating: 5,
      text: "Royal Group made my first home purchase so easy! Their team was supportive and transparent throughout the process. Highly recommended!"
    },
    {
      id: 2,
      name: "Mukesh Choudary",
      location: "Delhi",
      rating: 5,
      text: "I was impressed by the professionalism and dedication of Royal Group. They helped me find the perfect investment property in no time."
    },
    {
      id: 3,
      name: "Gagan Deep Singh",
      location: "Chandigarh",
      rating: 5,
      text: "The team at Royal Group is knowledgeable and trustworthy. They guided me through every step and ensured a smooth transaction."
    },
    {
      id: 4,
      name: "Priya Sharma",
      location: "Bangalore",
      rating: 5,
      text: "Excellent service and great attention to detail. I found my dream home thanks to Royal Group!"
    },
    {
      id: 5,
      name: "Rahul Verma",
      location: "Hyderabad",
      rating: 5,
      text: "Royal Group's property management is top-notch. I never have to worry about my rental property anymore."
    },
  ];

  // Helper to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex, autoplay]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.5,
      },
    }),
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={cn(
          "w-4 h-4", 
          i < rating ? "text-gold-500 fill-gold-500" : "text-gray-300"
        )} 
      />
    ));
  };

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            className="inline-block px-3 py-1 bg-gold-100 text-gold-600 text-sm font-medium rounded-full mb-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Client Testimonials
          </motion.div>
          <motion.h2 
            className="heading-lg text-royal-800 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            What Our <span className="text-gradient">Clients</span> Say
          </motion.h2>
          <motion.p 
            className="text-royal-600"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Discover why our clients trust Royal Group for their real estate needs. Read authentic testimonials from satisfied customers who have experienced our exceptional service.
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Testimonial Carousel */}
          <div 
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-royal-50 to-royal-100 p-1"
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px)] bg-[size:4rem_1px] opacity-20" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:1px_4rem] opacity-20" />
            
            <div className="relative p-6 sm:p-10 overflow-hidden rounded-xl bg-white shadow-xl">
              <div className="absolute top-6 right-10 text-gold-300 opacity-30">
                <Quote size={120} />
              </div>
              
              <AnimatePresence custom={direction} initial={false} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col md:flex-row gap-8 items-center"
                >
                  {/* Testimonial Image/Initials */}
                  <div className="w-full md:w-1/3 flex-shrink-0">
                    <div className="relative flex flex-col items-center">
                      <div className="w-32 h-32 md:w-48 md:h-48 mx-auto rounded-full bg-gradient-to-br from-gold-400 to-royal-600 flex items-center justify-center text-white text-5xl md:text-7xl font-bold border-4 border-gold-200 shadow-lg transform transition-transform duration-500 hover:scale-105">
                        {getInitials(testimonials[currentIndex].name)}
                      </div>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gold-500 text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
                        {testimonials[currentIndex].location}
                      </div>
                    </div>
                  </div>
                  
                  {/* Testimonial Content */}
                  <div className="w-full md:w-2/3 text-center md:text-left">
                    <div className="flex justify-center md:justify-start mb-3">
                      {renderStars(testimonials[currentIndex].rating)}
                    </div>
                    <p className="text-lg md:text-xl font-display italic text-royal-700 mb-6">
                      "{testimonials[currentIndex].text}"
                    </p>
                    <div className="space-y-1">
                      <h4 className="text-xl font-semibold text-royal-800">{testimonials[currentIndex].name}</h4>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Navigation Buttons */}
              <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between px-4 z-10">
                <button 
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-royal-800 hover:bg-gold-500 hover:text-white transition-colors duration-300"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-royal-800 hover:bg-gold-500 hover:text-white transition-colors duration-300"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Testimonial Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === currentIndex 
                    ? "bg-gold-500 w-6" 
                    : "bg-royal-200 hover:bg-royal-300"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;