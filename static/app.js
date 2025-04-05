const form1 = document.getElementById("form1")
const checkpoint = document.getElementById("num_checkpoint")
const submit_button = document.getElementById("submit_button")
const input_num_ch = document.getElementById("input_num_ch")
let ch_num_panels = [];
var gap = -1;
var sloap;
var bump;
var obstacle;
var green_vic;
var black_vic;
var team_names;
var score_panels = [];
var gimick_note = [];


// テーブル要素を取得
var table = document.getElementById("scoring_table");

form1.addEventListener("submit", (event) => {
    event.preventDefault(); // デフォルトのフォーム送信動作をキャンセル
    const num_checkpoints = checkpoint.value;
    
    
    if(input_num_ch.innerHTML.indexOf("ヶ所") == -1){
        input_num_ch.innerHTML = '<p class="red">'+num_checkpoints+"ヶ所</p>"
        submit_button.style.display = "none";
        var new_contents = '<div class="flexbox"><div><p><b>スタートタイル</b></p><p class="red">1枚</p></div>';
        for(var i = 0;i<num_checkpoints;i++){
            let new_p;
            let new_input
            score_panels.push(0);
            if(i==0){
                new_p = "S~1";
                new_input = '<div class="num_panels_in"><input type="number" id="ch_p_s_1" class="ch_ps" name="num_checkpoint" min="0" size="10" required /></div>';
            }else{
                let num = i + 1
                new_p = i + "~" + num;
                new_input = '<div class="num_panels_in"><input type="number" id="ch_p_'+i+'_'+num+'" class="ch_ps" name="num_checkpoint" min="0" size="10" required /></div>';
            }
            //console.log(new_contents)
            new_contents += "<div><p><b>"+new_p+"</b></p>"+new_input+"</div>";
        }
        const final_text = new_contents+'</div><p><input type="submit" value="完了" id="submit_button2"></p>';
        form1.innerHTML += final_text;
    }else{
        const num_panels_in = document.getElementsByClassName("num_panels_in");
        if(num_panels_in[0].innerHTML.indexOf("枚") == -1){
            const submit_button2 = document.getElementById("submit_button2");
            
            submit_button2.style.display = "none";
            var ch_ps = Array.from(document.getElementsByClassName("ch_ps"));
            //console.log(ch_ps)
            form1.innerHTML += '<p><b>全体のギミックの数</b></p>'
            let k = 0;
            var final_content2 = '<div class="flexbox"><!-- 2 -->';
            ch_ps.forEach(e => {
                //console.log(e)
                ch_num_panels.push(e.value);
                num_panels_in[k].innerHTML = '<p class="red">'+e.value+"枚</p>";
                k+=1
            });
                
            let new_input0 = '<div class="ng num_gimick0"><!-- 3 --><label>ギャップ:</label><input type="number" class="gimick_s_1" id="ch_ps0" name="num_checkpoint" min="0" size="10" required /></div><!-- 3 -->';
            let new_input1 = '<div class="ng num_gimick1"><!-- 3 --><label>傾斜路:</label><input type="number" class="gimick_s_1" id="ch_ps1" name="num_checkpoint" min="0" size="10" required /></div><!-- 3 -->';
            let new_input2 = '<div class="ng num_gimick2"><!-- 3 --><label>バンプ:</label><input type="number" class="gimick_s_1" id="ch_ps2" name="num_checkpoint" min="0" size="10" required /></div><!-- 3 -->';
            let new_input3 = '<div class="ng num_gimick3"><!-- 3 --><label>障害物:</label><input type="number" class="gimick_s_1" id="ch_ps3" name="num_checkpoint" min="0" size="10" required /></div><!-- 3 -->';
            let new_input4 = '<div class="ng num_gimick4"><!-- 3 --><label>緑被災者:</label><input type="number" class="gimick_s_1" id="ch_ps4" name="num_checkpoint" min="0" size="10" required /></div><!-- 3 -->';
            let new_input5 = '<div class="ng num_gimick5"><!-- 3 --><label>黒被災者</label><input type="number" class="gimick_s_1" id="ch_ps5" name="num_checkpoint" min="0" size="10" required /></div><!-- 3 -->';
                
            final_content2 += "<div><!-- 1 -->"+ new_input0 + new_input1 + new_input2 + new_input3+ new_input4 + new_input5+"</div><!-- 1 -->";
                //console.log(final_content2)
            
            const final3 = final_content2+'</dev><!-- 2 -->';
            console.log(final3)
            form1.innerHTML += final3;



            var new_input12 = '<div class="ng team_names"><input type="text" id="team_names" name="team_name" size="30" required /></div>';
            form1.innerHTML += '<p><b>コートの名前</b></p>' + new_input12;
            

            //console.log(ch_num_panels)
            form1.innerHTML += '<p><input type="submit" value="完了" id="submit_button3"></p>';
        }else{
            if(gap == -1){
                const num_gimick0 = document.getElementById("ch_ps0")
                const num_gimick1 = document.getElementById("ch_ps1")
                const num_gimick2 = document.getElementById("ch_ps2")
                const num_gimick3 = document.getElementById("ch_ps3")
                const num_gimick4 = document.getElementById("ch_ps4")
                const num_gimick5 = document.getElementById("ch_ps5")
                team_names = document.getElementById("team_names").value;

                const team_names2 = Array.from(document.getElementsByClassName("team_names"))[0];
                team_names2.innerHTML = "<p><b><u>"+team_names+"</u></b></p>";

                const num_gimick00 = Array.from(document.getElementsByClassName(" num_gimick0"));
                const num_gimick01 = Array.from(document.getElementsByClassName(" num_gimick1"));
                const num_gimick02 = Array.from(document.getElementsByClassName(" num_gimick2"));
                const num_gimick03 = Array.from(document.getElementsByClassName(" num_gimick3"));
                const num_gimick04 = Array.from(document.getElementsByClassName(" num_gimick4"));
                const num_gimick05 = Array.from(document.getElementsByClassName(" num_gimick5"));
                const submit_button3 = document.getElementById("submit_button3");
                submit_button3.style.display = "none";
                
                for(let j=0;j<num_checkpoints;j++){
                    console.log(j)
                    gap=Number(num_gimick0.value);
                    sloap=Number(num_gimick1.value);
                    bump=Number(num_gimick2.value);
                    obstacle=Number(num_gimick3.value);
                    green_vic=Number(num_gimick4.value);
                    black_vic=Number(num_gimick5.value);

                    num_gimick00[0].innerHTML = '<label>ギャップ:</label><p class="red">'+gap+'</p>'
                    num_gimick01[0].innerHTML = '<label>傾斜路:</label><p class="red">'+sloap+'</p>'
                    num_gimick02[0].innerHTML = '<label>バンプ:</label><p class="red">'+bump+'</p>'
                    num_gimick03[0].innerHTML = '<label>障害物:</label><p class="red">'+obstacle+'</p>'
                    num_gimick04[0].innerHTML = '<label>緑被災者:</label><p class="red">'+green_vic+'</p>'
                    num_gimick05[0].innerHTML = '<label>黒被災者:</label><p class="red">'+black_vic+'</p>'

                }
                console.log(gap);
                console.log(sloap);
                console.log(bump);
                console.log(obstacle);
                console.log(team_names);
                console.log(green_vic);
                console.log(black_vic);
                gimick_note = [gap,sloap,bump,obstacle,green_vic,black_vic]
                max_point = (gap 
                                + sloap 
                                + bump )*10
                                + obstacle*20
                                + ch_num_panels.reduce(function(sum, element){return sum + Number(element);}, 0)*5
                                +5//スタートタイル
                                +(green_vic+black_vic)*10
                                +green_vic*20
                                +black_vic*10
                                +30;//脱出得点
                console.log(max_point)
                form1.innerHTML += '<p>満点:<b>'+max_point+'</b>点</p>';
                form1.innerHTML += '<p><input type="submit" value="この内容で登録" id="submit_button4"></p>';
            }else{
                
                console.log(table.innerHTML)
                console.log("OK");
                form1.style.display = "none";
                const scoring = document.getElementById("scoring");
                //scoring.style.display="block";
                var table_content = '';
                for(let l=0;l<num_checkpoints;l++){
                    if(l==0){
                        table_content+='<tr><th>S~1</th><td></td><th>'+ch_num_panels[l]+'枚</th><th class="scores"></th><th><input type="checkbox"></th></tr>';
                    }else{
                        var nn = l+1
                        table_content+='<th>'+l+'~'+nn+'</th><td></td><th>'+ch_num_panels[l]+'枚</th><th class="scores"></th><th><input type="checkbox"></th></tr>';
                    }
                }
                table_content += '<tr><th>脱出</th><th>✖</th><th>脱出完了:<input type="checkbox" id="escape"></th><th class="scores" id="escape_point">0</th><th><input type="checkbox" disabled="disabled" checked="checked"></th></tr>'
                table.innerHTML+=table_content
                let table2 = document.getElementById("field");
                console.log("完了")
                //window.pywebview.api.create_text_file(String(table2.innerHTML),String(scoring.innerHTML),String(team_names),ch_num_panels,max_point,gimick_note)
                fetch("/create_text_file",{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({content:String(table2.innerHTML),
                        score_table:String(scoring.innerHTML),
                        team:String(team_names),
                        ch_num_panels_list:ch_num_panels,
                        max:max_point,
                        gimick_note_list:gimick_note})  // 複数の変数を送信
                });
                open('/newcourt');
                /* fetch("/api/create_text_file",{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({content:String(table2.innerHTML),
                        score_table:String(scoring.innerHTML),
                        team:String(team_names),
                        ch_num_panels_list:ch_num_panels,
                        max:max_point,
                        gimick_note_list:gimick_note})  // 複数の変数を送信
                }); */
        }
    }
}
});
let max_point = 0;


