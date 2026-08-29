import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Use service role key to bypass RLS for seeding
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env');
  console.error('Add these to your backend/.env file:');
  console.error('SUPABASE_URL=your-supabase-url');
  console.error('SUPABASE_SERVICE_ROLE_KEY=your-service-role-key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

/**
 * Seed script to add demo workers and bookings for SIH hackathon
 * Run with: npx ts-node src/seed/seedDemoData.ts
 */

async function seedDemoData() {
  console.log('Starting demo data seed...');

  try {
    // Get existing services to link to workers
    const { data: services, error: servicesError } = await supabase
      .from('services')
      .select('id, name')
      .eq('is_active', true);

    if (servicesError) throw servicesError;
    if (!services || services.length === 0) {
      throw new Error('No active services found. Please seed services first.');
    }

    const electricianService = services.find(s => s.name.toLowerCase().includes('electrician'));
    const plumberService = services.find(s => s.name.toLowerCase().includes('plumber'));

    if (!electricianService) throw new Error('Electrician service not found');
    if (!plumberService) throw new Error('Plumber service not found');

    console.log('Found services:', services.map(s => s.name));

    // Create profiles for demo workers
    const profiles = [
      {
        full_name: 'Rajesh Kumar',
        email: 'rajesh.kumar@demo.com',
        phone: '+919876543210',
        role: 'worker',
        avatar_url: null
      },
      {
        full_name: 'Suresh Patel',
        email: 'suresh.patel@demo.com',
        phone: '+919876543211',
        role: 'worker',
        avatar_url: null
      }
    ];

    console.log('Creating profiles...');
    const { data: createdProfiles, error: profilesError } = await supabase
      .from('profiles')
      .insert(profiles)
      .select();

    if (profilesError) throw profilesError;
    console.log('Created profiles:', createdProfiles?.map(p => p.full_name));

    if (!createdProfiles || createdProfiles.length < 2) {
      throw new Error('Failed to create profiles');
    }

    const rajeshProfile = createdProfiles.find(p => p.full_name === 'Rajesh Kumar');
    const sureshProfile = createdProfiles.find(p => p.full_name === 'Suresh Patel');

    if (!rajeshProfile || !sureshProfile) {
      throw new Error('Failed to find created profiles');
    }

    // Create worker records
    console.log('Creating worker records...');
    const workers = [
      {
        profile_id: rajeshProfile.id,
        bio: 'Experienced electrician with 8 years of expertise in residential and commercial electrical work.',
        experience_years: 8,
        verification_status: 'verified',
        rating: 4.8,
        total_reviews: 127,
        completed_jobs: 156,
        is_available: true
      },
      {
        profile_id: sureshProfile.id,
        bio: 'Professional plumber with 12 years of experience in all types of plumbing repairs and installations.',
        experience_years: 12,
        verification_status: 'verified',
        rating: 4.9,
        total_reviews: 203,
        completed_jobs: 289,
        is_available: true
      }
    ];

    const { data: createdWorkers, error: workersError } = await supabase
      .from('workers')
      .insert(workers)
      .select();

    if (workersError) throw workersError;
    console.log('Created workers:', createdWorkers?.map(w => w.id));

    if (!createdWorkers || createdWorkers.length < 2) {
      throw new Error('Failed to create workers');
    }

    const rajeshWorker = createdWorkers.find(w => w.profile_id === rajeshProfile.id);
    const sureshWorker = createdWorkers.find(w => w.profile_id === sureshProfile.id);

    if (!rajeshWorker || !sureshWorker) {
      throw new Error('Failed to find created workers');
    }

    // Add service associations
    console.log('Adding service associations...');
    const workerServices = [
      {
        worker_id: rajeshWorker.id,
        service_id: electricianService.id,
        hourly_rate: 350,
        base_rate: 300
      },
      {
        worker_id: sureshWorker.id,
        service_id: plumberService.id,
        hourly_rate: 400,
        base_rate: 350
      }
    ];

    const { data: createdWorkerServices, error: workerServicesError } = await supabase
      .from('worker_services')
      .insert(workerServices)
      .select();

    if (workerServicesError) throw workerServicesError;
    console.log('Created worker service associations');

    // Add availability for workers (Mon-Fri, 9 AM - 6 PM)
    console.log('Adding worker availability...');
    const availabilitySlots = [];
    for (let day = 1; day <= 5; day++) {
      availabilitySlots.push(
        { worker_id: rajeshWorker.id, day_of_week: day, start_time: '09:00', end_time: '18:00', is_available: true },
        { worker_id: sureshWorker.id, day_of_week: day, start_time: '09:00', end_time: '18:00', is_available: true }
      );
    }

    const { error: availabilityError } = await supabase
      .from('worker_availability')
      .insert(availabilitySlots);

    if (availabilityError) throw availabilityError;
    console.log('Created worker availability slots');

    // Create demo customer profile for bookings
    console.log('Creating demo customer profile...');
    const { data: customerProfile, error: customerError } = await supabase
      .from('profiles')
      .insert({
        full_name: 'Demo Customer',
        email: 'customer@demo.com',
        phone: '+919876543212',
        role: 'customer',
        avatar_url: null
      })
      .select()
      .single();

    if (customerError) throw customerError;
    console.log('Created customer profile:', customerProfile.full_name);

    // Create demo bookings
    console.log('Creating demo bookings...');
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    const bookings = [
      {
        customer_id: customerProfile.id,
        worker_id: rajeshWorker.id,
        service_id: electricianService.id,
        status: 'pending',
        problem_description: 'Need to fix electrical wiring in living room. Some switches not working.',
        urgency: 'medium',
        scheduled_date: tomorrow.toISOString().split('T')[0],
        scheduled_time: '10:00',
        location: 'Andheri East, Mumbai',
        estimated_price: 700
      },
      {
        customer_id: customerProfile.id,
        worker_id: sureshWorker.id,
        service_id: plumberService.id,
        status: 'accepted',
        problem_description: 'Kitchen sink is leaking. Need urgent repair.',
        urgency: 'high',
        scheduled_date: tomorrow.toISOString().split('T')[0],
        scheduled_time: '14:00',
        location: 'Bandra West, Mumbai',
        estimated_price: 800
      },
      {
        customer_id: customerProfile.id,
        worker_id: rajeshWorker.id,
        service_id: electricianService.id,
        status: 'completed',
        problem_description: 'Fixed ceiling fan installation in bedroom.',
        urgency: 'low',
        scheduled_date: yesterday.toISOString().split('T')[0],
        scheduled_time: '11:00',
        location: 'Andheri East, Mumbai',
        estimated_price: 350
      }
    ];

    const { data: createdBookings, error: bookingsError } = await supabase
      .from('bookings')
      .insert(bookings)
      .select();

    if (bookingsError) throw bookingsError;
    console.log('Created demo bookings:', createdBookings?.map(b => `${b.id} - ${b.status}`));

    console.log('✅ Demo data seeded successfully!');
    console.log('');
    console.log('Summary:');
    console.log('- 2 worker profiles created (Rajesh Kumar, Suresh Patel)');
    console.log('- 2 worker records with services and availability');
    console.log('- 1 customer profile created');
    console.log('- 3 demo bookings (pending, accepted, completed)');

  } catch (error) {
    console.error('❌ Error seeding demo data:', error);
    process.exit(1);
  }
}

seedDemoData();
