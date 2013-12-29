function $(id) {
  return document.getElementById(id);
}
function toggle(id) {
  if ($(id)) {
    $(id).className = $(id).className ? "" : "light";
    return $(id).className ? 1 : -1;
  }
  else
    return 0;
}
$("start").onclick = function() {
  $("board").innerHTML = "";
  var n = $("n").value, m = $("m").value, remain = 0;
  for (var i = 0; i < n; i++) {
    var row = document.createElement("tr");
    for (var j = 0; j < m; j++) {
      var cell = document.createElement("td");
      cell.id = i + "," + j;
      if (Math.random() > 0.5) {
        cell.className = "light";
        remain++;
      }
      cell.onclick = function() {
        var xy = this.id.split(",");
        remain += toggle(this.id);
        remain += toggle(Number(xy[0]) - 1 + "," + xy[1]);
        remain += toggle(Number(xy[0]) + 1 + "," + xy[1]);
        remain += toggle(xy[0] + "," + (Number(xy[1]) - 1));
        remain += toggle(xy[0] + "," + (Number(xy[1]) + 1));
        $("remain").innerHTML = remain;
        if (!remain)
          $("board").innerHTML =
              "Congratulations! You turn off all the fucking lights!";
      };
      row.appendChild(cell);
    }
    $("board").appendChild(row);
  }
  $("remain").innerHTML = remain;
};
