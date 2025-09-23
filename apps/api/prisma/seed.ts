import 'dotenv/config';
import { PrismaClient, UserRole, EventStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing minimal tables (dev only)
  await prisma.ticket.deleteMany();
  await prisma.order.deleteMany();
  await prisma.session.deleteMany();
  await prisma.event.deleteMany();
  await prisma.venue.deleteMany();
  await prisma.user.deleteMany();

  const admin = await prisma.user.create({
    data: {
      email: 'admin@atelierhub.dev',
      name: 'Admin',
      role: UserRole.ADMIN,
      locale: 'en',
    },
  });

  const venueA = await prisma.venue.create({
    data: {
      name: 'Main Hall',
      address: '123 Creative Ave, Montreal',
      capacity: 300,
    },
  });

  const venueB = await prisma.venue.create({
    data: {
      name: 'Studio B',
      address: '99 Design St, Montreal',
      capacity: 120,
    },
  });

  const event1 = await prisma.event.create({
    data: {
      slug: 'modern-ceramics-workshop',
      title_en: 'Modern Ceramics Workshop',
      title_fr: 'Atelier de céramique moderne',
      description_en: 'Hands-on ceramics session for beginners.',
      description_fr: 'Séance pratique de céramique pour débutants.',
      coverUrl: null,
      category: 'workshop',
      status: EventStatus.PUBLISHED,
    },
  });

  const event2 = await prisma.event.create({
    data: {
      slug: 'studio-lighting-101',
      title_en: 'Studio Lighting 101',
      title_fr: 'Éclairage de studio 101',
      description_en: 'Learn the basics of studio lighting setups.',
      description_fr: 'Apprenez les bases des configurations d’éclairage en studio.',
      coverUrl: null,
      category: 'photography',
      status: EventStatus.PUBLISHED,
    },
  });

  const now = new Date();
  const inTwoDays = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
  const inThreeDays = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

  await prisma.session.createMany({
    data: [
      {
        eventId: event1.id,
        venueId: venueA.id,
        startsAt: inTwoDays,
        endsAt: new Date(inTwoDays.getTime() + 2 * 60 * 60 * 1000),
        capacity: 20,
        priceCents: 4500,
      },
      {
        eventId: event1.id,
        venueId: venueB.id,
        startsAt: inThreeDays,
        endsAt: new Date(inThreeDays.getTime() + 2 * 60 * 60 * 1000),
        capacity: 15,
        priceCents: 4500,
      },
      {
        eventId: event2.id,
        venueId: venueA.id,
        startsAt: inThreeDays,
        endsAt: new Date(inThreeDays.getTime() + 3 * 60 * 60 * 1000),
        capacity: 30,
        priceCents: 6000,
      },
    ],
  });

  console.log('Seed complete. Admin user:', admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
