def test_create_task_requires_auth(client):
    resp = client.post("/tasks", json={"title": "No auth task"})
    assert resp.status_code == 401


def test_create_and_list_tasks(client, auth_headers):
    resp = client.post(
        "/tasks",
        json={"title": "Write report", "description": "Q3 summary", "priority": "high"},
        headers=auth_headers,
    )
    assert resp.status_code == 201
    task = resp.json()
    assert task["title"] == "Write report"
    assert task["status"] == "pending"

    resp = client.get("/tasks", headers=auth_headers)
    assert resp.status_code == 200
    assert len(resp.json()) == 1


def test_get_single_task(client, auth_headers):
    created = client.post("/tasks", json={"title": "Task A"}, headers=auth_headers).json()
    resp = client.get(f"/tasks/{created['id']}", headers=auth_headers)
    assert resp.status_code == 200
    assert resp.json()["id"] == created["id"]


def test_get_nonexistent_task_returns_404(client, auth_headers):
    resp = client.get("/tasks/9999", headers=auth_headers)
    assert resp.status_code == 404


def test_update_task(client, auth_headers):
    created = client.post("/tasks", json={"title": "Old title"}, headers=auth_headers).json()
    resp = client.put(
        f"/tasks/{created['id']}",
        json={"title": "New title", "status": "completed"},
        headers=auth_headers,
    )
    assert resp.status_code == 200
    body = resp.json()
    assert body["title"] == "New title"
    assert body["status"] == "completed"


def test_delete_task(client, auth_headers):
    created = client.post("/tasks", json={"title": "Temp task"}, headers=auth_headers).json()
    resp = client.delete(f"/tasks/{created['id']}", headers=auth_headers)
    assert resp.status_code == 204

    resp = client.get(f"/tasks/{created['id']}", headers=auth_headers)
    assert resp.status_code == 404


def test_user_cannot_access_another_users_task(client):
    # User 1 creates a task
    client.post(
        "/auth/register",
        json={"username": "owner", "email": "owner@example.com", "password": "password123"},
    )
    token1 = client.post(
        "/auth/login", data={"username": "owner", "password": "password123"}
    ).json()["access_token"]
    headers1 = {"Authorization": f"Bearer {token1}"}
    task = client.post("/tasks", json={"title": "Private task"}, headers=headers1).json()

    # User 2 tries to access it
    client.post(
        "/auth/register",
        json={"username": "intruder", "email": "intruder@example.com", "password": "password123"},
    )
    token2 = client.post(
        "/auth/login", data={"username": "intruder", "password": "password123"}
    ).json()["access_token"]
    headers2 = {"Authorization": f"Bearer {token2}"}

    resp = client.get(f"/tasks/{task['id']}", headers=headers2)
    assert resp.status_code == 404
