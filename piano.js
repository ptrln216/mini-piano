////////// 為鋼琴添加音頻 ////////////////
// 8個白鍵
for (let i = 1; i <= 8; i++) {
    // 創建對應的音頻
    let addAudio = document.createElement("audio");
    addAudio.setAttribute("src", `audios/w${i}.ogv`);

    // 添加到網頁body中
    document.body.appendChild(addAudio);
}
// 5個黑鍵
for (let i = 1; i <= 5; i++) {
    // 創建對應的音頻
    let addAudio = document.createElement("audio");
    addAudio.setAttribute("src", `audios/b${i}.ogv`);

    // 添加到網頁body中
    document.body.appendChild(addAudio);
}

// 把音源和按鍵的DOM都提取出來
const audios = document.getElementsByTagName("audio");
const whites = document.querySelectorAll("ul>li>div");  // 8個白鍵
const blacks = document.querySelectorAll("ul>li>p");    // 5個黑鍵

////////////// 用鼠標點擊琴鍵，添加對應事件  //////////////////
// 鼠標點擊白鍵
for (let i = 0; i < 8; i++) {
    whites[i].onmousedown = function () {
        whites[i].index = i;
        audios[i].load();  // 重新加載音頻
        audios[i].play();

        if (str) {
            this.index == tips[tipsCur] - 1 ? Play() : "";
        }
    };
}
// 鼠標點擊黑鍵
for (let i = 0; i < 5; i++) {
    // 由於對應的音頻，下標從8開始，所以i要加8
    blacks[i].onmousedown = function() {
        audios[i + 8].load();  // 重新加載音頻
        audios[i + 8].play();
    }
}


/////////////// 用鍵盤控制鋼琴 /////////////////
// S~L控制白鍵，ERYUI控制黑鍵
// 先獲取各個按鍵的keyCode
const keyCodes = new Array(83, 68, 70, 71, 72, 74, 75, 76, 69, 82, 89, 85, 73);
// 當按鍵按下時
document.body.onkeydown = function (e) {
    // 遍歷，看是否有匹配
    for (let i = 0; i < keyCodes.length; i++) {
        if (e.keyCode === keyCodes[i]) {
            if (i < 8) {
                // White key, add white_active class
                whites[i].classList.add("white_active");

                if (str) {
                    i == tips[tipsCur] - 1 ? Play() : "";
                }
            } else {
                blacks[i - 8].classList.add("black_active");
            }
            audios[i].load();
            audios[i].play();
        }
    }
}
// 按鍵放開，要把激活的樣式去掉
document.body.onkeyup = function(e) {
    for (let i = 0; i < keyCodes.length; i++) {
        if (e.keyCode === keyCodes[i]) {
            if (i < 8) {
                whites[i].classList.remove("white_active");
            } else {
                blacks[i - 8].classList.remove("black_active");
            }
        }
    }
}


///////////// 控制説明書的顯示 ////////////////
const instructionBtn = document.querySelector(".instruction_btn");
const instruction = document.getElementById("instruction");

function ShowOrHideInstruction() {
    instruction.style.display === "block" ? instruction.style.display = "none" : instruction.style.display = "block";
}

instructionBtn.addEventListener("click", ShowOrHideInstruction);

///////////// 控制曲庫列表的顯示 ////////////////
const songListBtn = document.querySelector(".song_list_btn");
const songListDIV = document.querySelector(".song_list");

function ShowOrHideSongList() {
    songListDIV.style.display === "block" ? songListDIV.style.display = "none" : songListDIV.style.display = "block";
}

songListBtn.addEventListener("click", ShowOrHideSongList);



/////////// 為鍵盤添加數字，作爲提示 ////////////////
whites.forEach((white, index) => white.textContent = index + 1);
// 用快捷鍵V，控制數字的顯示與否
window.addEventListener("keydown", function(e) {
    if (e.keyCode === 86) {
        if (whites[0].textContent !== '') {
            whites.forEach((white) => white.textContent = "");
        } else {
            whites.forEach((white, index) => white.textContent = index + 1);
        }
    }
})



