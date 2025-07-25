// src/components/ui/Button.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  // Base button styles
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';

  // Variant styles
  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl focus:ring-primary-500',
    secondary: 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 shadow-sm hover:shadow-md focus:ring-gray-500',
    success: 'bg-gradient-to-r from-success-500 to-green-600 hover:from-success-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl focus:ring-success-500',
    danger: 'bg-gradient-to-r from-danger-500 to-red-600 hover:from-danger-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl focus:ring-danger-500',
    outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white focus:ring-primary-500 dark:border-primary-400 dark:text-primary-400',
    ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-500',
    link: 'text-primary-500 hover:text-primary-600 underline-offset-4 hover:underline focus:ring-primary-500 p-0',
    gradient: 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl focus:ring-purple-500',
    glassmorphism: 'backdrop-blur-xl bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700/30 text-gray-800 dark:text-white hover:bg-white/30 dark:hover:bg-gray-800/30 shadow-lg',
  };

  // Size styles
  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };

  // Width styles
  const widthStyles = fullWidth ? 'w-full' : '';

  // Combine all styles
  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyles} ${className}`;

  // Animation variants for Framer Motion
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: variant === 'link' ? 1 : 1.02,
      transition: { duration: 0.1 }
    },
    tap: { 
      scale: variant === 'link' ? 1 : 0.98,
      transition: { duration: 0.05 }
    }
  };

  // Ripple effect animation
  const rippleVariants = {
    initial: { scale: 0, opacity: 0.5 },
    animate: { 
      scale: 2, 
      opacity: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.button
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      {...props}
    >
      {/* Ripple effect background */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-lg"
        variants={rippleVariants}
        initial="initial"
        whileTap="animate"
      />

      {/* Button content */}
      <div className="relative flex items-center justify-center space-x-2">
        {/* Loading spinner */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center"
          >
            <Loader2 
              className={`animate-spin ${
                size === 'xs' ? 'w-3 h-3' :
                size === 'sm' ? 'w-4 h-4' :
                size === 'md' ? 'w-4 h-4' :
                size === 'lg' ? 'w-5 h-5' :
                'w-6 h-6'
              }`} 
            />
          </motion.div>
        )}

        {/* Left icon */}
        {Icon && iconPosition === 'left' && !loading && (
          <Icon 
            className={`${
              size === 'xs' ? 'w-3 h-3' :
              size === 'sm' ? 'w-4 h-4' :
              size === 'md' ? 'w-4 h-4' :
              size === 'lg' ? 'w-5 h-5' :
              'w-6 h-6'
            }`} 
          />
        )}

        {/* Button text */}
        <span className={loading ? 'opacity-0' : 'opacity-100'}>
          {children}
        </span>

        {/* Right icon */}
        {Icon && iconPosition === 'right' && !loading && (
          <Icon 
            className={`${
              size === 'xs' ? 'w-3 h-3' :
              size === 'sm' ? 'w-4 h-4' :
              size === 'md' ? 'w-4 h-4' :
              size === 'lg' ? 'w-5 h-5' :
              'w-6 h-6'
            }`} 
          />
        )}
      </div>

      {/* Shine effect for gradient variants */}
      {(variant === 'primary' || variant === 'gradient' || variant === 'success' || variant === 'danger') && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%]"
          whileHover={{
            translateX: '100%',
            transition: { duration: 0.5 }
          }}
        />
      )}
    </motion.button>
  );
};

// Button group component for related buttons
export const ButtonGroup = ({ children, className = '', orientation = 'horizontal' }) => {
  const groupClasses = orientation === 'horizontal' 
    ? 'flex space-x-2' 
    : 'flex flex-col space-y-2';
  
  return (
    <div className={`${groupClasses} ${className}`}>
      {children}
    </div>
  );
};

// Icon button component for icon-only buttons
export const IconButton = ({ 
  icon: Icon, 
  variant = 'ghost', 
  size = 'md',
  className = '',
  'aria-label': ariaLabel,
  ...props 
}) => {
  const sizeClasses = {
    xs: 'p-1',
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
    xl: 'p-4',
  };

  return (
    <Button
      variant={variant}
      className={`${sizeClasses[size]} !px-0 aspect-square ${className}`}
      aria-label={ariaLabel}
      {...props}
    >
      <Icon className={`
        ${size === 'xs' ? 'w-3 h-3' :
          size === 'sm' ? 'w-4 h-4' :
          size === 'md' ? 'w-5 h-5' :
          size === 'lg' ? 'w-6 h-6' :
          'w-7 h-7'}
      `} />
    </Button>
  );
};

// Floating Action Button
export const FloatingActionButton = ({ 
  icon: Icon, 
  onClick, 
  className = '',
  variant = 'primary',
  size = 'lg',
  ...props 
}) => {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <IconButton
        icon={Icon}
        variant={variant}
        size={size}
        onClick={onClick}
        className={`rounded-full shadow-2xl hover:shadow-3xl ${className}`}
        {...props}
      />
    </motion.div>
  );
};

export default Button;