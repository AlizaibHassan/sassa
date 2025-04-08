import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const Input: React.FC<InputProps> = ({ label, id, disabled, className, ...props }) => (
  <div className="space-y-2">
    <label 
      htmlFor={id} 
      className="block font-bold text-gray-800"
    >
      {label}
    </label>
    <input
      id={id}
      disabled={disabled}
      {...props}
      className={clsx(
        'w-full px-4 py-3.5 rounded-xl',
        'text-gray-800 bg-white placeholder-gray-400',
        'border border-gray-200',
        'transition-all duration-200 ease-in-out',
        'focus:border-[#e67e22] focus:ring focus:ring-[#e67e22] focus:ring-opacity-30',
        {
          'opacity-70 cursor-not-allowed bg-gray-50': disabled,
        },
        className
      )}
    />
  </div>
);

export default Input;
