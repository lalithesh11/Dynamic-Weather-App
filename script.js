  const curDate=document.getElementById("date");
  let weathercon=document.getElementById("weathercon");

  const tempStatus="Clouds";

  const getCurrentDay=()=>{
      var weekday = new Array(7);
      weekday[0]="Sunday";
      weekday[1]="Monday";
      weekday[2]="Tueday";
      weekday[3]="Wednesday";
      weekday[4]="Thursday";
      weekday[5]="Friday";
      weekday[6]="Saturday";
      let currentTime=new Date();
    //   console.log(weekday[currentTime.getDay()]);
    let day=weekday[currentTime.getDay()];
    return day;
  }

  const getCurrentTime=()=>{
      var months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      
      var now=new Date();
      var month=months[now.getMonth()]; //month will start from 0, 
      var date=now.getDate();
    //   var year=now.getFullYear();

     let hours =now.getHours();
     let mins=now.getMinutes();

     let period="AM";

     if (hours>11){
         period="PM";
        //  we want type in 12-h formart, means we want 1:30 not w 13:30
      if(hours>12) hours -=12
     }

    //  if timw is 10:05, want show 10:05 , not 10:5
     if (mins<10){
     mins="0"+mins;
     }
    //   console.log(`${month}/${day}/${year}`);
    return `${month} ${date} | ${hours} : ${mins} ${period}`;

  }

//   getCurrentDay();
//   getCurrentTime();

curDate.innerHTML=getCurrentDay() + " | " + getCurrentTime();