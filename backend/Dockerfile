FROM alpine AS nodejs

WORKDIR /app

RUN apk add --no-cache nodejs

# ---

FROM nodejs AS npm

RUN apk add npm

# ---

FROM npm AS deps

COPY package.json package-lock.json /app/

RUN npm ci --omit=dev

# ---

FROM nodejs AS runtime

COPY --from=deps /app/node_modules /app/node_modules

COPY dist/main.js /app/main.js

CMD [ "node", "main.js" ]