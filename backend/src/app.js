const express =require('express');
const cors =require('cors');
const helmet= require('helmet');
const photoRoutes= require('./routes/photos.routes')
const errorHandler= require('./middleware/error.middleware');

const app=express();

// 1.Security & Utility middleware (runs first, on every request)
app.use(helmet());// sets safe HTTP headers
app.use(cors()); // allow frontend to calll  this API from a different origin
app.use(express.json()); //parse incoming JSON request body and make it available on req.body
app.use(express.urlencoded({extended:true}));// parse form data

// 2. Request logging middleware (runs on every request)
const morgan =require('morgan');
app.use(morgan('dev'));

// 3. API routes (runs only on matching routes)
app.use('/api/photos',photoRoutes);
app.use('/chain',chainRoutes);
app.use('/verify',verifyRoutes);

// 4. Health check (good practice, lets you confirm the server is alive)
app.get('/health',(req,res) => res.json({status:'ok'}));

// 5. 404 handler-catches anything that didn't match a a route
app.use((req,res)=>{
    res.status(404).json({error:'Route not found'});
});
// 6. Global eoor handler-catches any errors that occur in the routes- Must be last, catches errors thrown anywhere
const errorHandler= require('./middleware/error.middleware.js');
app.use(errorHandler);