/* const form3 = document.getElementById("form3")

form3.addEventListener("submit", (event) => {
    event.preventDefault(); // デフォルトのフォーム送信動作をキャンセル
    console.log("clicked")
    const team = document.getElementById("team");
    const scoring_table = document.getElementById("scoring_table");
    table2 = document.getElementById("field");
    //window.pywebview.api.create_scoring_file(String(table.innerHTML),String(scoring_table.innerHTML),String(team.value))
}); */


const text_content = await fetch("/api/create_court_list",{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
});
const data5 = await text_content.json(); // APIからの返り値をJSONで取得

const court_list_ele = document.getElementById("court_list");

court_list_ele.innerHTML += data5.result;

const edit_tools = document.getElementById("edit_tools")
let target_td = null;
let selecting_img = null;
let selected = false;
let selecting_a = false;
let selecting_else = false;
let selecting_kind;
var gimick_list = {"障害物":"Obstacle","ギャップ":"gap","バンプ":"bump","傾斜路":"slope","緑被災者":"green_vic","黒被災者":"black_vic"}
var else_list = {"チェックポイント":"cp.png","救助":"blown","虚無":"kyomu","選択only":"select.png","選択解除":"select_cancel"}
edit_tools.addEventListener("click",e =>{
    if(e.target.tagName == "IMG"){
        if(target_td != null){
            target_td.style.backgroundColor = "";
        }
        selected = true;
        target_td = e.target.parentElement;
        selecting_img = target_td.innerHTML
        console.log(selecting_img);
        selecting_a = false;
        selecting_else = false;
        for(let key in gimick_list){
            //console.log(selecting_img.indexOf(gimick_list[key]))
            if(selecting_img.indexOf(gimick_list[key]) != -1){
                console.log(console.log(gimick_list[key]))
                selecting_a = true;
                selecting_kind = key;
                break
            }
        }
        for(let key in else_list){
            //console.log(selecting_img.indexOf(gimick_list[key]))
            if(selecting_img.indexOf(else_list[key]) != -1){
                console.log(console.log(else_list[key]))
                selecting_else = true;
                selecting_kind = else_list[key];
                break
            }
        }
        target_td.style.backgroundColor = "greenyellow";
    }
});
function insertString(original, insert, position) {
    return original.slice(0, position) + insert + original.slice(position);
}
const field_table_ele = document.getElementById("field");
let target = null;
field_table_ele.addEventListener("click",e=>{
    if(target != null){
        target.style.backgroundColor = "";
    }
        target = e.target;
    console.log(target.tagName)
    while (target && target.tagName !== "TD"){
        target = target.parentElement;
    }
    console.log(target.tagName)
    target.style.backgroundColor = "green";
    if(selected && !selecting_a && !selecting_else){
        target.innerHTML = selecting_img
    }else if(selected && !selecting_a && selecting_else){
        if(selecting_kind == "select"){
        }else if(selecting_kind == "kyomu"){
            target.innerHTML = "";
            target.classList.remove("rescue")
            target = null;
        }else if(selecting_kind == "blown"){
            target.classList.add("rescue")
        }else if(selecting_kind == "select_cancel"){
            target.style.backgroundColor = "";
            target = null;
        }else if(selecting_kind == "cp.png"){
            selecting_img = insertString(selecting_img,' class="ab cp" ',-1)
            
            target.innerHTML += selecting_img
        }
    }else if(selected && selecting_a && !selecting_else){
        if(selecting_kind == "Obstacle"){
            //ここにaタグの記述
        }
    }
});

