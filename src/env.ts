import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().url(),
        AUTH_GITHUB_ID: z.string().min(1),
        AUTH_GITHUB_SECRET: z.string().min(1),
    },
    client: {
    },
    
    // For Next.js >= 13.4.4, you only need to destructure client variables:
    experimental__runtimeEnv: {
    }
});