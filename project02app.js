// Module dependencies

var express    = require('express'),
    mysql      = require('mysql');

// Application initialization

var connection = mysql.createConnection({
    host     : 'HOST',
    user     : 'USER',
    password : 'PASSWORD'
});

var app = module.exports = express.createServer();

// Database setup

connection.query('USE USER', function (err) {
    if (err) throw err;
});

// Configuration

app.use(express.bodyParser());

// Main page with two links to view the table and drop down menu

var htmlHeader = '<html><head><title>Forum Database</title></head><body>';
var htmlFooter = '</body></html>';

function handleError(res, error) {
    console.log(error);
    res.send(error.toString());
}

function buildUserView(result) {

    // Build the HTML table from the data in the Student table
	var htmlHeader = '<html><head><title>User Information</title></head><body>';
    var responseHTML = htmlHeader + '<h1>User Information</h1>';

    //Dynamic populating rows from the records returned
    for (var i=0; i < result.length; i++) {
        responseHTML += '<ul><li>Account ID: ' + result[i].Account_ID + '</li>' + 
			'<li>Username: ' + result[i].Username + '</li>' +
            '<li>Forum Name: ' + result[i].Forum_Name + '</li>' +
			'<li>Password: ' + result[i].Password + '</li>'	
			'<li>Email: ' + result[i].Email + '</li>'				
	}
    responseHTML += htmlFooter;

    return responseHTML;
}

function buildForumView(result) {

    // Build the HTML table from the data in the Student table
	var htmlHeader = '<html><head><title>Forum Information</title></head><body>';
    var responseHTML = htmlHeader + '<h1>Forum Information</h1>';

    //Dynamic populating rows from the records returned
    for (var i=0; i < result.length; i++) {
        responseHTML += '<ul><li>Forum ID: ' + result[i].Forum_ID + '</li>' +
			'<li>Posted By: ' + result[i].Posted_By + '</li>' +
            '<li>Thread: ' + result[i].Thread + '</li>' +
			'<li>Date and Time: ' + result[i].DT + '</li>'
	}
    responseHTML += htmlFooter;

    return responseHTML;
}

function buildPostView(result) {

    // Build the HTML table from the data in the Student table
	var htmlHeader = '<html><head><title>Post Information</title></head><body>';
    var responseHTML = htmlHeader + '<h1>Post Information</h1>';

    //Dynamic populating rows from the records returned
    for (var i=0; i < result.length; i++) {
        responseHTML += '<ul><li>Post ID: ' + result[i].Post_ID + '</li>' +
			'<li>Posted By: ' + result[i].Posted_By + '</li>' +
			'<li>Message: ' + result[i].Message + '</li>'	
			'<li>Date and Time: ' + result[i].DT + '</li>'			
	}
    responseHTML += htmlFooter;

    return responseHTML;
}

app.get('/', function(req, res) {
    req.query.Username

    res.send('<html><head><title>Da Lowe Forums</title></head><body>' +
			'<h1>Da Lowe\'s Forum Homepage<h1>' +
			'<style>ul{list-style-type: none;' +
					'margin: 0;' +
					'padding: 0;' +
				'}' +
			'li {' +
				'float: left;' +
			'}' +
			'a:link, a:visited {' +
				'display: block;' +
				'width: 150px;' +
				'background-color: 0099FF;' +
				'color: white;' +
				'text-decoration: none;' +
				'text-align: center;' +
				'font-weight: bold;' +
				'text-transform: uppercase;' +
				'padding: 5px;' +
			'}' +
			'a:hover, a:active{' +
				'background-color: blue;' +
			'}</style>' +		
			'<li><a href="/">Home</a></li>' + 
			'<li><a href="/Profile/view/table">Profile</a></li>' + 
			'<li><a href="/Friend/view/dropdown">Friends</a></li>' +
			'<li><a href="/Forum/view/table">Forums</a></li>' +
			'<li><a href="/Post/view/table">Posts</a></li>' +		
			'<li><a href="/About">About</a></li><br \><br \>' +	
			'<a href="/Login">Log In</a>' +
			'<a href="/User/add">Sign Up</a><br \>' +	 	
			'<footer>' +
			'<p>Created by: Daniel Lowe</p>' +
			'<p>Contact information: <a1 href="mailto:daniel.neobahamutzero@gmail.com">daniel.neobahamutzero@gmail.com</a1></p>' +
			'</footer>' +
            '</body></html>'
    );
});

