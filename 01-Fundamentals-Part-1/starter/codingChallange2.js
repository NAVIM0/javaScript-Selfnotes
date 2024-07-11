function calculateBMI (height, mass) { return mass / (height ** 2) }

const markBMI = calculateBMI(1.69,78)
const johnBMI = calculateBMI(1.95,92)

if( markBMI > johnBMI ) {

    console.log(`mark's BMI: ${markBMI.toFixed(2)} is higher than John's: ${johnBMI.toFixed(2)}`)

}else {
    console.log(`mark's BMI: ${markBMI.toFixed(2)} is Lower than John's: ${johnBMI.toFixed(2)}`)
}
