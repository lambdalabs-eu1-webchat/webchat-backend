/**
 *  @api {post} api/:_id/rooms Add a room
 *  @apiVersion 0.1.0
 *  @apiName postRooms
 *  @apiGroup Rooms
 *
 *  @apiParam {String} hotel _id
 *  @apiParam {json} array of rooms to add
 *  @apiParamExample {json} Request-Example:
 *  [
 *    {
 *      "name": "Main Suite A"
 *    },
 *    {
 *      "name": "Main Suite B"
 *    }
 *  ]
 *
 *  @apiSuccess {Array} rooms An array of all associated rooms
 *
 *  @apiSuccessExample Success-Response: updadated rooms list
 *    HTTP/1.1 200 OK
 * [
 *  {
 *   "_id": "5cc95fa83de71d13395320fa",
 *   "name": "1"
 *    },
 *   {
 *   "_id": "5cc95fa83de71d13395320fb",
 *   "name": "2",
 *    },
 *   {
 *   "_id": "5cc95fa83de71d13395320fc",
 *   "name": "Main Suite A",
 *    },
 *   {
 *   "_id": "5cc95fa83de71d13395320fd",
 *   "name": "Main Suite B",
 *    },
 *  ]
 *
 *  @apiErrorExample Error-Response: invalid ObjectId is passed
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *       "message": "An invalid ObjectId was passed."
 *    }
 *    HTTP/1.1 400 BAD REQUEST: data no passed as an array
 *    {
 *       "message": "An array was expected but not found."
 *    }
 *    @apiErrorExample Error-Response: hotel does not exist
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *       "message": "No hotel exists with this id."
 *    }
 */

/**
 *  @api {get} api/:_id/rooms Get a room list
 *  @apiVersion 0.1.0
 *  @apiName getRooms
 *  @apiGroup Rooms
 *
 *  @apiParam {String} hotel _id
 *
 *  @apiSuccess {Array}  rooms An array of all associated rooms
 *
 *  @apiSuccessExample Success-Response: room Array
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
 * ]
 *
 *  @apiErrorExample Error-Response: invalid ObjectId is passed
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *       "message": "An invalid ObjectId was passed."
 *    }
 *    @apiErrorExample Error-Response: hotel does not exist
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *       "message": "No hotel exists with this id."
 *    }
 */

/**
 *  @api {put} api/:_id/rooms/:_roomId Update a room name
 *  @apiVersion 0.1.0
 *  @apiName putRooms
 *  @apiGroup Rooms
 *
 *  @apiParam {String} hotel _id
 *  @apiParam {String} room _id
 *  @apiParam {json} new room name
 *  @apiParamExample {json} Request-Example:
 *  [
 *    {
 *      "name": "Main Suite C"
 *    },
 *  ]
 *
 *  @apiSuccess {Object} rooms The updated room
 *
 *  @apiSuccessExample Success-Response: room Array
 *    HTTP/1.1 200 OK
 * [
 *  {
 *   "_id": "5cc95fa83de71d13395320fa",
 *   "name": "Main Suite C"
 *    }
 * ]
 *
 *  @apiErrorExample Error-Response: invalid ObjectId is passed
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *       "message": "An invalid ObjectId was passed."
 *    }
 *    @apiErrorExample Error-Response: hotel does not exist
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *       "message": "No hotel exists with this id."
 *    }
 *    @apiErrorExample Error-Response: room does not exist
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *       "message": "No room exists with this id."
 *    }
 *    @apiErrorExample Error-Response: no updated name was passed
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *       "message": "A room must be updated with a new name."
 *    }
 */

/**
 *  @api {delete} api/:_id/rooms/:_roomId Update a room name
 *  @apiVersion 0.1.0
 *  @apiName deleteRooms
 *  @apiGroup Rooms
 *
 *  @apiParam {String} hotel _id
 *  @apiParam {String} room _id
 *
 *  @apiSuccess {Object} rooms The deleted room
 *
 *  @apiSuccessExample Success-Response: room Array
 *    HTTP/1.1 200 OK
 * [
 *  {
 *   "_id": "5cc95fa83de71d13395320fa",
 *   "name": "Main Suite C"
 *    }
 * ]
 *
 *  @apiErrorExample Error-Response: invalid ObjectId is passed
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *       "message": "An invalid ObjectId was passed."
 *    }
 *    @apiErrorExample Error-Response: hotel does not exist
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *       "message": "No hotel exists with this id."
 *    }
 *    @apiErrorExample Error-Response: room does not exist
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *       "message": "No room exists with this id."
 *    }
 */
