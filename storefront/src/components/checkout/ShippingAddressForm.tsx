'use client';

import React from 'react';
import { ShippingAddress } from '@/types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { ArrowRight, UserCheck } from 'lucide-react';

export interface ShippingAddressFormProps {
  address: ShippingAddress;
  onChange: (address: ShippingAddress) => void;
  onSubmit: () => void;
}

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi (NCR)', 'Chandigarh',
  'Jammu & Kashmir', 'Ladakh', 'Puducherry'
];

export const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({
  address,
  onChange,
  onSubmit,
}) => {
  const { user } = useAuthStore();

  const handleFieldChange = (field: keyof ShippingAddress, value: string) => {
    onChange({
      ...address,
      [field]: value,
      province: field === 'state' ? value : address.province || address.state,
      postalCode: field === 'pinCode' ? value : address.postalCode || address.pinCode,
    });
  };

  const handleSelectSavedAddress = (saved: ShippingAddress) => {
    onChange(saved);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
      {/* Saved Addresses quick selection for logged in / demo customer */}
      {user && user.savedAddresses.length > 0 && (
        <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-900 uppercase tracking-wider">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <span>Saved Addresses on File</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {user.savedAddresses.map((saved) => (
              <button
                key={saved.id}
                type="button"
                onClick={() => handleSelectSavedAddress(saved)}
                className="p-3 text-left border border-stone-200 bg-white hover:border-stone-900 rounded-lg transition-all text-xs space-y-0.5"
              >
                <div className="font-semibold text-stone-900">
                  {saved.firstName} {saved.lastName} {saved.isDefault && '(Default)'}
                </div>
                <div className="text-stone-500 truncate">{saved.address1}, {saved.city}</div>
                <div className="text-stone-400 font-mono">{saved.pinCode || saved.postalCode}, {saved.state || saved.province}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Contact Info */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-stone-900 tracking-wider uppercase">
          1. Contact Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Email Address (for GST invoice & tracking)"
            type="email"
            required
            value={address.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            placeholder="rohan.sharma@elemental.in"
          />
          <Input
            label="Mobile Number (for delivery SMS OTP)"
            type="tel"
            required
            value={address.phone}
            onChange={(e) => handleFieldChange('phone', e.target.value)}
            placeholder="+91 98201 45678"
          />
        </div>
      </div>

      {/* Shipping Address */}
      <div className="space-y-4 pt-4 border-t border-stone-200">
        <h3 className="text-sm font-semibold text-stone-900 tracking-wider uppercase">
          2. Delivery Address in India
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="First Name"
            required
            value={address.firstName}
            onChange={(e) => handleFieldChange('firstName', e.target.value)}
            placeholder="Rohan"
          />
          <Input
            label="Last Name"
            required
            value={address.lastName}
            onChange={(e) => handleFieldChange('lastName', e.target.value)}
            placeholder="Sharma"
          />
        </div>

        <Input
          label="Flat / House No. / Building / Street"
          required
          value={address.address1}
          onChange={(e) => handleFieldChange('address1', e.target.value)}
          placeholder="Flat 402, Sea Green Heights, Worli Sea Face"
        />

        <Input
          label="Area / Locality / Landmark (optional)"
          value={address.address2 || ''}
          onChange={(e) => handleFieldChange('address2', e.target.value)}
          placeholder="Near Century Bazaar / Worli Dairy"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="City / Town"
            required
            value={address.city}
            onChange={(e) => handleFieldChange('city', e.target.value)}
            placeholder="Mumbai"
          />
          
          <div>
            <label className="block text-xs font-medium text-stone-700 tracking-wider uppercase mb-1.5">
              State / Union Territory *
            </label>
            <select
              value={address.state || address.province || 'Maharashtra'}
              onChange={(e) => handleFieldChange('state', e.target.value)}
              className="w-full h-11 px-3.5 bg-white border border-stone-300 rounded-md text-sm text-stone-900 focus:outline-none focus:border-stone-900"
            >
              {INDIAN_STATES.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <Input
            label="PIN Code (6 digits)"
            required
            value={address.pinCode || address.postalCode || ''}
            onChange={(e) => handleFieldChange('pinCode', e.target.value)}
            placeholder="400018"
            maxLength={6}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-700 tracking-wider uppercase mb-1.5">
            Country / Region *
          </label>
          <select
            value={address.country}
            onChange={(e) => handleFieldChange('country', e.target.value)}
            className="w-full h-11 px-3.5 bg-stone-100 border border-stone-300 rounded-md text-sm text-stone-900 focus:outline-none cursor-not-allowed"
            disabled
          >
            <option value="India">India (Pan-India Express Available)</option>
          </select>
        </div>
      </div>

      <div className="pt-6 flex justify-end">
        <Button
          type="submit"
          size="lg"
          className="w-full sm:w-auto px-8"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Continue to Delivery Options
        </Button>
      </div>
    </form>
  );
};
