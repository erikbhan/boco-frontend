module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.js", "src/**/*.vue", "!**/node_modules/**"],
};
