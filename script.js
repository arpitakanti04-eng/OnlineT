const display = document.getElementById("display");

function append(value){
display.value += value;
}

function clearDisplay(){
display.value = "";
}

function deleteLast(){
display.value = display.value.slice(0,-1);
}

function calculate(){

try{
display.value = eval(display.value);
}
catch{
display.value = "Error";
}

}

// Keyboard Support

document.addEventListener("keydown",function(event){

const key = event.key;

if((key>='0' && key<='9') ||
key=='+' || key=='-' || key=='*' ||
key=='/' || key=='.' || key=='%')
{
append(key);
}

else if(key==="Enter")
{
calculate();
}

else if(key==="Backspace")
{
deleteLast();
}

else if(key==="Escape")
{
clearDisplay();
}

});