/////////////// 添加歌曲庫 /////////////////
const library = {
    '晴天':
    `3243 157 1751 - 166 655 5432343
    刮风这天我试过握着你手
    但偏偏雨渐渐大到我看你不见
    
    3453 457 2711 - 115 5654 2345 61 6 77
    
    还要多久我才能在你身边
    等到放晴的那天也许我会比较好一点
    
    3243 157 1751 - 166 655 543 2343
    
    从前从前有个人爱你很久
    但偏偏风渐渐把距离吹得好远
    
    3453 457 2711 - 115 5654 6712 32 1 1
    
    好不容易又能再多爱一天
    但故事的最后你好像还是说了拜拜`,
    '最长的电影':
    `12433 345431 12433 321622
    
    我们的开始 是很长的电影 放映了三年 我票都还留着
    
    12433 345 4315 438 32211
    
    冰上的芭蕾 脑海中还在旋转 望着你 慢慢忘记你
    
    12433 3454 31 12433 321622
    
    朦胧的时间 我们溜了多远 冰刀画的圈 圈起了谁改变
    
    12433 345 4318 4438 432 778
    
    如果再重来 会不会稍显狼狈 爱是不是 不开口才珍贵
    
    321622 32152211 321622 14321 543323
    
    再给我两分钟 让我把回忆结成冰 别融化了眼泪 你妆都花了 要我怎么记得
    
    34363322 23252272 53411 243211
    
    记得你叫我忘了吧 记得你叫我忘了吧 你说你会哭 不是因为在乎`,
    '同桌的你':
    `55553457 - 6666465
    
    明天你是否会想起 昨天你写的日记
    
    55557654 - 4444321
    
    明天你是否还惦记 曾经最爱哭的你
    
    55553457 - 6666465
    
    老师们都已想不起 猜不出问题的你
    
    55557654 - 4444321
    
    我也是偶然翻相片 才想起同桌的你
    
    111156113 - 2222176
    
    谁娶了多愁善感的你 谁看了你的日记
    
    77777125 - 7712171
    
    谁把你的长发盘起 谁给你做的嫁衣`,
    '送别':
    `5 38 6 8 5
    长亭外，古道边，
    5 13 21
    芳草碧连天。
    5387 68 5
    晚风拂柳笛声残，
    52421
    夕阳山外山。`
    };
    
    // 將曲庫中的屬性名，提取成歌單列表
    const songListUL = document.querySelector(".song_list>ul");
    let songList = [];
    for (let name in library) {
        songList.push(name);

        let songLI = document.createElement("li");
        let songLIName = document.createTextNode(name);
        songLI.appendChild(songLIName);
        songListUL.appendChild(songLI);
    }


    const playBtn = document.getElementById("play_btn");
    const song = document.getElementById("song_name");
    const lyricsBox = document.getElementById("lyrics");
    let str = "";  // 曲庫中的模板字符串
    let tips;      // 樂譜的數字
    let lyrics;    // 歌詞
    let tipsCur = 0;  // 記錄樂譜的進度
    let lineCur = 0;  // 記錄每句歌詞的進度
    let lyricsIndex = 0;

    let numReg = /\d/g;  // 把每個數字匹配出來
    let lyricsReg = /[\u4e00-\u9fa5]+/g;  // 把每句歌詞匹配出來

    function Start() {
        whites.forEach((white) => white.classList.remove("tips"));  // 重置鍵盤提示
        const songName = song.value;
        
        if (songName === "") {
            return alert("請輸入歌名");
        }

        if (library.hasOwnProperty(songName)) {
            str = library[songName];

            tips = str.match(numReg);
            lyrics = str.match(lyricsReg);

            whites[tips[0] - 1].classList.add("tips");
            lyricsBox.textContent = lyrics[0];

            // 初始化
            tipsCur = 0;
            lineCur = 0;
            lyricsIndex = 0;
        } else {
            return alert("您輸入的歌曲尚未加入曲庫");
        }
    }
    playBtn.addEventListener("click", Start);

    function Play() {
        // 如果歌詞到了這句的結尾，顯示下一句歌詞
        if (lineCur >= lyrics[lyricsIndex].length - 1) {
            lineCur = 0;
            lyricsIndex++;
            lyricsBox.textContent = lyrics[lyricsIndex];
        } else {
            lineCur++;
        }

        // 如果樂譜的數字提示到尾了，結束演奏
        if (tipsCur === tips.length - 1) {
            str = "";
            whites[tips[tipsCur] - 1].classList.remove("tips");
            return console.log("演奏結束");
        } else {
            whites[tips[tipsCur] - 1].classList.remove("tips");
            tipsCur++;
            whites[tips[tipsCur] - 1].classList.add("tips");
        }
    };