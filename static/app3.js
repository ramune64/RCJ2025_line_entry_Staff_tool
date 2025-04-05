// テーブル要素を取得
var table3 = document.getElementById("scoring_table");
const scoring = document.getElementById("scoring");
const cellContents = ["1回目", "2回目", "3回目", "4回目～/パス", ""];
const cellColor = ["rgb(80,230,80)","lightblue","pink","gainsboro","white"];
const points_per_panel = [5,3,1,0];
const panels_num2 = Array.from(document.getElementsByClassName("panels_num"));
const gimick_note3_ele = Array.from(document.getElementsByClassName("gimick_note"));

var ch_num_panels4 = [];
const score_panels3 = [];
var gimick_note3 = [];

function getOS() {
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;

    if (/Win/.test(platform)) {
        return "Windows";
    } else if (/Mac/.test(platform)) {
        return "MacOS";
    } else if (/Linux/.test(platform)) {
        return "Linux";
    } else if (/Android/.test(userAgent)) {
        return "Android";
    } else if (/iPhone|iPad|iPod/.test(userAgent)) {
        return "iOS";
    } else {
        return "Unknown";
    }
}

const os = getOS();
var num_time_count_ele = document.getElementById("num_time_count");
var num_time_wa_ele = document.getElementById("num_time_wa");
var num_time_2_wa_ele = document.getElementById("num_time_2_wa");
num_time_count_ele.innerHTML = "RLE"+num_time_wa_ele.textContent+"<br>"+num_time_2_wa_ele.textContent+"走目";
num_time_count_ele.style.display = "block";

num_time_wa_ele.style.display = "none";
num_time_2_wa_ele.style.display = "none"




const max_point_ele2 = document.getElementById("max_point2")
var max_point3 = 0;
max_point3 = Number(max_point_ele2.textContent)
current_score_ele = document.getElementById("current_score");
let  current_score = 0;
panels_num2.forEach(element => {
    ch_num_panels4.push(Number(element.textContent))
});
gimick_note3_ele.forEach(element => {
    gimick_note3.push(Number(element.textContent))
    console.log(gimick_note3)
});
var gap_points = [];
var bump_points = [];
var obstacle_points = [];
var sloap_points = [];
var green_vic_points = [];
var black_vic_points = [];
for(let kk=0;kk<6;kk++){
    console.log(kk)
    for(let jj=0;jj<gimick_note3[kk];jj++){
        if(kk==0){
            gap_points.push(0)
        }else if(kk==1){
            sloap_points.push(0)
        }else if(kk==2){
            bump_points.push(0)
        }else if(kk==3){
            obstacle_points.push(0)
        }else if(kk==4){
            green_vic_points.push(0)
        }else if(kk==5){
            black_vic_points.push(0)
        }
    }
}




scoring.style.display="block";
// 各セルにクリックイベントを設定
table3.addEventListener("click", function(event) {
    if(allow_edit){
    if (event.target.tagName === "TD") {
        const tr = event.target.parentElement;

        // 親<table>の全<tr>を取得
        const table = tr.parentElement;
        const rows = Array.from(table.querySelectorAll("tr"));

        // 現在の<tr>のインデックスを取得（0から始まる）
        var rowIndex = rows.indexOf(tr);
        //console.log("クリックされたセルは、上から " + (rowIndex + 1) + " 行目です。");
        const targetRowIndex = 0; // 取得したい行のインデックス（0始まり）
        
        const targetRow = rows[rowIndex]; // クリックした行
        const targetCell = targetRow.children[4]; // 5番目のセルはインデックス4
        var targetCell1 = targetRow.children[3]; // 5番目のセルはインデックス4
        const checkbox = targetCell.querySelector("input[type='checkbox']");
        var isChecked;
        if (checkbox) {
            // チェックボックスが存在する場合、そのチェック状態を取得
            isChecked = checkbox.checked;
            isChecked = !isChecked
        }
        //console.log(isChecked)
        if(isChecked){
            // セルごとのクリック回数を保存
            let clickCount = event.target.dataset.clickCount || -1;
            clickCount = (parseInt(clickCount) + 1) % cellContents.length;

            // セル内容を更新
            event.target.textContent = cellContents[clickCount];
            event.target.style.fontWeight = "bold";

            event.target.style.backgroundColor = cellColor[clickCount];

            // クリック回数を記録
            event.target.dataset.clickCount = clickCount;
            if(clickCount!=4){
                console.log(rowIndex)
                console.log(ch_num_panels4);
                let points = Number(ch_num_panels4[rowIndex-2])*points_per_panel[clickCount];
                //let points = [rowIndex];
                targetCell1.textContent=points;
                score_panels3[rowIndex]=points; 
            }else{
                targetCell1.textContent="";
                score_panels3[rowIndex]=0;
            }
            current_score = score_panels3.reduce(function(sum, element){return sum + Number(element);}, 0) + start_point + gimic_points + escape_point;
            current_score_ele.textContent = current_score;
            console.log(score_panels3);
        }
    }
}
});
let start_point = 0;
const started_or_no_ele = document.getElementById("started_or_no");
const start_point_ele = document.getElementById("start_point");
started_or_no_ele.addEventListener("change",(event) => {
    current_score -= start_point;
    if(event.target.checked){
        start_point = 5;
    }else{
        start_point = 0;
    }
    current_score += start_point;
    current_score_ele.textContent = current_score;
    start_point_ele.textContent = start_point;
});

