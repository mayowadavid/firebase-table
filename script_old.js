// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
    apiKey: "AIzaSyDUWdMeUsdCashx-0kNEOAKDEvk1_9-IK8",
    authDomain: "localhost",
    // For databases not in the us-central1 location, databaseURL will be of the
    // form https://[databaseName].[region].firebasedatabase.app.
    // For example, https://your-database-123.europe-west1.firebasedatabase.app
    databaseURL: "https://test2-df4e3-default-rtdb.firebaseio.com",
    storageBucket: "test2-df4e3.appspot.com"
};
firebase.initializeApp(config);



//observer logged in
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // ...
    } else {
        // User is signed out
        // ...
        window.location.href = "login.html";
    }
});
    
// Get a reference to the database service
var database = firebase.database();
var db1 = database.ref('Setd/Clin');
db1.once('child_added', (data) => {
    $("#paragraph_one").html(data.val().N);
    $("#paragraph_two").html(data.val().T);
});


var db2 = database.ref('Setd/Docn');
db2.on('child_added', (data) => {
    $("#bottom-center").html('<marquee>'+data.val().VD+'</marquee>');
    console.log(data.val());
    console.log(data.val().VD);
    getHosp(data.val().VD);
    
});


var db3 = database.ref('Setd/Dgna');
db3.on('child_changed', (data) => {
    
    var namesplit = data.val().Name.split(",");
    $(".thrline .leftti").html(namesplit[0]);
    $(".thrline .rightti").html(namesplit[1]);
    $(".secline .rightti").html(namesplit[2]);
    $(".counter-part1 p").html(namesplit[3]);



    if(namesplit[1] == "VIP9") {
        $(".big-count2").html(namesplit[0]);
        $(".after-bigcount2").html(namesplit[1]);
        $(".counter-part22 p").html(namesplit[2]);
        $(".counter-part12 p").html(namesplit[3]);
    } else {
        $(".big-count").html(namesplit[0]);
        $(".after-bigcount").html(namesplit[1]);
        $(".counter-part2 p").html(namesplit[2]);
        $(".counter-part1 p").html(namesplit[3]);
    }
     
});



//When the firebase (Setd-Docn-VD) data is updated and changed, the data content is displayed. (Decompose string). The documentation has an error
var db3 = database.ref('Setd/Dgna');
db3.on('child_changed', (data) => {
    var namesplit = data.val().Name.split(",");
    $(".thrline .leftti").html(namesplit[0]);
    $(".thrline .rightti").html(namesplit[1]);
    $(".secline .rightti").html(namesplit[2]);
    $(".counter-part1 p").html(namesplit[3]);
});
//

let refresh = 1000;//8000;
getLeftTitle();
function getLeftTitle() {
    var db2 = database.ref('Setd/Docn');
    var db3 = database.ref('Setd/Dgna');
    let all = [];
    let innerData = [];
    db3.on('child_added', async (data) => {
        var header3 = data.val().Name;
        innerData.push({header3});
       await console.log(innerData);
        getHosp(data.val().VD);
        
    });
    db2.on('child_added', async (data) => {
        var header1 = data.val().E;
        var header2 = data.val().N;
        var header3 = data.val().D;
        all.push({header1, header2, header3});
        console.log("This is All");
        console.log(all);
        console.log(all.length);
        await changeData(all);
        getHosp(data.val().VD);
        
    });
}
let index = 0;
let timeout = 4000;
let allBody = [];

var db3 = database.ref('Setd/Dgna');
db3.on('child_added', async(data) => {
var namesplit = data.val().Name.split(",");
let body1 = namesplit[0];
let body2 = namesplit[1];
let body3 = namesplit[2];
let body4 = namesplit[3];
await allBody.push({body1, body2, body3, body4});
});
    
 
function changeData(all){
    let update = async() => {
       const a_value = all[index].header1;
       const b_value = all[index].header2;
       const c_value = all[index].header3;
       if(allBody.length == all.length && index !== 0){
           console.log(allBody[index].body1);
           await $(".host-rect").html(
            '<h2>'+allBody[index].body1+'</h2> <h2>'+allBody[index].body2+'</h2> <h2>'+allBody[index].body3+'</h2>');
            console.log(allBody[index+1].body1);
            await $(".host-rect2").html('<h2>'+allBody[index+1].body1
            +'</h2> <h2>'+allBody[index+1].body2
            +'</h2> <h2>'+allBody[index+1].body3+'</h2>');
       }
       await $(".host-count-header").html(
        '<h2>'+a_value+'</h2> <h2>'+b_value+'</h2> <h2>'+c_value+'</h2>');
       const d_value = all[index+1].header1;
       const e_value = all[index+1].header2;
       const f_value = all[index+1].header3;
       await $(".host-count2-header").html(
        '<h2>'+d_value+'</h2> <h2>'+e_value+'</h2> <h2>'+f_value+'</h2>');
       if(index+2<all.length){index+=2;}
       else{index = 0;}
       setTimeout(update, timeout);
    }
    update();
}//EO changeData

