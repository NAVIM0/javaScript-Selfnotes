// @flow


function calcBMI(height: number, mass: number) {
    return mass / height ** 2;
}

type module = {
    fullName: string,
    mass: number,
    height: number,
    BMI: number,
    calcBMI(): number
}

const mark = {
    fullName: "Mark Miller",
    mass: 78,
    height: 1.69,
    BMI: 0,
    calcBMI: function (this: module) {
        return this.BMI = calcBMI(this.height, this.mass);
    }
}

// in object literals you have to follow the syntax of ----> || variableName : function() {//write whatever or add new properties to the object} ||
const john = {
    fullName: "John Smith",
    mass: 92,
    height: 1.95,
    BMI: 0,
    calcBMI: function (this: module) {
        return this.BMI = calcBMI(this.height, this.mass);
    }
}


if (mark.calcBMI() > john.calcBMI()) {

    console.log(`${mark.fullName}'s BMI: ${mark.BMI.toFixed(2)} is higher than ${john.fullName}'s: ${john.BMI.toFixed(2)}`)

} else {
    console.log(`${mark.fullName}'s BMI: ${mark.BMI.toFixed(2)} is Lower than ${john.fullName}'s: ${john.BMI.toFixed(2)}`)
}