const gimick_clear_check_ele = document.getElementById("gimick_clear_check");
const kind_ele = document.getElementById("kind");

const vic_clear_check_ele = document.getElementById("vic_clear_check");
const kind_vic_ele = document.getElementById("kind_vic");

var now_kind;
var now_num;

var kind_list = {"障害物":obstacle_points,"ギャップ":gap_points,"バンプ":bump_points,"傾斜路":sloap_points,"緑被災者":green_vic_points,"黒被災者":black_vic_points}
console.log(kind_list);
function view_gimick(kind,num){
    if(allow_edit){
    now_kind = kind;
    now_num = num-1;
    let anime_ele = Array.from(document.getElementsByClassName("anime"));
    anime_ele.forEach(element => {
        element.style.animation = "";
        element.classList.remove("anime")
    });
    console.log(kind)
    if(kind == "緑被災者" || kind == "黒被災者"){
        gimick_clear_check_ele.style.display="none";
        vic_clear_check_ele.style.display = "block";
        kind_vic_ele.textContent = kind;
        if(kind == "緑被災者"){
            if(kind_list[now_kind][now_num] == 0){
                vic_box1_ele.checked = false;
                vic_box2_ele.checked = false;
            }else if(kind_list[now_kind][now_num] == 10){
                vic_box1_ele.checked = true;
                vic_box2_ele.checked = false;
            }else if(kind_list[now_kind][now_num] == 30){
                vic_box1_ele.checked = true;
                vic_box2_ele.checked = true;
            }
        }else{
            if(kind_list[now_kind][now_num] == 0){
                vic_box1_ele.checked = false;
                vic_box2_ele.checked = false;
            }else if(kind_list[now_kind][now_num] == 10){
                vic_box1_ele.checked = true;
                vic_box2_ele.checked = false;
            }else if(kind_list[now_kind][now_num] == 20){
                vic_box1_ele.checked = true;
                vic_box2_ele.checked = true;
            }
    }
    }else{
        vic_clear_check_ele.style.display = "none";
        gimick_clear_check_ele.style.display="block";
        kind_ele.textContent = kind;
        if(kind_list[now_kind][now_num] == 0){
            gimicks_box_ele.checked = false;
        }else{
            gimicks_box_ele.checked = true;
        }
    }
    
    target.classList.add("anime");
    target.style.animation = "tenmetsu 1s infinite linear";
    /*  */

    }
}

const gimicks_box_ele = document.getElementById("gimicks_box");

var gimic_points = 0;

gimicks_box_ele.addEventListener("change",function(event){
    current_score -= gimic_points;
    gimic_points = 0;
    if(event.target.checked){
        if(allow_edit){
            if(now_kind == "バンプ" || now_kind == "障害物"){
                if(os=="Windows"){
                    target.innerHTML += '<img class="clear_circle4" src="static/img/clear.png" alt="">'
                }else{
                    target.innerHTML += '<img class="clear_circle2" src="static/img/clear.png" alt="">'
                }
            }else{
                target.innerHTML += '<img class="clear_circle" src="static/img/clear.png" alt="">'
            }
            if(now_kind == "障害物"){
                kind_list[now_kind][now_num] = 20;
            }else{
                kind_list[now_kind][now_num] = 10;
            }
        }else{
            event.target.checked = false
        }
        
    }else{
        if(allow_edit){
            if(now_kind == "バンプ" || now_kind == "障害物"){
                if(os=="Windows"){
                    target.innerHTML = String(target.innerHTML).replace('<img class="clear_circle4" src="static/img/clear.png" alt="">','')
                }else{
                    target.innerHTML = String(target.innerHTML).replace('<img class="clear_circle2" src="static/img/clear.png" alt="">','')
                }
            }else{
                target.innerHTML = String(target.innerHTML).replace('<img class="clear_circle" src="static/img/clear.png" alt="">',"")
            }
            kind_list[now_kind][now_num] = 0;
        }else{
            event.target.checked = false
        }
    }
    if(allow_edit){
        for (let key in kind_list) {
            console.log(kind_list[key])
            gimic_points += kind_list[key].reduce(function(sum, element){return sum + Number(element);}, 0)
        }
        current_score += gimic_points;
        current_score_ele.textContent = current_score;
        console.log(kind_list)
    }
});

