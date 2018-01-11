var model = {
  test: "Hello",
  circleData: {
	qt: 10,
	current: 6
  },
  countPercents: function(x, y) { // y - 100%
	return (x/y)*100;
  },
  countPercentsFrom: function(number, from) {
	return (number*from)/100
  },
  getRadians: function(degrees) {
	return (Math.PI/180)*degrees
  }
};
var view = {
  ctx: {},
  mC: {},
  mouseX: {},
  mouseY: {},
	refreshPage: function(){
		location.reload(true);
	},
	preloader: function(){
		setTimeout(function() {
			$('.tp-preloader').fadeOut(300);
		}, 300);
	},
	setActiveSlide: function(num) {
		$('.tp-slides li').removeClass('is-active');
		$('.tp-slides li:nth-child('+ num +')').addClass('is-active');
	},
	writeUserName: function(place, name) {
		place.text(name);
	},
  log: function(data) {
	console.log(data);
  },
  renderCircle: function(progress, isTimer, isTomatoes){
	this.mC = document.getElementById("magicCircle");
	mC = this.mC;
	this.ctx = mC.getContext("2d");
	ctx = view.ctx;
	ctx.clearRect(0, 0, ctx.width, ctx.height);
	ctx.beginPath();
	var startDegrees = model.getRadians(-90);
	ctx.arc(250,250,100, startDegrees, startDegrees + model.getRadians(progress), false);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(250, 250, 60, 0, Math.PI * 2, false);
	if (ctx.isPointInPath(this.mouseX, this.mouseY)) {
	  ctx.fillStyle = "red";
	}
	else {
	  ctx.fillStyle = 'black';
	}
	ctx.fill();
  },
  findOffset: function(canvas) {
	return {x: $(canvas).offset().left, y: $(canvas).offset().top}
  },
  clearCanvas: function(){
	this.ctx.clearRect(0,0, this.mC.width, this.mC.height);
  }
};
var controller = {
	refreshPage: function(){
		view.refreshPage();
	},
	callPreloader: function(){
		view.preloader();
	},
	pageNavigate: function(pageNumber){
		if (pageNumber !== "undefined") {
			view.setActiveSlide(pageNumber);
		}
	},
	writeName: function(){
		view.writeUserName($('#second-slide h3 span') ,$('input[name="username"]').val());
	},
  checkLocalRights: function(){
	try {
	  if (localStorage.getItem("tasks") == null) {
		var _tasks = [];
		localStorage.setItem("tasks", JSON.stringify(_tasks));
		var _tasks = JSON.parse(localStorage.getItem("tasks"));
				view.setActiveSlide(2);
	  }
	  else {
		var _tasks = JSON.parse(localStorage.getItem("tasks"));
				view.setActiveSlide(2);
	  }
	}
	catch(e) {
	  view.setActiveSlide(1);
	}
  },
  drawCircle: function(number, oF) {
	var percents = model.countPercents(number, oF);
	var degrees = model.countPercentsFrom(percents, 360);
	view.renderCircle(degrees, false, false);
  },
  canvasMouse: function(x, y){
	var pos = view.findOffset(view.mC);
	view.mouseX = x - pos.x;
	view.mouseY = y - pos.y;
	view.clearCanvas(view.mC);
	this.drawCircle(7, 10);
  }
};

(function(){
  var app = {
	init: function(){
	  this.event();
	},
	event: function(){
	  $(document).ready(function(){
		controller.checkLocalRights();
				controller.callPreloader();
		controller.drawCircle(7, 10);
	  });
			$('input[name="username"]').on('keyup', function () {
				controller.writeName();
			});
	  $("#magicCircle").on("mousemove", function(e) {
		controller.canvasMouse(e.pageX, e.pageY);
	  });
			$('a[data-go-to]').on('click', function(e) {
				e.preventDefault();
				controller.pageNavigate($(this).attr('data-go-to'));
			});
			$('#first-slide .tp-btn').on('click', function(e){
				e.preventDefault();
				controller.refreshPage();
			})
	}
  }
  app.init()
})();


