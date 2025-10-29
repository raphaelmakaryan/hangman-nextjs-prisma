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

# our base image "node" has a user named "node"
# After that line, all command run inside the conatiner will be launched by the "node" user 
USER node

COPY --from=builder --chown=node:node /app/.next/standalone/ /app/
COPY --from=builder --chown=node:node /app/public/ /app/public/
COPY --from=builder --chown=node:node /app/.next/static/ /app/.next/static/

# The container will expose port 3000
EXPOSE 3000

# Start command to use for the conaitner
CMD node server.js