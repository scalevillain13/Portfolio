import { useMemo, useState } from "react";

const STORAGE_KEY = "kanban-board-state-v1";

const COLUMNS = [
  { id: "backlog", title: "Backlog" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" }
];

const INITIAL_TASKS = [
  {
    id: "task-1",
    title: "Сверстать главный экран",
    description: "Подготовить hero-блок и базовую сетку.",
    status: "backlog",
    priority: "high",
    createdAt: Date.now() - 1000000
  },
  {
    id: "task-2",
    title: "Подключить drag-and-drop",
    description: "Сделать перенос карточек по колонкам.",
    status: "in-progress",
    priority: "medium",
    createdAt: Date.now() - 500000
  },
  {
    id: "task-3",
    title: "Сохранение в localStorage",
    description: "Данные доски должны сохраняться после перезагрузки.",
    status: "done",
    priority: "low",
    createdAt: Date.now() - 100000
  }
];

const PRIORITY_OPTIONS = [
  { id: "all", title: "Все приоритеты" },
  { id: "high", title: "High" },
  { id: "medium", title: "Medium" },
  { id: "low", title: "Low" }
];

const PRIORITY_LABEL = {
  high: "High",
  medium: "Medium",
  low: "Low"
};

function normalizeTask(task) {
  return {
    id: task.id,
    title: String(task.title || "Без названия"),
    description: String(task.description || ""),
    status: task.status || "backlog",
    priority: task.priority || "medium",
    createdAt: task.createdAt || Date.now()
  };
}

function getSavedTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_TASKS;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return INITIAL_TASKS;
    return parsed.map(normalizeTask);
  } catch (_) {
    return INITIAL_TASKS;
  }
}

function getNextStatus(status) {
  if (status === "backlog") return "in-progress";
  if (status === "in-progress") return "done";
  return "done";
}

function getPrevStatus(status) {
  if (status === "done") return "in-progress";
  if (status === "in-progress") return "backlog";
  return "backlog";
}

function App() {
  const [tasks, setTasks] = useState(getSavedTasks);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [query, setQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [draggedId, setDraggedId] = useState(null);

  const filteredTasks = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks.filter((task) => {
      const byPriority =
        priorityFilter === "all" ? true : task.priority === priorityFilter;
      const byQuery =
        !q ||
        task.title.toLowerCase().includes(q) ||
        task.description.toLowerCase().includes(q);
      return byPriority && byQuery;
    });
  }, [tasks, query, priorityFilter]);

  const grouped = useMemo(() => {
    return COLUMNS.reduce((acc, column) => {
      acc[column.id] = filteredTasks.filter((task) => task.status === column.id);
      return acc;
    }, {});
  }, [filteredTasks]);

  const groupedTotal = useMemo(() => {
    return COLUMNS.reduce((acc, column) => {
      acc[column.id] = tasks.filter((task) => task.status === column.id).length;
      return acc;
    }, {});
  }, [tasks]);

  function persist(nextTasks) {
    setTasks(nextTasks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextTasks));
  }

  function addTask(event) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const task = {
      id: "task-" + Date.now(),
      title: trimmedTitle,
      description: description.trim(),
      status: "backlog",
      priority,
      createdAt: Date.now()
    };

    persist([task, ...tasks]);
    setTitle("");
    setDescription("");
    setPriority("medium");
  }

  function deleteTask(taskId) {
    persist(tasks.filter((task) => task.id !== taskId));
  }

  function editTask(taskId) {
    const current = tasks.find((task) => task.id === taskId);
    if (!current) return;
    const nextTitle = window.prompt("Новое название:", current.title);
    if (nextTitle === null) return;
    const nextDescription = window.prompt(
      "Новое описание:",
      current.description || ""
    );
    if (nextDescription === null) return;

    const cleanTitle = nextTitle.trim();
    if (!cleanTitle) return;

    const nextTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            title: cleanTitle,
            description: nextDescription.trim()
          }
        : task
    );
    persist(nextTasks);
  }

  function moveTask(taskId, status) {
    const nextTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status } : task
    );
    persist(nextTasks);
  }

  function clearDone() {
    persist(tasks.filter((task) => task.status !== "done"));
  }

  function onDragStart(taskId) {
    setDraggedId(taskId);
  }

  function onDrop(columnId) {
    if (!draggedId) return;
    const nextTasks = tasks.map((task) =>
      task.id === draggedId ? { ...task, status: columnId } : task
    );
    persist(nextTasks);
    setDraggedId(null);
  }

  return (
    <main className="page">
      <header className="topbar">
        <h1>Kanban Board</h1>
        <p>React + DnD + localStorage + фильтры и приоритеты</p>
      </header>

      <section className="composer">
        <form onSubmit={addTask}>
          <input
            type="text"
            placeholder="Название задачи"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <input
            type="text"
            placeholder="Короткое описание"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            aria-label="Приоритет"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button type="submit">Добавить</button>
        </form>
      </section>

      <section className="toolbar">
        <input
          type="text"
          placeholder="Поиск по задачам..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="priority-filters">
          {PRIORITY_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              className={priorityFilter === option.id ? "is-active" : ""}
              onClick={() => setPriorityFilter(option.id)}
            >
              {option.title}
            </button>
          ))}
        </div>
        <button type="button" className="danger" onClick={clearDone}>
          Очистить Done
        </button>
      </section>

      <section className="board">
        {COLUMNS.map((column) => (
          <article
            key={column.id}
            className="column"
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => onDrop(column.id)}
          >
            <div className="column-head">
              <h2>{column.title}</h2>
              <span>
                {grouped[column.id].length}/{groupedTotal[column.id]}
              </span>
            </div>

            <div className="column-body">
              {grouped[column.id].map((task) => (
                <div
                  key={task.id}
                  className="task"
                  draggable
                  onDragStart={() => onDragStart(task.id)}
                >
                  <h3>{task.title}</h3>
                  <div className={"priority-badge priority-" + task.priority}>
                    {PRIORITY_LABEL[task.priority]}
                  </div>
                  {task.description ? <p>{task.description}</p> : null}
                  <div className="task-actions">
                    <button
                      type="button"
                      onClick={() => moveTask(task.id, getPrevStatus(task.status))}
                      disabled={task.status === "backlog"}
                    >
                      ←
                    </button>
                    <button type="button" onClick={() => editTask(task.id)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => moveTask(task.id, getNextStatus(task.status))}
                      disabled={task.status === "done"}
                    >
                      →
                    </button>
                    <button
                      type="button"
                      className="delete"
                      onClick={() => deleteTask(task.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;
