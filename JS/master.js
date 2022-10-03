let title = document.getElementById("title");
let small = document.getElementById("total")

console.log(small)

title.onkeyup = function(){
    if(title.value.length < 10 )
    small.innerHTML =  title.value
}