
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const PORT = 3000;

app.use(express.json());

app.use('/users', userRoutes);
app.use('/blog', blogRoutes);

app.listen(PORT,  () => {
     console.log(` Server ishga tushti ${PORT}`);
});

