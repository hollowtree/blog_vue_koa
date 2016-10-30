(function () {
    var chatRoom = new Vue({
        el: '#chatRoomPanel',
        data: {
            users: '',
            megs: []
        }
    });
    // var hostname = location.hostname;
    // var ws = new WebSocket('ws://' + hostname + ':4000');
    var HOST = location.origin.replace(/^http/, 'ws')
    var ws = new WebSocket(HOST);
    document.getElementById("chatSend").addEventListener('click', function () {
        var meg = document.getElementById("chatMeg").value;
        ws.send(meg);
        document.getElementById("chatMeg").value = '';
    });
    ws.onmessage = function (event) {
        var data = event.data;
        var temp = JSON.parse(data);
        temp.date = new Date().toLocaleString();
        chatRoom.megs.push(temp);
        console.log(data);
    };
    ws.onclose = function (event) {

    };
    ws.onerror = function (code, msg) {
        console.log('[ERROR] ' + code + ': ' + msg);
    };
})();