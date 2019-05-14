/**
 *  @api {get} api/chats/queued
 *  @apiVersion 0.1.0
 *  @apiName getClosedChats
 *  @apiGroup Chats
 *
 *  @apiParam {string} hotel_id
 *  @apiParamExample {string} Request-Example:
 *   'api/chats/closed?hotel_id=5cd2ef88956ac30bde62f084'
 *
 *  @apiSuccess {array} closed chat history
 *
 *  @apiSuccessExample Success-Response: closed chat history
 *   [
 *    {
 *      guest: {
 *      name: 'Durward',
 *      id: '5cd2ef89956ac30bde62f130',
 *      },
 *      staff_member: {
 *      name: 'Braden',
 *      id: '5cd2ef88956ac30bde62f11a',
 *      },
 *      room: {
 *      name: '6',
 *      id: '5cd2ef88956ac30bde62f08a',
 *      },
 *      _id: '5cd2ef8b956ac30bde62f629',
 *      tickets: [
 *      {
 *        messages: [
 *          {
 *           sender: {
 *           name: 'Durward',
 *           id: '5cd2ef89956ac30bde62f130',
 *           },
 *           _id: '5cd2ef8b956ac30bde62f67b',
 *           text:
 *           'Id aut perferendis aut tenetur expedita.',
 *           },
 *          ],
 *           _id: '5cd2ef8b956ac30bde62f66c',
 *           status: 'closed',
 *           rating: 5,
 *          },
 *         ],
 *     },
 *    ];
 *
 *  @apiErrorExample Error-Response: query string not provided
 *    HTTP/1.1 404 BAD REQUEST
 *    {
 *       "message": "Missing query string with hotel_id."
 *    }
 */

/**
 *  @api {get} api/chats/queued
 *  @apiVersion 0.1.0
 *  @apiName getQueuedChats
 *  @apiGroup Chats
 *
 *  @apiParam {string} hotel_id
 *  @apiParamExample {string} Request-Example:
 *   'api/chats/queued?hotel_id=5cd2ef88956ac30bde62f084'
 *
 *  @apiSuccess {array} queued chat history
 *
 *  @apiSuccessExample Success-Response: queued chat history
 *   [
 *    {
 *      guest: {
 *      name: 'Durward',
 *      id: '5cd2ef89956ac30bde62f130',
 *      },
 *      staff_member: {
 *      name: 'Braden',
 *      id: '5cd2ef88956ac30bde62f11a',
 *      },
 *      room: {
 *      name: '6',
 *      id: '5cd2ef88956ac30bde62f08a',
 *      },
 *      _id: '5cd2ef8b956ac30bde62f629',
 *      tickets: [
 *      {
 *        messages: [
 *          {
 *           sender: {
 *           name: 'Durward',
 *           id: '5cd2ef89956ac30bde62f130',
 *           },
 *           _id: '5cd2ef8b956ac30bde62f67b',
 *           text:
 *           'Id aut perferendis aut tenetur expedita.',
 *           },
 *          ],
 *           _id: '5cd2ef8b956ac30bde62f66c',
 *           status: 'queued',
 *           rating: null,
 *          },
 *         ],
 *     },
 *    ];
 *
 *  @apiErrorExample Error-Response: query string not provided
 *    HTTP/1.1 404 BAD REQUEST
 *    {
 *       "message": "Missing query string with hotel_id."
 *    }
 */