const control_table_ele = document.getElementById("control")
control_table_ele.addEventListener("click",e=>{
    let target_cell = e.target;
    while (target_cell && target_cell.tagName !== "IMG"){
        target_cell = target_cell.parentElement;
    }
    let move = target_cell.id
    if(target !== null){
        const target_img = target.querySelector("img");
        console.log(target_img.tagName)
        if(move == "turn_left_45"){
            let current_rotate = parseInt(target_img.style.rotate)
            if(isNaN(current_rotate)){
                current_rotate = 0
            }
            console.log(current_rotate)
            current_rotate -= 45;
            target_img.style.rotate = `${current_rotate%360}deg`
            target_img.dataset.rotation = current_rotate%360
        }else if(move == "turn_right_45"){
            let current_rotate = parseInt(target_img.style.rotate)
            if(isNaN(current_rotate)){
                current_rotate = 0
            }
            console.log(current_rotate)
            current_rotate += 45;
            target_img.style.rotate = `${current_rotate%360}deg`
            target_img.dataset.rotation = current_rotate%360
        }else if(move == "turn_right"){
            let current_rotate = parseInt(target_img.style.rotate)
            if(isNaN(current_rotate)){
                current_rotate = 0
            }
            console.log(current_rotate)
            current_rotate += 5;
            target_img.style.rotate = `${current_rotate%360}deg`
            target_img.dataset.rotation = current_rotate%360
        }else if(move == "turn_left"){
            let current_rotate = parseInt(target_img.style.rotate)
            if(isNaN(current_rotate)){
                current_rotate = 0
            }
            console.log(current_rotate)
            current_rotate -= 5;
            target_img.style.rotate = `${current_rotate%360}deg`
            target_img.dataset.rotation = current_rotate%360
        }else if(move == "reset_dayo"){
            let current_rotate = parseInt(target_img.style.rotate)
            if(isNaN(current_rotate)){
                current_rotate = 0
            }
            console.log(current_rotate)
            current_rotate = 0;
            target_img.style.rotate = `${current_rotate%360}deg`
            target_img.dataset.rotation = current_rotate%360
        }
    }
});



