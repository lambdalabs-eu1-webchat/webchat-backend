/**
 *  @api {post} api/asubscription/:_id Add new customer, payment source, and subscription
 *  @apiVersion 0.1.0
 *  @apiName postSubscription
 *  @apiGroup Payment
 *
 *  @apiParam {string} hotel hotel _id
 *  @apiParam {json} customer billing information
 *  @apiParamExample {json} Request-Example:
 *    {
 *      "id": "stripe token id" (generated by Stripe req on front-end),
 *      "card": "stripe card object" (generated by Stripe req on front-end),
 *      "email": "victoriafalls@gmail.com",
 *      "plan": "plan_F16WlQMwT3HKCi",
 *    }
 *
 *  @apiSuccess {String} _id The id of the hotel
 *  @apiSuccess {String} name The hotel name
 *  @apiSuccess {String} motto The hotel motto
 *  @apiSuccess {Array} rooms An array of the rooms
 *  @apiSuccess {String} plan The human readable plan name
 *  @apiSuccess {Object} billing The updated billing object
 *
 *  @apiSuccessExample Success-Response: add customer/billing/sub
 *    HTTP/1.1 201 CREATED
 *    {
 *   "_id": "5cc7448e8372e2234f04325f",
 *   "name": "Victoria Falls",
 *   "motto": "Function-based contextually-based collaboration",
 *   "rooms": [],
 *   "plan": "pro",
 *   "billing": {...updatedBillingObject}
 *   "__v": 0
 *    }
 *
 *  @apiErrorExample Error-Response: invalid ObjectId is passed
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "message": "An invalid ObjectId was passed."
 *    }
 *  @apiErrorExample Error-Response: hotel does not exist
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "message": "No hotel exists with this id."
 *    }
 *  @apiErrorExample Error-Response: plan does not exist
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "message": "The plan you requested does not exist."
 *    }
 */

/**
 *  @api {put} api/asubscription:/_id Switch a customer between plans
 *  @apiVersion 0.1.0
 *  @apiName putSubscription
 *  @apiGroup Payment
 *
 *  @apiParam {string} hotel hotel _id
 *  @apiParam {json} plan new plan request
 *  @apiParamExample {json} Request-Example:
 *    {
 *      "plan": "plan_F16WlQMwT3HKCi",
 *    }
 *
 *  @apiSuccess {String} _id The id of the hotel
 *  @apiSuccess {String} name The hotel name
 *  @apiSuccess {String} motto The hotel motto
 *  @apiSuccess {Array} rooms An array of the rooms
 *  @apiSuccess {String} plan The human readable plan name
 *  @apiSuccess {Object} billing The updated billing object
 *
 *  @apiSuccessExample Success-Response: switch payment plan
 *    HTTP/1.1 201 CREATED
 *    {
 *   "_id": "5cc7448e8372e2234f04325f",
 *   "name": "Victoria Falls",
 *   "motto": "Function-based contextually-based collaboration",
 *   "rooms": [],
 *   "plan": "free",
 *   "billing": {...updatedBillingObject}
 *   "__v": 0
 *    }
 *
 *  @apiErrorExample Error-Response: invalid ObjectId is passed
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "message": "An invalid ObjectId was passed."
 *    }
 *  @apiErrorExample Error-Response: too many users to switch plan
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "message": "The number of staff accounts on this hotel is too high for the selected plan."
 *    }
 *  @apiErrorExample Error-Response: hotel does not exist
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "message": "No hotel exists with this id."
 *    }
 *  @apiErrorExample Error-Response: plan does not exist
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "message": "The plan you requested does not exist."
 *    }
 */

/**
 *  @api {put} api/asubscription/method:/_id Change payment method
 *  @apiVersion 0.1.0
 *  @apiName putSubscriptionMethod
 *  @apiGroup Payment
 *
 *  @apiParam {string} hotel hotel _id
 *  @apiParam {json} plan new plan request
 *  @apiParamExample {json} Request-Example:
 *    {
 *      "id": "stripe token id" (generated by Stripe req on front-end),
 *      "card": "stripe card object" (generated by Stripe req on front-end),
 *      "email": "victoriafallsltd@gmail.com",
 *    }
 *
 *  @apiSuccess {String} _id The id of the hotel
 *  @apiSuccess {String} name The hotel name
 *  @apiSuccess {String} motto The hotel motto
 *  @apiSuccess {Array} rooms An array of the rooms
 *  @apiSuccess {String} plan The human readable plan name
 *  @apiSuccess {Object} billing The updated billing object
 *
 *  @apiSuccessExample Success-Response: change payment method
 *    HTTP/1.1 201 CREATED
 *    {
 *   "_id": "5cc7448e8372e2234f04325f",
 *   "name": "Victoria Falls",
 *   "motto": "Function-based contextually-based collaboration",
 *   "rooms": [],
 *   "plan": "free",
 *   "billing": {...updatedBillingObject}
 *   "__v": 0
 *    }
 *
 *  @apiErrorExample Error-Response: invalid ObjectId is passed
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "message": "An invalid ObjectId was passed."
 *    }
 *  @apiErrorExample Error-Response: hotel does not exist
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "message": "No hotel exists with this id."
 *    }
 */