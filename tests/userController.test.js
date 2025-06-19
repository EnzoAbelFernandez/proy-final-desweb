const userController = require('../backend/controllers/userController');

describe('userController', () => {
  const mockRepo = {
    login: jest.fn(),
    register: jest.fn(),
  };

  const res = {
    json: jest.fn(),
    status: jest.fn(() => res),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('login exitoso', () => {
    const req = { body: { username: 'user', password: '1234' } };
    const user = { id: 1, username: 'user' };

    mockRepo.login.mockImplementation((u, p, cb) => cb(null, user));

    const controller = userController(mockRepo);
    controller.login(req, res);

    expect(res.json).toHaveBeenCalledWith({ success: true, user });
  });

  test('login inválido', () => {
    const req = { body: { username: 'user', password: 'wrong' } };

    mockRepo.login.mockImplementation((u, p, cb) => cb(null, null));

    const controller = userController(mockRepo);
    controller.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Credenciales inválidas',
    });
  });

  test('login con error', () => {
    const req = { body: { username: 'user', password: 'fail' } };
    const error = new Error('DB error');

    mockRepo.login.mockImplementation((u, p, cb) => cb(error));

    const controller = userController(mockRepo);
    controller.login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });

  test('register exitoso', () => {
    const req = { body: { username: 'nuevo', password: '123' } };
    const user = { id: 2, username: 'nuevo' };

    mockRepo.register.mockImplementation((u, p, cb) => cb(null, user));

    const controller = userController(mockRepo);
    controller.register(req, res);

    expect(res.json).toHaveBeenCalledWith({ success: true, id: 2, username: 'nuevo' });
  });

  test('register con error', () => {
    const req = { body: { username: 'existe', password: '123' } };
    const error = new Error('Usuario ya existe');

    mockRepo.register.mockImplementation((u, p, cb) => cb(error));

    const controller = userController(mockRepo);
    controller.register(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });
});
