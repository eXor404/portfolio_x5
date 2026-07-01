# Small, production-only image that runs as a non-root user.
FROM node:20-alpine

ENV NODE_ENV=production
WORKDIR /app

# Install deps first for better layer caching. --omit=dev keeps the image lean;
# npm ci needs the lockfile, so fall back to install if it isn't present.
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm install --omit=dev; fi

COPY src ./src

# Data dir for the JSONL backup; owned by the unprivileged runtime user.
RUN mkdir -p /data && chown -R node:node /app /data
USER node

EXPOSE 8080

# Liveness probe hits the health endpoint.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||8080)+'/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "src/index.js"]
