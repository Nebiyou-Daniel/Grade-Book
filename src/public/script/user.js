

// dom elements needed


const table = document.querySelector('#myTable');
const rows = table.querySelectorAll('tbody tr');
const editButtons = table.querySelectorAll('.edit-btn');
const deleteButtons = table.querySelectorAll('.delete-btn');
const years = document.getElementById('years');
const semesterOne = document.getElementById('semOne');
const semesterTwo = document.getElementById('semTwo');
const addCourseBtn = document.getElementById('addCourse');
const form = document.getElementById('form');
const tbody = document.getElementById('table-body');
const userName = document.getElementById('userName');
const cgpa = document.getElementById('cgpa');
const semesterGpa = document.getElementById('gpa')

const courseName = document.getElementById("courseName");
const credit = document.getElementById("numberOfCredits");
const score = document.getElementById("grade");


function displaySuccessMessage(messageContent) {
    let messageText = document.getElementById("message-text");
    messageText.innerHTML = messageContent;

    let messageContainer = document.getElementById("message-container");
    messageContainer.style.display = "block";

    setTimeout(function () {
        messageContainer.style.display = "none";
    }, 2000);
}

function displayErrorMessage(errorContent) {
    const errorPopup = document.getElementById("error-popup");
    const errorText = document.getElementById("error-text");

    errorText.innerHTML = errorContent;
    errorPopup.style.display = "block";

    setTimeout(function () {
        errorPopup.style.display = "none";
    }, 2000);
}


function displayTop(message) {
    const popup = document.getElementById("popup");
    const messageElement = document.getElementById("message");

    messageElement.innerText = message;
    popup.style.display = "block";

    setTimeout(function () {
        popup.style.display = "none";
    }, 2000);
}


async function getCourseId(courseName){
    const response = await fetch('http:localhost:3003/courses/getId', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({courseName: courseName})
    });

    const data = await response.json();

    if (response.ok){
        // console.log(`data : ${data}`)
        return data;
    } else {
        return "-1";
    }
}

// displaySuccessMessage("Course Deleted Successfully. ")
// displayErrorMessage('Error test message  ')
// displayTop("Course Deleted Successfully ")

const editButton = document.createElement('img')
editButton.classList.add('edit-btn', 'cursor');
editButton.setAttribute('src', "images/edit.png");

const deleteButton = document.createElement('img')
deleteButton.classList.add('delete-btn', 'cursor');
deleteButton.setAttribute('src', "images/delete.png");

const token = localStorage.getItem('access_token');

fetch('http:localhost:3003/user/me/gradingsys', {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
    },
});



form.addEventListener('submit', function (event) {
    event.preventDefault();
})


let yearData = {
    '11': [],
    '12': [],
    '21': [],
    '22': [],
    '31': [],
    '32': [],
    '41': [],
    '42': [],
    '51': [],
    '52': [],
}

var gpaData = {
    '11': "0",
    '12': "0",
    '21': "0",
    '22': "0",
    '31': "0",
    '32': "0",
    '41': "0",
    '42': "0",
    '51': "0",
    '52': "0"
}



/**
 * @returns Void: updates the tables in the current table,and 
 * fills it with the data that is the currently selected table grades and courses
 */
function updateTable() {
    // check which year and semester is checked
    let currSelect = currSelected();
    let yearSem = currSelect[0] + currSelect[1];

    // set current year, semester gpa

    semesterGpa.innerText =  gpaData[yearSem];

    // render table by values at the yearData
    tbody.innerHTML = '';

    let rowsData = yearData[yearSem];

    if (rowsData.length === 0) {
        tbody.innerHTML = "<p>EMPTY : Insert Course !</p>";
        return;
    }
    // iterating through the year data, creatig rows on the way.
    for (let i = 0; i < rowsData.length; i++) {
        let rowData = rowsData[i];
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.innerText = i + 1;
        tr.append(td);

        for (let cellData of rowData) {
            let td = document.createElement('td');
            cellData = cellData.replace("_minus", "-").replace("_plus", "+");
            td.textContent = cellData;
            tr.appendChild(td);
        }
        // creating the buttons
        let editButton = document.createElement('img')
        editButton.classList.add('edit-btn', 'cursor');
        editButton.setAttribute('src', "images/edit.png");

        let deleteButton = document.createElement('img')
        deleteButton.classList.add('delete-btn', 'cursor');
        deleteButton.setAttribute('src', "images/delete.png");

        let editBtn = document.createElement('td');
        editBtn.appendChild(editButton);
        let delBtn = document.createElement('td');
        delBtn.appendChild(deleteButton);

        tr.appendChild(editBtn);
        tr.appendChild(delBtn);
        tbody.appendChild(tr);
    }
}


