var input = document.getElementById('sidebarFilter');

input.addEventListener("keyup", filterList);

function filterList() {
    var filter = input.value.toUpperCase();
    var ul = document.getElementById("turfModules");
    var li = ul.getElementsByTagName('li');

    for (var i = 0; i < li.length; i++) {
        if (li[i].className === "category"){
            continue;
        }
        var a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}