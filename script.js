// get a reference to the form 
const form = document.getElementById('form');

// when the form is submitted
form.addEventListener("submit", (e) => {
    console.log("Calculating...");

    // stops default behavior of the browser (prevent page refresh)
    e.preventDefault();

    // store form data in object
    const data = new FormData(form);

    // get and store each input from the form
    const age = data.get('age');
    const gender = data.get('gender');
    const feet = data.get('feet');
    const inches = data.get('inches');
    const weightInPounds = data.get('weight');
    const activityLevel = data.get('activity-level');

    // log each input 
    console.log(age)
    console.log(gender)
    console.log(feet)
    console.log(inches)
    console.log(weightInPounds)
    console.log(activityLevel)

    // convert inputs
    const totalInches = (12 * +feet) + +inches;
    const totalHeightInCM = inchesToCM(totalInches);
    const weightInKG = poundsToKG(weightInPounds);

    // calculate and round BMR
    const BMR = Math.ceil(mifflin(gender, age, totalHeightInCM, weightInKG));

    // calculate maintenance based on BMR and activityLevel
    const maintenanceCals = Math.ceil(computeMaintenance(BMR, activityLevel));

    // update the displayed calorie counts
    document.getElementById('bmr-cals').innerHTML = BMR + " cals/day";
    document.getElementById('maintenance-cals').innerHTML = maintenanceCals + " cals/day";
    document.getElementById('gain-cals').innerHTML = (maintenanceCals+500) + " cals/day";
    document.getElementById('loss-cals').innerHTML = (maintenanceCals-500) + " cals/day";
})


// Calculates BMR based on Mifflin formula - assumes height in cm, weight in kg, age in years
function mifflin(gender, age, height, weight) {
    let base = (10 * weight) + (6.25 * height) - (5 * age);
    return gender === "female" ? base -= 161 : base += 5;
}

// converts in to cm
function inchesToCM(inches) {
    return inches * 2.54;
}

// converts lb to kg
function poundsToKG(pounds) {
    return pounds * 0.45359237;
}

// calculates mantenance by scaling BMR based on activity level
function computeMaintenance(BMR, activityLevel) {
    if (activityLevel === 'sedentary') {
        return BMR*=1.2;
    } 
    else if (activityLevel === 'light') {
        return BMR*=1.35;
    }
    else if (activityLevel === 'moderate') {
        return BMR*=1.5;
    }
    else if (activityLevel === 'active') {
        return BMR*=1.65;
    }
    else if (activityLevel === 'very-active') {
        return BMR*=1.8;
    }
    else if (activityLevel === 'extra-active') {
        return BMR*=1.95;
    }
}



