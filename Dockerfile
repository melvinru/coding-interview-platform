# Build stage for client
FROM node:18-alpine as client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Server stage
FROM node:18-alpine
WORKDIR /app
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm install
COPY server/ ./
# Copy built client assets to server
COPY --from=client-build /app/client/dist ../client/dist

EXPOSE 3001
CMD ["npm", "start"]