// HTML Log in services from the User table
app.get('/About', function (req, res) {
    req.query.Username

    res.send('<html><head><title>About</title></head><body>' +
			'<h1>About<h1>' +
			'<style>ul{list-style-type: none;' +
					'margin: 0;' +
					'padding: 0;' +
				'}' +
			'li {' +
				'float: left;' +
			'}' +
			'a:link, a:visited {' +
				'display: block;' +
				'width: 150px;' +
				'background-color: 0099FF;' +
				'color: white;' +
				'text-decoration: none;' +
				'text-align: center;' +
				'font-weight: bold;' +
				'text-transform: uppercase;' +
				'padding: 5px;' +
			'}' +
			'a:hover, a:active{' +
				'background-color: blue;' +
			'}</style>' +		
			'<li><a href="/">Home</a></li>' +
			'<li><a href="/Profile/view/table">Profile</a></li>' + 
			'<li><a href="/Friend/view/dropdown">Friends</a></li>' +
			'<li><a href="/Forum/view/table">Forums</a></li>' +
			'<li><a href="/Post/view/table">Posts</a></li>' +		
			'<li><a href="/About">About</a></li><br \><br \>' +
			'<h2> About Da Lowe\'s Forum site </h2>' +
			'<body2> Da Lowe\'s Forum site was created with the intention of allowing users to communicate with others freely.' +
			'This forum site was constructed by a student attending Sonoma State University.</body2>' +
			'<br \><footer>' +
			'<p>Created by: Daniel Lowe</p>' +
			'<p>Contact information: <a1 href="mailto:daniel.neobahamutzero@gmail.com">daniel.neobahamutzero@gmail.com</a1></p>' +
			'</footer>' +
            '</body></html>'
    );
});

// HTML Log in services from the User table
app.get('/Login', function (req, res) {

	var responseHTML = htmlHeader;

	responseHTML += '<html><head><title>Login</title></head><body>' +
		'<h1>Login<h1>' +

		'<input type="hidden" name="Username" id="Username" />' +
		'<input type="hidden" name="Password" id="Password" />' +
		'<label for="Username: ">Username</label> <input type="text" name="Username" id="Username" /><br />' +
		'<label for="Password: ">Password</label> <input type="text" name="Password" id="Password" /><br />' +
		'<a href="/Forum/view/table"> <button>Login</button></a>';

	responseHTML += htmlFooter;
	res.send(responseHTML);
});

