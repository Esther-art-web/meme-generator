let firstText,secondText,topTextSize, bottomTextSize,imageInput, drawBtn, eraseBtn, colorPicker,canvas,genMeme,context;

function generateMeme(img, firstText, secondText,topTextSize,bottomTextSize){
    let fontSize;
    canvas.width= 1500;
    canvas.height= 1500;
    context.clearRect(0,0,canvas.width,canvas.height);
    context.drawImage(img,0,0,canvas.width,canvas.height);
    
    context.fillStyle="white";
    context.strokeStyle="black";
    context.lineWidth="30px";
    context.textAlign="center";

    fontSize= canvas.width* topTextSize;
    context.font= fontSize +"px Impact";
    context.textBaseLine="top";
    context.fillText(firstText,canvas.width/1.8,fontSize,canvas.width);
    context.strokeText(firstText,canvas.width/1.8,fontSize,canvas.width);

    fontSize= canvas.width* bottomTextSize;
    context.font= fontSize +"px Impact";
    context.textBaseLine="bottom";
    context.fillText(secondText,canvas.width/1.5,canvas.height,canvas.width);
    context.strokeText(secondText,canvas.width/1.5,canvas.height,canvas.width);

}
function initialize(){
    firstText=document.getElementById("top-txt");
    secondText=document.getElementById("bottom-txt");
    canvas=document.getElementById("canvas");
    imageInput= document.getElementById("file-slctr");
    genMeme= document.getElementById("meme-gen");
    colorPicker= document.getElementById("color-picker");
    drawBtn=document.getElementById("draw-btn");
    eraseBtn=document.getElementById("erase-btn");
    topTextSize=document.getElementById("top-txt-size");
    bottomTextSize=document.getElementById("bottom-txt-size");
    context= canvas.getContext("2d");

    canvas.width=canvas.height= 1500 ;

    genMeme.addEventListener('click', function(){
        let reader=new FileReader();
        reader.onload=function(){
            let img=new Image;
            img.src= reader.result;
            generateMeme(img,firstText.value,secondText.value,topTextSize.value,bottomTextSize.value);
        }
        reader.readAsDataURL(imageInput.files[0]);
    });
    
    
    let isMouseDown= false;
    let x,y;

    const stopDrawing=()=>{ 
        isMouseDown= false
    }
    const startDrawing=event=> {
        isMouseDown=true
        [x,y] = [event.offsetX, event.offsetY];
    }
    const drawLine=event=>{
        if ( isMouseDown ) {
            const newX = event.offsetX;
            const newY = event.offsetY;
            context.beginPath();
            context.moveTo( x, y );
            context.lineTo( newX, newY );
            context.stroke();
            [x, y] = [newX, newY];
            
        }
        
    }
    drawBtn.addEventListener('click',event=>{
        canvas.addEventListener( 'mousedown', startDrawing );
        canvas.addEventListener( 'mousemove', drawLine );
        canvas.addEventListener( 'mouseup', stopDrawing );
        canvas.addEventListener( 'mouseout', stopDrawing );
    });

    eraseBtn.addEventListener('click', function(){
        let reader=new FileReader();
        reader.onload=function(){
            let img=new Image;
            img.src= reader.result;
            generateMeme(img,firstText.value,secondText.value,topTextSize.value,bottomTextSize.value);
        }
        reader.readAsDataURL(imageInput.files[0]);
    });
    
    colorPicker.addEventListener('change',event=>{
        context.strokeStyle= event.target.value;

    });
    
}

initialize();