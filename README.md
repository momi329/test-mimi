# 銀行帳戶管理系統 API

該系統提供了基本的銀行帳戶操作功能，包括創建帳戶、存款、取款、轉帳等。

- TypeScript
- Express.js

## 安裝

```
npm install
npm start

```

## API 端點

- `GET /accounts`：所有帳戶
- `POST /accounts`：新增帳戶
- `GET /accounts/:id`：查找特定帳戶
- `POST /accounts/:id/deposit`：存款
- `POST /accounts/:id/withdraw`：提款
- `POST /transfer`：轉帳

## 使用示例

### 新增帳戶 `POST /accounts`

- 請求參數:

```json
  {
    "name": "string",
    "initialBalance": "number"
  }
  ```

- 回應:

```json
{
  "id": "string",
  "name": "string",
  "balance": "number"
}
````

### 存款 `POST /accounts/:id/deposit`

路徑參數:

- `id`: 帳戶 ID (string)

請求參數:

```json
{
  "amount": "number"
}
```

回應:

```json
{
  "id": "string",
  "name": "string",
  "balance": "number"
}
```

### 提款 `POST /accounts/:id/withdraw`

路徑參數:

- `id`: 帳戶 ID (string)

請求參數:

```json
{
  "amount": "number"
}
```

回應:

```json
{
  "id": "string",
  "name": "string",
  "balance": "number"
}
```

### 轉帳 `POST /transfer`

請求參數:

```json
{
  "fromId": "string",
  "toId": "string",
  "amount": "number"
}
```

回應:

```json
{
  "fromAccount": {
    "id": "string",
    "name": "string",
    "balance": "number"
  },
  "toAccount": {
    "id": "string",
    "name": "string",
    "balance": "number"
  }
}
```
