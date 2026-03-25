FROM node:20-alpine

WORKDIR /app

# 1. Copy package files from the server folder
COPY server/package*.json ./
RUN npm install

# 2. Copy the prisma folder from root to /app/prisma
COPY prisma ./prisma

# 3. Copy the server source code
COPY server/ .

# 4. Generate Prisma Client
RUN npx -y prisma generate

EXPOSE 5000
CMD ["npx", "tsx", "src/index.ts"]