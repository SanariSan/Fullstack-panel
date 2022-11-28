SELECT
    *
FROM
    SystemUser AS s
WHERE
    s.email = $1
    AND s.username = $2