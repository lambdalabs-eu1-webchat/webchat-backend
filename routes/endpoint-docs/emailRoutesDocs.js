/**
 *  @api {post} api/email
 *  @apiVersion 0.1.0
 *  @apiName postEmail
 *  @apiGroup Email
 *
 *  @apiParam {json} object of email details
 *  @apiParamExample {json} Request-Example:
 *    {
 *      "guestId": "5cd2ef89956ac30bde62f123",
 *      "guestEmail": "guest@gmail.com",
 *      "hotelId": "5cd2ef88956ac30bde62f084"
 *    },
 *
 *  @apiSuccess {Object} success message
 *
 *  @apiSuccessExample Success-Response: if user has a chat history
 *    {
 *    "message": "Email sucessfully sent.",
 *    },
 *
 *  @apiSuccessExample Success-Response: if user has no chat history
 *    [],
 *
 *  @apiErrorExample Error-Response: invalid email is passed
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *       "message": "An invalid email was provided."
 *    }
 */