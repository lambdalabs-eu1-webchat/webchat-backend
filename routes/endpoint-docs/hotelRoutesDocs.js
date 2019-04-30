/**
 *  @api {get} api/hotel Add new hotel
 *  @apiVersion 0.1.0
 *  @apiName postHotel
 *  @apiGroup Hotels
 *
 *  @apiParam {json} hotel hotel information
 *  @apiParamExample {json} Request-Example:
 *    {
 *      "name": "nicolas group",
 *      "motto": "Function-based contextually-based collaboration",
 *    }
 *
 *  @apiSuccess {String} _id The id of the hotel
 *  @apiSuccess {String} name The hotel name
 *  @apiSuccess {String} motto The hotel motto
 *  @apiSuccess {Array}  rooms An array of the rooms
 *
 *  @apiSuccessExample Success-Response: add hotel
 *    HTTP/1.1 200 OK
 *    {
 *   "_id": "5cc7448e8372e2234f04325f",
 *   "name": "Nicholas Group",
 *   "motto": "Function-based contextually-based collaboration",
 *   "rooms": [],
 *   "__v": 0
 *    }
 *
 *  @apiErrorExample Error-Response: minimum hotel requirements not met
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "message": "a hotel must be added with at least a name and motto"
 *    }
 *  @apiErrorExample Error-Response: duplicate hotel name
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "message": "a hotel with this name already exists"
 *    }
 */

/**
 *  @api {get} api/hotel/:_id Get hotel information
 *  @apiVersion 0.1.0
 *  @apiName getHotel/:_id
 *  @apiGroup Hotels
 *
 *  @apiParam {String} _id hotel id
 *
 *  @apiSuccess {String} _id The id of the hotel
 *  @apiSuccess {Array}  rooms An array of the rooms
 *  @apiSuccess {String} name The hotel name
 *  @apiSuccess {String} motto The hotel motto
 *
 *  @apiSuccessExample Success-Response: get hotel information
 *    HTTP/1.1 200 OK
 *    {
 *   "_id": "5cc72a4afde4851e5c3c25ef",
 *   "rooms": [
 *     {
 *         "_id": "5cc72a4afde4851e5c3c25f1",
 *         "name": "room 0"
 *     },
 *     {
 *         "_id": "5cc72a4afde4851e5c3c25f2",
 *         "name": "room 1"
 *     },
 *     {
 *         "_id": "5cc72a4afde4851e5c3c25f3",
 *         "name": "room 2"
 *     },
 *     {
 *         "_id": "5cc72a4afde4851e5c3c25f4",
 *         "name": "room 3"
 *     },
 *     {
 *         "_id": "5cc72a4afde4851e5c3c25f5",
 *         "name": "room 4"
 *     }
 *     ],
 *   "name": "Nicolas Group",
 *   "motto": "Function-based contextually-based collaboration",
 *   "__v": 0
 *    }
 *  @apiErrorExample Error-Response: invalid object id
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "message": "an invalid ObjectId was passed"
 *    }
 *  @apiErrorExample Error-Response: hotel id does not exist
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "message": "an invalid ObjectId was passed"
 *    }
 */

/**
 *  @api {put} api/hotel/:_id Put hotel information
 *  @apiVersion 0.1.0
 *  @apiName putHotel/:_id
 *  @apiGroup Hotels
 *
 *  @apiParam {String} _id hotel id
 *  @apiParam {json} hotel hotel information updates
 *  @apiParamExample {json} Request-Example:
 *    {
 *      "name": "nicolas group ltd",
 *    }
 *
 *  @apiSuccess {String} _id The id of the hotel
 *  @apiSuccess {Array}  rooms An array of the rooms
 *  @apiSuccess {String} name The hotel name
 *  @apiSuccess {String} motto The hotel motto
 *
 *  @apiSuccessExample Success-Response: changed hotel information
 *    HTTP/1.1 200 OK
 * {
 *   "_id": "5cc72a4afde4851e5c3c25ef",
 *   "rooms": [
 *       {
 *           "_id": "5cc72a4afde4851e5c3c25f1",
 *           "name": "room 0"
 *       },
 *       {
 *           "_id": "5cc72a4afde4851e5c3c25f2",
 *           "name": "room 1"
 *       },
 *       {
 *           "_id": "5cc72a4afde4851e5c3c25f3",
 *           "name": "room 2"
 *       },
 *       {
 *           "_id": "5cc72a4afde4851e5c3c25f4",
 *           "name": "room 3"
 *       },
 *       {
 *           "_id": "5cc72a4afde4851e5c3c25f5",
 *           "name": "room 4"
 *       }
 *   ],
 *   "name": "Nicolas Group Ltd",
 *   "motto": "Function-based contextually-based collaboration",
 *   "__v": 0
 *    }
 *   @apiErrorExample Error-Response: the hotel id does not exist
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      message: 'no hotel exists with this id'
 *    }
 *  @apiErrorExample Error-Response: no valid changes requested
 *    HTTP/1.1 400 BAD REQUEST: message: 'no hotel exists with this id'
 *    {
 *      "message": "a hotel must be added with at least a name and motto"
 *    }
 *  @apiErrorExample Error-Response: changes requested that are the same as  existing hotel information
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "message": "the hotel could not be updated or you did not provide any new information"
 *    }
 */
