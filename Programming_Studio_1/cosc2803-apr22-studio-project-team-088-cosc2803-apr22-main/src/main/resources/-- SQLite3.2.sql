-- SQLite
SELECT *
      FROM (
               SELECT lga_code,
                      sum(count) AS Homeless_2018
                 FROM homelessgroup
                WHERE year = 2018 AND 
                      status = 'homeless'
                GROUP BY lga_code
           )
           AS homeless_2018,
           (
               SELECT lga_code,
                      sum(count) AS Homeless_2016
                 FROM homelessgroup
                WHERE year = 2016 AND 
                      status = 'homeless'
                GROUP BY lga_code
           )
           AS homeless_2016,
           (
               SELECT lga_code,
                      sum(count) AS At_risk_2016
                 FROM homelessgroup
                WHERE year = 2016 AND 
                      status = 'at_risk'
                GROUP BY lga_code
           )
           AS atrisk_2016,
           (
               SELECT lga_code,
                      sum(count) AS At_risk_2018
                 FROM homelessgroup
                WHERE year = 2018 AND 
                      status = 'at_risk'
                GROUP BY lga_code
           )
           AS atrisk_2018;
