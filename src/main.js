import { PORT, EXPRESS } from './libs/constants.js';
import cors from 'cors';
import { RouterManager } from './Routers/routerManager.js';
import errorHandler from './libs/Handler/errorHandler.js';


const app = EXPRESS();
app.use(cors());
app.use(EXPRESS.json());

app.use('/', RouterManager);



app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running`);
});