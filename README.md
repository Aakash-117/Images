# MongoDB Image Upload API

## Install

```bash
npm install
```

## Configure

Rename `.env.example` to `.env`

## Run

```bash
npm run dev
```

## Upload Image

Endpoint:

```http
POST /upload
```

Form-data key:

```
image
```

Example using curl:

```bash
curl -X POST http://localhost:5000/upload \
-F "image=@test.jpg"
```

## Get Image

```http
GET /image/:id
```