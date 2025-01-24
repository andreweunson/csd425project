const start_btn = document.getElementById('start_btn');

let start = false;

//dictionary of taken classes
let taken = {};

// no prereq classes
let noPrereqClasses = ["105", "107"];

// A list of classes for which key class is a prerequisite
let prereq = {
    "105": ["103", "110"],
    "107": ["109", "110"]
}

// A list of classes which are prerequisites for a key class
let classPrerequisites = {
    "103": ["105"],
    "109": ["107"],
    "110": ["105", "107"],
}

document.querySelectorAll(".lesson").forEach(lesson => {
    lesson.addEventListener("click", () => {
        // When clicked, if start button was clicked before (start=true) and current class is available
        if (start && lesson.classList.contains("available")) {
            taken[lesson.id] = true;

            // change bg color to green
            lesson.classList.add("taken");
            lesson.classList.remove("available");

            // if class is prerequisite
            if (prereq[lesson.id]) {
                // for each class where this class is prereq
                prereq[lesson.id].forEach((dependableClass) => {

                    // assume dependableClass can be made available
                    let allPrereqTaken = true;

                    // Check all prerequisites for dependableClass to see if any of them is not taken yet
                    classPrerequisites[dependableClass].forEach(classe => {
                        if (!taken[classe]) {
                            allPrereqTaken = false;
                        }
                    });

                    if (allPrereqTaken) {
                        document.getElementById(dependableClass).classList.add("available");
                    }
                })
            }
        }
    })
});

start_btn.addEventListener("click", function () {
    start = true;
    noPrereqClasses.forEach(value => {
        document.getElementById(value).classList.add("available");
    })
});