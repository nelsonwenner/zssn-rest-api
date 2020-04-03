const validator01 = {
    name: 'nelson',
    age: 27,
    sex: 'masculino',
    location: {
		latitude: 100.6546578,
		longitude: -55.4213957
	}
}

const validator02 = {
    name: 'nelson',
    age: 27,
    sex: 'masculino',
    inventory: [
        {item: 1, quantity: 4},
        {item: 2, quantity: 2},
        {item: 3, quantity: 1},
        {item: 4, quantity: 6}
    ]
}

const validator03 = {
    name: 'nelson',
    age: 27,
    sex: 'masculino',
    inventory: [
        {item: 1, quantity: 4},
        {item: 2, quantity: 2},
        {item: 3, quantity: 1},
        {item: 4, quantity: 6}
    ],
    location: {
		latitude: 191.6546578,
		longitude: -55.4213957
	}
}

const validator04 = {
    name: 'nelson',
    age: 27,
    sex: 'masculino',
    inventory: [
        {item: 1, quantity: 4},
        {item: 2, quantity: 2},
        {item: 3, quantity: 1},
        {item: 4, quantity: 6}
    ],
    location: {
		latitude: 100.6546578,
		longitude: -190.4213957
	}
}

const itemNotExists = {
    name: 'nelson',
    age: 27,
    sex: 'masculino',
    inventory: [
        {item: 1, quantity: 4},
        {item: 2, quantity: 2},
        {item: 3, quantity: 1},
        {item: 10, quantity: 6}
    ],
    location: {
		latitude: 191.6546578,
		longitude: -55.4213957
	}
}


export default { 

    validator01,
    validator02,
    validator03,
    validator04,
    itemNotExists  

};