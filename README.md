# Description

Hi! This is my first time creating CRUD API with Express and Mongoose, and not to mention unit-testing as well. Was having fun and get a good learning from making this only in 3 days.

## Tech-Stack

Node.JS

Express

MongoDB with Mongoose

Jest & Chai

Morgan (HTTP Request Logger)

Docker (Containerization)

## Installation

```bash
npm install
```

```bash
npm start
```

## Run with Docker

```bash
docker-compose up --build
```

## Folder Structure

```bash
├── config
│   ├── database.js
│   └── routes.js
├── controller 
│   └── organization
│       ├── OrganizationController.js
│       ├── MemberController.js
│       └── CommentController.js
├── model
│   ├── Member.js
│   ├── Comment.js
│   └── Organization.js
├── test
│   └── all.test.js
└── app.js
```

## Routes & API

- post organization: (POST /orgs/:organization-name)
- post member: (POST /orgs/:organization-name/members)
- post comment: (POST /orgs/:organization-name/comments)
- get member: (GET /orgs/:organization-name/members)
- get comment: (GET /orgs/:organization-name/comments)
- delete comment: (DELETE /orgs/:organization-name/delete)

## POST Examples

POST Organization: http://localhost:9000/orgs/xendit

POST Member: http://localhost:9000/orgs/xendit/members
```JSON
{
  "loginName": "Rick Sanchez",
  "followersAmount": 666666,
  "followingAmount": 0
}
```

POST Comment: http://localhost:9000/orgs/xendit/comments
```JSON
{
  "content": "Wabbalubbadubdub mofos!"
}
```

## Database Architecture

Organization:

```
{
  name: "Galactic Federal"
}
```

Comment:

belongsTo Organization

```
{
  content: "Whatever this is."
  organizationId: ObjectId('52f24t2f42t2t')
}
```

Member:

belongsTo Organization

```
{
  loginName: "Morty"
  avatarUrl: "linkToEvilMorty.jpg"
  followersAmount: 0,
  followingAmount: 201,
  organizationId: ObjectId('5e624f42f326373)
}
```

## Unit Testing

Using Chai to test the API

```bash
npm test
```

## Unit Testing Flow

Ideal successfull flow:
- Create an organization named: randomorg
- Create a member for randomorg
- Create a comment attached to randomorg
- Get all members from randomorg, returning an array with length of 1
- Get all comments from randomorg, returning an array with length of 1
- Delete all comments related to randomorg organization
- Get 0 comments from randomorg, returning an empty array

Error code flow:
- Create an organization with existing name (randomorg)
- Create a comment on non-existing organization
- Create a member on non-existing organization
- Get member list on non-existing organization
- Get comment list on non-existing organization

## Author

[Riansyah Rais](https://www.linkedin.com/in/riansyah-rais-66a78098)
