import { generateGender, generateName, generateSurname, generateWorkload, generateBirthdate, validateInput } from "./src/employees.js";

export function generateEmployeeData(dtoIn) {
  validateInput(dtoIn);

  const employees = [];

  for (let i = 0; i < dtoIn.count; i++) {
    const gender = generateGender();
    const name = generateName(gender);
    const surname = generateSurname(gender);
    const workload = generateWorkload();
    const birthdate = generateBirthdate(dtoIn.age.min, dtoIn.age.max);

    employees.push({
      gender,
      name,
      surname,
      birthdate,
      workload,
    });
  }

  return employees;
}

export function getEmployeeStatistics(employees) {
  
}

export function main(dtoIn) {
  const employees = generateEmployeeData(dtoIn);
  const dtoOut = getEmployeeStatistics(employees);
  return dtoOut;
}
