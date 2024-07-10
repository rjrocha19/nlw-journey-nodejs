import cors from "@fastify/cors";
import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { confirmParticipants } from "./routes/confirm-participant";
import { confirmTrip } from "./routes/confirm-trip";
import { createTrip } from "./routes/create-trips";
import { createActivity } from "./routes/create-activity";
import { getActivity } from "./routes/get-activity";
import { createLink } from "./routes/create-link";
import { getLink } from "./routes/get-link";

const app = fastify()

app.register(cors, {
    origin: '*',
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(confirmTrip)
app.register(createTrip)
app.register(confirmParticipants)
app.register(createActivity)
app.register(getActivity)
app.register(createLink)
app.register(getLink)

app.listen({host:'0.0.0.0', port:3333}).then(() => {
    console.log('HTTP Server Running!')
})