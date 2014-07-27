### pp-message service

### `GET /message`

fetch a collection of all messages

Example
```bash
curl -X GET /message
```
Output
```
{
  _id : { object },
  _id : { object },
  _id : { object }
}
```

### `GET /message/:id`

fetch a specific message

Example
```bash
curl -X GET /message/123
```
Output
```javascript
{
  _id: 123,
  to:
    [
      {
        "name": "jared halpert",
        "phoneNumber": 14153139087
      },
      {
        "name": "paul jones",
        "phoneNumber": 14128895467
      }
    ],
  from: {
    "name": "hardik agrawal",
    "phoneNumber": 14159961234
  },
  text: "text body goes here",
  img: "http://something.com/message/123/image/456",
  resource: "http://something.com/message/123"
}
```

### `POST /message`

create a new message

Example
```bash
curl -X POST -H "Content-Type: application/json" \
{  
"to": { "0": { "name": "jared halpert", "phoneNumber": 14153139087  } }, \
"from": { "name": "hardik agrawal", "phoneNumber": 14159961234 }, \
"text": "text body goes here", \
"img": "someimage.png" \
}
```
