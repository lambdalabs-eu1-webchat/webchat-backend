
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
 *  @apiSuccess {String} user token
 *
 *  @apiSuccessExample Success-Response: login
 *    HTTP/1.1 200 OK
 *    {
 *    "token": "NewToken(id, name, hotel_d)"
 *    }
 *
 *  @apiErrorExample Error-Response: minimum login requirements
 *    HTTP/1.1 401 BAD REQUEST
 *    {
 *      "message": "invalidCredentials"
 *    }

 */