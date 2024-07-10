import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { dayjs } from "../lib/dayjs";
import { z } from "zod";
import { prisma } from "../lib/prisma";



export async function createActivity(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/trips/:tripId/activites", 
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
        body: z.object({
          title: z.string().min(4),  
          occurs_at: z.coerce.date(),
        }),
      },
    }, 
    async (request) => {
      const { tripId } = request.params
      const { title, occurs_at } = request.body
      const trip = await prisma.trip.findUnique({
        where: {
          id: tripId
        }
      })

      if (!trip) {
        throw new Error("Trip not found")
      }

      if (dayjs(occurs_at).isBefore(trip.starts_at)) {
        throw new Error("Start date must be in the future")
      }

      if (dayjs(occurs_at).isAfter(trip.ends_at)) {
        throw new Error("Start date must be in the future")
      }

      const activity = await prisma.activity.create({
        data: {
          title,
          occurs_at,
          trip_id: trip.id
        }
      })

      return { activityId: activity.id }
    })
}