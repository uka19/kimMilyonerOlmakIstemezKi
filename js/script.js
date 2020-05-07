
var time = 20;
var timeOut = false;

var soru1 = "Resimdeki Şifaiye Medresesi hangi ilimizde yer almaktadır?";
var secenekler1 = ["Sivas","Adana","Tokat","Konya"];
var cevap1 = "Sivas";

var soru2 = "'Koyun kurt ile gezerdi, fikir başka başka olmazsa' sözleri hangi ozana aittir?"
var secenekler2 = ["Aşık Veysel","Kul Emrah","Karacaoğlan","William Shakespeare"];
var cevap2 = "Aşık Veysel";

var soru3 = "Meşhur Hobbit Köyü ne zaman açılmıştır?"
var secenekler3 = ["2015","2017","2019","2018"];
var cevap3 = "2019";

var soru4 = "Dinelemekte olduğunuz müziği söylemekte olan sanatçımız kimdir?"
var secenekler4 = ["Ferdi Tayfur","Müslüm Gürses"];
var cevap4 = "Müslüm Gürses";

var soru5 = "Ankara ne zaman başkent olmuştur?"
var secenekler5 = ["1923","1924"];
var cevap5 = "1923";

var sorular = [soru1,soru2,soru3,soru4,soru5];
var secenekler = [secenekler1,secenekler2,secenekler3,secenekler4,secenekler5];
var cevaplar = [cevap1,cevap2,cevap3,cevap4,cevap5];

var chapter = 0,score = 0;

var myTimer;

$("#startButton").click(function(){
	$("#startMenu").slideUp(100);
	$("#header").html("Süre:"+" "+"Skor:");
	var elmnt1 = '<div id="mediaArea"><img id="media" src=""></div>';
	var elmnt2 = '<div id="bottomArea"></div>';
	$("body").append(elmnt1,elmnt2);
	
});
function play(){
	var sMusic = document.getElementById("startMusic").play();
	setTimeout(function (){
		myTimer = setInterval(timer, 1000);
		document.getElementById("timeMusic").play();
		getQuestion();
	}, 8715);
}
function timer(){
	countDown();
}
function countDown(){
	if(time>0){
		time--;
		 $("#header").html("Süre:"+time+" "+"Skor:"+score+"/"+(chapter+1));
	}else{
		if(timeOut == false){
			timeOut=true;
			clearInterval(myTimer);
			document.getElementById("timeMusic").pause();
			document.getElementById("falseMusic").play();
			setTimeout(function(){
				showTrueAnswer();
				setTimeout(function(){
					nextQuestion();
				},2000)
			},2000);
		}
	}
}
function showTrueAnswer(){
	$( ".answerArea" ).each(function() {
		if($( this ).html()==cevaplar[chapter]){//doğru olan şıkkı sarıya boyar.
			$( this ).css("background-color","yellow");
		}
	});
}
function chooseAnswer(x){
	$(x).css("background-color","orange");
	document.getElementById("timeMusic").pause();
	clearInterval(myTimer);
	setTimeout(function(){
		if($(x).html() == cevaplar[chapter]){
			$(x).css("background-color","green");
			document.getElementById("correctMusic").play();
			score++;
		}else{
			$(x).css("background-color","red");
			document.getElementById("falseMusic").play();
			document.getElementById("timeMusic").pause();
			showTrueAnswer();
		}
		setTimeout(function(){
				nextQuestion();
			},3000);
	},2000);
}
function nextQuestion(){
	if(chapter<4){
		time = 20;
		chapter++;
		timeOut = false;
		$( ".answerArea" ).each(function(){
			$( this ).remove();
		});
		$( "#questionArea" ).remove();
		getQuestion();
		document.getElementById("timeMusic").currentTime=0;
		document.getElementById("timeMusic").play();
		myTimer = setInterval(timer, 1000);
	}else{
		alert("Skorunuz:"+score+"/5");
		location.reload();
	}
}
function getQuestion(){
	var question = '<div id="questionArea">'+sorular[chapter]+'</div>';
	$("#media").css("visibility","hidden");
	if(chapter == 0){
		$("#media").css("visibility","visible");
		$("#media").css("width","500px");
		$("#media").attr("src", "assets/medrese.jpg");
	}
	if(chapter == 3){
		document.getElementById("soundQuestion").play();
	}else{
		document.getElementById("soundQuestion").pause();
	}
	$("#bottomArea").append(question);
	for (let i = 0 ; i < secenekler[chapter].length ; i++) {
		var cevaplar = secenekler[chapter];
		var answerBar = '<div class="answerArea" onclick="chooseAnswer(this)">'+cevaplar[i]+'</div>';
		$("#bottomArea").append(answerBar);
	}
}
