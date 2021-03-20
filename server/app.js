const express = require('express');
const cors = require('cors');
const userRoutes = require('./controller/users-controller');

const app = express();
app.use(express.json());

app.use(cors());

app.use('/api/users', userRoutes);

const port = process.env.PORT || 3005;
app.listen(port, () => console.log(`Maccabi app listening on ${port}`));
