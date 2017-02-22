(function () {
    var getNode = function(s) {
        return document.querySelector(s);
    },
    // get required nodes
    textarea = getNode('.chat textarea'),
    chatName = getNode('.chat-name');

    try {
        var socket = io.connect('http://127.0.0.1:3700');
    } catch (e) {
        //set status to warn user
    }

    if (socket !== undefined) {
        //Listen for keydown
        textarea.addEventListener('keydown', function(event) {
            var self = this,
                name = chatName.value;
            console.log(event);
            if (event.which === 13 && event.shiftKey === false) {
                socket.emit('input', {
                    name: name,
                    message: self.value
                });

                event.preventDefault();
            }
        });
    }
})();