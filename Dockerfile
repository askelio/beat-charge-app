FROM node:18.16.0

WORKDIR /app

COPY . .
RUN  npm install

ENV NEXT_TELEMETRY_DISABLED 1

RUN npx next build

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
