# Start json-server

npx json-server --watch --port 3001 db.json

# Routes

1. '/' - Main Page
2. '/edit/:id' - Update Page
3. '/create - Create Page

TABLE -> USER 1 - On Click -> Get user id -> Redirect to "/edit/${user.id}"
U are being redirected to '/edit/:id'
Get id from URL
Get user
Display user information in form
Edit form
On button press -> Update user (PUT)
Redirect back to Main Page
