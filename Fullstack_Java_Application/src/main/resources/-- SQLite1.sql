-- SQLite
SELECT ls.lga_code, lga_name, median_age, median_mortgage_repay_monthly, median_rent_weekly, median_household_weekly_income
    FROM LGAStatistics ls
    JOIN LGA l
        on ls.lga_code = l.lga_code
    WHERE year = 2018 AND median_age IS NOT NULL AND ls.lga_code;

SELECT DISTINCT l.lga_code
    FROM HomelessGroup h
    JOIN LGAStatistics l
        on h.lga_code = l.lga_code
    WHERE l.year = 2018 AND h.lga_code IN (select ll.lga_code from LGAStatistics ll WHERE year = 2018 AND median_age IS NOT NULL);


SELECT ls.lga_code, lga_name, median_age, median_mortgage_repay_monthly, median_rent_weekly, median_household_weekly_income, sum(count) as total_homeless, printf('%.0f', (sum(count) * 1.0 /ls.population) * 1000) as Homeless_population_per_1000_people
    FROM LGAStatistics ls
    JOIN LGA l
        on ls.lga_code = l.lga_code
    JOIN HomelessGroup h
        on ls.lga_code = h.lga_code
    WHERE ls.year = 2018 AND median_age IS NOT NULL AND h.status = 'homeless' AND h.sex = 'm' AND ls.lga_code >= 70000 AND ls.lga_code < 80000
    GROUP BY ls.lga_code;


SELECT ls.lga_code, sum(count)
    FROM LGAStatistics ls
    JOIN LGA l
        on ls.lga_code = l.lga_code
    JOIN HomelessGroup h
        on ls.lga_code = h.lga_code
    WHERE ls.year = 2018 AND median_age IS NOT NULL AND h.status = 'homeless' AND h.sex = 'm' AND ls.lga_code >= 70000 AND ls.lga_code < 80000
    GROUP BY ls.lga_code;









    

 

