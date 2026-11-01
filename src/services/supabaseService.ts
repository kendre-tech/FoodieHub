import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Order, OrderStatus } from '../types';

export const SUPABASE_PROJECT_ID = 'eqvocjukksgtqmgdbjog';
export const SUPABASE_URL = (
  import.meta.env.VITE_SUPABASE_URL || `https://${SUPABASE_PROJECT_ID}.supabase.co`
).trim();
export const SUPABASE_ANON_KEY = (
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_V2REwz8klxohRj5As7SWhg_6w2jZI5J'
).trim();

// Initialize Supabase Client
export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface SupabaseSyncResult {
  success: boolean;
  message: string;
  code?: string;
  details?: any;
}

// Complete PostgreSQL DDL schema for user's Supabase SQL Editor
export const SUPABASE_SETUP_SQL = `-- HoodiHub Food Ordering & Delivery Table Setup
-- Run this in your Supabase Dashboard: SQL Editor -> New Query -> Run

create table if not exists public.food_orders (
  id text primary key,
  customer_name text not null,
  customer_phone text,
  customer_email text,
  items jsonb not null default '[]'::jsonb,
  total_amount numeric not null default 0,
  subtotal numeric not null default 0,
  delivery_charge numeric not null default 50,
  taxes numeric not null default 0,
  discount numeric not null default 0,
  payment_method text not null default 'Cash on Delivery',
  payment_status text not null default 'Pending',
  order_status text not null default 'Order Placed',
  delivery_address jsonb not null default '{}'::jsonb,
  estimated_delivery_minutes integer default 30,
  delivery_partner_id text,
  delivery_partner_name text,
  delivery_partner_phone text,
  special_instructions text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Also support 'orders' table name alias
create table if not exists public.orders (
  id text primary key,
  customer_name text not null,
  customer_phone text,
  customer_email text,
  items jsonb not null default '[]'::jsonb,
  total_amount numeric not null default 0,
  subtotal numeric not null default 0,
  delivery_charge numeric not null default 50,
  taxes numeric not null default 0,
  discount numeric not null default 0,
  payment_method text not null default 'Cash on Delivery',
  payment_status text not null default 'Pending',
  order_status text not null default 'Order Placed',
  delivery_address jsonb not null default '{}'::jsonb,
  estimated_delivery_minutes integer default 30,
  delivery_partner_id text,
  delivery_partner_name text,
  delivery_partner_phone text,
  special_instructions text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS) and allow public/anonymous access for HoodiHub
alter table public.food_orders enable row level security;
alter table public.orders enable row level security;

-- Allow insert, select, and update for anonymous users
drop policy if exists "Allow public food_orders insert" on public.food_orders;
create policy "Allow public food_orders insert" on public.food_orders for insert with check (true);

drop policy if exists "Allow public food_orders select" on public.food_orders;
create policy "Allow public food_orders select" on public.food_orders for select using (true);

drop policy if exists "Allow public food_orders update" on public.food_orders;
create policy "Allow public food_orders update" on public.food_orders for update using (true);

drop policy if exists "Allow public food_orders delete" on public.food_orders;
create policy "Allow public food_orders delete" on public.food_orders for delete using (true);

drop policy if exists "Allow public orders insert" on public.orders;
create policy "Allow public orders insert" on public.orders for insert with check (true);

drop policy if exists "Allow public orders select" on public.orders;
create policy "Allow public orders select" on public.orders for select using (true);

drop policy if exists "Allow public orders update" on public.orders;
create policy "Allow public orders update" on public.orders for update using (true);

drop policy if exists "Allow public orders delete" on public.orders;
create policy "Allow public orders delete" on public.orders for delete using (true);
`;

/**
 * Format HoodiHub Order object for Supabase table row
 */
export function formatOrderForSupabase(order: Order) {
  return {
    id: order.id,
    customer_name: order.customerName,
    customer_phone: order.customerPhone,
    customer_email: order.customerEmail,
    items: order.items,
    total_amount: order.totalAmount,
    subtotal: order.subtotal,
    delivery_charge: order.deliveryCharge,
    taxes: order.taxes,
    discount: order.discount,
    payment_method: order.paymentMethod,
    payment_status: order.paymentStatus,
    order_status: order.orderStatus,
    delivery_address: order.address,
    estimated_delivery_minutes: order.estimatedDeliveryMinutes,
    delivery_partner_id: order.deliveryPartnerId || null,
    delivery_partner_name: order.deliveryPartnerName || null,
    delivery_partner_phone: order.deliveryPartnerPhone || null,
    special_instructions: order.specialInstructions || null,
    created_at: order.createdAt,
  };
}

