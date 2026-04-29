import { generateEmployeeData, getEmployeeStatistics } from "./src/employees.js";

export function main(dtoIn) {
  const employees = generateEmployeeData(dtoIn);
  const result = getEmployeeStatistics(employees);
  return result;
}
