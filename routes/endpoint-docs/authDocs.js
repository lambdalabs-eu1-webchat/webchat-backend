/**
 *  @api {post} api/register
 *  @apiVersion 0.1.0
 *  @apiName postAuth
 *  @apiGroup Auth
 *
 *  @apiParam {json} user information
 *  @apiParamExample {json} Request-Example:
 *  {
 *    "name": "Random dude",
 *    "password": "1234",
 *    "email": "onetwo@gmail.com",
 *    "motto": "Yada yada",
 *	  "hotel_name": "Dudes as Resort",
 *	  "hotel_motto": "Dudes Dudes Dudes"
 *  }
 *  @apiSuccess {String} name
 * @apiSuccess {String} _id  Unique id of the user.
 *  @apiSuccess {String} email  Email of the user.
 *@apiSuccess {String} token - unique user token
 *
 *  @apiSuccessExample Success-Response: registered
 *    HTTP/1.1 200 OK
 * {
 *    "user": {
 *        "_id": "5cd005e6ea886424b4d0954e",
 *        "name": "Random dude",
 *        "email": "onetwo@gmail.com",
 *        "motto": "Yada yada",
 *        "user_type": "super admin",
 *        "hotel_id": "5cd005e6ea886424b4d0954d",
 *        "__v": 0
 *    },
 *    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiNWNkMDA1ZTZlYTg4NjQyNGI0ZDA5NTRlIiwibmFtZSI6IlJhbmRvbSBkdWRlIiwiaG90ZWxfaWQiOiI1Y2QwMDVlNmVhODg2NDI0YjRkMDk1NGQiLCJpYXQiOjE1NTcxMzY4NzB9.T__eAZjB5cnBaMYYJfeEKvDAKGlG5PIza20xSHU7wKI",
 *    "hotel": {
 *        "plan": "free",
 *        "_id": "5cd005e6ea886424b4d0954d",
 *        "name": "Dudes as Resort",
 *        "motto": "Dudes Dudes Dudes",
 *        "rooms": [],
 *        "__v": 0
 *   }
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
