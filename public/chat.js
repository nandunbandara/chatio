/**
 * Created by nandunb on 11/5/17.
 */
//get session value for username and port
let username = sessionStorage.getItem('username');
let port = sessionStorage.getItem('port');

let socket = null;

//load chat form upon connecting
let showChatForm = ()=>{
    $('#chat_form').show();
    $('#connection_form').hide();
};

//hide chat form upon disconnecting
let hideChatForm = ()=>{
    $('#chat_form').hide();
    $('#connection_form').show();
};


//connect to the server
let connect = (port, username)=>{
    console.log(port, username);
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('port', port);

    let server_url = 'http://localhost:'.concat('4200');
    socket = io.connect(server_url);
    showChatForm();
};

//disconnect from server
let disconnect = ()=>{
    socket.close();
    sessionStorage.removeItem('username');
    hideChatForm();
};

//check if the user is logged in or not
let validateSession = ()=>{
    if(username == null || port == null){
        console.log('within if');
        $('#chat_form').hide();
        $('#connection_form').show();
    }else{
        $('#form').show();
        $('#connection_form').hide();
        connect(port, username);
    }
};

validateSession();


if(socket){
    socket.on('connect', (data)=>{
        socket.emit('join', 'Hello World from client!');
    });

//on event of a broadcasted message
    socket.on('broad', (data)=>{
        $('#future').append(data+"<br/>");
    });
}

//send message
$('#chat_form').submit((e)=>{
    e.preventDefault();
    let message = $('#chat_input').val();

    this.username = sessionStorage.getItem('username');

    socket.emit('messages', this.username+": "+message);
});

//connection form submit
$('#connection_form').submit((e)=>{
    e.preventDefault();

    this.port = $('#port_input').val();
    this.username = $('#username_input').val();

    console.log("inside ct submit: ", this.port, this.username);

    if(this.port == null || this.username == null){
        alert('Please enter both PORT and Username');
    }else {
        connect(this.port, this.username);
    }

});