const vic_box1_ele = document.getElementById("vic_box1");
const vic_box2_ele = document.getElementById("vic_box2");

vic_box1_ele.addEventListener("change",function(event){
    current_score -= gimic_points;
    gimic_points = 0;
    if(event.target.checked){
        if(target.classList.contains("double")){
            target.innerHTML += '<img class="clear_circle" src="static/img/triangle.png" alt="">'
        }else{
            target.innerHTML += '<img class="clear_circle3" src="static/img/triangle.png" alt="">'
        }
        kind_list[now_kind][now_num] += 10;
    }else{
        if(target.classList.contains("double")){
            target.innerHTML = String(target.innerHTML).replace('<img class="clear_circle" src="static/img/triangle.png" alt="">',"")
            target.innerHTML = String(target.innerHTML).replace('<img class="clear_circle" src="static/img/clear.png" alt="">',"")
        }else{
            target.innerHTML = String(target.innerHTML).replace('<img class="clear_circle3" src="static/img/triangle.png" alt="">',"")
            target.innerHTML = String(target.innerHTML).replace('<img class="clear_circle3" src="static/img/clear.png" alt="">',"")
        }
        if(vic_box2_ele.checked !== false){
            vic_box2_ele.checked = false;
            if(now_kind == "緑被災者"){
                kind_list[now_kind][now_num] -= 20;
            }else{
                kind_list[now_kind][now_num] -= 10;
            }
        }
        kind_list[now_kind][now_num] -= 10;
    }
    for (let key in kind_list) {
        console.log(kind_list[key])
        gimic_points += kind_list[key].reduce(function(sum, element){return sum + Number(element);}, 0)
    }
    current_score += gimic_points;
    current_score_ele.textContent = current_score;
});
vic_box2_ele.addEventListener("change",function(event){
    current_score -= gimic_points;
    gimic_points = 0;
    if(now_kind == "黒被災者"){
        if(event.target.checked){
            if(target.classList.contains("double")){
                target.innerHTML = String(target.innerHTML).replace('<img class="clear_circle" src="static/img/triangle.png" alt="">',"")
                target.innerHTML += '<img class="clear_circle" src="static/img/clear.png" alt="">'
            }else{
                target.innerHTML = String(target.innerHTML).replace('<img class="clear_circle3" src="static/img/triangle.png" alt="">',"")
                target.innerHTML += '<img class="clear_circle3" src="static/img/clear.png" alt="">';
            }
            if(vic_box1_ele.checked !== true){
                vic_box1_ele.checked = true;
                kind_list[now_kind][now_num] += 10;
            }
            kind_list[now_kind][now_num] += 10;
        }else{
            if(target.classList.contains("double")){
                target.innerHTML = String(target.innerHTML).replace('<img class="clear_circle" src="static/img/clear.png" alt="">',"")
            }else{
                target.innerHTML = String(target.innerHTML).replace('<img class="clear_circle3" src="static/img/clear.png" alt="">',"")
            }
            if(vic_box1_ele.checked == true){
                if(target.classList.contains("double")){
                    target.innerHTML += '<img class="clear_circle" src="static/img/triangle.png" alt="">'
                }else{
                    target.innerHTML += '<img class="clear_circle3" src="static/img/triangle.png" alt="">'
                }
            }
            kind_list[now_kind][now_num] -= 10;
        }
    }else{
        if(event.target.checked){
            if(target.classList.contains("double")){
                target.innerHTML = String(target.innerHTML).replace('<img class="clear_circle" src="static/img/triangle.png" alt="">',"")
                target.innerHTML += '<img class="clear_circle" src="static/img/clear.png" alt="">'
            }else{
                target.innerHTML = String(target.innerHTML).replace('<img class="clear_circle3" src="static/img/triangle.png" alt="">',"")
                target.innerHTML += '<img class="clear_circle3" src="static/img/clear.png" alt="">';
            }
            if(vic_box1_ele.checked !== true){
                vic_box1_ele.checked = true;
                kind_list[now_kind][now_num] += 10;
            }
            kind_list[now_kind][now_num] += 20;
        }else{
            if(target.classList.contains("double")){
                target.innerHTML = String(target.innerHTML).replace('<img class="clear_circle" src="static/img/clear.png" alt="">',"")
            }else{
                target.innerHTML = String(target.innerHTML).replace('<img class="clear_circle3" src="static/img/clear.png" alt="">',"")
            }
            if(vic_box1_ele.checked == true){
                if(target.classList.contains("double")){
                    target.innerHTML += '<img class="clear_circle" src="static/img/triangle.png" alt="">'
                }else{
                    target.innerHTML += '<img class="clear_circle3" src="static/img/triangle.png" alt="">'
                }
            }
            kind_list[now_kind][now_num] -= 20;
        }
    }
    for (let key in kind_list) {
        console.log(kind_list[key])
        gimic_points += kind_list[key].reduce(function(sum, element){return sum + Number(element);}, 0)
    }
    current_score += gimic_points;
    current_score_ele.textContent = current_score;
});


