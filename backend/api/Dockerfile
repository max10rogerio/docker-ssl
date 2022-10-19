FROM node:16-alpine As deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY --chown=node:node package.json yarn.lock* ./

RUN yarn --frozen-lockfile

FROM node:16-alpine As development

# Create app directory
WORKDIR /app

ENV NODE_ENV development

COPY --from=deps --chown=node:node /app/node_modules ./node_modules

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node

CMD [ "yarn", "start:dev" ]

###################
# BUILD FOR PRODUCTION
###################

FROM node:16-alpine As build

WORKDIR /app

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=deps /app/node_modules ./node_modules
COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN yarn build

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN yarn install --production --frozen-lockfile

USER node

###################
# PRODUCTION
###################

FROM node:16-alpine As production

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

ENV NODE_ENV production

# Start the server using the production build
CMD [ "node", "dist/main.js" ]