// HTML with data populated from the Forum table
app.get('/Forum/view/table', function (req, res) {

    var myQry = 'SELECT * FROM Forum';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                // Build the HTML table from the data in the Student table
                var responseHTML = '<html><head><title>Forums</title></head><body>' +
					'<h1>Forums<h1>';
                responseHTML += '<table border=1>' +
                    '<tr><th>Forum ID</th>' +
					'<th>Thread</th>' +	
                    '<th>Posted by</th>' +
					'<th>Date and Time</th>' +
					'<th><!-- Message Post Column --></th>' +					
					'<th><!-- More Info Column --></th>' +
                    '<th><!-- Edit Info Column --></th>' +
                    '<th><!-- Delete Column --></th>' +
                    '</tr>';

                //Dynamic populating rows from the records returned
                for (var i=0; i < result.length; i++) {
                    responseHTML += '<tr><td>' + result[i].Forum_ID + '</td>' +
                        '<td>' + result[i].Thread + '</td>' +
						'<td>' + result[i].Posted_By + '</td>' +						
                        '<td>' + result[i].DT + '</td>' +
                        '<td><a href="/Post/view/table">Post Message</a>' +
						'<td><a href="/Forum/?Forum_ID=' + result[i].Forum_ID + '">more info</a>' +											
                        '<td><a href="/Forum/edit?Forum_ID=' + result[i].Forum_ID + '">edit</a>' +
                        '<td><a href="/Forum/delete?Forum_ID=' + result[i].Forum_ID + '">delete</a>' +						
						'</tr>'
                }					
				
				responseHTML += '<style>ul{list-style-type: none;' +
						'margin: 0;' +
						'padding: 0;' +
					'}' +
					'li {' +
						'float: left;' +
					'}' +
						'a:link, a:visited {' +
						'display: block;' +
						'width: 150px;' +
						'background-color: 0099FF;' +
						'color: white;' +
						'text-decoration: none;' +
						'text-align: center;' +
						'font-weight: bold;' +
						'text-transform: uppercase;' +
						'padding: 5px;' +
					'}' +
					'a:hover, a:active{' +
						'background-color: blue;' +
					'}</style>' +		
					'<li><a href="/">Home</a></li>' +
					'<li><a href="/Profile/view/table">Profile</a></li>' + 
					'<li><a href="/Friend/view/dropdown">Friends</a></li>' +
					'<li><a href="/Forum/view/table">Forums</a></li>' +
					'<li><a href="/Post/view/table">Posts</a></li>' +		
					'<li><a href="/About">About</a></li><br \><br \>' +
					'<a href="/Forum/add"> <button>Add Thread</button></a><br \><br \>';
				responseHTML += '</table>';
				res.send(responseHTML);
            }
        }
    );
});

// HTML with data populated from the Post table
app.get('/Post/view/table', function (req, res) {

    var myQry = 'Select * From Post';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                // Build the HTML table from the data in the Student table
                var responseHTML = '<html><head><title>Post</title></head><body>' +
					'<h1>Post<h1>';
                responseHTML += '<table border=1>' +
                    '<tr><th>Post ID</th>' +
					'<th>Message</th>' +	
                    '<th>Posted by</th>' +
					'<th>Date and Time</th>' +
                    '<th><!-- More Info Column --></th>' +					
                    '<th><!-- Edit Info Column --></th>' +
                    '<th><!-- Delete Column --></th>' +
                    '</tr>';

                //Dynamic populating rows from the records returned
                for (var i=0; i < result.length; i++) {
                    responseHTML += '<tr><td>' + result[i].Post_ID + '</td>' +
                        '<td>' + result[i].Message + '</td>' +
						'<td>' + result[i].Posted_By + '</td>' +						
                        '<td>' + result[i].DT + '</td>' +
						'<td><a href="/Post/?Post_ID=' + result[i].Post_ID + '">more info</a>' +						
                        '<td><a href="/Post/edit?Post_ID=' + result[i].Post_ID + '">edit</a>' +
                        '<td><a href="/Post/delete?Post_ID=' + result[i].Post_ID + '">delete</a>' +						
						'</tr>'
                }					
				
				responseHTML += '<style>ul{list-style-type: none;' +
						'margin: 0;' +
						'padding: 0;' +
					'}' +
					'li {' +
						'float: left;' +
					'}' +
						'a:link, a:visited {' +
						'display: block;' +
						'width: 150px;' +
						'background-color: 0099FF;' +
						'color: white;' +
						'text-decoration: none;' +
						'text-align: center;' +
						'font-weight: bold;' +
						'text-transform: uppercase;' +
						'padding: 5px;' +
					'}' +
					'a:hover, a:active{' +
						'background-color: blue;' +
					'}</style>' +		
					'<li><a href="/">Home</a></li>' +
					'<li><a href="/Profile/view/table">Profile</a></li>' + 
					'<li><a href="/Friend/view/dropdown">Friends</a></li>' +
					'<li><a href="/Forum/view/table">Forums</a></li>' +
					'<li><a href="/Post/view/table">Posts</a></li>' +		
					'<li><a href="/About">About</a></li><br \><br \>' +
					'<a href="/Post/add"> <button>Add Post</button></a><br \><br \>';
				responseHTML += '</table>';
				res.send(responseHTML);
            }
        }
    );
});

