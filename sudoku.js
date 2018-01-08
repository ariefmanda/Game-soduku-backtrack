"use strict"

class Sudoku {
  constructor(board_string) {
    this.papan=board_string.split('').map(Number);
    this.dulpicater=board_string.split('').map(Number);
    this.baris=this.board();
    this.kolom=this.get_kolom();
    this.region=this.get_region();
    this.indexKosong=this.checkIndex()
    this.angkaPercobaan=[1,2,3,4,5,6,7,8,9]
  }

  solve() {
    let letakBaris=0,letakColom=0,letakRegion=0;
    var totalLooping=0
    let zeroIndex=[]
    this.papan.forEach((value,index)=>{
      if(value===0){
        zeroIndex.push(index)
      }
    })
      for (let i = 0; i <zeroIndex.length; i++) {
          letakBaris=Math.floor(zeroIndex[i]/9);
          letakColom=zeroIndex[i]%9;
          letakRegion=this.searchRegion(letakBaris,letakColom)
          for (let j = this.papan[zeroIndex[i]]; true; j++) {
            totalLooping++
            if(this.checkRow(j,this.baris[letakBaris])){
              if(this.checkColom(j,this.kolom[letakColom])){
                if(this.checkRegion(j,this.region[letakRegion])){
                  this.update(zeroIndex[i],j)
                  break;
                }
              }
            }
          }
          if(this.papan[zeroIndex[i]]>9){
            this.papan[zeroIndex[i]]=0
            i-=2;
          }
          sleep(50);
          this.reset_board();
          console.log(this.board());
        }
    return (`Total Lopping : ${totalLooping}`);
  }
  shuffleArray(awal,array) {
    let i=1
    for (let j = 0; j < array.length; j++) {
        array[j]+=awal
    }
    for (let k = 0; k < array.length; k++) {
      if(array[k]>9){
        array[k]=i++
      }

    }
    this.angkaPercobaan=array
    return array
  }

  update(index,num){
    this.papan.splice(index,1,num);
    this.baris=this.board();
    this.kolom=this.get_kolom();
    this.region=this.get_region();
  }
  checkIndex(){
    let arr=[]
    for (let i = 0; i < this.papan.length; i++) {
      if(this.papan[i]===0){
        arr.push(i)
      }
    }
    return arr;
  }
  checkBoard(cek){
   for (let i = 0; i < cek.length; i++) {
     if(cek[i]===0){
       return true;
     }
   }
   return false;
  }
  checkRow(input,cek){
    for (let j = 0; j < cek.length; j++) {
        if(cek[j]===input){
          return false;
        }
      }
    return true;
  }
  checkColom(input,cek){
    for (let j = 0; j < cek.length; j++) {
      if(cek[j]===input){
        return false;
      }
    }
  return true;
  }
  checkRegion(input,cek){
    for (let j = 0; j < cek.length; j++) {
      if(cek[j]===input){
        return false
      }
    }
  return true;
  }
  // Returns a string representing the current state of the board
  board() {
    let result=[]
    for (let i = 0; i < this.papan.length; i+=9) {
      let row=[]
      for (let j = i; j < (i+9); j++) {
        row.push(this.papan[j])
      }
      result.push(row)
    }
    return result
  }
  get_kolom(){
    let result=[]
    for (let i = 0; i < 9; i++) {
      let colom=[]
      for (let j = i; j <= (i+72); j+=9) {
        colom.push(this.papan[j])
      }
      result.push(colom)
    }
    return result
  }
  get_region(){
    let result=[]
    let counter=0,counter2=0,counter3=0;
    for (let i = 0; i < 9; i++) {
      let region=[]
      if(i<3){
        for (let j = counter; j <= counter+2; j++) {
          region.push(this.papan[j])
        }
        let getRowDua=9+counter;
        for (let j = getRowDua; j <=getRowDua+2 ; j++) {
          region.push(this.papan[j])
        }
        let getRowTiga=18+counter;
        for (let j = getRowTiga; j <=getRowTiga+2 ; j++) {
          region.push(this.papan[j])
        }
        counter+=3
        result.push(region)
      }else if(i<6){
        for (let j = 27+counter2; j <= (27+counter2)+2; j++) {
          region.push(this.papan[j])
        }
        let getRowDua=36+counter2;
        for (let j = getRowDua; j <=getRowDua+2 ; j++) {
          region.push(this.papan[j])
        }
        let getRowTiga=45+counter2;
        for (let j = getRowTiga; j <=getRowTiga+2 ; j++) {
          region.push(this.papan[j])
        }
        counter2+=3
        result.push(region)
      }else{
        for (let j = 54+counter3; j <= (54+counter3)+2; j++) {
          region.push(this.papan[j])
        }
        let getRowDua=63+counter3;
        for (let j = getRowDua; j <=getRowDua+2 ; j++) {
          region.push(this.papan[j])
        }
        let getRowTiga=72+counter3;
        for (let j = getRowTiga; j <=getRowTiga+2 ; j++) {
          region.push(this.papan[j])
        }
        counter3+=3
        result.push(region)
      }
    }
    return result
  }
  searchRegion(row,colom){
    if((colom<=2)&&(row<=2)){
      return 0;
    }else if((colom<=5)&&(row<=2)){
      return 1;
    }else if((colom<=8)&&(row<=2)){
      return 2;
    }else if((colom<=2)&&(row<=5)){
      return 3;
    }else if((colom<=5)&&(row<=5)){
      return 4;
    }else if((colom<=8)&&(row<=5)){
      return 5;
    }else if((colom<=2)&&(row<=8)){
      return 6;
    }else if((colom<=5)&&(row<=8)){
      return 7;
    }else{
      return 8;
    }
  }
  reset_board() {
    console.log("\x1B[2J")
  }
}
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}
// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

// var board_string =['60214030014508367208970205026350401995021703714390520507036184000000035830459267','105802000090076405200400819019007306762083090000061050007600030430020501600308900']
var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"

console.log(game.solve())
