// list of tokenized previous dialogue turns 
let msg_list = [] 

// decoding parameters
let top_k = 20 
let mmi_temp = 0.7
let forward_temp = 1.0
transcript = "";
let thinking = false;

// endpoint
cpu_url = ""

function onEnter() {
    if (thinking) return; // don't interrupt 

    thinking = true;
    animateThink();
    var item = document.getElementById("text_input");
    spolin_request(item.value);
    return false; // don't reload page
}

function animateResponse(response) {
    
    animateWord(response, 0);
    speak(response);

    // Update our HTML page
    var item = document.getElementById("text_input");
    transcript += "<br><div style=\"color:#0a0aff\">&gt; " + item.value+"</div>";
    transcript += "<br>&gt; " + response;

    var transcriptEle = document.getElementById("transcript");
    transcriptEle.innerHTML = transcript;

    item.value = "";
    thinking = false;
}

function onLoad() {
    var item = document.getElementById("text_input");
    item.value = "";
}

function spolin_request(user_response){

    // use decoding parameters that are set 
    top_k = top_k.toString(); 
    forward_temp = forward_temp.toString();
    mmi_temp = mmi_temp.toString();

    // reset new messages to be added 
    let new_msg = []; 
    if (user_response.trim() != ""){
        new_msg.push(user_response);
    }
    
    request_data = {
        message_list: msg_list, 
        new_message: new_msg, 
        forward_temp: forward_temp, 
        mmi_temp: mmi_temp, 
        top_k: top_k
    };

    request_data = JSON.stringify(request_data)
    console.log(request_data)

    make_ajax_call("cpu", cpu_url, request_data)
    //animateResponse("It's a lovely day and I can't wait to see what happens!");
}

function make_ajax_call(endpoint_type, url, request_data){

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: request_data,
        timeout: 0, 
        crossDomain:true,

        success: function(data) {
            console.log("Received API response.");
        },
        error: function(jqxhr, status, exception) {
            console.log("failed with cpu url: "+status);
            animateResponse("I don't know what to say.");
        }

    }).done(function(data){

        if (typeof data === 'string'){
            data = JSON.parse(data); 
        }
        //console.log("Response:", data);
        msg_list = data["tokenized_message_list"];
        animateResponse(data["responses"][0][0]);
    });;

}