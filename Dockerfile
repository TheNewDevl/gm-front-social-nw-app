# Node base image
FROM node@sha256:c785e617c8d7015190c0d41af52cc69be8a16e3d9eb7cb21f0bb58bcfca14d6b As development

# Create the working directory
WORKDIR /app

# Copy package dependencies
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install -g serve

# Copy app
COPY . .

RUN npm run build

ENV NODE_ENV=production

EXPOSE 3000

CMD ["serve", "-s", "build"]
