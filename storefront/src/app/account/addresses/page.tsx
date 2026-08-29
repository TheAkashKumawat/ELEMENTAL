'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { MapPin, Plus, Trash2, CheckCircle2, ChevronLeft } from 'lucide-react';
import { ShippingAddress } from '@/types';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi (NCR)', 'Chandigarh',
  'Jammu & Kashmir', 'Ladakh', 'Puducherry'
];

export default function AddressesPage() {
  const { user, isAuthenticated, addAddress, deleteAddress, setDefaultAddress } = useAuthStore();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<ShippingAddress, 'isDefault'>>({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: 'Maharashtra',
    pinCode: '',
    country: 'India',
  });
  const [isDefault, setIsDefault] = useState(false);

  if (!isAuthenticated || !user) {
    return (
      <div className="py-20 text-center max-w-md mx-auto">
        <h2 className="text-2xl font-serif mb-2">Please Sign In</h2>
        <Link href="/account/login">
          <Button>Go to Login</Button>
        </Link>
      </div>
    );
  }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.address1 || !formData.city || !formData.pinCode) return;

    addAddress(formData, isDefault);
    setIsModalOpen(false);
    showToast('New delivery address saved');
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: '',
      address1: '',
      address2: '',
      city: '',
      state: 'Maharashtra',
      pinCode: '',
      country: 'India',
    });
  };

  return (
    <div className="py-12 sm:py-16 bg-stone-50/40 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <Link href="/account" className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900 mb-2">
              <ChevronLeft className="w-4 h-4" /> Back to Account Overview
            </Link>
            <h1 className="text-2xl sm:text-3xl font-serif font-light text-stone-950">
              Address Directory
            </h1>
          </div>

          <Button
            size="md"
            onClick={() => setIsModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add New Address
          </Button>
        </div>

        {/* Address Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {user.savedAddresses.map((addr) => (
            <div
              key={addr.id}
              className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-stone-900 text-sm">
                      {addr.firstName} {addr.lastName}
                    </span>
                    {addr.isDefault && (
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] uppercase font-bold tracking-wider rounded-full">
                        Default
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      deleteAddress(addr.id);
                      showToast('Address deleted');
                    }}
                    className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                    aria-label="Delete address"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="pt-3 text-xs text-stone-600 space-y-1">
                  <p>{addr.address1} {addr.address2}</p>
                  <p>{addr.city}, {addr.state || addr.province} - {addr.pinCode || addr.postalCode}</p>
                  <p>{addr.country}</p>
                  <p className="text-stone-400 font-mono pt-1">{addr.phone}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                {!addr.isDefault ? (
                  <button
                    onClick={() => {
                      setDefaultAddress(addr.id);
                      showToast('Default delivery address updated');
                    }}
                    className="text-xs text-stone-600 hover:text-stone-950 font-medium underline"
                  >
                    Set as Default Delivery Address
                  </button>
                ) : (
                  <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Primary Address
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Add Address Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Delivery Address in India"
      >
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="First Name"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              placeholder="Rohan"
            />
            <Input
              label="Last Name"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              placeholder="Sharma"
            />
          </div>

          <Input
            label="Flat / House No. / Street"
            required
            value={formData.address1}
            onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
            placeholder="Flat 402, Sea Green Heights, Worli Sea Face"
          />

          <Input
            label="Area / Locality / Landmark"
            value={formData.address2 || ''}
            onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
            placeholder="Near Century Bazaar"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              label="City"
              required
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="Mumbai"
            />

            <div>
              <label className="block text-xs font-medium text-stone-700 tracking-wider uppercase mb-1.5">
                State *
              </label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
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
              maxLength={6}
              value={formData.pinCode}
              onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
              placeholder="400018"
            />
          </div>

          <Input
            label="Mobile Phone Number"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+91 98201 45678"
          />

          <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className="w-4 h-4 text-stone-900 border-stone-300 rounded"
            />
            <span>Set as primary default shipping address</span>
          </label>

          <div className="flex justify-end gap-2 pt-4 border-t border-stone-200">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Address</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
