# Technecians 
## API Reference

#### root uri
```http
 https://technicans.mooo.com:3000
```
#### Register new user
```http
  POST /api/v1/user/add-user
```

| Body Parameter | Type     | Description                |
| :--------      | :------- | :------------------------- |
| `email`        | `string` | **Required** **Unique** must be valid email m@gmail.com|
| `username`     | `string` | **Required** |
| `password`     | `string` | **Required** must be more than 5 |

### Response 
| Body Parameter | Type     | 
| :------------- | :------- | 
| `email`        | `string` | 
| `username`     | `string` | 
| `message`      | `string` | 
----------------------------------------------------------------
#### login user
```http
  POST /api/v1/user/login
```
| Body Parameter | Type     | Description                |
| :------------- | :------- | :------------------------- |
| `email`        | `string` | **Required** |
| `password`     | `string` | **Required** |

### Response 
| Body Parameter | Type     | Description                | 
| :------------- | :------- | :------------------------- |
| `message`      | `string` | 
| `access_token` | `string` |
----------------------------------------------------------------
#### logout user
```http
  POST /api/vi/user/logout
```

| Header Parameter | Type     | Description                |
| :--------------- | :------- | :------------------------- |
| `authentication` | `string` | **Required** Bearer ${access_token}|

### Response 
| Body Parameter | Type     | 
| :-------- | :------- | 
| `message`       | `string` | 
----------------------------------------------------------------
#### update user
```http
  PATCH /api/v1/user/{id}
```
| Header Parameter | Type     | Description                |
| :--------------- | :------- | :------------------------- |
| `authentication` | `string` | **Required** Bearer ${access_token}|

| Body Parameter | Type     | Description                |
| :------------- | :------- | :------------------------- |
| `email`        | `string` | **Required** **Unique** must be valid email m@gmail.com|
| `username`     | `string` | **Required** |
| `password`     | `string` | **Required** must be more than 5 |

### Response 
| Body Parameter | Type     | 
| :------------- | :------- | 
| `email`        | `string` | 
| `username`     | `string` |
| `message`      | `string` | 
----------------------------------------------------------------
#### delete user
```http
  DELETE /api/v1/user/{id}
```
| Header Parameter | Type     | Description                |
| :--------------- | :------- | :------------------------- |
| `authentication` | `string` | **Required** Bearer ${access_token}|
----------------------------------------------------------------
### Response 
| Body Parameter | Type     | 
| :------------- | :------- | 
| `message`      | `string` | 
----------------------------------------------------------------
#### add task
```http
  POST /api/v1/task/add-task
```
| Header Parameter | Type     | Description                |
| :--------------- | :------- | :------------------------- |
| `authentication` | `string` | **Required** Bearer ${access_token}|

| Body Parameter | Type     | Description                |
| :------------- | :------- | :------------------------- |
| `title`        | `string` | **Required** |
| `description`  | `string` | **Required** |
| `date`         | `string` | **Required** must be iso form |

### Response 
| Body Parameter | Type     | 
| :------------- | :------- | 
| `title`        | `string` | 
| `description`  | `string` |
| `date`         | `string` | 
| `status`       | `string` | 
----------------------------------------------------------------
#### get tasks
```http
  GET /api/v1/task/
```
| Header Parameter | Type     | Description                |
| :--------------- | :------- | :------------------------- |
| `authentication` | `string` | **Required** Bearer ${access_token}|

### Response 
| Body Parameter | Type     | 
| :------------- | :------- | 
| `title`        | `string` | 
| `description`  | `string` |
| `date`         | `string` | 
| `status`       | `string` | 
----------------------------------------------------------------
#### update task
```http
  PATCH /api/v1/task/update-task/{id}
```
| Header Parameter | Type     | Description                |
| :--------------- | :------- | :------------------------- |
| `authentication` | `string` | **Required** Bearer ${access_token}|

| Body Parameter | Type     | Description                |
| :------------- | :------- | :------------------------- |
| `title`        | `string` | **Required** |
| `description`  | `string` | **Required** |
| `date`         | `string` | **Required** must be iso form |
| `status`       | `string` | **Required** |

### Response 
| Body Parameter | Type     | 
| :------------- | :------- | 
| `title`        | `string` | 
| `description`  | `string` |
| `date`         | `string` | 
| `status`       | `string` | 
----------------------------------------------------------------
#### delete task
```http
  DELETE /api/v1/task/delete-task/{id}
```
| Header Parameter | Type     | Description                |
| :--------------- | :------- | :------------------------- |
| `authentication` | `string` | **Required** Bearer ${access_token}|

### Response 
| Body Parameter | Type     | 
| :------------- | :------- | 
| `message`      | `string` | 
