import express, { Request, Response, NextFunction } from "express";

const app = express();
const PORT = process.env.PORT || 8080;

// global middleware
// now this will get run on every request
// NOTE: order of calling the middleware matters
app.use(globalMiddleware2);
app.use(globalMiddleware1);

// we could have several middleware on express application like
// app.use(cors);
// app.use(bodyParser);

function globalMiddleware1(req: Request, res: Response, next: NextFunction) {
  // global middleware function
  console.log("globalMiddleware1");

  // next allow to pass this middleware
  next();
}

function globalMiddleware2(req: Request, res: Response, next: NextFunction) {
  // global middleware function
  console.log("globalMiddleware2");

  // next allow to pass this middleware
  next();
}

function middleware1(req: Request, res: Response, next: NextFunction) {
  // middleware1 function
  console.log("middleware1");

  // attaching the custom property to the req object from middleware
  (req as any).customProperty = 100;
  // NOTE that all of the middleware that we use on express app will attached these kind of property

  // next allow to pass this middleware
  next();
}

function middleware2(req: Request, res: Response, next: NextFunction) {
  // middleware1 function
  console.log("middleware2");

  // reassigning the value of 'customProperty'
  (req as any).customProperty = "Custom Value";

  const error: boolean = false;
  if (error) {
    // Ex: throwing Database Error that will handle by error handler
    const errorObject = new Error("This is a database error");
    next(errorObject);
  } else {
    next();
  }
}

// Error Handling Middleware
function errorHandler(err, req: Request, res: Response, next: NextFunction) {
  if (err) {
    res.send("<h1>There is an error please try again</h1>");
  }
  if (err.status === 404) {
  }
}

const rootController = (req: Request, res: Response, next: NextFunction) => {
  console.log("Express function");
  res.send("hello world");

  // Getting the 'customProperty'
  // because we are running this function after the 'middleware1' we can get the new attached property to the request object
  console.log((req as any).customProperty);

  /*
    after requesting '/' route Middleware Order
    Output:
        globalMiddleware2
        globalMiddleware1
        middleware1
        middleware2
        Express function
  */
};

app.get("/", middleware1, middleware2, rootController);
// app.get('<route>', <middleware_1>,..., <middleware_n>, <express_callback>);

// NOTE: we have to put the error handler middle ware at the last of all routes
// because after going through several middleware there could be an error that occur and that error will get catch by the error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Running on:", "http://localhost:8080/");
});
