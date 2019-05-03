/**
 *  @api {emit} emit('login',token) Start Socket
 *  @apiVersion 0.1.0
 *  @apiName emitLogin
 *  @apiGroup Chats
 *
 *  @apiParam {String} token the users auth token
 *
 *  @apiSuccess {guest}  Expect server to emit('chat_log', chat)
 *  @apiSuccess {staff_member}  Expext server to emit('chat_logs', chats)
 *
 */

/**
 *  @api {emit} emit('message',text) Send Message Guest
 *  @apiVersion 0.1.0
 *  @apiName emitMessageGuest
 *  @apiGroup Chats
 *
 *  @apiParam {String} text The message to send
 *
 *  @apiSuccess {guest} Expect server to emit('chat_log', chat) or emit('message', message) to room
 */

/**
 *  @api {emit} emit('message',text) Send Message Staff Member
 *  @apiVersion 0.1.0
 *  @apiName emitMessageStaffMember
 *  @apiGroup Chats
 *
 *  @apiParam {String} text The message to send
 *  @apiParam {String} chat_id The chat_id of the chat to send the message to
 *
 *  @apiSuccess {staff_member} Expect server to emit('message', message) to room
 */
