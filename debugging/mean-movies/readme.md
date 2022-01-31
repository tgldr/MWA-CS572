1. Movies schema not found
   - add `movies-model.js` import to db.js
   - add mongoose connection close on application restart
   - switch import db with import routes line /db must be import first/
2. Add `getOne` function on get one router
3. Angular - `release` property doesn't exist on type Movie. It must be `released`
4. add `next()` on `app.use('/api')` middleware
5. `cont` typo on movies.contollers.getAll. Must be `count`
6. Angular - Movie detail page and delete button calls `/api/movies/:id`. It must be `/api/movie/:id`
7. getOne, deleteOne - first need to check is ID valid.
   - create message to .env
8. Add `DELETE` method to `Access-Control-Allow-Methods`
9. `saerch` typo on search function in `movies-data.service.ts`
10. add global option to movies search query regex
11. missing nodemon config file
12. add 400 to .env file. Other respones are all .env. But 400 is still static.
