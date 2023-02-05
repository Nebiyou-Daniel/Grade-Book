
// addcourse
addCourseBtn.addEventListener('click', function () {
    const yearSelected = currSelected()['0'];
    if (yearSelected == 0) {
        console.log('select appropriate year');
    } else {
        addCourse();
    }
})

function addCourse() {
    if (!(courseName.value == "" || courseGrade.value == "")) {
        let yearSem = currSelected()[0] + currSelected()[1];
        let newCourseData = [`${courseName.value}`, parseInt(`${creditHours.value}`), `${courseGrade.value}`]
        yearData[yearSem].push(newCourseData);
        console.log(yearData);
        updateTable();
    } else {
        console.log("invalid");
    }
}
