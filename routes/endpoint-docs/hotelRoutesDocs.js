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
 *      {
 *         "_id": "5cc72a4afde4851e5c3c25f1",
 *         "name": "room 0"
 *      },
 *     ]
 *   "name": "Nicolas Group",
 *   "motto": "Function-based contextually-based collaboration",
 *   "__v": 0
 *    }
 *  @apiErrorExample Error-Response: invalid ObjectId is passed
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *       "message": "An invalid ObjectId was passed."
 *    }
 *  @apiErrorExample Error-Response: hotel id does not exist
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "message": "No hotel exists with this id."
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
 *        {
 *           "_id": "5cc72a4afde4851e5c3c25f1",
 *           "name": "room 0"
 *        },
 *       ]
 *   "name": "Nicolas Group Ltd",
 *   "motto": "Function-based contextually-based collaboration",
 *   "__v": 0
 *    }
 *  @apiErrorExample Error-Response: invalid ObjectId is passed
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *       "message": "An invalid ObjectId was passed."
 *    }
 *  @apiErrorExample Error-Response: no valid change requested
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "message": "A hotel must be changed with at least an updated name or motto."
 *    }
 *  @apiErrorExample Error-Response: restricted room change
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "message": "Hotel rooms cannot be ammended via this endpoint."
 *    }
 *  @apiErrorExample Error-Response: hotel id does not exist
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "message": "No hotel exists with this id."
 *    }
 */
