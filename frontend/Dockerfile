FROM node as react-build
WORKDIR /app
COPY . ./
RUN npm i
RUN npm run build

# Stage 2 - the production environment
FROM nginx
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]