/**
 *  @api {get} api/chats/active
 *  @apiVersion 0.1.0
 *  @apiName getActiveChats
 *  @apiGroup Chats
 *
 *  @apiParam {string} hotel_id
 *  @apiParamExample {string} Request-Example:
 *   'api/chats/active?hotel_id=5cd2ef88956ac30bde62f084'
 *
 *  @apiSuccess {array} active chat history
 *
 *  @apiSuccessExample Success-Response: active chat history
 *   [
 *    {
 *      guest: {
 *      name: 'Durward',
 *      id: '5cd2ef89956ac30bde62f130',
 *      },
 *      staff_member: {
 *      name: 'Braden',
 *      id: '5cd2ef88956ac30bde62f11a',
 *      },
 *      room: {
 *      name: '6',
 *      id: '5cd2ef88956ac30bde62f08a',
 *      },
 *      _id: '5cd2ef8b956ac30bde62f629',
 *      tickets: [
 *      {
 *        messages: [
 *          {
 *           sender: {
 *           name: 'Durward',
 *           id: '5cd2ef89956ac30bde62f130',
 *           },
 *           _id: '5cd2ef8b956ac30bde62f67b',
 *           text:
 *           'Id aut perferendis aut tenetur expedita.',
 *           },
 *          ],
 *           _id: '5cd2ef8b956ac30bde62f66c',
 *           status: 'active',
 *           rating: null,
 *          },
 *         ],
 *     },
 *    ];
 *
 *  @apiErrorExample Error-Response: query string not provided
 *    HTTP/1.1 404 BAD REQUEST
 *    {
 *       "message": "Missing query string with hotel_id."
 *    }
 */

/**
 *  @api {get} api/chats
 *  @apiVersion 0.1.0
 *  @apiName getChats
 *  @apiGroup Chats
 *
 *  @apiParam {string} hotel_id
 *  @apiParamExample {string} Request-Example:
 *   'api/chats?hotel_id=5cd2ef88956ac30bde62f084'
 *
 *  @apiSuccess {array} chat history
 * 
 *  @apiSuccessExample Success-Response: chat history
 *   [
 *    {
 *      guest: {
 *      name: 'Durward',
 *      id: '5cd2ef89956ac30bde62f130',
 *      },
 *      staff_member: {
 *      name: 'Braden',
 *      id: '5cd2ef88956ac30bde62f11a',
 *      },
 *      room: {
 *      name: '6',
 *      id: '5cd2ef88956ac30bde62f08a',
 *      },
 *      _id: '5cd2ef8b956ac30bde62f629',
 *      tickets: [
 *      {
 *        messages: [
 *          {
 *           sender: {
 *           name: 'Durward',
 *           id: '5cd2ef89956ac30bde62f130',
 *           },
 *           _id: '5cd2ef8b956ac30bde62f67b',
 *           text:
 *           'Id aut perferendis aut tenetur expedita.',
 *           },
 *          ],
 *           _id: '5cd2ef8b956ac30bde62f66c',
 *           status: 'closed',
 *           rating: 4,
 *          },
 *         ],
 *     },
 *    ];
 *
 *  @apiErrorExample Error-Response: query string not provided
 *    HTTP/1.1 404 BAD REQUEST
 *    {
 *       "message": "Missing query string with hotel_id."
 *    }
 */

 /**
 *  @api {get} api/chats/checkout
 *  @apiVersion 0.1.0
 *  @apiName getChats
 *  @apiGroup Chats
 *
 *  @apiParam {string} user_id
 *  @apiParamExample {string} Request-Example:
 *   'api/chats/checkout/5cd2ef8b956ac30bde62f66c'
 *
 *  @apiSuccess {array} guest chat history
 * 
 *  @apiSuccessExample Success-Response: guest chat history
 *   [
 *    {
 *      guest: {
 *      name: 'Durward',
 *      id: '5cd2ef89956ac30bde62f130',
 *      },
 *      staff_member: {
 *      name: 'Braden',
 *      id: '5cd2ef88956ac30bde62f11a',
 *      },
 *      room: {
 *      name: '6',
 *      id: '5cd2ef88956ac30bde62f08a',
 *      },
 *      _id: '5cd2ef8b956ac30bde62f629',
 *      tickets: [
 *      {
 *        messages: [
 *          {
 *           sender: {
 *           name: 'Durward',
 *           id: '5cd2ef89956ac30bde62f130',
 *           },
 *           _id: '5cd2ef8b956ac30bde62f67b',
 *           text:
 *           'Id aut perferendis aut tenetur expedita.',
 *           },
 *          ],
 *           _id: '5cd2ef8b956ac30bde62f66c',
 *           status: 'closed',
 *           rating: 4,
 *          },
 *         ],
 *     },
 *    ];
 *
 *  @apiErrorExample Error-Response: user_id not provided
 *    HTTP/1.1 404 BAD REQUEST
 *    {
 *       "message": "Missing params with user_id."
 *    }
 */
