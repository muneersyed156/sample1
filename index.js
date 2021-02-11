// console.log("Entered")
var author = document.getElementById("name")
var caption = document.getElementById("caption")
var memeurl = document.getElementById("memeurl")
// var send = document.getElementById("send")
var send = document.getElementById("button-addon2")
var feedsection = document.getElementById("feed")
var nc = document.getElementById("namecheck")
var cc = document.getElementById("captioncheck")
var uc = document.getElementById("urlcheck")

p = fetch('ip.txt')
    .then(response => response.text())
    .then((text) => {
        var ip = text
        console.log(ip)
        function send_data(k, type) {
            console.log(k)
            if (type == "post") {
                console.log("Going to post")
                //$.post("http://"+ip+":8081/memes", k)
                $.post("http://0.0.0.0:8081/memes", k)
            }
            else {
                console.log("PATCH")
                var patch = k
                var ide = window.localStorage.getItem("id")
                window.localStorage.removeItem('id')
                console.log(patch, ide)
                $.ajax({
                    type: 'PATCH',
                    //url:"http://"+ip+":8081/memes"
                    url: 'http://0.0.0.0:8081/memes/' + ide,
                    data: JSON.stringify(patch),
                    processData: false,
                    contentType: 'application/merge-patch+json',
                    /* success and error handling omitted for brevity */
                });
            }
            // location.reload()
            appending_new()
        }

        send.addEventListener("click", function () {
            if (author.value != '') {
                nc.style.display = "none"
                if (caption.value != '') {
                    cc.style.display = "none"
                    if (memeurl.value != '') {
                        uc.style.display = "none"
                        var k = {
                            "name": author.value,
                            "url": memeurl.value,
                            "caption": caption.value
                        };
                        author.value = ''
                        caption.value = ''
                        memeurl.value = ''
                        if (author.readOnly == false) {
                            send_data(k, "post")
                        }
                        else {
                            author.readOnly = false
                            send_data(k, "patch")
                        }
                    }
                    else {
                        uc.innerHTML = "Enter a valid Meme Url"
                        uc.style.display = "block"
                    }
                }
                else {
                    // cc.innerHTML = "Caption field should not be empty"
                    cc.style.display = "block"
                }
            }
            else {
                // nc.innerHTML = "Name filed should not be empty"
                nc.style.display = "block"
            }
        })

        //var a=JSON.parse(window.localStorage.getItem("productlist"))
        //window.localStorage.removeItem('productlist')

        const interval = setInterval(function () {
            appending_new()

        }, 2000);

        const clearing = setInterval(() => {
            console.clear();
        }, 100);

        function edit_meme_data(ide) {
            //"http://"+ip+":8081/memes/"
            $.get("http://0.0.0.0:8081/memes/" + ide, function (data, status) {
                var data = JSON.parse(data)
                author.value = data["name"]
                caption.value = data["caption"]
                memeurl.value = data["url"]
                author.readOnly = true;
                window.localStorage.setItem("id", ide)
                // send_data({ "caption": data["caption"], "url": data["url"] }, "patch")
            })
        }
        /*
        <div class="card" style="width: 18rem;">
                    <img src="https://api.memegen.link/images/buzz/memes/memes_everywhere.png" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                            card's
                            content.</p>
                        <button class="btn btn-primary">Go somewhere</button>
                    </div>
        </div>
         */
        function appending_new() {
            //"http://"+ip+":808a href="#" 1/memes"
            $.get("http://0.0.0.0:8081/memes", function (data, status) {
                var db = JSON.parse(data)
                feedsection.innerHTML = ''
                db.reverse();
                for (var i = 0; i < data.length; i++) {
                    // var meme_section_div = document.createElement("div")
                    // var edit = document.createElement("button")
                    // var spant = document.createElement("span")
                    // var para1 = document.createElement("p")
                    // var para2 = document.createElement("p")
                    // var para3 = document.createElement("p")
                    // var image_section_div = document.createElement("div")
                    // var image_tag = document.createElement("img")
                    // meme_section_div.className = "meme-section"
                    // para1.className = "memername"
                    // para2.className = "memecaption"
                    // para3.className = "memetime"
                    // image_section_div.className = "meme-image-section"
                    // image_tag.className = "meme-image"
                    // para1.innerHTML = db[i].name
                    // para2.innerHTML = db[i].caption
                    // para3.innerHTML = db[i].time
                    // edit.innerHTML = "Edit"
                    // edit.id = db[i].id
                    // edit.onclick = function () { edit_meme_data(this.id) }
                    // image_tag.src = db[i].url
                    // image_section_div.appendChild(image_tag)
                    // spant.appendChild(para3)
                    // meme_section_div.appendChild(para1)
                    // meme_section_div.appendChild(para2)
                    // meme_section_div.appendChild(spant)
                    // meme_section_div.appendChild(edit)
                    // meme_section_div.appendChild(image_section_div)
                    // feedsection.appendChild(meme_section_div)

                    var div1 = document.createElement("div")
                    div1.className = "card"
                    div1.style.width = "18rem"
                    var image1 = document.createElement("img")
                    image1.src = db[i].url
                    image1.className = "card-img-top"
                    var div2 = document.createElement("div")
                    div2.className = "card-body"
                    var h5_tag = document.createElement("h5")
                    h5_tag.className = "card-title"
                    h5_tag.innerHTML = db[i].caption
                    var para1 = document.createElement("p")
                    para1.className = "card-text"
                    para1.innerHTML = db[i].name
                    var edit = document.createElement("button")
                    var spant = document.createElement("span")
                    // var it = document.createElement("i")
                    // it.className = "fas fa-user-edit"
                    // spant.appendChild(it)
                    // edit.appendChild(spant)
                    edit.className = "btn btn-primary"
                    edit.innerHTML = "Edit"
                    edit.id = db[i].id
                    edit.onclick = function () { edit_meme_data(this.id) }
                    spant.innerHTML = db[i].time
                    spant.className = "memetime"
                    div1.appendChild(image1)
                    div2.appendChild(h5_tag)
                    div2.appendChild(para1)
                    div2.appendChild(edit)
                    div2.appendChild(spant)
                    div1.appendChild(div2)
                    feedsection.appendChild(div1)
                }
            })

        }
    })
    .catch(() => { console.log("Test the steep") })




