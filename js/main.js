(function () {
  if (localStorage.getItem("tasks") == null) {
    var _tasks = [];
    localStorage.setItem("tasks", JSON.stringify(_tasks));
    var _tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  else {
    var _tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  $("#send-data").on("click", function(e){
    e.preventDefault();
    addTask();
  })
  $(".main-page .current").on("click", getTasks());
  $(".color-picker a").on("click", function(e){
    e.preventDefault();
    var taskColor = $(this).attr("data-color");
    var colorName = $(this).attr("class");
    $(".color-picker a").removeClass("active");
    $(this).addClass("active");
    $(".color-picker").attr("data-set", taskColor);
    $(".add-task #name").css("color", taskColor);
    $(".add-task #name").removeAttr("class");
    $(".add-task #name").addClass(colorName);
    $(".add-task #name").focus();
  })
  function getTasks(){
    for (var prop in _tasks) {
      console.log(_tasks[prop]);
      var expDate = _tasks[prop].expDate.replace(/\//g, ".");
      var percentage = (_tasks[prop].progress / _tasks[prop].qt) * 100;
      var progressPercentage = percentage / 300;
      progressPercentage += "px";
      percentage += "%";
      $(".main-page .process-tasks .tasks-wrapper").append("<div class='task-block'>"+
      "<div class='name'>"+ _tasks[prop].name +"</div>"+
      "<div class='date'><span>exp. date: </span><span class='exp-date'>"+ expDate +"<span></div>"+
      "<div class='precent'>"+ percentage +"</div>"+
      "<div class='progress-wrapper'><div class='progress-bg' style='background-color: "+ _tasks[prop].color +"'></div><div class='progress-bar' style='background-color: "+ _tasks[prop].color +"; width: "+ progressPercentage +"'></div></div>"+
      "</div>")
    }
  };
  function addTask(){
    var singleTask = {};
    singleTask.name = $(".add-task #name").val();
    singleTask.color = $(".color-picker").attr("data-set");
    var countType = $("input[name=countType]:checked").val();
    if (countType == "time") {
      singleTask.time = $(".add-task #qt").attr("data-current-number");
      singleTask.qt = false;
    }
    else {
      singleTask.qt = $(".add-task #qt").attr("data-current-number");
      singleTask.time = false;
    }
    singleTask.countTomatoes = $("input[name=isTomatoes]:checked").val();
    singleTask.countTime = $("input[name=isTime]:checked").val();
    singleTask.expDate = $(".add-task #exp-date").val();
    singleTask.comment = $(".add-task #comment").val();
    singleTask.progress = 0;
    singleTask.createDate = $.now();
    _tasks.push(singleTask);
    localStorage.setItem("tasks", JSON.stringify(_tasks));
    console.log(JSON.parse(localStorage.getItem("tasks")));
  };
  function updateTask(){

  };
  var task = {
    name: "Meditation",
    color: "#69F0AE",
    qt: 10,
    progress: 5,
    time: false,
    date: "20 dec 2017",
    countTime: false,
    tomatos: false,
    comment: "Meditation makes me really happy!",
    status: "current",
    createDate: "30 nov 2017",
    updateDate: false
  };

  $("#exp-date").datepicker();

  $("#quantity").slideNumbers();
  // console.log(JSON.parse(localStorage.getItem("")));
})();
