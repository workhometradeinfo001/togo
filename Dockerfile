#Stage One
FROM node:22-alpine AS builder
WORKDIR /app

#Copy Dependency
COPY package*.json ./
RUN npm ci

#Copy Code
COPY . .
RUN npm run build

#Stage Two
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/build ./build

EXPOSE 5173

CMD ["node", "build/server/index.js"]

