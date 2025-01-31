const express = require('express');
const { getTasks, getAllTasks, createTask, updateTask, deleteTask} = require('../controllers/task');

const router = express.Router();

router.get('/', getAllTasks);
router.route('/:projectId').get(getTasks).post(createTask);
router.route('/:projectId/:id').put(updateTask).delete(deleteTask);

module.exports = router;