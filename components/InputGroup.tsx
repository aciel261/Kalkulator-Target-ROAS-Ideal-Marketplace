
import React from 'react';

interface InputGroupProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  type?: 'currency' | 'percent' | 'number';
  helperText?: string;
  icon?: React.ReactNode;
}

export const InputGroup: React.FC<InputGroupProps> = ({ 
  label, 
  value, 
  onChange, 
  type = 'number', 
  helperText,
  icon 
}) => {
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
        {icon} {label}
      </label>
      <div className="relative group">
        <input
          type="number"
          value={value === 0 ? '' : value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-slate-800 font-medium text-lg shadow-sm group-hover:border-slate-300"
          placeholder="0"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold bg-white pl-2">
          {type === 'percent' ? '%' : type === 'currency' ? 'Rp' : ''}
        </div>
      </div>
      {helperText && (
        <div className="mt-2 flex items-start gap-1">
          <span className="text-xs text-slate-500 font-medium leading-tight">💡 {helperText}</span>
        </div>
      )}
    </div>
  );
};
