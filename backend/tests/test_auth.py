def test_register_user_success(client):
    resp = client.post(
        "/auth/register",
        json={"username": "alice", "email": "alice@example.com", "password": "password123"},
    )
    assert resp.status_code == 201
    body = resp.json()
    assert body["username"] == "alice"
    assert "password" not in body
    assert "password_hash" not in body


def test_register_duplicate_username_fails(client):
    payload = {"username": "bob", "email": "bob@example.com", "password": "password123"}
    client.post("/auth/register", json=payload)
    resp = client.post("/auth/register", json={**payload, "email": "bob2@example.com"})
    assert resp.status_code == 409


def test_register_invalid_email_fails(client):
    resp = client.post(
        "/auth/register",
        json={"username": "carl", "email": "not-an-email", "password": "password123"},
    )
    assert resp.status_code == 422


def test_login_success_returns_token(client):
    client.post(
        "/auth/register",
        json={"username": "dana", "email": "dana@example.com", "password": "password123"},
    )
    resp = client.post("/auth/login", data={"username": "dana", "password": "password123"})
    assert resp.status_code == 200
    body = resp.json()
    assert body["token_type"] == "bearer"
    assert body["access_token"]


def test_login_wrong_password_fails(client):
    client.post(
        "/auth/register",
        json={"username": "erin", "email": "erin@example.com", "password": "password123"},
    )
    resp = client.post("/auth/login", data={"username": "erin", "password": "wrongpass"})
    assert resp.status_code == 401


def test_login_nonexistent_user_fails(client):
    resp = client.post("/auth/login", data={"username": "ghost", "password": "whatever"})
    assert resp.status_code == 401
