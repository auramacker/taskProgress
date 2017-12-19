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
      $(".main-page .process-tasks .tasks-wrapper").append("<div class='task-block'>"+
      "<div class='name'>"+ _tasks[prop].name +"</div>"+
      "<div class='date'><p>exp. date: </p><span class='exp-date'>"+ _tasks[prop].expDate +"<span></div>"+
      "<div class='precent'></div>"+
      "<div class='progress-bar'></div>"+
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
  // localStorage.setItem("first", JSON.stringify(task));
  //$(".add-task input").selectize();
  $(".add-task #exp-date").datepicker();
  $("input[type=radio], input[type=checkbox]").iCheck({
    checkboxClass: 'icheckbox_flat-pink',
    radioClass: 'iradio_flat-pink'
  });
  $("#qt").slideNumbers();
  // console.log(JSON.parse(localStorage.getItem("")));
})();
