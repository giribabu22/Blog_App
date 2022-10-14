// const express = require('express');
// const app = express()


// app.set('views','views')
// app.set('view engine', 'hbs')

// app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.static("public"));

// app.get('/home',(req,res)=>{
//     res.render('home')
// })
// app.post('/log',(req,res)=>[
//     console.log(req.body)
// ])

// app.listen(5500,()=>{console.log('runig!!');})


// // 1
// // 123
// // 1234
// // 12345

// // var row = 0
// // for (;row <= 5;row++){
// //     var col = 1;
// //     let str = ''
// //     for (;col <= row;col++){
// //         str = str +' '+ col
// //     }
// //     console.log(str);
// // }


// // - - - - - -   1
// // - - - - -   2  2
// // - - - -   3  3  3
// // - - -   4  4  4  4
// // - -   5  5  5  5  5
// // var row = 1
// // for (;row <= 5;row++){
// //     var col = 6;
// //     var str = ''
// //     for (;col >= row;col--){
// //         str = str +''+"- "
// //     }
// //     var col1 = 1;
// //     for (;col1 <= row;col1++){
// //         str = str +'  '+row
// //     }
// //     console.log(str);
// // }

// // let m =[]
// // for (let r =0;r <=8;r++){
// //     let row = []
// //     for (let col = 1;col <= row;col++){
// //         row.push(m[r-1][col-1] + m[r-1][col])
// //     }
// //     if (r>0) row.push(1)
// //     m.push(row)
// // }
// // console.log(m);
// // const pascalTriangle = n => {
// //     const arr = []
    
// //     for (let i = 0; i < n; i++) {
// //         const row = [1]
        
// //         for (let j = 1; j < i; j++) {
// //             row.push(arr[i-1][j-1] + arr[i-1][j])
// //         }
        
// //         if( i > 0 ) row.push(1)
        
// //         arr.push(row)
// //     }
    
// //     return arr
// // }

// // console.log(pascalTriangle(6))

// // for (let row = 1; row < 10; row++) {
// //     let s = ''
// //     for (let spac = 10; spac > row; spac--) {
// //         s = s + '_'
// //     }
// //     let c=1
// //     for (let num = 1; num <row; num++) {

// //         s = s+' '+ c
// //         c =  c *(row - num)/row
// //         c= Math.floor(c)
// //     }
// //     console.log(s);
// // }

// // const sr = 'preMMMZ'
// // // let capital = 'abcdefghijklmnopqrstuvwxyz'
// // // let r = ''
// // // let t = ''

// // for (let l of sr){
// //     if (capital.includes(l)){
// //         r = r+l
// //     }else{
// //         t = t + l
// //     }  
// // console.log(t,',>>>>>>>>>,',r);

// const sr = 'preMMMZ'
// // let capital = 'abcdefghijklmnopqrstuvwxyz'
// let r = ''
// let t = ''
// for (let l of sr){
//     if (l>='A' && l<="Z"){
//         console.log(l);
//     }
// }
// // what is the question????  just ask the question one more time
// // we don't know the question!!! we can't help ??????

// // DUSRI BAR PUCHO QUESTIOS ? WE ARE HERE

// // SAY IT ONCE AGIN QUESTION SIR!  what is the question??


// let a ="pramMMMddds"
// let b=""
// let c=""
// for (let i of a) {
//     if (i.toUpperCase()==i) {
//         b+=i
//     }
//     else {
//         c+=i
//     }
// }
// console.log(b)
// console.log(c)



// let str = 'flexiple the word';
// let arr = str.split(' ') //output is array,
// let main_str = ''

// arr.forEach(element => {   //callback function not loop   // list index will start with 0 
//     let result = ''
//     for (let l of element){  // this is loop!!
//         const str2 = l.charAt().toUpperCase(); 
//         result = result + str2 ;
//     }
//   main_str= main_str +' ' +result
// });
// console.log(main_str);  // Done !! bro // all cap letters code Brother!!!!!!!!!



// what are you doing bbbbboooooooooooooooooooooooooo!!!!!!!!!!!
// what is the question??????????????????????????????
// 1) first question? 
//  i don't know question ?

//  let arr = [1,2,3,4,5,6,7,8,9]
// let new_arr = []
// let ind = 0
// for (;ind < arr.length; ind++){
//         for (num of arr){
//             if (num != arr[ind]){
//               new_arr.push([arr[ind],num,arr[ind+1]])
//         }
//     }
//  }
// console.log(new_arr);

// question 2

// const d = {}
// const str = 'premkumar'
// let newvalue = ''
// for (l of str){
//     if (d.hasOwnProperty(l)){
//         d[l] = d[l] + 1
//     }else{
//         d[l] = 1    //Done!!
//         newvalue += l
//     }
// }
// console.log(d);
// console.log(newvalue);



// let c = [5,6,7];-
// let new_list = []
// for (let num of c){
//     let hold = []
//     for (let num2 of c){
//         for (let num3 of c){
//             if (num != num2 && num2 != num3 && num != num3){
//                 new_list.push([num,num2,num3])
//             }
//         }
//     }
// }
// console.log(new_list);