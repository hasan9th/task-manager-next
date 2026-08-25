# TaskFlow API

Base URL:

http://localhost:3001

## GET /tasks

Returns all tasks.

### Response

**200 OK**

```json
[
  {
    "id": 1,
    "title": "Learn Express",
    "completed": false
  }
]

---

# 5. Document GET one

```md
## GET /tasks/:id

Returns a single task.

### Example

GET /tasks/1

### Response

**200 OK**

```json
{
  "id": 1,
  "title": "Learn Express",
  "completed": false
}
{
  "message": "Task not found"
}

---

# 6. Document POST

```md
## POST /tasks

Creates a new task.

### Request Body

```json
{
  "title": "Learn PostgreSQL"
}
## HTTP Status Codes

| Status | Meaning |
|---|---|
| 200 | Request successful |
| 201 | Resource created |
| 204 | Resource deleted successfully |
| 400 | Invalid request |
| 404 | Resource not found |
| 500 | Unexpected server error |