// HTML with data populated from the User table
app.get('/Profile/view/table', function (req, res) {

    var myQry = 'Select * From User';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                // Build the HTML table from the data in the Student table
                var responseHTML = '<html><head><title>User Profile</title></head><body>' +
					'<h1>User Profile<h1>';
                responseHTML += '<table border=1>' +
                    '<tr><th>Account ID</th>' +
					'<th>Username</th>' +	
                    '<th>Forum Name</th>' +
					'<th>Password</th>' +
					'<th>Email</th>' +
                    '<th><!-- More Info Column --></th>' +
                    '<th><!-- Edit Info Column --></th>' +
                    '<th><!-- Delete Column --></th>' +
                    '</tr>';

                //Dynamic populating rows from the records returned
                for (var i=0; i < result.length; i++) {
                    responseHTML += '<tr><td>' + result[i].Account_ID + '</td>' +
                        '<td>' + result[i].Username + '</td>' +
						'<td>' + result[i].Forum_Name + '</td>' +						
                        '<td>' + result[i].Password + '</td>' +
						'<td>' + result[i].Email + '</td>' +
						'<td><a href="/User/?Account_ID=' + result[i].Account_ID + '">more info</a>' +
                        '<td><a href="/User/edit?Account_ID=' + result[i].Account_ID + '">Edit User</a>' +
                        '<td><a href="/User/delete?Account_ID=' + result[i].Account_ID + '">Delete User</a>' +						
						'</tr>'
                }					
				
				responseHTML += '<style>ul{list-style-type: none;' +
						'margin: 0;' +
						'padding: 0;' +
					'}' +
					'li {' +
						'float: left;' +
					'}' +
						'a:link, a:visited {' +
						'display: block;' +
						'width: 150px;' +
						'background-color: 0099FF;' +
						'color: white;' +
						'text-decoration: none;' +
						'text-align: center;' +
						'font-weight: bold;' +
						'text-transform: uppercase;' +
						'padding: 5px;' +
					'}' +
					'a:hover, a:active{' +
						'background-color: blue;' +
					'}</style>' +		
					'<li><a href="/">Home</a></li>' +
					'<li><a href="/Profile/view/table">Profile</a></li>' + 
					'<li><a href="/Friend/view/dropdown">Friends</a></li>' +
					'<li><a href="/Forum/view/table">Forums</a></li>' +
					'<li><a href="/Post/view/table">Posts</a></li>' +		
					'<li><a href="/About">About</a></li><br \><br \>';
				
				responseHTML += '</table>';
				res.send(responseHTML);
            }
        }
    );
});

