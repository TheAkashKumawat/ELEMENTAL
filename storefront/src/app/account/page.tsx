'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useOrderStore } from '@/lib/store/useOrderStore';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { PRODUCTS } from '@/lib/data/products';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import {
  Package,
  MapPin,
  Heart,
  LogOut,
  ExternalLink,
  Truck,
  CheckCircle2,
  Clock,
  ChevronRight,
  ShieldCheck,
  Plus,
} from 'lucide-react';
import { Order } from '@/types';
import { clsx } from 'clsx';

export default function AccountDashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { orders } = useOrderStore();
  const { wishlistIds } = useWishlistStore();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (!isAuthenticated || !user) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
        <h2 className="text-2xl font-serif text-stone-900 mb-2">Authentication Required</h2>
        <p className="text-xs text-stone-500 mb-6">Please sign in to view your orders and client profile.</p>
        <Link href="/account/login">
          <Button size="lg">Sign In to Account</Button>
        </Link>
      </div>
    );
  }

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="py-12 sm:py-16 bg-stone-50/40 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Profile Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-stone-950 text-stone-100 flex items-center justify-center font-serif text-xl font-bold">
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-serif font-medium text-stone-950">
                  {user.firstName} {user.lastName}
                </h1>
                <span className="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 text-[10px] uppercase font-bold tracking-widest rounded-full">
                  VIP Patron
                </span>
              </div>
              <p className="text-xs text-stone-500 font-mono mt-0.5">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/account/addresses">
              <Button variant="outline" size="sm" leftIcon={<MapPin className="w-3.5 h-3.5" />}>
                Addresses ({user.savedAddresses.length})
              </Button>
            </Link>
            <Link href="/account/wishlist">
              <Button variant="outline" size="sm" leftIcon={<Heart className="w-3.5 h-3.5" />}>
                Wishlist ({wishlistIds.length})
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                logout();
                router.push('/');
              }}
              leftIcon={<LogOut className="w-3.5 h-3.5" />}
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Section: Orders History */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <div>
              <h2 className="text-lg font-serif font-semibold text-stone-900">
                Purchase History & Logistics
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Real-time tracking of all past and processing orders across India.
              </p>
            </div>
            <span className="text-xs font-mono font-semibold text-stone-900 bg-stone-100 px-2.5 py-1 rounded-full">
              {orders.length} Orders
            </span>
          </div>

          {orders.length === 0 ? (
            <div className="py-12 text-center text-stone-400">
              <Package className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-medium text-stone-900">No orders on record</p>
              <p className="text-xs text-stone-500 mt-1 mb-4">You have not placed any orders yet.</p>
              <Link href="/products">
                <Button size="sm">Explore Collections</Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {orders.map((order) => (
                <div key={order.id} className="py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
                  {/* Order Overview */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-base font-serif font-semibold text-stone-950">
                        #{order.orderNumber}
                      </span>
                      <span className="text-xs text-stone-400 font-mono">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span
                        className={clsx(
                          'px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider',
                          order.status === 'delivered' && 'bg-emerald-50 text-emerald-800 border border-emerald-200',
                          order.status === 'shipped' && 'bg-blue-50 text-blue-800 border border-blue-200',
                          order.status === 'processing' && 'bg-amber-50 text-amber-800 border border-amber-200'
                        )}
                      >
                        {order.status}
                      </span>
                    </div>

                    {/* Mini Thumbnails */}
                    <div className="flex items-center gap-2 pt-1">
                      {order.items.map((it, idx) => (
                        <div
                          key={idx}
                          className="relative w-12 h-14 bg-stone-100 rounded overflow-hidden border border-stone-200"
                        >
                          <Image src={it.thumbnail} alt={it.title} fill sizes="48px" className="object-cover" />
                        </div>
                      ))}
                      <div className="text-xs text-stone-600 pl-2">
                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'} • <strong className="font-mono">₹{order.total.toLocaleString('en-IN')}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedOrder(order)}
                      rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                    >
                      View Receipt & Tracking
                    </Button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section: Wishlist Preview */}
        {wishlistProducts.length > 0 && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <h2 className="text-lg font-serif font-semibold text-stone-900">
                Curated Wishlist ({wishlistProducts.length})
              </h2>
              <Link href="/account/wishlist" className="text-xs text-stone-900 font-semibold hover:underline flex items-center gap-1">
                View All Wishlist <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {wishlistProducts.slice(0, 4).map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.handle}`}
                  className="group block space-y-2"
                >
                  <div className="relative aspect-[4/5] bg-stone-100 rounded-lg overflow-hidden border border-stone-200">
                    <Image src={p.thumbnail} alt={p.title} fill sizes="200px" className="object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <h4 className="text-xs font-medium text-stone-900 truncate">{p.title}</h4>
                  <p className="text-xs font-semibold text-stone-900 font-mono">₹{p.price.toLocaleString('en-IN')}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <Modal
          isOpen={Boolean(selectedOrder)}
          onClose={() => setSelectedOrder(null)}
          title={`Order #${selectedOrder.orderNumber}`}
          maxWidth="lg"
        >
          <div className="space-y-6 text-xs text-stone-700">
            <div className="p-4 bg-stone-50 rounded-xl space-y-2 border border-stone-200">
              <div className="flex justify-between font-medium text-stone-900">
                <span>Tracking Number:</span>
                <span className="font-mono">{selectedOrder.trackingNumber || 'ELM-IND-992817'}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Arrival:</span>
                <span className="font-medium text-stone-900">{selectedOrder.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Carrier:</span>
                <span>{selectedOrder.shippingOption.name}</span>
              </div>
            </div>

            {/* Items */}
            <div className="divide-y divide-stone-100 border-t border-b border-stone-200">
              {selectedOrder.items.map((it, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-12 bg-stone-100 rounded overflow-hidden">
                      <Image src={it.thumbnail} alt={it.title} fill sizes="40px" className="object-cover" />
                    </div>
                    <div>
                      <p className="font-medium text-stone-900">{it.title}</p>
                      <p className="text-stone-400 font-mono text-[11px]">{it.variantTitle} × {it.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold font-mono text-stone-900">₹{(it.price * it.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="space-y-1.5 text-right font-mono">
              <div className="text-stone-500">Subtotal: ₹{selectedOrder.subtotal.toLocaleString('en-IN')}</div>
              <div className="text-stone-500">Delivery: ₹{selectedOrder.shippingTotal.toLocaleString('en-IN')}</div>
              <div className="text-stone-500">GST (12%): ₹{selectedOrder.taxTotal.toLocaleString('en-IN')}</div>
              <div className="text-sm font-bold text-stone-950 pt-2 border-t border-stone-200">
                Total: ₹{selectedOrder.total.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button size="sm" onClick={() => setSelectedOrder(null)}>
                Close Receipt
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}
