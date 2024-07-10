import cors from "@fastify/cors";
import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { confirmParticipants } from "./routes/confirm-participant";
import { confirmTrip } from "./routes/confirm-trip";
import { createActivity } from "./routes/create-activity";
import { createInvite } from "./routes/create-invite";
import { createLink } from "./routes/create-link";
import { createTrip } from "./routes/create-trips";
import { getActivity } from "./routes/get-activity";
import { getLink } from "./routes/get-link";
import { getParticipants } from "./routes/get-participants";
import { updateTrip } from "./routes/update-trip";
import { getTripDetails } from "./routes/get-trip-details";
import { getParticipant } from "./routes/get-particpant";
import { errorHandler } from "./error-handler";
import { env } from "./env";

const app = fastify()

app.register(cors, {
    origin: '*',
})

app.setErrorHandler(errorHandler)

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(confirmTrip)
app.register(createTrip)
app.register(confirmParticipants)
app.register(createActivity)
app.register(getActivity)
app.register(createLink)
app.register(getLink)
app.register(getParticipants)
app.register(createInvite)
app.register(updateTrip)
app.register(getTripDetails)
app.register(getParticipant)

app.listen({host:'0.0.0.0', port:env.PORT}).then(() => {
    console.log('HTTP Server Running!')
})