// HTML drop down menu with data from the friend table
app.get('/Friend/view/dropdown', function (req, res) {

    var myQry = 'Select * From Friend';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                // Build the HTML table from the data in the Student table
                var responseHTML = '<html><head><title>Friends List</title></head><body>' +
					'<h1>Friends List<h1>';
				
				responseHTML += '<style>ul{list-style-type: none;' +
						'margin: 0;' +
						'padding: 0;' +
					'}' +
					'li {' +
						'float: left;' +
					'}' +
						'a:link, a:visited {' +
						'display: block;' +
						'width: 150px;' +
						'background-color: 0099FF;' +
						'color: white;' +
						'text-decoration: none;' +
						'text-align: center;' +
						'font-weight: bold;' +
						'text-transform: uppercase;' +
						'padding: 5px;' +
					'}' +
					'a:hover, a:active{' +
						'background-color: blue;' +
					'}</style>' +		
					'<li><a href="/">Home</a></li>' +
					'<li><a href="/Profile/view/table">Profile</a></li>' + 
					'<li><a href="/Friend/view/dropdown">Friends</a></li>' +
					'<li><a href="/Forum/view/table">Forums</a></li>' +
					'<li><a href="/Post/view/table">Posts</a></li>' +		
					'<li><a href="/About">About</a></li><br \><br \>' +
					'<a href="/Friend/add"> <button>Add a Friend</button></a><br />';
				for (var i=0; i < result.length; i++) {
					responseHTML += '<h10> Friend Number: ' + (i+1) + '</h10><br />'
					responseHTML += '<a href="/Friend/edit?Friend_ID=' + result[i].Friend_ID + '">Edit Friend</a><br />';
					responseHTML += '<a href="/Friend/delete?Friend_ID=' + result[i].Friend_ID + '">Delete Friend</a><br /><br />';	
				}

				responseHTML += '<form method="GET" action="/Friend/">';
                responseHTML += 'Select a Friend: <select name="Friend_ID" id="Friend_ID">';

                //Dynamic populating rows from the records returned
                for (var i=0; i < result.length; i++) {
                    responseHTML += '<option value="' + result[i].Friend_ID + '">' + result[i].Friend_ID + '</option>';
                }
				
				responseHTML += '</select>';
                responseHTML += '&nbsp;<input type="submit" />';
				responseHTML += '</form>';				

                res.send(responseHTML);
            }
        }
    );
});

// Display information about a User when given their Account_ID
app.get('/User/', function (req, res) {

    var myQry = 'SELECT * FROM User WHERE Account_ID=' + req.query.Account_ID;

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                res.send(buildUserView(result));
            }
        }
    );
});

// Display information about a Friend when given their Friend_ID
app.get('/Friend/', function (req, res) {

    var myQry = 'SELECT * FROM Friend WHERE Friend_ID=' + req.query.Friend_ID;

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                res.send(buildUserView(result));
            }
        }
    );
});

// Display information about a Forum when given their Forum_ID
app.get('/Forum/', function (req, res) {

    var myQry = 'SELECT * FROM Forum WHERE Forum_ID=' + req.query.Forum_ID;

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                res.send(buildForumView(result));
            }
        }
    );
});

// Display information about a Post when given their Post_ID
app.get('/Post/', function (req, res) {

    var myQry = 'SELECT * FROM Post WHERE Post_ID=' + req.query.Post_ID;

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                res.send(buildPostView(result));
            }
        }
    );
});

// Display a form that allows user to sign up an account
app.get('/User/add', function(req, res){

    var responseHTML = htmlHeader;

    responseHTML += '<html><head><title>Sign Up</title></head><body>' +
		'<h1>Register<h1>' +
        '<form action="/User/insert" method="GET">' +
        '<input type="hidden" name="Username" id="Username" />' +
		'<input type="hidden" name="Password" id="Password" />' +
        '<label for="Username">Username:</label> <input type="text" name="Username" id="Username" /><br />' +
        '<label for="Forum_Name">Forum Name:</label> <input type="text" name="Forum_Name" id="Forum_Name" /><br />' +
        '<label for="Password">Password:</label> <input type="text" name="Password" id="Password" /><br />' +
		'<label for="Email">Email:</label> <input type="text" name="Email" id="Email" /><br />' +
        '<input type="submit" />' +
        '</form>';

    responseHTML += htmlFooter;
    res.send(responseHTML);
});

