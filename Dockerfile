FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir -p uploads

RUN npx prisma generate

RUN npm run build

CMD ["npm", "run", "start:prod"]

# docker exec -it docker_container_id /bin/bash
# npx prisma genrate -> optional
# npx prisma migrate deploy
# npx ts-node ./src/scripts/startup.app.ts
