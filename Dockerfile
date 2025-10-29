# We start for a docker image named "node:20-slim"
# see https://hub.docker.com/_/node
# We use base as an alias name
FROM node:20-slim AS base
# We'll work inside the directory /app
WORKDIR /app

######################################
# First stage (build the app)
FROM base AS builder
# Copy project file
COPY . .
# Run npm install
# We use "npm ci" instead of "npm install"
# Read https://docs.npmjs.com/cli/v7/commands/npm-ci for explaination
RUN npm ci
# We run our custom build script
RUN npm run build

######################################
# Second stage (build the production container)
FROM base AS runner

# Here we copy a file from "builder" stage to the current "runner" stage
COPY --from=builder /app/.next/standalone/ /app/
COPY --from=builder /app/public/ /app/public/
COPY --from=builder /app/.next/static/ /app/.next/static/
# The container will expose port 3000
EXPOSE 3000

# Start command to use for the conaitner
CMD node server.js