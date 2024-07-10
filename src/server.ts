import fastify from "fastify";
import cors from "@fastify/cors";
import { prisma } from "./lib/prisma";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { createTrip } from "./routes/create-trips";
import { confirmTrip } from "./routes/confirm-trip";

const app = fastify()

app.register(cors, {
    origin: '*',
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(confirmTrip)
app.register(createTrip)

app.listen({host:'0.0.0.0', port:3333}).then(() => {
    console.log('HTTP Server Running!')
})