/**
 * 
 * @param {Array[Object]} courses: a list of course object with attributes name, grade, credit hours
 */
function updateYeardata(courses) {
    // reset the yeardata
    for (key in yearData) {
        while (yearData[key].length > 0) {
            yearData[key].pop();
        }
    }

    // for each course add it to the right key
    let newCourseList;
    let yearSem;
    
    for (let course of courses) {
        newCourseList = [],
            newCourseList.push(course.courseName)
        newCourseList.push(course.credit)
        newCourseList.push(course.score)
        yearSem = "";
        yearSem += course.year;
        yearSem += course.semester;

        yearData[yearSem].push(newCourseList);
    }
}


/**
 * gets course names, gpa and cgpa, then update the table to the current values in the yearData
 */
async function reload() {
    await getCourses();
    await getgpa();
    await getcgpa();
    updateTable();
}


// on startup do these
// get the name, all grades, all gpa, cgpa, 
getMe();
reload();



/**
 * @returns void, sets the yearData to the course of the current user's data
 */
async function getCourses() {
    // fetch courses
    const response = await fetch('http:localhost:3003/courses', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (response.ok) {
        updateYeardata(data);
    } else {
        displayErrorMessage("unable to fetch courses.")
        return;
    }
}



/**
 * 
 * @returns void, sets the name at the top right nav to the user's first Name.
 */
async function getMe() {

    const response = await fetch('http:localhost:3003/user/me', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();


    if (response.ok) {
        userName.innerHTML = (data.fullName).split(' ')[0];
    } else {
        userName.innerHTML = '...';
    }
}

/**
 * @return void: updates the gpaData to the current user gpa
 */
async function getgpa() {
    const response = await fetch('http://localhost:3003/courses/allGpa', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    console.log(data)
    if (response.ok) {
        // gpaData = Object(data);
        // iterate the data and set the gpaData at string of key
        for (key in Object(data)){
            console.log(`${key} : ${data[key]}`)
            console.log(`${key} : ${gpaData[key]}`)
            gpaData[key] = data[key];
        }
    }
}


/**
 * @return void: sets the cgpa's innertext to the current user cgpa
 */
async function getcgpa() {
    const response = await fetch('http:localhost:3003/courses/cgpa', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    
    const data = await response.json();

    if (response.ok) {
        if (data.cgpa == "NaN"){
            cgpa.innerHTML = "-";
        } else {
            cgpa.innerHTML = data.cgpa;
        }
    }
}

/**
 * @returns array query, query[0] = the selected year and query[1] = selected semester.
 */
function currSelected() {
    let query = [];
    const allYears = document.querySelectorAll(".year");
    for (let i = 0; i < allYears.length; i++) {
        const yearBtn = allYears[i];
        if (yearBtn.checked) {
            query.push(yearBtn.value);
            break;
        }
    }
    if (semesterOne.checked) {
        query.push('1');

    } else {
        query.push('2');
    }
    return query;
}


// edit, delete and add course fetches below

const editPopup = document.querySelector("#popup-background");
const deletePopup = document.querySelector("#delete-popup");
const okEdit = document.querySelector("#ok-edit");
const cancelBtn = document.querySelector("#cancel-edit");
const okDelete = document.querySelector("#ok-delete");
const cancelDelete = document.querySelector("#cancel-delete");

// flags to ensure that the addEventListener is done only once, to 
// avoid multiple listeners that would messup our operation
let isOkEditClicked = false;
let isCancelBtnClicked = false;
let isOkDeleteClicked = false;
let isCancelDeleteBtnClicked = false;

table.addEventListener("click", event => {
    if (event.target.classList.contains("edit-btn")) {
        let row = event.target.parentElement.parentElement;
        var elements = row.children;
        let column1 = elements.item(1);
        let column2 = elements.item(2);
        let column3 = elements.item(3);


        let indexToEdit = row.firstElementChild;
        let prevCourseName = indexToEdit.nextSibling;


        editPopup.classList.remove("hidden");
        let editCourseName = document.getElementById("courseNameEdit");
        let editcredit = document.getElementById("creditHourEdit");
        let editGrade = document.getElementById("gradeEdit");

        editCourseName.value = column1.innerText;
        editcredit.value = parseInt(column2.innerText);
        editGrade.value = column3.value;

        if (!isOkEditClicked) {
            okEdit.addEventListener("click", async () => {
                isOkEditClicked = true;

                await editCourseFetch(prevCourseName.innerHTML, editCourseName.value, editcredit.value, editGrade.value)
                editPopup.classList.add("hidden");
            });
        }

        if (!isCancelBtnClicked) {
            cancelBtn.addEventListener("click", () => {
                isCancelBtnClicked = true;
                editPopup.classList.add("hidden");
            });
        }
    } else if (event.target.classList.contains("delete-btn")) {
        let row = event.target.parentElement.parentElement;
        let indexToEdit = row.firstElementChild;
        let deleteCourseName = indexToEdit.nextSibling;

        deletePopup.classList.remove("hidden");

        if (!isOkDeleteClicked) {
            okDelete.addEventListener("click", async () => {
                isOkDeleteClicked = true;

                deletePopup.classList.add("hidden");

                await deleteCourseFetch(deleteCourseName.innerHTML);
            });
        }

        if (!isCancelDeleteBtnClicked) {
            cancelDelete.addEventListener("click", () => {
                isCancelBtnClicked = true;
                deletePopup.classList.add("hidden");
            });
        }
    }
});


/**
 * 
 * @param {String} prevCourseName
 * @param {String} editCourseName 
 * @param {String} editcredit 
 * @param {String} editGrade 
 * @returns 
 */
async function editCourseFetch(prevCourseName, editCourseName, editcredit, editGrade) {
    let courseId;
    try {
        courseId = await getCourseId(prevCourseName);
    } catch (error) {
        // console.log(error)
        displayErrorMessage(`Failed to edit the selected course. `)
        return;
    }


    // console.log(`course id : ${courseId}`);
    const response = await fetch(`http:localhost:3003/courses\\${courseId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseName: editCourseName, credit: editcredit, score :editGrade }),
    });

    const data = await response.json();
    // console.log(data)
    if (response.ok) {
        reload();
        displaySuccessMessage("Course Edited Successfully. ")
    } else {
        displayErrorMessage(`Failed to edit the selected course. `)
        return;
    }
}

/**
 * 
 * @param {String} deleteCourseName 
 * @returns void
 * deletes course from course in the user grades.
 */
async function deleteCourseFetch(deleteCourseName) {

    let courseId;
    try {
        courseId = await getCourseId(deleteCourseName);
    } catch (error) {
        console.log(error)
        displayErrorMessage(`Failed to delete the selected course. `)
        return;
    }

    const response = await fetch(`http:localhost:3003/courses\\${courseId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify({ deleteCourseName }),
    });

    if (response.ok) {
        reload();
        displaySuccessMessage("Course Deleted Successfully. ")
    } else {
        displayErrorMessage(`Failed to delete the selected course. `)
        return;
    }
}


// add course button 
addCourseBtn.addEventListener('click', async function () {
    const yearSelected = currSelected()['0'];
    const semSelected = currSelected()['1'];

    if (credit.value == "", courseName.value == "", score.value == "") {
        return false;
    }

    await addCourseFetch(courseName.value, score.value, credit.value, yearSelected, semSelected);
})

async function addCourseFetch(courseName, score, credit, year, semester) {
    const response = await fetch('http:localhost:3003/courses/add', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseName, score:score.replace('-','_minus').replace('+','_plus'), credit, year, semester }),
    });

    if (response.ok) {
        reload();
        displaySuccessMessage("Course added successfully. ")
    } else {
        displayErrorMessage(`Failed to add course.`)
        return;
    }
}


const radioButtons = document.querySelectorAll('input[type="radio"]');
radioButtons.forEach(radioButton => {
    radioButton.addEventListener('change', function () {
        updateTable();
    });
});


