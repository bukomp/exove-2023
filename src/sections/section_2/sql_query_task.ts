const peoplePhoneCombinationQuery = /*sql*/ `
SELECT CONCAT(first_name, ' ', last_name) AS name,
       GROUP_CONCAT(number SEPARATOR ',') AS numbers
FROM people
LEFT JOIN phones ON people.id = phones.user_id
GROUP BY name;
`;

export { peoplePhoneCombinationQuery };
