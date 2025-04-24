module.exports = async function(io) {
    io.on('connection', socket => {
        socket.on('messageFromUser', message => {
            socket.join(message['orderId'])
            socket.to('AdminRoom').emit('update', 'update')
        })

        socket.on('messageFromUserCancel', message => {
            socket.to('AdminRoom').emit('cancel', message['orderId'])
        })

        socket.on('newAdmin', message => {
            socket.join('AdminRoom')
            console.log("Присоединился новый админ")
        })

        socket.on('messageFromAdminUpdate', message => {
            socket.to(message['orderId']).emit('update', 'update')
        })

        socket.on('messageFromAdminDelete', message => {
            socket.to(message['orderId']).emit('delete', 'delete')
        })
    })
}