import { generateGender, generateName, generateSurname, generateWorkload, generateBirthdate, validateInput, calculateMedian, calculateAge } from "./src/employees.js";

/**
 * Generates a list of employees based on input data
 * @param {object} dtoIn - input data
 * @returns {Array} list of employees
 */
export function generateEmployeeData(dtoIn) {
  validateInput(dtoIn);
  const employees = [];
  for (let i = 0; i < dtoIn.count; i++) {
    const gender = generateGender();
    const name = generateName(gender);
    const surname = generateSurname(gender);
    const workload = generateWorkload();
    const birthdate = generateBirthdate(dtoIn.age.min, dtoIn.age.max);
    employees.push({ gender, name, surname, birthdate, workload });
  }
  return employees;
}

/**
 * Calculates statistics from a list of employees
 * @param {Array} employees - list of employees
 * @returns {object} statistics
 */
export function getEmployeeStatistics(employees) {
  const total = employees.length;
  const workload10 = employees.filter(emp => emp.workload === 10).length;
  const workload20 = employees.filter(emp => emp.workload === 20).length;
  const workload30 = employees.filter(emp => emp.workload === 30).length;
  const workload40 = employees.filter(emp => emp.workload === 40).length;
  const ages = employees.map(emp => calculateAge(emp.birthdate));
  const averageAge = Math.round(ages.reduce((sum, age) => sum + age, 0) / ages.length * 10) / 10;
  const minAge = Math.floor(Math.min(...ages));
  const maxAge = Math.floor(Math.max(...ages));
  const medianAge = Math.floor(calculateMedian(ages));
  const workloads = employees.map(emp => emp.workload);
  const medianWorkload = Math.round(calculateMedian(workloads));
  const women = employees.filter(emp => emp.gender === "female");
  const averageWomenWorkload = Math.round(women.reduce((sum, emp) => sum + emp.workload, 0) / women.length * 10) / 10;
  const sortedByWorkload = [...employees].sort((a, b) => a.workload - b.workload);
  return { total, workload10, workload20, workload30, workload40, averageAge, minAge, maxAge, medianAge, medianWorkload, averageWomenWorkload, sortedByWorkload };
}

/**
 * Main function
 * @param {object} dtoIn - input data
 * @returns {object} dtoOut - output data
 */
export function main(dtoIn) {
  const employees = generateEmployeeData(dtoIn);
  return getEmployeeStatistics(employees);
}