function getHosp(value) {
    
    var query = database.ref("Dels/Hosp").orderByChild("date").equalTo(value);
    query.once("value", function(snapshot) {
        $(".list-view").html("");
        var total = snapshot.numChildren(); 
        var sub_total = 0;
        if(total > 16) {
            setInterval(function() {
                var current = parseInt($("#incnum").val());
                console.log(current);
                var start =  0;
                var end =  16;
                if(current > 1) {
                    var start =  16*current-16;
                    var end =  16*current;
                }
    
    var current_arr = snapshotToArray(snapshot).slice(start,end);
    console.log("ARR "+ start + " " + end);
    console.log(current_arr);

    $(".list-view").html("");

    current_arr.forEach(function(snapshotData) {
        $(".host-title").html(snapshotData.dena);
        var cno = snapshotData.cno;
        var listr = snapshotData.dena;
        $(".list-view").append(
            '<tr class="list-item"> <td>'
            +cno+'</td> <td>'
            +listr+'</td> </tr>'
        );
    });

    $("#incnum").val(parseInt($("#incnum").val())+1);
    sub_total += current_arr.length;


    console.log("SUBTOTAL: "+ sub_total);
    if(sub_total >= total) {
        $("#incnum").val(1);
    }

    
}, 10000);
        } else {
snapshot.forEach(function(snapshotData) {
    console.log(snapshotData.val());
    $(".host-title").html(snapshotData.val().dena);
    var cno = snapshotData.val().cno;
    var listr = snapshotData.val().dena;
    $(".list-view").append(
        '<tr class="list-item"> <td>'+cno+'</td> <td>'+listr+'</td> </tr>'
    );
});
        }
    
    })
}


function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};

function addData() {
    // var postListRef = firebase.database().ref('Setd/Clin');
    // var newPostRef = postListRef.push();
    // newPostRef.set({
    //     A: "testnort",
    //     D: "gg",
    //     Dt: 111111111111,
    //     N: "Compassionate home1",
    //     T: "12345678"
    // });


    // var postListRef = firebase.database().ref('Setd/Docn');
    // var newPostRef = postListRef.push();
    // newPostRef.set({
    //     B: "99",
    //     Cr: "30",
    //     D: "room1",
    //     Dt: 111111111111,
    //     E: "abcd",
    //     N: "the host1",
    //     Or: "30",
    //     SNu: "1",
    //     VD: "20210525E",
    //     ynR: "1"
    // });



    var postListRef = firebase.database().ref('Setd/Dgna');
    var newPostRef = postListRef.push();
    newPostRef.set({
        Dt: 111111111111,
        N: "room1",
        Name: "46,VIP9,room1,2",
        No: 1
    });
}


function SetdDgnaChildUpdated() {
    var updateID = "-MbxMf8tXAje-Rm_kdat";
    firebase.database().ref('Setd/Dgna/' + updateID).set({
        Dt: 111111111111,
        N: "room1",
        Name: "45,VIP9,room1,6",
        No: 2
    });
}

			function logout() {
			firebase.auth().signOut().then(function() {
			  // Sign-out successful.
			  window.location.href = "login.html";
			}).catch(function(error) {
			  // An error happened.
			});
			}

setInterval(function(){ 
    //current time and date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var hour = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    today = dd + ' ' + monthNames[parseInt(mm)-1] + ' ' + yyyy + ' ' + hour + ':' + minutes + ':' + seconds;
    $(".full-date h2").html(today);
}, 1000);
           