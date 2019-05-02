/**
 *  @api {get} api/:_id room get all the rooms
 *  @apiVersion 0.1.0
 *  @apiName getRooms
 *  @apiGroup Rooms
 *
 *  @apiParam {String}  Unique Room Id  
 *  @apiParamExample {json} Request-Example:
 *    {
 *      "name": "1",
 *      "id": "5cc95fa83de71d13395320fa",
 *    }
 *
 *  @apiSuccess {String} _id of all rooms
 *  @apiSuccess {String} name of all rooms
 *  @apiSuccess {Array}  rooms An array of the rooms
 *
 *  @apiSuccessExample Success-Response: Room Array
 *    HTTP/1.1 200 OK
 * [  
 *  {
 *   "_id": "5cc95fa83de71d13395320fa",
 *   "name": "1"
 *    },
 *   {
 *   "_id": "5cc95fa83de71d13395320fb",
 *   "name": "2",
 *    }
 *   {
 *   "_id": "5cc95fa83de71d13395320fc",
 *   "name": "3",
 *    }
 *   {
 *   "_id": "5cc95fa83de71d13395320fd",
 *   "name": "4",
 *    }
 * ]  ..............till the last room
 * 
 *  @apiErrorExample Error-Response: Wrong Unique Id
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *       "message": "An invalid ObjectId was passed."
 *    }
 */

 /**
 *  @api {put} api/:_id room / id  update room Id 
 *  @apiVersion 0.1.0
 *  @apiName putRooms / updateRooms
 *  @apiGroup Rooms
 *
 *  @apiParam {String}  room Id 
 * @apiParam {String}  new room id
 *  @apiParamExample {json} Request-Example:
 *    {
 *      "id": "5cc95fa83de71d13395320fa",
 *       "name": "1"
 *    }
 *
 *  @apiSuccess {String} _id of the updated room
 *  @apiSuccess {String} name of the updated room
 *
 *  @apiSuccessExample Success-Response: Room Array
 *    HTTP/1.1 200 OK
 * [  
 *  {
 * "_id": "5cc95fa83de71d13395320fc",
 * "name": "1"
 * }
 * 
 *  @apiErrorExample Error-Response: Wrong Room id or non existing room id
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *        "message": "No hotel exists with this id."
 *    }
 */

 /**
 *  @api {delete} api/:_id room / id  update room Id 
 *  @apiVersion 0.1.0
 *  @apiName delete rooms
 *  @apiGroup Rooms
 *
 *  @apiParam {String}  room Id 
 * @apiParam {String}  room name
 *  @apiParamExample {json} Request-Example:
 *    {
 *      "id": "5cc95fa83de71d13395320fa",
 *       "name": "1"
 *    }
 * 
 *  @apiSuccess {String} _id of the updated room
 *  @apiSuccess {String} name of the updated room
 *
 *  @apiSuccessExample Success-Response: Room Array
 *    HTTP/1.1 200 OK
  * [  
 *   The deleted room will be missing which has name if "1"
 *   {
 *   "_id": "5cc95fa83de71d13395320fb",
 *   "name": "2",
 *    }
 *   {
 *   "_id": "5cc95fa83de71d13395320fc",
 *   "name": "3",
 *    }
 *   {
 *   "_id": "5cc95fa83de71d13395320fd",
 *   "name": "4",
 *    }
 * ]  ..............till the last room
 * 
 *  @apiErrorExample Error-Response: Wrong Room id or non existing room id
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *        "message": "No hotel exists with this id."
 *    }
 */

