<script>
    var mv_data = [];

    function fnFileUpload() {
        const input = document.querySelector('input');
        const preview = document.querySelector('.preview');
        const selectedFiles = input.files;
        //const list = document.createElement('ul');
        //preview.appendChild(list);

        //if()
        
        for(const file of selectedFiles) {
            const listItem = document.createElement('p');

            if(validFileType(file)) {
                const textContents = document.createElement('div');
                const txt = "";
                
                let reader = new FileReader();
                reader.onload = function () {
                    fnChgJson(reader.result);
                };
                reader.readAsText(file, "UTF-8");
                
                preview.appendChild(textContents);

            } else {
                const message = document.createElement('div');
                message.textContent = `파일명 ${file.name}: .txt 파일을 선택하세요`;
                listItem.appendChild(message);
            }

        }
    }
    /* 버블 채팅을 json으로 바꾸는 함수 */
    function fnChgJson(data) {
        let txtArray = data.split('\n');
        let view = "";
        var reg = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
        for(var t in txtArray) {
            var row = txtArray[t];
            //console.log(row)
            if(t < 4) continue;
            if(reg.test(row.substr(0, 16))) { // 메시지
                if(t != 0) {
                    view += '</div></div>';
                }
                if("나 : " == row.substr(18, 4)) {
                    //view += '<div class="me">'+ row.substr(22) +'</div>';
                    view += '<div class="chat me"><div class="textbox">'+ row.substr(22);
                    mv_data.push({"flag":true, "user":"me", "date":row.substr(0, 16), "chat":row.substr(22)})

                } else {
                    //view += '<div class="ing">'+ row.substr(24) +'</div>';
                    view += '<div class="chat ing">';
                    view += '<div class="icon">';
                    view += '<img class="profile" src="https://springdrop.github.io/bubble/img/profile.png"/>';
                    //view += '<i class="fa-solid fa-user"></i>';
                    view += '</div>';
                    view += '<div class="title">';
                    view += '<img class="badge" src="https://springdrop.github.io/bubble/img/badge.png"/>';
                    view += '</div>';
                    view += '<div class="textbox">'+ row.substr(24);
                    mv_data.push({"flag":true, "user":"ing", "date":row.substr(0, 17), "chat":row.substr(24)})
                }
            } else {
                mv_data.push({"flag":false, "user":"", "date":"","chat":row});
                //view += '<div class="ing">'+ row +'</div>';
                view += row + "<br/>";
            }

            if((txtArray.length-1) == t) { // 마지막 채팅
                view += '</div>';
                view += '<div class="chat" style="height:70px;"></div>';
            }
        }

        $('.preview').append(view);
        console.log("mvdata =>",mv_data)
    }

    function fnScrollUp() {
        document.body.scrollTop = 0;
    }

    function fnScrollDown() {
        document.body.scrollTop = document.body.scrollHeight;
    }

    const fileTypes = [
        'text/plain',
    ];

    function validFileType(file) {
        return fileTypes.includes(file.type);
    }
</script>
