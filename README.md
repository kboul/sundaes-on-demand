# Sundaes on Demand

A full stack application using react & node from the "Sundaes on Demand" app in the Udemy course "Testing Library for React" to dive into jest & react-testing-libray concepts.

## Installing

1. Clone or fork the course repository
2. `cd` into the `sundaes-on-demand` directory (where this README is located).
3. `npm i && npm run server-install` to install both client & server dependencies.

## Starting the app

Run `npm run dev` to run both client and server. The server will be found at [localhost:3030](http://localhost:3030) while the client at [localhost:3000](http://localhost:3000).

## Kill server

In case you reeive the following error:
Node / Express: EADDRINUSE, Address already in use - Kill server

```
sudo pkill node
```

## Using the server

Server routes:

-   `GET /scoops` and `GET /toppings` return sundae options (array of objects with keys `name` and `imagePath`)
-   `POST /order` returns a random order number (does not process order)
-   images via static `/images` directory.

## Testing

To test, run `npm test` for both client & server.
