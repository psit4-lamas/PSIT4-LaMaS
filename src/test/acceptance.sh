# This script is used by CircleCI to execute automated tests.

# Switch to the build directory
yarn pushstate-server build &

# Save the PID of the server to a variable
APP_TEST_PID=$(echo $!)

# Execute tests
PORT=9000 CI=true npm run test:acceptance

# Kill the server
kill $APP_TEST_PID