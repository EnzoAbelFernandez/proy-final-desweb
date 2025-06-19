const taskController = require('../backend/controllers/taskController');

describe('taskController', () => {
  const mockRepo = {
    getAll: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  };

  const res = {
    json: jest.fn(),
    status: jest.fn(() => res),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAllTasks devuelve tareas si no hay error', () => {
    const tasks = [{ id: 1, title: 'Tarea', description: 'Demo' }];
    mockRepo.getAll.mockImplementation((cb) => cb(null, tasks));

    const controller = taskController(mockRepo);
    controller.getAllTasks({}, res);

    expect(res.json).toHaveBeenCalledWith(tasks);
  });

  test('getAllTasks maneja errores', () => {
    const error = new Error('DB fail');
    mockRepo.getAll.mockImplementation((cb) => cb(error));

    const controller = taskController(mockRepo);
    controller.getAllTasks({}, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });

  test('createTask devuelve id y datos si no hay error', () => {
    const req = { body: { title: 'Nueva', description: 'Descripción' } };
    mockRepo.create.mockImplementation((data, cb) => cb(null, 42));

    const controller = taskController(mockRepo);
    controller.createTask(req, res);

    expect(res.json).toHaveBeenCalledWith({ id: 42, title: 'Nueva', description: 'Descripción' });
  });

  test('createTask maneja errores', () => {
    const req = { body: { title: 'Err', description: 'Boom' } };
    const error = new Error('Insert fail');
    mockRepo.create.mockImplementation((data, cb) => cb(error));

    const controller = taskController(mockRepo);
    controller.createTask(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });

  test('deleteTask devuelve cambios si no hay error', () => {
    const req = { params: { id: 7 } };
    mockRepo.delete.mockImplementation((id, cb) => cb(null, 1));

    const controller = taskController(mockRepo);
    controller.deleteTask(req, res);

    expect(res.json).toHaveBeenCalledWith({ deleted: 1 });
  });

  test('deleteTask maneja errores', () => {
    const req = { params: { id: 99 } };
    const error = new Error('Delete error');
    mockRepo.delete.mockImplementation((id, cb) => cb(error));

    const controller = taskController(mockRepo);
    controller.deleteTask(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });
});
