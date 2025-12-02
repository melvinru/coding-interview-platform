# Платформа для Кодинг-Интервью

Платформа для проведения технических собеседований с возможностью совместного написания кода в реальном времени. Разработана с использованием React, Node.js, Socket.io и Monaco Editor.

Этот проект был разработан в рамках курса **AI Development Tools Zoomcamp**: [https://github.com/DataTalksClub/ai-dev-tools-zoomcamp](https://github.com/DataTalksClub/ai-dev-tools-zoomcamp)

[Read in English](README.md)

## Возможности

*   **Совместная работа в реальном времени**: Несколько пользователей могут одновременно редактировать код в одной комнате.
*   **Выполнение кода**: Запуск кода прямо в браузере.
    *   **Python**: Выполняется через Pyodide (WASM).
    *   **JavaScript, Java, C++, Go**: Выполняются через Piston API.
*   **Подсветка синтаксиса**: Используется Monaco Editor (как в VS Code).
*   **Управление комнатами**: Уникальные ссылки для каждой сессии интервью.

## Технологический стек

*   **Frontend**: React, Vite, Monaco Editor, Socket.io Client, Axios.
*   **Backend**: Node.js, Express, Socket.io.
*   **Тестирование**: Jest (Интеграционные тесты).
*   **Контейнеризация**: Docker.

## Начало работы

### Требования

*   Node.js (v18+)
*   npm

### Установка

1.  Клонируйте репозиторий:
    ```bash
    git clone https://github.com/melvinru/coding-interview-platform.git
    cd coding-interview-platform
    ```

2.  Установите зависимости:
    ```bash
    # Установка зависимостей в корне (concurrently)
    npm install

    # Установка зависимостей сервера
    cd server
    npm install
    cd ..

    # Установка зависимостей клиента
    cd client
    npm install
    cd ..
    ```

### Запуск приложения

Чтобы запустить клиент и сервер одновременно:

```bash
npm run dev
```

*   **Клиент**: [http://localhost:5173](http://localhost:5173)
*   **Сервер**: [http://localhost:3001](http://localhost:3001)

### Запуск тестов

Чтобы запустить интеграционные тесты для сервера:

```bash
cd server
npm test
```

### Docker

Чтобы собрать и запустить приложение с использованием Docker:

```bash
docker build -t coding-interview-platform .
docker run -p 3001:3001 coding-interview-platform
```

## Лицензия

Этот проект является открытым программным обеспечением под лицензией [MIT License](LICENSE).
