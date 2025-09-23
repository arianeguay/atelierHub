import DataLoader from 'dataloader';
import type { PrismaClient } from '@prisma/client';

export function createSessionLoader(prisma: PrismaClient) {
  return new DataLoader<string, any[]>(async (eventIds) => {
    const sessions = await prisma.session.findMany({
      where: { eventId: { in: eventIds as string[] } },
      orderBy: { startsAt: 'asc' },
    });
    const map = new Map<string, any[]>();
    for (const s of sessions) {
      const arr = map.get(s.eventId) ?? [];
      arr.push(s);
      map.set(s.eventId, arr);
    }
    return eventIds.map((id) => map.get(id) ?? []);
  });
}
