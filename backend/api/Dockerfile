FROM node:16-alpine As development

WORKDIR /usr/src/app

#RUN apk add --no-cache libc6-compat

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

# USER node

COPY . .

###################
# BUILD FOR PRODUCTION
###################

FROM node:16-alpine As build

WORKDIR /usr/src/app

COPY package*.json ./
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY . .

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
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

ENV NODE_ENV production

# Start the server using the production build
CMD [ "node", "dist/main.js" ]