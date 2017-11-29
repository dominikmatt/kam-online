# API
#### Create project
curl -d '{"project":{"title":"test1"}}' -H "Content-Type: application/json" -X POST http://localhost:8080/_api/projects

#### Get Projects
`/_api/projects`

#### Get Items from project
`/_api/projects/:projectId/items`

#### Create Item
curl -d '{"item":{"url":"http://www.test.at", "schema":"{}", "checkType": "status"}}' -H "Content-Type: application/json" -X POST http://localhost:8080/_api/projects/5a05a8a3688588b541530962/items

#### Run checks
curl -X POST localhost:8080/_api/items/5a05aa5b688588b541530965/check
 
 