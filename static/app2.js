const form3 = document.getElementById("form3")

var ch_num_panels3 = [];
var gimick_note2 = [];

const panels_num = Array.from(document.getElementsByClassName("panels_num"));
const gimick_note2_ele = Array.from(document.getElementsByClassName("gimick_note"));
const max_point_ele = document.getElementById("max_point")
var max_point2 = 0;
const num_times_ele = document.getElementById("num_times");
const num_times_2_ele = document.getElementById("num_times_2");

/* async function pythonapi() {
    return await window.pywebview.api.create_scoring_file(String(table2.innerHTML),String(scoring_table.innerHTML),String(team.value))
} */

form3.addEventListener("submit", (event) => {
    event.preventDefault(); // デフォルトのフォーム送信動作をキャンセル
    console.log("clicked")
    const team = document.getElementById("team");
    const scoring_table = document.getElementById("scoring_table");
    const table2 = document.getElementById("field");
    
    panels_num.forEach(element => {
        ch_num_panels3.push(Number(element.textContent))
    });
    gimick_note2_ele.forEach(element => {
        gimick_note2.push(Number(element.textContent))
    });
    max_point2 = Number(max_point_ele.textContent)
    //window.pywebview.api.create_scoring_file(String(table2.innerHTML),String(scoring.innerHTML),String(team.value),ch_num_panels3,max_point2,gimick_note2)
    fetch("/api/create_scoring_file",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({field_table:String(table2.innerHTML),
            score_table:String(scoring.innerHTML),
            team:String(team.value),
            ch_num_panels_list:ch_num_panels3,
            max:max_point2,
            gimick_note_list:gimick_note2,
            num_times:num_times_ele.value,
            num_times_2:num_times_2_ele.value })  // 複数の変数を送信
    });
    open('/scoring');
});




