#!/bin/bash

if ! command -v docker &> /dev/null
then
  echo "Docker is not installed."
else
  read -p "Do you want to install the Docker image containing MySQL database? (y/n) " choice

  if [[ "$choice" =~ ^[Yy]$ ]]; then
    # If the user decides to install the MySQL Docker image, run the following command:
    container_name="mysql-container"
    image_name="mysql"
    if docker ps -a --format "{{.Names}}" | grep -q "^${container_name}\$"; then
      echo "Docker container with name '${container_name}' exists."
    else
      read -s -p "Enter database root password: " password
      echo ""
      docker run -d -p 3306:3306 --name $container_name -e MYSQL_ROOT_PASSWORD=$password -e MYSQL_DATABASE=test_database $image_name
      echo ""
      echo "Docker container with name $container_name was created, also test_database was created (used by default in tests)."
      echo "You could change database name in use from env file, for more info please refer to README."
    fi
  else
    # If the user chooses not to install the Docker image, print a message and exit the script.
    echo "Docker image installation cancelled."
    exit 0
  fi
fi