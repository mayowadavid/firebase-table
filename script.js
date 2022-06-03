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
        //window.location.href = "login.html";
    }
});
    
// Get a reference to the database service
var database = firebase.database();
var db1 = database.ref('Setd/Clin');
var db2 = database.ref('Setd/Docn');
var db3 = database.ref('Setd/Dgna');
var db4 = database.ref('Dels/Hosp');

//globals
let refresh = 1000;//8000;
let all = [];
let allBody = [];
let innerData = [];

db1.once('child_added', (data) => {
    $("#paragraph_one").html(data.val().N);
    $("#paragraph_two").html(data.val().T);
    $("#paragraph_three").html(data.val().N);
    $("#paragraph_four").html(data.val().T);
    //console.log("Child Added, Setd/clin ");
    //console.log(data.val());
});
//Get Left Title
db2.on('child_added', async (data) => {
    $("#bottom-center").html('<marquee>'+data.val().VD+'</marquee>');
    var header1 = data.val().E;
    var header2 = data.val().N;
    var header3 = data.val().D;
    var popContent = data.val().VD
    all.push({header1, header2, header3, popContent});
    getHosp(data.val().VD);
});

db3.on('child_added', async(data) => {
    var namesplit = data.val().Name.split(",");
    let body1 = namesplit[0];
    let body2 = namesplit[1];
    let body3 = namesplit[2];
    let body4 = namesplit[3];
    var footnum = data.val().No
    await allBody.push({body1, body2, body3, body4, footnum});
    
    var header3 = data.val().Name;
    innerData.push({header3});
    //await console.log(innerData);    
});
let hospContent = [];
db4.on('child_added', async (data) => {
    var hospMood = data.val().mood;
    var hospDena = data.val().dena;
    var hospName = data.val().name;
    var hospCno = data.val().cno;
    hospContent.push({hospMood, hospDena, hospName, hospCno});
});
    
    
db3.on('child_changed', async(data) => {
    var namesplit = data.val().Name.split(",");
    let body1 = namesplit[0];
    let body2 = namesplit[1];
    let body3 = namesplit[2];
    let body4 = namesplit[3];
    var footnum = data.val().No
    await allBody.push({body1, body2, body3, body4, footnum});

   $(".pop_wrapper").show();
    setTimeout(function(){ 
        $(".pop_wrapper").hide();
     }, 8000);
});


let index = 0;
let index2 = 1;
let timeout = 4000;

hospUpdate();
async function hospUpdate(){
    if(index<=hospContent.length){
       let a_hosp = all[index].hospMood;
       let b_hosp = all[index].hospDena;
       let c_hosp = all[index].hospName;
       let d_hosp = all[index].hospCno;
       await a_hosp == 2 && (await $(".mood").html(Evening));
       await a_hosp == 1 && (await $(".mood").html(Goodmorning));
       await $(".pop_content2").html(b_hosp);
       await $(".pop_middle").html(d_hosp);
       await $(".pop_middle2").html(c_hosp);
        index+=2;
    }
    else{index = 0}
    if(index2<all.length){
       let d_hosp = all[index2].hospMood;;
       let e_hosp  = all[index2].hospDena;
       let f_hosp  = all[index2].hospName;
       let g_hosp = all[index2].hospCno;
       await d_hosp == 2 && (await $(".mood").html('Evening'));
       await d_hosp == 1 && (await $(".mood").html('Goodmorning'));
       await $(".pop_content2").html(e_hosp);
       await $(".pop_middle").html(g_hosp);
       await $(".pop_middle2").html(f_hosp);
       
        index2 += 2;
    }
    else{index2 = 1;}
    setTimeout(hospUpdate, timeout);
}//EO update.



