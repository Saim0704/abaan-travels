FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy the rest of the code
COPY . .

# Expose app port (change if your app uses a different one)
EXPOSE 5000

RUN yarn install

RUN yarn build

# Start the app
CMD ["yarn", "start"]