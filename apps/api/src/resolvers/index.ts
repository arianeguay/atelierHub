import { GraphQLScalarType, Kind } from 'graphql';
import type { GraphQLContext } from '../utils/context';
import { requireRole } from '../utils/rbac';

export const DateTimeScalar = new GraphQLScalarType<string, string>({
  name: 'DateTime',
  description: 'ISO8601 Date string',
  serialize(value) {
    if (value instanceof Date) return value.toISOString();
    return new Date(value as any).toISOString();
  },
  parseValue(value) {
    return new Date(String(value)).toISOString();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value).toISOString();
    }
    return null;
  },
});

export const resolvers = {
  DateTime: DateTimeScalar,
  Query: {
    me: async (_: unknown, __: unknown, ctx: GraphQLContext) => {
      if (!ctx.user) return null;
      return ctx.prisma.user.findUnique({ where: { id: ctx.user.sub } });
    },
    events: async (
      _: unknown,
      args: { filter?: { status?: 'DRAFT' | 'PUBLISHED'; category?: string } },
      ctx: GraphQLContext,
    ) => {
      return ctx.prisma.event.findMany({
        where: {
          status: args.filter?.status,
          category: args.filter?.category ?? undefined,
        },
        orderBy: { createdAt: 'desc' },
      });
    },
    event: async (_: unknown, args: { slug: string }, ctx: GraphQLContext) => {
      return ctx.prisma.event.findUnique({ where: { slug: args.slug } });
    },
    sessions: async (_: unknown, args: { eventId: string }, ctx: GraphQLContext) => {
      return ctx.loaders.sessionsByEventId.load(args.eventId);
    },
  },
  Mutation: {
    createEvent: async (
      _: unknown,
      args: { input: any },
      ctx: GraphQLContext,
    ) => {
      requireRole(ctx.user, ['STAFF', 'ADMIN']);
      const created = await ctx.prisma.event.create({ data: args.input });
      return created;
    },
    updateEvent: async (_: unknown, args: { id: string; input: any }, ctx: GraphQLContext) => {
      requireRole(ctx.user, ['STAFF', 'ADMIN']);
      return ctx.prisma.event.update({ where: { id: args.id }, data: args.input });
    },
    scheduleSession: async (
      _: unknown,
      args: { input: any },
      ctx: GraphQLContext,
    ) => {
      requireRole(ctx.user, ['STAFF', 'ADMIN']);
      return ctx.prisma.session.create({ data: args.input });
    },
    purchase: async () => {
      // TODO: Implement Stripe integration
      return true;
    },
    redeemCoupon: async () => {
      // TODO: Implement coupon application logic
      return true;
    },
    checkInTicket: async () => {
      // TODO: Implement ticket check-in with QR
      return true;
    },
  },
  Event: {
    sessions: async (parent: { id: string }, _args: unknown, ctx: GraphQLContext) => {
      return ctx.loaders.sessionsByEventId.load(parent.id);
    },
  },
  Session: {
    venue: async (parent: { venueId: string }, _args: unknown, ctx: GraphQLContext) => {
      return ctx.prisma.venue.findUnique({ where: { id: parent.venueId } });
    },
  },
};
