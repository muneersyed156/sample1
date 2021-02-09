// console.log("Entered")
var author = document.getElementById("name")
var caption = document.getElementById("caption")
var memeurl = document.getElementById("memeurl")
var send = document.getElementById("send")
var feedsection = document.getElementById("feed")
var nc = document.getElementById("namecheck")
var cc = document.getElementById("captioncheck")
var uc = document.getElementById("urlcheck")

function send_data(k, type) {
    console.log(k)
    if (type == "post") {
        console.log("Going to post")
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
        nc.innerHTML = ""
        if (caption.value != '') {
            cc.innerHTML = ""
            if (memeurl.value != '') {
                // console.log(author.value, caption.value, memeurl.value)
                uc.innerHTML = ""
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
            }
        }
        else {
            cc.innerHTML = "Caption field should not be empty"
        }
    }
    else {
        nc.innerHTML = "Name filed should not be empty"
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

function appending_new() {
    $.get("http://0.0.0.0:8081/memes", function (data, status) {
        var db = JSON.parse(data)
        feedsection.innerHTML = ''
        db.reverse();
        for (var i = 0; i < data.length; i++) {
            var meme_section_div = document.createElement("div")
            var edit = document.createElement("button")
            var spant = document.createElement("span")
            var para1 = document.createElement("p")
            var para2 = document.createElement("p")
            var para3 = document.createElement("p")
            var image_section_div = document.createElement("div")
            var image_tag = document.createElement("img")
            meme_section_div.className = "meme-section"
            para1.className = "memername"
            para2.className = "memecaption"
            para3.className = "memetime"
            image_section_div.className = "meme-image-section"
            image_tag.className = "meme-image"
            para1.innerHTML = db[i].name
            para2.innerHTML = db[i].caption
            para3.innerHTML = db[i].time
            edit.innerHTML = "Edit"
            edit.id = db[i].id
            edit.onclick = function () { edit_meme_data(this.id) }
            image_tag.src = db[i].url
            image_section_div.appendChild(image_tag)
            spant.appendChild(para3)
            meme_section_div.appendChild(para1)
            meme_section_div.appendChild(para2)
            meme_section_div.appendChild(spant)
            meme_section_div.appendChild(edit)
            meme_section_div.appendChild(image_section_div)
            feedsection.appendChild(meme_section_div)
        }
    })

}



