import { Router } from 'express';

import { deleteEvent, createEvent, getUserEvents, updateEvent } from '../controller/eventController';

const eventRouter = Router();

// Event Routes Database queries in Controller
eventRouter.post('/createEvent', createEvent);
eventRouter.post('/deleteEvent', deleteEvent);
eventRouter.get('/getUserEvents', getUserEvents);
eventRouter.put('/updateEvent', updateEvent);

export default eventRouter;