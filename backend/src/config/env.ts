import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("5000"),
  MONGO_URI: z.string().min(1, "MONGO_URI is required"),
  //   AUTH0_DOMAIN: z.string().min(1, "AUTH0_DOMAIN is required"),
  //   AUTH0_AUDIENCE: z.string().min(1, "AUTH0_AUDIENCE is required"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:");
  console.error(parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;
