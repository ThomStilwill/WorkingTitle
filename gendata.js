const faker = require('faker')
const clip = require('clipboardy')

var data = {persons:[]};

for(let i=0;i<5000;i++){

    var person = {
        id:i,
        lastname: faker.name.lastName(),
        firstname: faker.name.firstName(),
        suffix: faker.name.suffix(),
        company: faker.company.companyName(),
        phone: faker.phone.phoneNumber()
    };

    data.persons.push(person);
}

clip.writeSync(JSON.stringify(data,null,2))
