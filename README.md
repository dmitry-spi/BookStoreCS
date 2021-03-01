# Book Store

## About <a name = "about"></a>

The books store with the possibility to comment on books. There will be 2 roles: admin and guest.

### Prerequisites

Admin should be able to:
1. Create books
2. Approve books (once book approved, user who added it should receive an email) 3. View all books with pagination
4. View single book info with all data including creator and comments
5. Add comments

Guest should be able to:
1. Create books (books should not be displayed for guests without admin approval) 2. View all approved books with pagination
3. View single book info with all data including creator and comments
4. Add comments

## Interface

JSON REST API, node.js, express.js, PostgreSQL

### Installing

npm install

## Usage <a name = "usage"></a>

npm run dev
or
npm start

## Test

npm run test
