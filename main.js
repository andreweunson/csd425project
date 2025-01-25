/**
 * Goals:
 *  1. Classes are automatically grey before we click on a start button
    2. Clicking the start button signifies that we have 'started' the program, and any available classes (ie. those without prerequisites) should all turn white
    3. Clicking on a white class should make all prerequisite classes (those needed to be taken before the clicked class can be taken) white
 */

// Declarations
let taken = {};
let available = ["100", "101", "102", "103", "106", "109", "112"];
// let greyClassList = ["104", "105", "107", "108", "110", "111", "113", "114", "115", "116", "117", "118", "119"];
let classReqAncestors = {
    "104": ["100"],
    "105": ["100"],
    "107": ["104"],
    "108": ["101"],
};
let classReqDescendants = {
    "100": ["104", "105"],
    "101": ["108"],
    "104": ["107"]
}

// Start button functionality
const start_btn = document.getElementById('start_btn');
let start = false;
start_btn.addEventListener("click", function () {
    start = true;
    available.forEach(value => {
        document.getElementById(value).classList.add("available");
    })
});



document.querySelectorAll(".lesson").forEach(lesson => {
    lesson.addEventListener("click", () => {
        //Only want to give descendant preview when we've 1. started the program and 2. the class we've clicked is a white class
        if(start && lesson.classList.contains("available")) {
            //Turn clicked class green for debugging purposes
            lesson.classList.remove("available");
            lesson.classList.add("taken");
            taken[lesson.id] = true;
            
            //If class is prerequisite
            if(classReqDescendants[lesson.id]) {
                //for each class where this class is prereq
                classReqDescendants[lesson.id].forEach(reqClass => {
                    let isAllPrereqTaken = true;

                    //Check all prerequisites for reqClass to see if any of them have not been taken
                    classReqAncestors[reqClass].forEach(checkedClass => {
                        if(!taken[checkedClass]) {
                            isAllPrereqTaken = false;
                        }
                    });

                    if(isAllPrereqTaken) {
                        document.getElementById(reqClass).classList.add("available");
                    }
                    
                })
            }
        }
    });
});
    


