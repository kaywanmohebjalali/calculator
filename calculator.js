"use strict"

let $ =document;
let buttonsBasic = $.querySelectorAll('.basic button')
let buttonsAdvance = $.querySelectorAll('.advance button')
let buttonType = $.querySelectorAll('.type')
let buttonOperator = $.querySelectorAll('.operator')
let buttonComputing = $.querySelectorAll('.computing')
let changeCalculator =$.querySelector('.changeCalculator')
let showElement =$.querySelector('.show h3')
let resultElement =$.querySelector('.result')
let containerElement =$.querySelector('.container')
let basicElement =$.querySelector('.basic')
let advanceElement =$.querySelector('.advance')
let lcdElement =$.querySelector('.show')
let [text, bracket, lastIndexes] = ['', 0, []]

advanceElement.style.display='none'






function findLastIndex(value){
    let result = ''
    for(let i=value.length-1;i>=0;i--){
            result+=value[i]
             if(isNaN(result) ){
                return i
             }
    }
        return -1
    
}










function updateDisplay(value){

    value=Number(value).toFixed(6)
    let numStr = String(value);
    if (numStr.includes('.')) { 
        let [wholePart, decimalPart] = numStr.split('.');
      decimalPart = decimalPart.replace(/0+$/g, ''); 
      if (decimalPart !== '') { 
        value =  parseFloat(`${wholePart}.${decimalPart}`);
      } else { 
        value = wholePart;
      }
    } else { 
      value=value
    }
  
    resultElement.style.font='2.5rem bold';
    resultElement.innerHTML=value
   
}








changeCalculator.addEventListener('click',()=>{
    containerElement.style.transition='4s'
     if(changeCalculator.innerHTML==='advance'){
         changeCalculator.innerHTML='basic'
         containerElement.style.height='50%'
         advanceElement.style.display='grid'
         basicElement.style.display='none'
         lcdElement.style.height='35%'
        }
        else{
            changeCalculator.innerHTML='advance'
            containerElement.style.height='30%'
            advanceElement.style.display='none'
            basicElement.style.display='grid'
            lcdElement.style.height='30%'
     }
})









let equal = ()=> {
    try{
        text+=''
    
    if(text && (!isNaN(text[text.length-1]) || text[text.length-1]===')') ){
  
     let res = Function("return "+text)()
    
     isNaN(text) && updateDisplay(res)
     
     return res+''
   
    }
    else if(!text){
     text=''
     updateDisplay(0)
     return NaN
    }
}catch(e){

    e=String(e)
    
    if(/Unexpected end of input/.test(e)){
        resultElement.style.font='1.5rem bold';
        resultElement.innerHTML='(Complate the brackets)'
        
    }
}

}












buttonType.forEach(but=>{
    but.addEventListener('click',event=>{
        text+=''
        if(text[text.length-1]===')' && event.target.innerHTML!==')'){
            text=showElement.innerHTML
            text+='*'
            
        }
        else if(event.target.innerHTML==='(' && !isNaN(text[text.length-1])){
            text+='*'   
        }
      



        if(!(event.target.innerHTML===')'  && text[text.length-1]==='(')  && !(event.target.innerHTML===')' && bracket<1) ){
            text+=event.target.innerHTML
            showElement.innerHTML=text
            
            equal()

            if(event.target.innerHTML==='('){
                bracket+=1
            }else if(event.target.innerHTML===')' && bracket>0){
                bracket-=1
            }
            
        }
       
     })
})










buttonOperator.forEach(but=>{
    but.addEventListener('click',event=>{
        text+=''
        
       if(!isNaN(text[text.length-1] ) || text[text.length-1]===')'){
        
        text+=event.target.innerHTML
        showElement.innerHTML=text
        equal()
       }
     })
})






buttonComputing.forEach(but=>{

    but.addEventListener('click',()=>{
        text+=''
        let res=equal()
        switch(but.innerHTML){ 
            

         
            
            case 'sin':   
              if(res){
                res=+res
                updateDisplay(Math.sin(res *Math.PI/180))
            }
            break;




        
        case 'cos':
            if(res){
                res=+res
                updateDisplay(Math.cos(res *Math.PI/180))
            }
            break; 
       




        case 'tan':
                if(res){
                    res=+res
                    updateDisplay(Math.tan(res *Math.PI/180))
                }
                break;
    





        case 'back':
            if(text[text.length-1]==='('&& bracket>0){
                bracket-=1
            }else if(text[text.length-1]===')' ){
                bracket+=1
            }
                text = text.slice(0,-1 );
                showElement.innerHTML=text
                equal()
                break; 





        case 'C':
                text=''
                showElement.innerHTML=''
                updateDisplay(0)
                break; 
                




        case 'log':
            if(res){
                res=+res
                res = Math.log10(res)
                updateDisplay(res)
     
            }  
            break;   
            



            
        case 'ln':
                if(res){
                    res=+res
                    res = Math.log(res)
                    updateDisplay(res)
                }  
                break;  
                
                



        case 'e':
                    if(res){
                        res=+res
                        res = Math.exp(res)
                        updateDisplay(res)
                    }  
                    break;         

                    




        case '∘':
            if(res){
                res=+res
                res = res * (180 / Math.PI);
                updateDisplay(res)
            }  
            break; 




      
        case 'rad':
              if(res){
                res=+res
                res = res* (Math.PI / 180);
                updateDisplay(res)
            }  
            break; 
        
            




        case '√':
          if(res && Number(res)>0){
            res=+res
            res = Math.sqrt(res);
            
            updateDisplay(res)
        }  
        break; 






        case 'x ²':
           if(res){
            res=+res
           res = res*res;
           updateDisplay(res)
      }  
      break; 
      





        case 'x!':
         if(res && Number(res)>=0){
            res=+res
        
            let number = 1;
            if (res === 0) {
              res = '1';
            } 
             else {
               
              for (let i = res; i > 0; i--) {
                number *= i;
              }
              res = number;
            }
            updateDisplay(res)
         }  
         break;

        




        case '%': 
         if(res){
         res=+res
         res = res/100;
         updateDisplay(res)
               }  
         break; 







         case '±':
         if(isNaN(text[text.length-1])){
            if(text[text.length-1]===')'){
                text+='*(-'
                bracket+=1
            }else if(text[text.length-1]==='-' && text[text.length-2]==='('){
                bracket-=1
                text=text.slice(0,text.length-2)
            } else{
                
                text+='(-'
                bracket+=1
            }
            
        }else{
            let index = findLastIndex(text)
            
            
            if(text.length>2 && /\(-/.test(text) && text[index]==='-' && text[index-1]==='(' ){
                if(index>-1){
                    text=text.slice(0,index-1)+text.slice(index+1)
                    resultElement.innerHTML=text
                    
                }
                bracket-=1
            }else{
                
                if(index>-1){
                    text=text.slice(0,index+1)+'(-'+text.slice(index+1)
                }else{
                    
                    text='(-'+text 
                }
                bracket+=1
            } 
         }
         showElement.innerHTML=text
         equal()
         break; 






        case 'π':  
         if(res){
         res=+res
         res = res*Math.PI;
         updateDisplay(res)
               }  
         break;  





        case '=':
         equal()  
            resultElement.style.font='2.5rem bold';
            text = resultElement.innerHTML
            showElement.innerHTML=text
            break;              

    }
    
   
})
})