// Display a form that allows user to enter friends
app.get('/Friend/add', function(req, res){

    var responseHTML = htmlHeader;

    responseHTML += '<html><head><title>Add Friend</title></head><body>' +
		'<h1>Add Friend<h1>' +
        '<form action="/Friend/insert" method="GET">' +
        '<label for="Friend_ID">Friend ID: </label> <input type="text" name="Friend_ID" id="Friend_ID" /><br />' +
        '<input type="submit" />' +
        '</form>';

    responseHTML += htmlFooter;
    res.send(responseHTML);
});

// Display a form that allows user to enter a thread
app.get('/Forum/add', function(req, res){

    var responseHTML = htmlHeader;

    responseHTML += '<html><head><title>New Thread</title></head><body>' +
		'<h1>New Thread<h1>' +
        '<form action="/Forum/insert" method="GET">' +
        '<label for="Posted_By">Posted By</label> <input type="text" name="Posted_By" id="Posted_By" /><br />' +
        '<label for="Thread">Thread</label> <input type="text" name="Thread" id="Thread" /><br />' +
        '<input type="submit" />' +
        '</form>';

    responseHTML += htmlFooter;
    res.send(responseHTML);
});

// Display a form that allows user to enter a post
app.get('/Post/add', function(req, res){

    var responseHTML = htmlHeader;

    responseHTML += '<html><head><title>New Post</title></head><body>' +
		'<h1>New Post<h1>' +
        '<form action="/Post/insert" method="GET">' +
        '<label for="Posted_By">Posted By</label> <input type="text" name="Posted_By" id="Posted_By" /><br />' +
        '<label for="Message">Message</label><br /><textarea name="Message" id="Message"></textarea><br />' +
        '<input type="submit" />' +
        '</form>';

    responseHTML += htmlFooter;
    res.send(responseHTML);
});

// Display a form that allows user to enter a User Account
app.get('/User/insert', function(req, res){

    var myQry = 'INSERT INTO User (Username, Forum_Name, Password, Email) VALUES (' +
        '\'' + req.query.Username + '\', ' +
        '\'' + req.query.Forum_Name + '\', ' +
		'\'' + req.query.Password + '\', ' +
        '\'' + req.query.Email + '\'' + 
	')';
    
    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                res.send('Account Created Sucessfully.');
            }
        })
});

// Display a form that allows user to enter a Friend
app.get('/Friend/insert', function(req, res){

    var myQry = 'INSERT INTO Friend (Friend_ID) VALUES (' +
        '\'' + req.query.Friend_ID + '\'' +
	')';
    
    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                res.send('Friend ID Added.');
            }
        })
});

// Display a form that allows user to enter a Thread
app.get('/Forum/insert', function(req, res){

    var myQry = 'INSERT INTO Forum (Thread, Posted_By) VALUES (' +
        '\'' + req.query.Thread + '\', ' +
        '\'' + req.query.Posted_By + '\'' + 
	')';
    
    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                res.send('Thread Created.');
            }
        })
});

// Display a form that allows user to enter a Post
app.get('/Post/insert', function(req, res){

    var myQry = 'INSERT INTO Post (Message, Posted_By) VALUES (' +
        '\'' + req.query.Message + '\', ' +
        '\'' + req.query.Posted_By + '\'' + 
	')';
    
    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                res.send('Message Posted.');
            }
        })
});

// Display information about a User when given their Account_ID and allow them to edit it.
app.get('/User/edit', function (req, res) {

    var myQry = 'SELECT * FROM User WHERE Account_ID=' + req.query.Account_ID;

    console.log(myQry);

    connection.query(myQry, function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {

                // Build the HTML table from the data in the User table
                var responseHTML = htmlHeader + '<html><head><title>Edit User Information</title></head><body>' +
						'<h1>Edit user Information<h1>';

                responseHTML += '<form action="/User/update" method="GET">';

                //Dynamic populating rows from the records returned
                if (result.length == 1) {

                    responseHTML += 'Username: <input type="text" name="Username" id="Username" value="' + result[0].Username + '" /><br />' +
                        'Forum Name: <input type="text" name="Forum_Name" id="Forum_Name" value="' + result[0].Forum_Name + '" /><br />' +
                        'Password: <input type="text" name="Password" id="Password" value="' + result[0].Password + '" /><br />' +                        
                        'E-mail: <input type="text" name="Email" id="Email" value="' + result[0].Email + '" /><br />' +                        						
						'<input type="hidden" name="Account_ID" id="Account_ID" value="' + result[0].Account_ID + '" />' +
                        '<input type="submit" />' +
                        '</form>' +
                        htmlFooter;

                    res.send(responseHTML);
                }
                else {
                    res.send('Failed User Edit.')
                }
            }
        }
    );
});

