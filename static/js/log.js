(function () {
    document.getElementById('logBox').style.height = window.innerHeight - 50 + 'px';
    document.getElementById('logText').style.height = window.innerHeight - 70 + 'px';
    document.getElementById('logShow').style.height = window.innerHeight - 70 + 'px';

    // --- markdown 编辑器
    document.getElementById('newLog').addEventListener('click', function () {
        if (document.getElementById('logForm').style.display == 'block') {
            document.getElementById('logForm').style.display = 'none';
        } else {
            document.getElementById('logForm').style.display = 'block';
        }
    });
    var timer = null;
    document.getElementById('logText').addEventListener('input', function (e) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            console.log(e.target.value);
            document.getElementById('logShowS').innerHTML = marked(e.target.value, {
                sanitize: true
            });
            timer = null;
        }, 300);
    });

    // --- 编辑
    var editBtns = document.getElementsByClassName('edit');
    for (let i = 0; i < editBtns.length; i++) {
        editBtns[i].addEventListener('click', function (e) {
            console.log(e.target.dataset.id);

            fetch('/edit/log?id=' + e.target.dataset.id, {
                method: "post",
                headers: {
                    "Content-type": "application:/x-www-form-urlencoded:charset=UTF-8"
                },
                // body: "name",
                credentials: "include" //cookies
            }).then(function (response) {
                console.log("response: ", response);
                // if (response.status == 200) {
                // }
                return response.json();
            }).then(function (data) {
                document.getElementById('logTitle').value = data.info.title;
                document.getElementById('logText').value = data.info.log;
                document.getElementById('logShowS').innerHTML = data.info.logHtml;
                document.getElementById('logForm').style.display = 'block';
                console.log(data);
            }).catch(function (err) {
                console.log("Error: " + err);
            });
        })
    }
    // --- 取消编辑
    document.getElementById('cancelEdit').addEventListener('click', function () {
        document.getElementById('logTitle').value = '';
        document.getElementById('logText').value = '';
        document.getElementById('logShowS').innerHTML = '';
    });
    // --- 删除
    var delBtns = document.getElementsByClassName('del');
    for (let i = 0; i < delBtns.length; i++) {
        delBtns[i].addEventListener('click', function (e) {
            console.log(e.target.dataset.id);

            fetch('/del/log?id=' + e.target.dataset.id, {
                method: "post",
                headers: {
                    "Content-type": "application:/x-www-form-urlencoded:charset=UTF-8"
                },
                // body: "name",
                credentials: "include" //cookies
            }).then(function (response) {
                console.log("response: ", response);
                if (response.status == 200) {
                    console.log(90);
                    console.log(e.target.className);
                    e.target.className += ' disabled';
                    e.target.value = '已删除'
                }
                // return response.json();
            }).catch(function (err) {
                console.log("Error: " + err);
            });
        })
    }
})();