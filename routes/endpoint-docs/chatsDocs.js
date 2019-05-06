/**
 *  @api {emit} emit('login',token) Start Socket
 *  @apiVersion 0.1.0
 *  @apiName emitLogin
 *  @apiGroup Chats
 *
 *  @apiParam {String} token the users auth token
 *
 *  @apiSuccess (200) {Expect}  Guest server to emit('chat_log', chat)
 *  @apiSuccess (200) {Expect}  Staff_member server to emit('chat_logs', chats)
 *
 */

/**
 *  @api {emit} emit('message',text) Send Message
 *  @apiVersion 0.1.0
 *  @apiName emitMessage
 *  @apiGroup Chats
 *
 *  @apiParam {String} text The message to send
 *  @apiParam {String} chat_id The message to send
 *  @apiParamExample {js} Emit-Example: Guest
 *  socket.emit('message',text)
 *  @apiParamExample {js} Emit-Example: Staff
 *  socket.emit('message',{text, chat_id})
 *
 *  @apiSuccess (200) {Expect} Guest server to emit('chat_log', chat) or emit('message', message) to room
 *  @apiSuccess (200) {Expect} Staff_member  server to emit('message', message) to room
 */

/**
 *  @api {on} on('message',messageRes) Recieve Message
 *  @apiVersion 0.1.0
 *  @apiName onMessage
 *  @apiGroup Chats
 *
 *  @apiParamExample {js} on-Example:
 *  socket.on('message',{
 *    message:{
 *      text: 'this is a message',
 *      sender:{
 *        name: 'connor',
 *        id: object_id
 *      }
 *    },
 *    chat_id: ObjectId()
 *  })
 */

/**
 *  @api {on} on('chat_log',chat) Recieve Chat
 *  @apiVersion 0.1.0
 *  @apiName onChatLog
 *  @apiGroup Chats
 *
 *  @apiParamExample {js} on-Example:
 *  socket.on('chat_log',{
 *    _id: ObjectId(),
 *    hotel_id: ObjectId(),
 *    guest: {
 *      name:'connor',
 *      id: ObjectId()
 *    }
 *    staff_member:{
 *      name:'tim',
 *      id: ObjectId()
 *    }
 *    room:{
 *      name:'2',
 *      id: ObjectId()
 *    },
 *    rating: 3,
 *    tickets: [
 *      {
 *        messages: [
 *          {
 *            _id:ObjectId(),
 *            sender:{
 *              name:'connor'
 *              id:ObjectId()
 *            },
 *            text: 'this is a message'
 *          },
 *        ]
 *      },
 *    ]
 *  })
 *
 */

/**
 *  @api {on} on('chat_logs',chats) Recieve Chats
 *  @apiPermission Staff_member
 *  @apiVersion 0.1.0
 *  @apiName onChatLogs
 *  @apiGroup Chats
 *
 *  @apiParamExample {js} on-Example:
 *  socket.on('chat_logs',
 *  [
 *    {
 *      _id: ObjectId(),
 *      hotel_id: ObjectId(),
 *      guest: {
 *        name:'connor',
 *        id: ObjectId()
 *      }
 *      staff_member:{
 *        name:'tim',
 *        id: ObjectId()
 *      }
 *      room:{
 *        name:'2',
 *        id: ObjectId()
 *      },
 *      rating: 3,
 *      tickets: [
 *        {
 *          messages: [
 *            {
 *              _id:ObjectId(),
 *              sender:{
 *                name:'connor'
 *                id:ObjectId()
 *              },
 *              text: 'this is a message'
 *            },
 *          ]
 *        },
 *      ]
 *    }
 *  ])
 *
 *
 */

/**
 *  @api {on} on('rating') Requested to Send Rating
 *  @apiPermission Guest
 *  @apiVersion 0.1.0
 *  @apiName onRating
 *  @apiGroup Chats
 */

/**
 *  @api {emit} emit('rating',rating) Send Rating
 *  @apiPermission Guest
 *  @apiVersion 0.1.0
 *  @apiName emitRating
 *  @apiGroup Chats
 *
 *  @apiparam {Int} rating An int between 0 and 5
 *  @apiParamExample {js} emit-example:
 *  emit('rating,3)
 */
