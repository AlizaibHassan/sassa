import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'dark' | 'whatsapp';
}

const variantClasses: Record<string, string> = {
  primary: 'bg-[#e67e22] hover:bg-[#d35400] text-white',
  secondary: 'bg-[#fbbf2c] hover:bg-[#f59e0b] text-black',
  success: 'bg-[#25D366] hover:bg-[#128C7E] text-white',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
  dark: 'bg-gray-800 hover:bg-gray-900 text-white',
  whatsapp: 'bg-[#25D366] hover:bg-[#128C7E] text-white',
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  disabled,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={clsx(
        'px-6 py-3 rounded-xl font-bold text-sm',
        'transition-all duration-300',
        'transform hover:-translate-y-0.5 hover:shadow-lg',
        'active:translate-y-0 active:shadow-md',
        variantClasses[variant],
        {
          'opacity-70 cursor-not-allowed transform-none': disabled,
        },
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
