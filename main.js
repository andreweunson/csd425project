const start_btn = document.getElementById('start_btn');

let start = false;

let allClasses = [{
    id: "100",
    name: "CSD 111 Computer Programming Fundamentals 5 credits",
    quoter: 1
}];

// document.getElementById('class_list').addChildElement(){}
//     allClasses.forEach(value => {
//         addClassDiv
//     })
// }

let taken = {};
let available = ["105", "107"];

let prereq = {
    "105": ["103", "110"],
    "107": ["109", "110"]
}

let classPrerequisites = {
    "103": ["105"],
    "109": ["107"],
    "110": ["105", "107"],
}

document.querySelectorAll(".lesson").forEach(lesson => {
    lesson.addEventListener("click", () => {
        if (start && lesson.classList.contains("available") && !lesson.classList.contains("taken")) {
            taken[lesson.id] = true;

            // change bg color to green
            lesson.classList.add("taken");
            lesson.classList.remove("available");

            // remove id from available array
            available.splice(available.indexOf(lesson.id), 1);
            start = false;

            // if class is prerequisite
            if (prereq[lesson.id]) {
                // for each class where this class is prereq
                prereq[lesson.id].forEach((dependableClass) => {

                    // assume dependableClass can be made available
                    let allTaken = true;

                    classPrerequisites[dependableClass].forEach(classe => {
                        if (!taken[classe]) {
                            allTaken = false;
                        }
                    });

                    if (allTaken) {
                        available.push(dependableClass);
                    }
                })
            }

            available.forEach(value => {
                document.getElementById(value).classList.remove("available");
            })

        }
    })
});

start_btn.addEventListener("click", function () {
    start = true;
    available.forEach(value => {
        document.getElementById(value).classList.add("available");
    })
});