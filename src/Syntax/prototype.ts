interface PersonThis {
  name: string;
  age: number;
}

function Person(this: PersonThis) {
  this.name = "";
  this.age = -1;
}

Person.prototype.setName = function (name: string) {
  this.name = name;
};

Person.prototype.getName = function () {
  return this.name;
};

Person.prototype.setAge = function (age: number) {
  this.age = age;
};

Person.prototype.getAge = function () {
  return this.age;
};

function PrototypeTest() {
  const person = new (Person as any)();
  person.setName("name");
  person.setAge(20);
  // console.log(person.getName());
  // console.log(person.getAge());
}

export default PrototypeTest;