// Display information about a Student when given their Friend_Name and allow them to edit it.
app.get('/Friend/edit', function (req, res) {

    var myQry = 'SELECT * FROM Friend WHERE Friend_ID=' + req.query.Friend_ID;

    console.log(myQry);

    connection.query(myQry, function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {

                // Build the HTML table from the data in the Student table
                var responseHTML = htmlHeader + '<html><head><title>Edit Friend Information</title></head><body>' +
						'<h1>Edit Friend Information<h1>';

                responseHTML += '<form action="/Friend/update" method="GET">';

                //Dynamic populating rows from the records returned
                if (result.length == 1) {

                    responseHTML += 'Friend ID: <input type="hidden" name="Friend_ID" id="Friend_ID" value="' + result[0].Friend_ID + '" />' +
                        '<input type="submit" />' +
                        '</form>' +
                        htmlFooter;

                    res.send(responseHTML);
                }
                else {
                    res.send('Failed Friend Edit.')
                }
            }
        }
    );
});

// Display information about a Student when given their Forum_ID and allow them to edit it.
app.get('/Forum/edit', function (req, res) {

    var myQry = 'SELECT * FROM Forum WHERE Forum_ID=' + req.query.Forum_ID;

    console.log(myQry);

    connection.query(myQry, function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {

                // Build the HTML table from the data in the Student table
                var responseHTML = htmlHeader + '<html><head><title>Edit Forum Information</title></head><body>' +
						'<h1>Edit Forum Information<h1>';

                responseHTML += '<form action="/Forum/update" method="GET">';

                //Dynamic populating rows from the records returned
                if (result.length == 1) {

                    responseHTML += 'Thread: <input type="text" name="Thread" id="Thread" value="' + result[0].Thread + '" /><br />' +
                        '<input type="hidden" name="Forum_ID" id="Forum_ID" value="' + result[0].Forum_ID + '" />' +
                        '<input type="submit" />' +
                        '</form>' +
                        htmlFooter;

                    res.send(responseHTML);
                }
                else {
                    res.send('Failed Forum Edit.')
                }
            }
        }
    );
});

// Display information about a Student when given their Post_ID and allow them to edit it.
app.get('/Post/edit', function (req, res) {

    var myQry = 'SELECT * FROM Post WHERE Post_ID=' + req.query.Post_ID;

    console.log(myQry);

    connection.query(myQry, function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {

                // Build the HTML table from the data in the Student table
                var responseHTML = htmlHeader + '<html><head><title>Edit Post Information</title></head><body>' +
						'<h1>Edit Post Information<h1>';

                responseHTML += '<form action="/Post/update" method="GET">';

				//Dynamic populating rows from the records returned
                if (result.length == 1) {

                    //using an in line or ternary if to replace null with an empty string, otherwise null
                    //will appear in the input field
                    var message = (result[0].Message == null) ? '' : result[0].Message;

                    responseHTML += 'Message: <input type="text" name="Message" id="Message" value="' + result[0].Message + '" /><br />' +
                        '<input type="hidden" name="Post_ID" id="Post_ID" value="' + result[0].Post_ID + '" />' +
                        '<input type="submit" />' +
                        '</form>' +
                        htmlFooter;

                    res.send(responseHTML);
                }
                else {
                    res.send('Failed Post Edit.')
                }
            }
        }
    );
});

