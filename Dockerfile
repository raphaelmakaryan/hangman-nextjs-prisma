# We start for a docker image named "node:20-slim" 
# see https://hub.docker.com/_/node
# We use base as an alias name
FROM node:20-slim AS base

# We'll work inside the directory /app
WORKDIR /app

# Copy project file 
COPY . .
# Run npm install
# We use "npm ci" instead of "npm install"
# Read https://docs.npmjs.com/cli/v7/commands/npm-ci for explaination
RUN npm ci
# We run our custom build script
RUN npm run build

# The container will expose port 3000
EXPOSE 3000

# Start command to use for the conaitner
CMD npm run start