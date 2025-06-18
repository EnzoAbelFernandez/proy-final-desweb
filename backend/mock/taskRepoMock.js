// mock/taskRepoMock.js
let mockTasks = [];
let nextId = 1;

module.exports = {
    getAll: (cb) => cb(null, mockTasks),

    create: ({ title, description }, cb) => {
        const newTask = { id: nextId++, title, description };
        mockTasks.push(newTask);
        cb(null, newTask.id);
    },

    delete: (id, cb) => {
        const initialLength = mockTasks.length;
        mockTasks = mockTasks.filter(task => task.id != id);
        cb(null, initialLength - mockTasks.length);
    }
};
