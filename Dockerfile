#Stage One
FROM node:22-alpine AS builder
WORKDIR /app

ARG VITE_CLOUD_HOST

ENV VITE_CLOUD_HOST=$VITE_CLOUD_HOST

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

ENV PORT=5173
ENV HOST=0.0.0.0

CMD ["npm", "run", "start"]