/**
 * Test connectivity to Supabase
 */
export async function testSupabaseConnection(): Promise<{
  connected: boolean;
  tablesExist: boolean;
  message: string;
}> {
  try {
    // Try querying food_orders first, then orders
    const { data: foodData, error: foodErr } = await supabase
      .from('food_orders')
      .select('id')
      .limit(1);

    if (!foodErr) {
      return {
        connected: true,
        tablesExist: true,
        message: 'Connected to Supabase! Table "food_orders" is ready.',
      };
    }

    // Try 'orders' table
    const { data: orderData, error: orderErr } = await supabase
      .from('orders')
      .select('id')
      .limit(1);

    if (!orderErr) {
      return {
        connected: true,
        tablesExist: true,
        message: 'Connected to Supabase! Table "orders" is ready.',
      };
    }

    if (foodErr.code === 'PGRST205' || orderErr.code === 'PGRST205') {
      return {
        connected: true,
        tablesExist: false,
        message: 'Connected to Supabase project! Please run the provided SQL script to create the orders table.',
      };
    }

    return {
      connected: true,
      tablesExist: false,
      message: `Supabase responded: ${foodErr.message || orderErr.message}`,
    };
  } catch (err: any) {
    return {
      connected: false,
      tablesExist: false,
      message: `Could not reach Supabase: ${err?.message || 'Network error'}`,
    };
  }
}

/**
 * Save single order to Supabase
 */
export async function saveOrderToSupabase(order: Order): Promise<SupabaseSyncResult> {
  const payload = formatOrderForSupabase(order);

  try {
    // Attempt insert into food_orders
    const { error: err1 } = await supabase
      .from('food_orders')
      .upsert(payload, { onConflict: 'id' });

    if (!err1) {
      return {
        success: true,
        message: `Order #${order.id} saved to Supabase (food_orders)!`,
      };
    }

    // Attempt insert into orders table if food_orders doesn't exist
    const { error: err2 } = await supabase
      .from('orders')
      .upsert(payload, { onConflict: 'id' });

    if (!err2) {
      return {
        success: true,
        message: `Order #${order.id} saved to Supabase (orders)!`,
      };
    }

    // Both tables returned error
    console.warn('Supabase order insert notice:', err1.message, err2.message);
    if (err1.code === 'PGRST205' || err2.code === 'PGRST205') {
      return {
        success: false,
        code: 'TABLE_NOT_FOUND',
        message: 'Supabase connected, but orders table is pending creation in Supabase SQL Editor.',
      };
    }

    return {
      success: false,
      code: err1.code || err2.code,
      message: err1.message || err2.message,
    };
  } catch (error: any) {
    console.error('Supabase exception saving order:', error);
    return {
      success: false,
      code: 'NETWORK_ERROR',
      message: error?.message || 'Failed to connect to Supabase.',
    };
  }
}

/**
 * Update order status in Supabase
 */
export async function updateOrderStatusInSupabase(
  orderId: string,
  status: OrderStatus
): Promise<SupabaseSyncResult> {
  try {
    const { error: err1 } = await supabase
      .from('food_orders')
      .update({ order_status: status })
      .eq('id', orderId);

    if (!err1) {
      return { success: true, message: `Status updated to ${status} in Supabase` };
    }

    const { error: err2 } = await supabase
      .from('orders')
      .update({ order_status: status })
      .eq('id', orderId);

    if (!err2) {
      return { success: true, message: `Status updated to ${status} in Supabase` };
    }

    return { success: false, message: err1.message || err2.message };
  } catch (error: any) {
    return { success: false, message: error?.message || 'Supabase update failed' };
  }
}

/**
 * Sync multiple orders to Supabase
 */
export async function syncAllOrdersToSupabase(orders: Order[]): Promise<{
  syncedCount: number;
  failedCount: number;
  details: string;
}> {
  if (!orders.length) {
    return { syncedCount: 0, failedCount: 0, details: 'No orders to sync' };
  }

  let synced = 0;
  let failed = 0;
  let lastError = '';

  for (const order of orders) {
    const res = await saveOrderToSupabase(order);
    if (res.success) {
      synced++;
    } else {
      failed++;
      lastError = res.message;
    }
  }

  return {
    syncedCount: synced,
    failedCount: failed,
    details: failed === 0
      ? `All ${synced} orders synced successfully to Supabase!`
      : `Synced ${synced}/${orders.length} orders. Note: ${lastError}`,
  };
}