// (function () {
//   if (localStorage.getItem("tasks") == null) {
//     var _tasks = [];
//     localStorage.setItem("tasks", JSON.stringify(_tasks));
//     var _tasks = JSON.parse(localStorage.getItem("tasks"));
//   }
//   else {
//     var _tasks = JSON.parse(localStorage.getItem("tasks"));
//   }
//   $("#send-data").on("click", function(e){
//     e.preventDefault();
//     addTask();
//   })
//   $(".main-page .current").on("click", getTasks());
//   $(".color-picker a").on("click", function(e){
//     e.preventDefault();
//     var taskColor = $(this).attr("data-color");
//     var colorName = $(this).attr("class");
//     $(".color-picker a").removeClass("active");
//     $(this).addClass("active");
//     $(".color-picker").attr("data-set", taskColor);
//     $(".add-task #name").css("color", taskColor);
//     $(".add-task #name").removeAttr("class");
//     $(".add-task #name").addClass(colorName);
//     $(".add-task #name").focus();
//   })
//   function getTasks(){
//     for (var prop in _tasks) {
//       console.log(_tasks[prop]);
//       var expDate = _tasks[prop].expDate.replace(/\//g, ".");
//       var percentage = (_tasks[prop].progress / _tasks[prop].qt) * 100;
//       var progressPercentage = percentage / 300;
//       progressPercentage += "px";
//       percentage += "%";
//       $(".main-page .process-tasks .tasks-wrapper").append("<div class='task-block'>"+
//       "<div class='name'>"+ _tasks[prop].name +"</div>"+
//       "<div class='date'><span>exp. date: </span><span class='exp-date'>"+ expDate +"<span></div>"+
//       "<div class='precent'>"+ percentage +"</div>"+
//       "<div class='progress-wrapper'><div class='progress-bg' style='background-color: "+ _tasks[prop].color +"'></div><div class='progress-bar' style='background-color: "+ _tasks[prop].color +"; width: "+ progressPercentage +"'></div></div>"+
//       "</div>")
//     }
//   };
//   function addTask(){
//     var singleTask = {};
//     singleTask.name = $(".add-task #name").val();
//     singleTask.color = $(".color-picker").attr("data-set");
//     var countType = $("input[name=countType]:checked").val();
//     if (countType == "time") {
//       singleTask.time = $(".add-task #qt").attr("data-current-number");
//       singleTask.qt = false;
//     }
//     else {
//       singleTask.qt = $(".add-task #qt").attr("data-current-number");
//       singleTask.time = false;
//     }
//     singleTask.countTomatoes = $("input[name=isTomatoes]:checked").val();
//     singleTask.countTime = $("input[name=isTime]:checked").val();
//     singleTask.expDate = $(".add-task #exp-date").val();
//     singleTask.comment = $(".add-task #comment").val();
//     singleTask.progress = 0;
//     singleTask.createDate = $.now();
//     _tasks.push(singleTask);
//     localStorage.setItem("tasks", JSON.stringify(_tasks));
//     console.log(JSON.parse(localStorage.getItem("tasks")));
//   };
//   function updateTask(){
//
//   };
//   var task = {
//     name: "Meditation",
//     color: "#69F0AE",
//     qt: 10,
//     progress: 5,
//     time: false,
//     date: "20 dec 2017",
//     countTime: false,
//     tomatos: false,
//     comment: "Meditation makes me really happy!",
//     status: "current",
//     createDate: "30 nov 2017",
//     updateDate: false
//   };
//
//   $(".add-task #exp-date").datepicker();
//   $("input[type=radio], input[type=checkbox]").iCheck({
//     checkboxClass: 'icheckbox_flat-pink',
//     radioClass: 'iradio_flat-pink'
//   });
//   $("#qt").slideNumbers();
//   // console.log(JSON.parse(localStorage.getItem("")));
// })();
