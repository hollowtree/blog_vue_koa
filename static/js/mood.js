(function () {
    var delBtns = document.getElementsByClassName('del');
    for (let i = 0; i < delBtns.length; i++) {
        delBtns[i].addEventListener('click', function (e) {
            console.log(e.target.dataset.id);

            fetch('/del/mood?id='+e.target.dataset.id, {
                method: "post",
                headers: {
                    "Content-type": "application:/x-www-form-urlencoded:charset=UTF-8"
                },
                // body: "name",
                credentials: "include" //cookies
            }).then(function (response) {
                console.log("response: ",response);
                if (response.status == 200) {
                    console.log(90);
                    console.log(e.target.className);
                    e.target.className += ' disabled';
                    e.target.value='已删除'
                }
                
                // return response.json();
            }).catch(function (err) {
                console.log("Error: " + err);
            });
        })
    }
})();