function average(numbers) {

    return numbers.reduce((previousValue, currentValue) => previousValue + currentValue,0) / numbers.length
}


dolphinsScore = average([97,112,101])
koalasScore = average([109,95,106])

if (dolphinsScore >= 100 && koalasScore >= 100 ) {

    if (dolphinsScore > koalasScore) {

        console.log(`Congrats To our Winners The Dolphins with a score of : ${dolphinsScore}`)

    } else if (koalasScore > dolphinsScore) {

        console.log(`Congrats To our Winners The Koalas with a score of : ${koalasScore}`)

    } else {

        console.log("Well ain't this just fuckin' Lovely...You Both Lose, It's a Draw !!!")
    }

} else {

    console.log(`Congrats!!!  No One Fuckin' Won...\nDolphin's Score: ${dolphinsScore}\nKoala's Score: ${koalasScore}\nBetter Luck Next Time!`)
}