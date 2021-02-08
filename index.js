// console.log("Entered")
var author = document.getElementById("name")
var caption = document.getElementById("caption")
var memeurl = document.getElementById("memeurl")
var send = document.getElementById("send")
var feedsection = document.getElementById("feed")
var nc = document.getElementById("namecheck")
var cc = document.getElementById("captioncheck")
var uc = document.getElementById("urlcheck")
var ip_address = '192.168.0.106'

function send_data(k) {
    console.log(k)
    $.post("http://192.168.0.106:8081/memes", k)
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
                send_data(k)
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

// {/* <div class="meme-section">
//             <p class="memername">Name of Memer1</p>
//             <p class="memecaption">Caption of Meme1</p>
//             <p class="memetime">Sun Feb 7 14:11:26 2021</p>
//             <div class="meme-image-section">
//                 <img src="https://api.memegen.link/images/buzz/memes/memes_everywhere.png" class="meme-image">
//             </div>
//         </div> */}

const interval = setInterval(function () {
    appending_new()

}, 2000);

const clearing = setInterval(() => {
    console.clear();
}, 100);



function appending_new() {
    $.get("http://192.168.0.106:8081/memes", function (data, status) {
        var db = JSON.parse(data)
        feedsection.innerHTML = ''
        db.reverse();
        for (var i = 0; i < data.length; i++) {
            var meme_section_div = document.createElement("div")
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
            image_tag.src = db[i].url
            image_section_div.appendChild(image_tag)
            spant.appendChild(para3)
            meme_section_div.appendChild(para1)
            meme_section_div.appendChild(para2)
            meme_section_div.appendChild(spant)
            meme_section_div.appendChild(image_section_div)
            feedsection.appendChild(meme_section_div)
        }
    })

}

