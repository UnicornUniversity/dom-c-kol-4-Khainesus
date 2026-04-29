import { generateEmployeeData, getEmployeeStatistics } from "./src/employees.js";

/**
 * Main function
 * @param {object} dtoIn - input data
 * @returns {object} dtoOut - output data
 */
export function main(dtoIn) {
  const employees = generateEmployeeData(dtoIn);
  const result = getEmployeeStatistics(employees);
  return result;
}
