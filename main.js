import { generateGender, generateName, generateSurname, generateWorkload, generateBirthdate, validateInput, calculateMedian, calculateAge } from "./src/employees.js";

/**
 * Generates a list of employees with random data.
 * @param {object} dtoIn - contains count of employees and age limit of employees
 * @param {number} dtoIn.count - number of employees to generate
 * @param {object} dtoIn.age - age range for employees
 * @param {number} dtoIn.age.min - minimum age of employees
 * @param {number} dtoIn.age.max - maximum age of employees
 * @returns {Array} list of generated employees
 */
export function generateEmployeeData(dtoIn) {
  // Calling the input validation function
  validateInput(dtoIn);
  // Empty array to store generated employees
  const employees = [];
  // Loop runs once for each employee that needs to be generated
  for (let i = 0; i < dtoIn.count; i++) {
    // Generate random gender
    const gender = generateGender();
    // Generate name and surname based on gender
    const name = generateName(gender);
    const surname = generateSurname(gender);
    // Generate random workload
    const workload = generateWorkload();
    // Generate random birthdate within the given age range
    const birthdate = generateBirthdate(dtoIn.age.min, dtoIn.age.max);
    // Create employee object and add it to the array
    employees.push({ gender, name, surname, birthdate, workload });
  }
  // Return the complete list of employees
  return employees;
}

/**
 * Calculates statistics from a list of employees.
 * @param {Array} employees - list of employees to calculate statistics from
 * @param {string} employees[].gender - gender of the employee (male/female)
 * @param {string} employees[].birthdate - employee birthdate in ISO Date-Time format
 * @param {number} employees[].workload - employee workload in hours per week (10/20/30/40)
 * @returns {object} object containing employee statistics
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
