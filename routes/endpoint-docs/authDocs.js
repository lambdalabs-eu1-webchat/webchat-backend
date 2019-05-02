/**
 *  @api {post} api/register
 *  @apiVersion 0.1.0
 *  @apiName postAuth
 *  @apiGroup Auth
 *
 *  @apiParam {json} user information
 *  @apiParamExample {json} Request-Example:
 *    {
 *        "name": "nicolas group",
 *        " password": "1234",
 *        "email": "nicolasgroup@gmail.com"
 *        "hotel_id": "5cc74ab1f16ec37bc8cc4cdb",
 *        "motto": "Cross-platform executive application",
 *        "user_type": "receptionist"
 *    }
 *  @apiSuccess {String} name
 * @apiSuccess {String} _id  Unique id of the user.
 *  @apiSuccess {String} email  Email of the user.
 *@apiSuccess {String} token - unique user token
 *
 *  @apiSuccessExample Success-Response: registered
 *    HTTP/1.1 200 OK
 *    {
 *      "user": {
 *      "_id": "5cc9b28740daa6367c5d0283",
 *      "hotel_id": "5cc74ab1f16ec37bc8cc4cdb",
 *      "name": "blabla",
 *      "email": "aazzaa@hotmail.com",
 *      "motto": "Cross-platform executive application",
 *      "user_type": "receptionist",
 *       "__v": 0
 *  },
 *     "token":     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmxhYmxhIiwiaG90ZWxfaWQiOiI1Y2M3NGFiMWYxNmVjMzdiYzhjYzRjZGIiLCJpYXQiOjE1NTY3MjIzMTF9.zI9RKAe7Gr8kfctrMH_51ixu2P0v6yNQXhPZfwo6m8I"
 * }
 *
  @apiErrorExample Error-Response: minimum register requirements
 *    HTTP/1.1 401 BAD REQUEST
 *    {
 *      "message": "Invalid Credentials"
 *    }
 */


 /**
 *  @api {post} api/login
 *  @apiVersion 0.1.0
 *  @apiName postAuth
 *  @apiGroup Auth
 *
 *  @apiParam {json} login information
 *  @apiParamExample {json} Request-Example:
 *    {
 *      "name": "nicolas group",
 *      "password": "1234",
 *    }
 *
 *  @apiSuccess {String} user and  token
 *
 *  @apiSuccessExample Success-Response: login
 *    HTTP/1.1 200 OK
 *    {
    "user": {
        "is_left": false,
        "_id": "5cc9839d0b92251d9ab4a1f4",
        "name": "nicolas group",
        "email": "nicolasgroup@gmail.com",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmljb2xhcyBncm91cCIsImlhdCI6MTU1NjcxMjM1MX0.qZZdI05J4W4gPdpHvNjxHrJorONfXTImbuWo1h_B2XU"
 *    }
 *
 *  *  @apiErrorExample Error-Response: token missmatch/ missing token
 *    HTTP/1.1 401Unauthorized:
 *    {
 *     "message": "Token Not Valid"
 *    }
 */
