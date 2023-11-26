import { body, param } from "express-validator";

export const createTaskValidator = [
    body('task.title', 'title does not Empty').not().isEmpty(),
    body('task.title', '').isString(),
    body('task.description', 'desc does not Empty').not().isEmpty(),
    body('task.description', '').isString(),
    body('task.date', 'date does not Empty').not().isEmpty(),
    body('task.date', 'must be iso form').isDate(),
  ]
  export const updateTaskValidator = [
    body('task.title', 'add title').isString(),
    body('task.description', 'add desc').isString(),
    body('task.date', 'must be iso form').isDate(),
    body('task.status', 'must be FINISHED or WORKING').isIn(['FINISHED' , 'WORKING']),
  ]
