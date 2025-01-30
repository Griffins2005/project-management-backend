const express = require('express');
const { getTasks, createTask, updateTask, deleteTask} = require('../controllers/task');

const router = express.Router();

router.route('/:projectId').get(getTasks).post(createTask);
router.route('/:projectId/:id').put(updateTask).delete(deleteTask);

module.exports = router;