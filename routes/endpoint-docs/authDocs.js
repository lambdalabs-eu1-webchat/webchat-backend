/**
 *  @api {post} api/register
 *  @apiVersion 0.1.0
 *  @apiName postAuth
 *  @apiGroup Auth
 *
 *  @apiParam {json} user information
 *  @apiParamExample {json} Request-Example:
 *    {
 *      "name": "nicolas group",
 *      " password": "1234",
 *        "email": "nicolasgroup@gmail.com"
 *    }
 *  @apiSuccess {String} registered
 *
 *  @apiSuccessExample Success-Response: registered
 *    HTTP/1.1 200 OK
 *    {
 *       "_id":userId"5cc9839d0b92251d9ab4a1f4",
 *      "name":"Merle",
 *      "email": "nicolasgroup@gmail.com",
 *     "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmljb2xhcyBncm91cCIsImlhdCI6MTU1NjcxMDMwMX0.RdXMwTg3AMjiquiacVVMWL_kyUTOgdjTZLTdrPxzfoA"
 *    }
 *
 *  @apiErrorExample Error-Response: wrong token
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "message":"invalidCredentials"
 *    }
 *  @apiErrorExample Error-Response: token missmatch/ missing token
 *    HTTP/1.1 401Unauthorized:
 *    {
 *     "message": "No token provided."
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
 *  @apiErrorExample Error-Response: minimum login requirements
 *    HTTP/1.1 401 BAD REQUEST
 *    {
 *      "message": "Invalid Credentials"
 *    }
 */
