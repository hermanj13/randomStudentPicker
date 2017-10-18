const jsonfile = require('jsonfile');
const inquirer = require('inquirer');
const file = "students.json";
let flag = false;
let students = [];

jsonfile.readFile(file, function(err, obj) {
  students = obj;
  let currentMax = students[0].solved;
  for(let i = 0; i< students.length; i++){
    if(currentMax<students[i].solved){
      flag = true;
      currentMax = students[i].solved;
    };
  };
  pickUser(currentMax);
});

const pickUser = function(currentMax){
  let index = Math.floor(Math.random() * students.length);
  while (students[index].solved === currentMax && flag){
    index = Math.floor(Math.random() * students.length);
  };
  checkPresense(index, currentMax);
};

const checkPresense = function(index, currentMax){
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "present",
        message: "Is " + students[index].name + " here today?"
      }
    ])
    .then(function(val){
      if(val.present){
        console.log(students[index].name + ' COME ON DOWN!')
        students[index].solved += 1;
        jsonfile.writeFile(file, students, function (err) {
          if(err){
            console.log(err);
          };
        });
      }else{
        pickUser(currentMax);
      }
    });
};