// Update a User's information given their Account_ID
app.get('/User/update', function (req, res) {

    var myQry = 'UPDATE User SET Username="' + req.query.Username + '", Forum_Name="' + req.query.Forum_Name + '", Password="' + req.query.Password + '", Email="' + req.query.Email + '" WHERE Account_ID=' + req.query.Account_ID;

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                connection.query('SELECT * FROM User WHERE Account_ID = ' + req.query.Account_ID,
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            res.send('An error occurred');
                        }
                        if(result.length == 1) {
                            res.send(buildUserView(result));
                        }
                        else {
                            res.send('No User found for that Student Number.');
                        }
                    });
            }
        }
    );
});

// Update a User's friend's list given their Friend_ID
app.get('/Friend/update', function (req, res) {

    var myQry = 'UPDATE Friend SET Friend_ID="' + req.query.Friend_ID + '" WHERE Friend_ID=' + req.query.Friend_ID;

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                connection.query('SELECT * FROM Friend WHERE Friend_ID = ' + req.query.Friend_ID,
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            res.send('An error occurred');
                        }
                        if(result.length == 1) {
                            res.send(buildUserView(result));
                        }
                        else {
                            res.send('No Friend found for that Friend_ID.');
                        }
                    });
            }
        }
    );
});

// Update a User's Forum given their Forum_ID
app.get('/Forum/update', function (req, res) {

    var myQry = 'UPDATE Forum SET Thread="' + req.query.Thread + '" WHERE Forum_ID=' + req.query.Forum_ID;

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                connection.query('SELECT * FROM Forum WHERE Forum_ID = ' + req.query.Forum_ID,
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            res.send('An error occurred');
                        }
                        if(result.length == 1) {
                            res.send(buildForumView(result));
                        }
                        else {
                            res.send('No Forum found for that Forum_ID.');
                        }
                    });
            }
        }
    );
});

// Update a User's Post given their Post_ID
app.get('/Post/update', function (req, res) {

    var myQry = 'UPDATE Post SET Message="' + req.query.Message + '" WHERE Post_ID=' + req.query.Post_ID;

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                connection.query('SELECT * FROM Post WHERE Post_ID = ' + req.query.Post_ID,
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            res.send('An error occurred');
                        }
                        if(result.length == 1) {
                            res.send(buildPostView(result));
                        }
                        else {
                            res.send('No Post found for that Post_ID.');
                        }
                    });
            }
        }
    );
});

// Route for deleting a User's record from the database.
app.get('/User/delete', function (req, res) {

    var myQry = 'DELETE FROM User WHERE Account_ID=' + req.query.Account_ID;

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                res.send('Account_ID: ' + req.query.Account_ID + ' successfully deleted.');
            }
        }
    );
});

// Route for deleting a Friend's record from the database.
app.get('/Friend/delete', function (req, res) {

    var myQry = 'DELETE FROM Friend WHERE Friend_ID=' + req.query.Friend_ID;

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                res.send('Friend_ID: ' + req.query.Friend_ID + ' successfully deleted.');
            }
        }
    );
});

// Route for deleting a Forum's record from the database.
app.get('/Forum/delete', function (req, res) {

    var myQry = 'DELETE FROM Forum WHERE Forum_ID=' + req.query.Forum_ID;

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                res.send('Forum_ID: ' + req.query.Forum_ID + ' successfully deleted.');
            }
        }
    );
});

// Route for deleting a Post's record from the database.
app.get('/Post/delete', function (req, res) {

    var myQry = 'DELETE FROM Post WHERE Post_ID=' + req.query.Post_ID;

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                res.send('Post_ID: ' + req.query.Post_ID + ' successfully deleted.');
            }
        }
    );
});

// Begin listening

app.listen(8026);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
