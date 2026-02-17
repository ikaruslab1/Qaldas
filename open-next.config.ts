// default open-next.config.ts file created by @opennextjs/cloudflare
import { defineCloudflareConfig } from "@opennextjs/cloudflare/config";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

const config = defineCloudflareConfig({
	incrementalCache: r2IncrementalCache,
});

// Configure the build command to avoid recursion
(config as any).build = {
	command: "npm run build:next",
};
(config as any).buildCommand = "npm run build:next";

export default config;
