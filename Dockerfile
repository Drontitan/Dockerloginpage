FROM node

WORKDIR /app

COPY package.json .

# RUN npm install  

# here we want to install the nodemodules dependencies only in the development env and not int the production mode 
ARG NODE_ENV
RUN if [ "$NODE_ENV"="development" ]; \
         then npm install; \
         else npm install --only=production; \
         fi

COPY . ./

ENV PORT 3000

EXPOSE $PORT

CMD ["node","src/app.js"]
