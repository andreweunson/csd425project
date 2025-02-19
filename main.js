/**
 * Goals:
 *  1. Classes are automatically grey before we click on a start button
    2. Clicking the start button signifies that we have 'started' the program, and any available classes (ie. those without prerequisites) should all turn white
    3. Clicking on a white class should make all prerequisite classes (those needed to be taken before the clicked class can be taken) white
 */

// Declarations
let classes={
    "quarters":[
        {
            "name" : "Quarter One",
            "classes" : [

                {
                    "id" : 100,
                    "name" : "CSD 111 Computer Programming Fundamentals 5 credits",
                    "available" : true,
                    "selected" : false,
                    "prereqs" :[]
                },
                {
                    "id" : 101,
                    "name" : "CSD 112 HTML and CSS 5 credits",
                    "available" : true,
                    "selected" : false,
                    "prereqs" :[]
                },
                {
                    "id" : 102,
                    "name" : "GAME 108 Interactive Media Design 5 Credits",
                    "available" : true,
                    "selected" : false,
                    "prereqs" :[]
                },
                {
                    "id" : 103,
                    "name" : "Humanities course 5 Credits",
                    "available" : true,
                    "selected" : false,
                    "prereqs" :[]
                },
            ]
        },
        {
            "name" : "Quarter Two",
            "classes" : [

                {
                    "id" : 104,
                    "name" : "CSS 141 Computer Science I Java 5 credits",
                    "available" : false,
                    "selected" : false,
                    "prereqs" :[100]
                },
                {
                    "id" : 105,
                    "name" : "CSD 138 Structured Query Language (SQL) 5 credits",
                    "available" : false,
                    "selected" : false,
                    "prereqs" :[100]
                },
                {
                    "id" : 106,
                    "name" : "ENG 101 English Composition 5 Credits",
                    "available" : true,
                    "selected" : false,
                    "prereqs" :[]
                },

            ]
        },
        {
            "name" : "Quarter Three",
            "classes" : [

                {
                    "id" : 107,
                    "name" : "CS 143 Computer Science II Java 5 credits",
                    "available" : false,
                    "selected" : false,
                    "prereqs" :[104]
                },
                {
                    "id" : 108,
                    "name" : "CSD 122 JavaScript and jQuery 5 credits",
                    "available" : false,
                    "selected" : false,
                    "prereqs" :[101]
                },
                {
                    "id" : 109,
                    "name" : "MATH& 141 English Pre-Calculus 5 Credits",
                    "available" : true,
                    "selected" : false,
                    "prereqs" :[]
                },

            ]
        },
        {
            "name" : "Quarter Four",
            "classes" : [

                {
                    "id" : 110,
                    "name" : "CSD 228 Programming with CA 5 credits",
                    "available" : false,
                    "selected" : false,
                    "prereqs" :[]
                },
                {
                    "id" : 111,
                    "name" : "CSD 275 PHP Scripting 5 credits",
                    "available" : false,
                    "selected" : false,
                    "prereqs" :[]
                },
                {
                    "id" : 112,
                    "name" : "Social Science course 5 Credits",
                    "available" : true,
                    "selected" : false,
                    "prereqs" :[]
                },

            ]
        },
        {
            "name" : "Quarter Five",
            "classes" : [

                {
                    "id" : 113,
                    "name" : "CSD 230 Programming For Mobile Device 5 credits",
                    "available" : false,
                    "selected" : false,
                    "prereqs" :[]
                },
                {
                    "id" : 114,
                    "name" : "CSD 233 C++ Programming 5 credits",
                    "available" : false,
                    "selected" : false,
                    "prereqs" :[]
                },
                {
                    "id" : 115,
                    "name" : "CSD 268 Quality Assurance Methodologies 5 Credits",
                    "available" : false,
                    "selected" : false,
                    "prereqs" :[]
                },

            ]
        },
        {
            "name" : "Quarter Six",
            "classes" : [

                {
                    "id" : 116,
                    "name" : "CSD 299 IT Project 3 credits",
                    "available" : false,
                    "selected" : false,
                    "prereqs" :[]
                },
                {
                    "id" : 117,
                    "name" : "CSD 298 Technical Interview/Job 5 credits",
                    "available" : false,
                    "selected" : false,
                    "prereqs" :[]
                },
                {
                    "id" : 118,
                    "name" : "DSGN 290 Portfolio/Job Search 5 Credits",
                    "available" : false,
                    "selected" : false,
                    "prereqs" :[]
                },
                {
                    "id" : 119,
                    "name" : "CSD,CSNT,DSGN, or GAME Technical Elective course 4.5 Credits",
                    "available" : false,
                    "selected" : false,
                    "prereqs" :[]
                },
            ]
        }
    ]
};


let template='{{#each quarters}}';
    template+='<div class="quarter">';
    template+='<p>{{name}}</p>';
    template+='{{#each classes}}';
    template+='<div id="{{id}}" class="lesson">{{name}}</div>';
    template+='{{/each}}';
    template+='</div>';
    template+='{{/each}}';

// compile the template by Handlebars.js library
let classes_template = Handlebars.compile(template);
//generate html
let result_html=classes_template(classes);

let class_list=document.querySelector('#class_list .column1');
class_list.innerHTML=result_html;



const selectClassByObj=clsObj=>{

    clsObj.selected=true;
    let class_el=document.getElementById(clsObj.id);
    class_el.classList.remove("available");
    class_el.classList.add("taken");

    //also make any classes that have it as a pre-req become available
    classes.quarters.forEach(quarter=>{
        quarter.classes.forEach(cls=>{
            if(cls.prereqs.indexOf(clsObj.id)>-1){
                cls.available=true;
                let class_el=document.getElementById(cls.id);
                class_el.classList.add("available");
            }
        });
    });
}

const unselectClassByObj=clsObj=>{

    //deselecting class
    clsObj.selected=false;
    var class_el=document.getElementById(clsObj.id);
    class_el.classList.remove("taken");
    class_el.classList.add("available");

    //also make any classes that have it as a pre-req become unavailable
    classes.quarters.forEach(quarter=>{
        quarter.classes.forEach(cls=>{
            if(cls.prereqs.indexOf(clsObj.id)>-1){
                cls.selected=false;
                cls.available=false;
                let class_el=document.getElementById(cls.id);
                class_el.classList.remove("taken");
                class_el.classList.remove("available");
            }
        });
    });
}

// Start button functionality
const start_btn = document.getElementById('start_btn');
let start = false;
start_btn.addEventListener("click", function () {
    start = true;
    classes.quarters.forEach(quarter=>{

        quarter.classes.forEach(cls=>{
            if(cls.selected)unselectClassByObj(cls);
            var class_el=document.getElementById(cls.id);
            if(cls.available)class_el.classList.add("available");
        });
    });

});

classes.quarters.forEach(quarter=>{
    quarter.classes.forEach(cls=>{
        let class_el=document.getElementById(cls.id);
        class_el.addEventListener("click", () => {
            if (start && cls.available){
                if(cls.selected){
                    unselectClassByObj(cls);
                }else{
                    selectClassByObj(cls);
                }
            };
        });
    });
});


    