//<img class="clear" src="img/clear.png" alt="">

const field_table_ele = document.getElementById("field");

let target;

field_table_ele.addEventListener("click", function(event) {
    if(allow_edit){
    console.log("clicked");
    const td = event.target.closest("td");
    if (td){
        const tr2 = td.parentElement; // クリックされた<td>の親<tr>
        const table2 = tr2.parentElement;       // <table>要素
        const rows2 = Array.from(table2.querySelectorAll("tr")); // 全<tr>要素

        const rowIndex2 = rows2.indexOf(tr2);    // クリックされたセルの行インデックス
        const cellIndex2 = Array.from(tr2.children).indexOf(td); // クリックされたセルの列インデックス

        console.log(`クリックされたセルは、上から ${rowIndex2 + 1} 行目、左から ${cellIndex2 + 1} 列目です。`);
        console.log(rowIndex2,cellIndex2)
        /* td.style.backgroundColor = "red"; */
        target = td
    }
}
});

function close(){
    let anime_ele = Array.from(document.getElementsByClassName("anime"));
    anime_ele.forEach(element => {
        element.style.animation = "";
        element.classList.remove("anime")
    });
    vic_clear_check_ele.style.display = "none";
    gimick_clear_check_ele.style.display = "none";
}

const escape_ele = document.getElementById("escape");
const escape_point_ele = document.getElementById("escape_point");

var escape_point = 0;

escape_ele.addEventListener("change",function(event){
    current_score -= escape_point;
    if(event.target.checked == true){
        escape_point = 30;
        escape_point_ele.textContent = "30";
    }else{
        escape_point = 0;
        escape_point_ele.textContent = "0";
    }
    console.log("escape",escape_point)
    current_score += escape_point;
    current_score_ele.textContent = current_score;
});
let allow_drowing = true;

const canvases = document.querySelectorAll('.drawingCanvas'); // 全てのキャンバスを取得
//const ctx = canvas.getContext('2d');


//let isDrawing = false;

canvases.forEach((canvas) => {
    const ctx = canvas.getContext('2d');
    let isDrawing = false;

    ctx.lineWidth = 5
    // 位置取得関数（マウス or タッチ）
    function getEventPosition(event) {
        if (event.touches && event.touches[0]) {
            const rect = canvas.getBoundingClientRect();
            return {
                x: event.touches[0].clientX - rect.left,
                y: event.touches[0].clientY - rect.top
            };
        } else {
            return {
                x: event.offsetX,
                y: event.offsetY
            };
        }
    }

    // 描画を開始
    function startDrawing(event) {
        if(allow_drowing){
            isDrawing = true;
        }
        
        const pos = getEventPosition(event);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        event.preventDefault(); // スクロールなどのデフォルト動作を防止
    }

    // 描画中
    function draw(event) {
        if (!isDrawing) return;
        const pos = getEventPosition(event);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        event.preventDefault();
    }

    // 描画を終了
    function stopDrawing(event) {
        if (isDrawing) {
            isDrawing = false;
            ctx.closePath();
            event.preventDefault();
        }
    }
    // イベントリスナーの追加
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // タッチイベントの処理
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchcancel', stopDrawing);
});
















