import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { dayjs } from "../lib/dayjs";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-errors";



export async function getActivity(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/trips/:tripId/activites", 
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
      },
    }, 
    async (request) => {
      const { tripId } = request.params

      const trip = await prisma.trip.findUnique({
        where: { id: tripId },
        include: { activites: {
          orderBy: { occurs_at: "asc", }
        }  

        },
      })

      if (!trip) {
        throw new ClientError("Trip not found")
      }

      const differenceInDaysBetweenTripSatartAndEnd = dayjs(trip.ends_at).diff(trip.starts_at, "days")

      const activities = Array
        .from({ length: differenceInDaysBetweenTripSatartAndEnd + 1 })
        .map((_, index) => {
          const date = dayjs(trip.starts_at).add(index, "days")

          return {
            date: date.toDate(),
            activities: trip.activites.filter(activity => {
              return dayjs(activity.occurs_at).isSame(date, 'day')
            })
          }
        })

      return { activities }
    },
  )
}