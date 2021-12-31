const arr = [
    'cat',
    'dog',
    'mouse'
]

const state = arr.map((animal, index) => {
    return {
        animal: animal,
        index: index
    }
})

console.log(state)

const stateCopy = [...state]

stateCopy.splice(2, 1)

console.log(stateCopy)

// [
//     { animal:'cat', index: 0}, ...
// ]