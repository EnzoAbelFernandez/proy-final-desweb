const API = "http://localhost:3000/api";
let activeAccount = null;

// 🚧 Activa o desactiva el modo mock
const USE_MOCK = true;

// 📦 Datos simulados
const mockUsers = [{ username: "juan", password: "1234" }];
let mockTasks = [];

// --------- AUTENTICACIÓN ---------
async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    let data;

    if (USE_MOCK) {
        const user = mockUsers.find(u => u.username === username && u.password === password);
        data = { success: !!user };
    } else {
        const res = await fetch(API + "/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        data = await res.json();
    }

    if (data.success) {
        alert("Bienvenido!");
        activeAccount = username;
        window.localStorage.setItem("activeAccount", activeAccount);
        document.querySelector('.auth-section').style.display = 'none';
        document.getElementById('taskSection').style.display = 'block';
        loadTasks();
    } else {
        alert("Error de login");
    }
}

async function register() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    let data;

    if (USE_MOCK) {
        const exists = mockUsers.some(u => u.username === username);
        if (exists) {
            data = { success: false };
        } else {
            mockUsers.push({ username, password });
            data = { success: true };
        }
    } else {
        const res = await fetch(API + "/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        data = await res.json();
    }

    alert(data.success ? "Registrado correctamente" : "Error de registro");
}

function logout() {
    activeAccount = null;
    window.localStorage.removeItem("activeAccount");
    document.getElementById('taskSection').style.display = 'none';
    document.querySelector('.auth-section').style.display = 'block';
}

// --------- TAREAS ---------
async function addTask() {
    const title = document.getElementById("newTask").value;
    const description = document.getElementById("taskDateTime").value;
    if (title.trim() === "") {
        alert("La tarea debe tener un título");
        return;
    }

    if (USE_MOCK) {
        mockTasks.push({ id: Date.now(), title, description });
    } else {
        await fetch(API + "/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description })
        });
    }

    document.getElementById("newTask").value = "";
    document.getElementById("taskDateTime").value = "";
    loadTasks();
}

async function loadTasks() {
    let tasks = [];

    if (USE_MOCK) {
        tasks = mockTasks;
    } else {
        const res = await fetch(API + "/tasks");
        tasks = await res.json();
    }

    const list = document.getElementById("taskList");
    list.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.title + ": " + task.description;

        const del = document.createElement("button");
        del.textContent = "Eliminar";
        del.onclick = async () => {
            if (USE_MOCK) {
                mockTasks = mockTasks.filter(t => t.id !== task.id);
                loadTasks();
            } else {
                await fetch(API + "/tasks/" + task.id, { method: "DELETE" });
                loadTasks();
            }
        };

        li.appendChild(del);
        list.appendChild(li);
    });
}

// --------- INICIALIZACIÓN ---------
window.onload = () => {
    activeAccount = window.localStorage.getItem("activeAccount");
    if (activeAccount) {
        document.querySelector('.auth-section').style.display = 'none';
        document.getElementById('taskSection').style.display = 'block';
        loadTasks();
    } else {
        document.querySelector('.auth-section').style.display = 'block';
        document.getElementById('taskSection').style.display = 'none';
    }
};