update();
async function update(){
    if(index<all.length){//&& allBody.length == all.length){
       let a_value = all[index].header1;
       let b_value = all[index].header2;
       let c_value = all[index].header3;
       let d_value = all[index].popContent;
       await $(".pop_content").html(d_value);
       await $(".host-title").html(c_value);
       await $(".pop_content").html(allBody[index].body1);
       await $(".pop_content2").html(allBody[index].body2);
       await $(".pop_middle3").html('<h1>'+allBody[index].body3+'</h1>');
       await $(".pop_middle3").html('<p>'+allBody[index].body4+'</p>');
       await $(".host-count-header")
       .html(
        ' <B>'+a_value+'</B> '
        +'<B>'+b_value+'</B> '
        +'<B>'+c_value+'</B>');
        await $(".host-rect")
        .html(
        ' <B>'+allBody[index].body1+'</B>'
        +'<B>'+allBody[index].body2+'</B> '
        +'<p>'+allBody[index].footnum+'</p>');
        index+=2;
    }
    else{index = 0}
    if(index2<all.length){
       let d_value = all[index2].header1;
       let e_value = all[index2].header2;
       let f_value = all[index2].header3;
       let g_value = all[index2].popContent;
       await $(".pop_content").html(g_value);
        await $(".host-count2-header")
        .html(
        '  <B>'+d_value+'</B>'
        +' <B>'+e_value+'</B>'
        +' <B>'+f_value+'</B>');
        await $(".host-rect2")
        .html(
        '  <B>'+allBody[index2].body1+'</B>'
        +' <B>'+allBody[index2].body2+'</B>'
        +' <p>'+allBody[index2].footnum+'</p>');
        index2 += 2;
    }
    else{index2 = 1;}
    setTimeout(update, timeout);
}//EO update.





function getHosp(value) {
    
    var query = database.ref("Dels/Hosp").orderByChild("date").equalTo(value);
    query.once("value", function(snapshot) {
        $("#list-view-side1").html("");
        $("#list-view-side2").html("");
        var total = snapshot.numChildren(); 
        console.log(total)
        var sub_total = 0;
        if(total >= 20) {
            setInterval(function() {
                var current = parseInt($("#incnum").val());
                //console.log(current);
                var start =  0;
                var end =  20;
                if(current > 1) {
                    var start =  20*current-20;
                    var end =  20*current;
                }
                var current_arr = snapshotToArray(snapshot).slice(start,end);
                //console.log("ARR "+ start + " " + end);
                //console.log(current_arr);
                $("#list-view-side1").html("");
                $("#list-view-side2").html("")
                  function put(snapshotData, list){
                    var cno = snapshotData.cno;
                    var listr = snapshotData.dena;
                    list.append(
                        '<tr class="list-item">'
                        +' <td>'+cno+'</td> '
                        +'<td>'+listr+'</td> '
                        +'</tr>'
                    );
                  }//EO put
                  var arr1 = current_arr.slice(0,10);
                  var arr2 = current_arr.slice(10);
                  arr1.forEach(function(snapshotData){
                      put(snapshotData, $("#list-view-side1"));
                  });
                  arr2.forEach(function(snapshotData){
                      put(snapshotData, $("#list-view-side2"))
                  })
        

            $("#incnum").val(parseInt($("#incnum").val())+1);
            sub_total += current_arr.length;
            //console.log("SUBTOTAL: "+ sub_total);
            if(sub_total >= total) {
                $("#incnum").val(1);
            }
            }, 10000);
        } else {
            function putIn(snapshotData, list){
            //console.log(snapshotData.val());
            var cno = snapshotData.val().cno;
            var listr = snapshotData.val().dena;
            list.append(
            '<tr class="list-item"> <td>'+cno+'</td> <td>'+listr+'</td> </tr>'
            );
            }//EO putIn
            var arr1 = snapshot.slice(0,12);
            var arr2 = snapshot.slice(12);
            arr1.forEach(function(snapshotData){
                putIn(snapshotData, $("#list-view-side1"));
            });
            arr2.forEach(function(snapshotData){
                putIn(snapshotData, $("#list-view-side2"))
            })//EO
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

/*function addData() {
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
    });*/
/*}*/


/*function SetdDgnaChildUpdated() {
    var updateID = "-MbxMf8tXAje-Rm_kdat";
    firebase.database().ref('Setd/Dgna/' + updateID).set({
        Dt: 111111111111,
        N: "room1",
        Name: "45,VIP9,room1,6",
        No: 2
    });*/
/*}*/

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
    time = yyyy+ '/' + (parseInt(mm)) + '/' + dd;
    date = hour + ':' + minutes + ':' + seconds;
    $(".date").html(date);
    $(".time").html(time);
}, 1000);
           