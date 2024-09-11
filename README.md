# Block-32-Workshop-The-Acme-Ice-Cream-Shop
GET all flavors:
curl http://localhost:3000/api/flavors

GET a single flavor by ID
curl http://localhost:3000/api/flavors/1

POST a new flavor:
curl -X POST -H "Content-Type: application/json" -d '{"name": "Mint", "is_favorite": false}' http://localhost:3000/api/flavors

PUT (update) a flavor:
curl -X PUT -H "Content-Type: application/json" -d '{"name": "Mint Chocolate", "is_favorite": true}' http://localhost:3000/api/flavors/1

DELETE a flavor:
curl -X DELETE http://localhost:3000/api/flavors/1