const canvas = document.getElementById('drawingCanvas');
const canvas2 = document.getElementById('drawingCanvas2');
const canvas3 = document.getElementById('drawingCanvas3');

const ctx1 = canvas.getContext('2d');
const ctx2 = canvas2.getContext('2d');
const ctx3 = canvas3.getContext('2d');

const clearButton = document.getElementById('clearButton');
const clearButton2 = document.getElementById('clearButton2');
const clearButton3 = document.getElementById('clearButton3');

clearButton.addEventListener('click', () => {
    ctx1.clearRect(0, 0, canvas.width, canvas.height); // キャンバス全体をクリア
});

clearButton2.addEventListener('click', () => {
    ctx2.clearRect(0, 0, canvas.width, canvas.height); // キャンバス全体をクリア
});

clearButton3.addEventListener('click', () => {
    ctx3.clearRect(0, 0, canvas.width, canvas.height); // キャンバス全体をクリア
});

const sign_ele = Array.from(document.getElementsByClassName("sign"));



const form5_ele = document.getElementById("form5");
const min_ele = document.getElementById("min");
const sec_ele = document.getElementById("sec");
const alert_ele = document.getElementById("alert")

const team_name_ele = document.getElementById("team_name");

const team_name1_ele = document.getElementById("team_name1");

team_name1_ele.textContent = team_name_ele.textContent.replace("チーム名:","");



let allow_edit = true;

form5_ele.addEventListener("submit",async (event)=>{
    console.log("alert")
    event.preventDefault();
    alert_ele.style.display = "block";

     // ユーザーの選択を待機
    const userChoice = await waitForChoice();

    alert_ele.style.display = "none";

    if(userChoice == "continue"){
        allow_edit = false;
        let aa = sec_ele.value
        if(aa.length == 1){
            aa = "0"+String(aa);
        }
        form5_ele.innerHTML = '<p style="font-size:30px"><b>'+min_ele.value+'分'+aa+'秒</b></p>'
        clearButton.style.display = "none";
        clearButton2.style.display = "none";
        clearButton3.style.display = "none";
        allow_drowing = false;

        gimick_clear_check_ele.style.display="none";
        vic_clear_check_ele.style.display="none";

        sign_ele.forEach(element => {
            element.style.fontsize = "15px";
        });
        
        print();  // 印刷ダイアログを表示
        form6_ele.style.display = "block";
        sign_ele.forEach(element => {
            element.style.fontsize = "25pt";
        });
        const fullHTML = document.documentElement.outerHTML;
        console.log(fullHTML);
        fetch("/api/create_result_file",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({content:String(document.documentElement.outerHTML),team:String(team_name_ele.textContent),
                                    score:String(current_score),play_time:String(form5_ele.innerText),team_num:String(num_time_count_ele.textContent)})  // 複数の変数を送信
        });
    }
});

function waitForChoice() {
    return new Promise((resolve) => {
        const accept_ele = document.getElementById("accept")
        const cancel_ele = document.getElementById("cancel")

        const onContinue = () => {
        cleanup();
        resolve('continue');
        };

        const onCancel = () => {
        cleanup();
        resolve('cancel');
        };

        const cleanup = () => {
            accept_ele.removeEventListener('click', onContinue);
            cancel_ele.removeEventListener('click', onCancel);
        };

        accept_ele.addEventListener('click', onContinue);
        cancel_ele.addEventListener('click', onCancel);
    });
}



const form6_ele = document.getElementById("form6");

form6_ele.addEventListener("submit",(event)=>{
    event.preventDefault();
    form6_ele.style.display = "none";
    sign_ele.forEach(element => {
        element.style.fontsize = "15px";
    });
    gimick_clear_check_ele.style.display="none";
    vic_clear_check_ele.style.display="none";
    print();
    form6_ele.style.display = "block";
    sign_ele.forEach(element => {
        element.style.fontsize = "25pt";
    });
    });

/* async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Canvasを画像として取得
    const canvasImage = canvas.toDataURL('image/png');

    // PDFに画像を挿入
    doc.addImage(canvasImage, 'PNG', 10, 10, 180, 90); // (x, y, width, height)

    // PDFを保存
    doc.save('canvas_output.pdf');
} */

