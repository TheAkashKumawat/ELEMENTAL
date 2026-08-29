'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useOrderStore } from '@/lib/store/useOrderStore';
import { Button } from '@/components/ui/Button';
import {
  CheckCircle2,
  Package,
  Truck,
  Printer,
  ArrowRight,
  MapPin,
  Calendar,
  Clock,
  Sparkles,
} from 'lucide-react';

export const ConfirmationClient: React.FC = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { orders, currentOrder } = useOrderStore();

  const order =
    (orderId ? orders.find((o) => o.id === orderId) : null) ||
    currentOrder ||
    orders[0];

  if (!order) {
    return (
      <div className="bg-white p-12 rounded-2xl border border-stone-200 text-center">
        <h2 className="text-2xl font-serif text-stone-900 mb-2">No recent order found</h2>
        <Link href="/products">
          <Button className="mt-4">Return to Store</Button>
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-white p-8 sm:p-12 rounded-2xl border border-stone-200 shadow-xs text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200/80 flex items-center justify-center mx-auto text-emerald-600 animate-bounce">
          <CheckCircle2 className="w-10 h-10 stroke-[2]" />
        </div>

        <div>
          <span className="text-xs font-semibold text-emerald-700 tracking-[0.2em] uppercase font-mono">
            Payment Authorized via Test Gateway
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-light text-stone-950 mt-1 mb-2">
            Thank you for your order
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 max-w-lg mx-auto leading-relaxed">
            Order <strong className="text-stone-900 font-mono font-semibold">#{order.orderNumber}</strong> has been registered. An official GST invoice and courier tracking link have been dispatched to <strong className="text-stone-900">{order.shippingAddress.email}</strong>.
          </p>
        </div>

        {/* Tracking & Timeline Stepper */}
        <div className="pt-8 max-w-2xl mx-auto">
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-stone-950 text-white flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="font-semibold text-stone-900 block text-[11px]">Placed</span>
              <span className="text-[10px] text-stone-400 font-mono">Today</span>
            </div>

            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center mx-auto shadow-xs animate-pulse">
                <Clock className="w-4 h-4" />
              </div>
              <span className="font-semibold text-stone-900 block text-[11px]">Processing</span>
              <span className="text-[10px] text-stone-400 font-mono">In Workshop</span>
            </div>

            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                <Truck className="w-4 h-4" />
              </div>
              <span className="text-stone-400 block text-[11px]">Dispatched</span>
              <span className="text-[10px] text-stone-400 font-mono">BlueDart / Air</span>
            </div>

            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                <Package className="w-4 h-4" />
              </div>
              <span className="text-stone-400 block text-[11px]">Delivered</span>
              <span className="text-[10px] text-stone-400 font-mono">{order.estimatedDelivery}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Order Details & Receipt */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <h3 className="text-base font-serif font-semibold text-stone-900">
              GST Receipt & Logistics Breakdown
            </h3>
            <p className="text-xs text-stone-500 font-mono mt-0.5">
              Tracking Number: {order.trackingNumber || 'ELM-IND-882910392'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              leftIcon={<Printer className="w-3.5 h-3.5" />}
            >
              Print Tax Invoice
            </Button>
          </div>
        </div>

        {/* Info Grid (Address + Method) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-stone-50 rounded-xl text-xs">
          <div className="space-y-1">
            <span className="font-semibold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-stone-600" />
              Delivery Destination
            </span>
            <p className="text-stone-800 font-medium">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
            <p className="text-stone-600">{order.shippingAddress.address1} {order.shippingAddress.address2}</p>
            <p className="text-stone-600">{order.shippingAddress.city}, {order.shippingAddress.state || order.shippingAddress.province} - {order.shippingAddress.pinCode || order.shippingAddress.postalCode}</p>
            <p className="text-stone-600">{order.shippingAddress.country}</p>
          </div>

          <div className="space-y-1">
            <span className="font-semibold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-stone-600" />
              Estimated Handover
            </span>
            <p className="text-stone-800 font-medium">{order.estimatedDelivery}</p>
            <p className="text-stone-600">{order.shippingOption.name}</p>
            <p className="text-stone-500 pt-1 text-[11px]">Carbon-neutral express courier delivery across India.</p>
          </div>
        </div>

        {/* Item Rows */}
        <div className="divide-y divide-stone-100 border-t border-b border-stone-200">
          {order.items.map((item) => (
            <div key={item.id} className="py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-14 bg-stone-100 rounded overflow-hidden shrink-0 border border-stone-200">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-900">{item.title}</h4>
                  <p className="text-[11px] text-stone-500">{item.variantTitle} • Qty: {item.quantity}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-semibold text-stone-900">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="space-y-2 text-xs text-stone-600 max-w-xs ml-auto">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-mono text-stone-900">₹{order.subtotal.toLocaleString('en-IN')}</span>
          </div>
          {order.discountTotal > 0 && (
            <div className="flex justify-between text-emerald-700 font-medium">
              <span>Promotional Discount</span>
              <span className="font-mono">-₹{order.discountTotal.toLocaleString('en-IN')}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Delivery</span>
            <span className="font-mono text-stone-900">
              {order.shippingTotal === 0 ? 'Complimentary' : `₹${order.shippingTotal.toLocaleString('en-IN')}`}
            </span>
          </div>
          <div className="flex justify-between">
            <span>GST (12%)</span>
            <span className="font-mono text-stone-900">₹{order.taxTotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-sm font-semibold text-stone-950 pt-2 border-t border-stone-200">
            <span>Grand Total Paid</span>
            <span className="font-mono font-bold">₹{order.total.toLocaleString('en-IN')}</span>
          </div>
        </div>

      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <Link href="/account" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full">
            View All Past Orders in Account
          </Button>
        </Link>
        <Link href="/products" className="w-full sm:w-auto">
          <Button size="lg" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Continue Exploring Collection
          </Button>
        </Link>
      </div>

    </div>
  );
};
