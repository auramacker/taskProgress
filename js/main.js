(function () {
  var _tasks = [];
  function getTasks(){

  };
  function addTask(){
    var singleTask = {};
    singleTask.name = $(".add-task #name").val();
    var countType = $("input[name=countType]:checked").val();
    if (countType == "time") {
      singleTask.time = $(".add-task #qt");
      singleTask.qt = false;
    }
    else {
      singleTask.qt = $(".add-task #qt");
      singleTask.time = false;
    }
    singleTask.countTomatoes = $("input[name=isTomatoes]:checked").val();
    singleTask.expDate = $(".add-task #exp-date").val();
    singleTask.comment = $(".add-task #comment").val();
    singleTask.createDate = $.now();
    singleTask.update
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
    comment: "Meditation makes me really hap py!",
    status: "current",
    createDate: "30 nov 2017",
    updateDate: false
  };
  //localStorage.setItem("first", JSON.stringify(task));
  $("#test").selectize();
  $(".add-task #exp-date").datepicker();
  console.log(JSON.parse(localStorage.getItem("first")));
})();
